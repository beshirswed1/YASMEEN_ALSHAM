// NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white antialiased">
      <div className="container mx-auto max-w-4xl text-center">

        {/* Main Graphic and 404 Number */}
        <div className="relative mb-8 w-full max-w-sm mx-auto">
          <svg className="w-full h-auto" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Goal Post */}
            <path d="M5 95V10C5 7.23858 7.23858 5 10 5H190C192.761 5 195 7.23858 195 10V95" stroke="#4B5563" strokeWidth="3" strokeLinecap="round"/>
            {/* Dashed line representing a missed shot */}
            <path d="M40 80C60 60, 80 50, 100 55C120 60, 140 80, 160 110" stroke="#10B981" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round"/>
            {/* Football Icon */}
            <circle cx="35" cy="85" r="8" fill="#10B981"/>
            <circle cx="35" cy="85" r="7" stroke="white" strokeWidth="1.5"/>
          </svg>
          <h1 className="absolute inset-0 flex items-center justify-center font-black text-gray-700" style={{fontSize: "clamp(6rem, 25vw, 12rem)"}}>
            404
          </h1>
        </div>

        {/* Apology and Explanation */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">يبدو أنك أضعت الطريق!</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة. ربما تم حذفها أو أن الرابط الذي اتبعته غير صحيح. لا تقلق، أفضل المعدات لا تزال في انتظارك.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link to="/" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/20">
            العودة للرئيسية
          </Link>
          <button onClick={() => window.location.reload()} className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 px-6 rounded-lg transition-all duration-300">
            تحديث الصفحة
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <p className="text-gray-300 mb-3 font-semibold">أو ابحث مباشرة عما تحتاجه:</p>
          <div className="relative search-input bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300">
            <input
              type="search"
              placeholder="ابحث عن قمصان، كرات، أحذية تدريب..."
              className="w-full bg-transparent p-4 pr-12 text-white placeholder-gray-500 focus:outline-none"
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Suggestions and Contact */}
        <div className="text-gray-400">
          <p className="mb-2">إليك بعض الروابط المفيدة:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/top-products" className="hover:text-emerald-400 transition-colors">المنتجات الأكثر مبيعاً</Link>
            <Link to="/new-arrivals" className="hover:text-emerald-400 transition-colors">وصل حديثاً</Link>
            <Link to="/support" className="hover:text-emerald-400 transition-colors">تواصل مع الدعم الفني</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
