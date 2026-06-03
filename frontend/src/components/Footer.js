import React from 'react';
import { CiFacebook, CiTwitter, CiInstagram, CiLinkedin } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 lg:text-right text-center" dir='rtl'>
      <div className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-2 gap-4">
          {/* Brand */}
          <div className="flex flex-col items-start lg:col-span-3">
            <img src="/last-removebg.png" alt="Brand Logo" className="w-1/5 lg:self-start self-center" />
            <p className="text-sm mt-2 lg:text-right text-center">
              کیپا در سال 1397 به‌منظور ارائه خدمات اعتباری و اقساطی شکل گرفت. پس از موفقیت در سال‌های ابتدایی، شروع به گسترش حوزه فعالیت خود کرد. در نتیجه امکان خرید اعتباری و خرید اقساطی را در زمینه‌های مختلفی به وجود آورد. در حال حاضر شبکه وسیع و متنوعی از پذیرندگان در زمینه‌های سوپرمارکتی (FMCG)، خدمات بیمه، خدمات پزشکی و سلامت، مد و پوشاک، گردشگری، آموزشی، خانه و آشپزخانه، کالای دیجیتال، لوازم‌خانگی، فرش و مبلمان، عینک و سمعک و محصولات آرایشی و بهداشتی با کیپا همکاری می‌کنند.
            </p>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center lg:col-span-1">
            <div className="w-full">
              <h3 className="font-bold mb-2">لینک‌های سریع</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:underline">درباره ما</a></li>
                <li><a href="/services" className="hover:underline">خدمات</a></li>
                <li><a href="/contact" className="hover:underline">تماس با ما</a></li>
                <li><a href="/faq" className="hover:underline">سؤالات متداول</a></li>
              </ul>
            </div>
          </div>
          {/* Additional Column */}
          <div className="flex flex-col items-center lg:col-span-1">
            <div className="w-full">
              <h3 className="font-bold mb-2">مطالب جدید</h3>
              <ul className="space-y-2">
                <li><a href="/blog1" className="hover:underline">مقاله اول</a></li>
                <li><a href="/blog2" className="hover:underline">مقاله دوم</a></li>
                <li><a href="/blog3" className="hover:underline">مقاله سوم</a></li>
                <li><a href="/blog4" className="hover:underline">مقاله چهارم</a></li>
              </ul>
            </div>
          </div>
          {/* Contact Info */}
          {/* <div className="flex flex-col items-center lg:col-span-1">
            <div className="w-full">
              <h3 className="font-bold mb-2">اطلاعات تماس</h3>
              <p className="mb-2">آدرس: خیابان 123، شهر، کشور</p>
              <p className="mb-2">تلفن: 123-456-789</p>
              <p className="mb-2">ایمیل: info@example.com</p>
            </div>
          </div> */}
          {/* Google Map */}
          <div className="lg:col-span-2 rounded-lg">
            <h3 className="font-bold mb-2">موقعیت ما در نقشه</h3>
            <div className="h-60">
              <iframe
                title="Google Map"
                className="w-full h-full rounded-lg"
                loading="lazy"
                allowFullScreen
                frameBorder="0"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.25229946110602!2d51.39330146993624!3d35.799030096140456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07006b3336eb%3A0xc6f737b7e08d6193!2z2KfYrdix2KfYsiDZh9mI24zYqiDYsdm-24zYryAoUmFwaUQp!5e0!3m2!1sen!2snl!4v1707816073254!5m2!1sen!2snl`}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>&copy; 2024 Your Company. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
