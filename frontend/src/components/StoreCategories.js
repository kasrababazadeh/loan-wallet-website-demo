import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const StoreCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/store-categories/');
        const data = response.data;

        console.log('API response:', data);

        if (data && Array.isArray(data.results)) {
          setCategories(data.results);
        } else {
          console.error("Unexpected response data format:", data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-screen-2xl mx-auto">
      <div className="flex flex-wrap mb-4" dir='rtl'>
        {categories.map((category) => (
          <button
            key={category.id}
            className="m-1 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            {category.title}
          </button>
        ))}
      </div>
      <div>
        {categories.map((category) => (
          <div key={category.id} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-300 text-center">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.stores && category.stores.slice(0, 3).map((store) => (
                <NavLink
                to={`/shop-detail/?store=${store.id}`}
                key={store.id}
                className={`block bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden relative group`}
              >
                  <img src={`http://localhost:8000${store.banner}`} alt="banner" className="w-full h-32 object-cover" />
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-4 flex items-center bg-white p-1 rounded shadow-md">
                    <img src={`http://localhost:8000${store.icon}`} alt="icon" className="h-20 w-20" />
                  </div>
                  <div className="p-4 mt-4 relative text-right dark:text-gray-300">
                    <h2 className="text-xl font-bold">{store.name}</h2>
                    <p>{store.type}</p>
                    <p>{store.province}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCategories;
