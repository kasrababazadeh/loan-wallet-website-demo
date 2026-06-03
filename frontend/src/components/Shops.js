import React, { useEffect, useState, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const Shops = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const word = queryParams.get('word');

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Track if more results are available
  const loader = useRef(null);

  const fetchResults = async () => {
    if (word && hasMore && page !== 0) {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8000/api/shop/?word=${word}&page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data.results.length === 0 || !data.next) {
          setHasMore(false); // No more results or no next page
          setResults((prevResults) => [...prevResults, ...data.results]);
        } else {
          setResults((prevResults) => [...prevResults, ...data.results]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchResults();
  }, [page, word]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    }, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-screen-lg mx-auto mb-4">
        <div className="flex flex-col justify-center items-center text-center space-y-2">
          <h2 className="text-gray-700 dark:text-gray-300 text-4xl py-8">
            فروشگاه‌ها          
          </h2>
          <div className='flex flex-row space-x-4'>
          </div>
        </div>
      </div>
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <a key={index} href={`/shop-detail/?store=${result.id}`} className="block bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden relative group">
                <img src={result.banner} alt="banner" className="w-full h-32 object-cover" />
                <div className="absolute top-1/2 transform -translate-y-1/2 left-4 flex items-center bg-white p-1 rounded shadow-md">
                  <img src={result.icon} alt="icon" className="h-20 w-20" />
                </div>
                <div className="p-4 mt-4 relative text-right dark:text-gray-300">
                  <h2 className="text-xl font-bold">{result.name}</h2>
                  <p>{result.type}</p>
                  <p>{result.province}</p>
                </div>
              </a>
            ))}
          </div>
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {hasMore && <div ref={loader} className="h-10"></div>}
        </div>
      )}
    </div>
  );
};

export default Shops;
