//     import React, { useEffect, useState } from 'react';
//     import axios from 'axios';
//     import Stars from '../../Stars';
//     import TextType from '../../TextAnimations/TextType/TextType'
//     const ProductsPage = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         axios.get("/products.json") // اسم الملف داخل public
//         .then((res) => setData(res.data))
//     }, []);



// const [cart, setCart] = useState([]);

// const handleAddToCart = (item) => {
//   setCart(prev => [...prev, item]);
//   // إشعار بسيط عند الإضافة
//   const toast = document.createElement("div");
//   toast.innerText = `${item.name} تم إضافته إلى السلة!`;
//   toast.className = "fixed bottom-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg animate-slideIn";
//   document.body.appendChild(toast);
//   setTimeout(() => {
//     toast.remove();
//   }, 2500);
// };

// const handleBuyNow = (item) => {
//   alert(`تمت عملية شراء: ${item.name} بنجاح!`);
// };





//     return (<>


// <style>
//     {`
//       @keyframes slideIn {
//         0% { transform: translateX(100%) scale(0.8); opacity: 0; }
//         100% { transform: translateX(0) scale(1); opacity: 1; }
//       }

//       .animate-slideIn {
//         animation: slideIn 0.4s ease-out forwards;
//       }
//     `}
//   </style>


//                 <div className='mx-auto flex flex-auto mt-32 justify-center'>
// <TextType className='text-3xl font-bold text-center text-lime-700'
//   text={["اكتشف تشكيلتنا المتنوعة من المنتجات بعناية فائقة ✨",
//      " حيث ندمج بين الجودة العالية والتصميم العصري", 
//      " لتلبية جميع احتياجاتك بأسلوب أنيق وفريد."
//     ]}
//   typingSpeed={75}
//   pauseDuration={1500}
//   showCursor={true}
//   cursorCharacter="|"
// /></div>
//         <section className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-32">


//         {data.map((item) => (

//     <div
//     key={item.id}
//     className="group relative border rounded-3xl p-6 shadow-md
//                 bg-white/30 dark:bg-neutral-900/50
//                 backdrop-blur-lg border-white/20 dark:border-neutral-700
//                 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
//     >
//     {/* صورة المنتج */}
//     <div className="overflow-hidden rounded-2xl mb-5">
//         <img
//         src={item.image || "https://cdn.dribbble.com/userupload/43068298/file/original-8db71b0247f2f274f3e051c00cbe32fe.jpg?resize=400x0"}
//         alt={item.name}
//         className="w-full h-52 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
//         />
//     </div>

//     {/* نص المنتج */}
//     <h2 className="text-xl font-extrabold mb-2 text-neutral-900 dark:text-neutral-100 transition-colors font-cairo">
//         {item.name}
//     </h2>
//     <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2 font-thin transition-colors">
//         {item.description}
//     </p>
//     <span className="block text-indigo-600 dark:text-lime-400 font-bold text-lg mb-2 transition-colors">
//         {item.price}
//     </span>
//     <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
//         التصنيف: {item.category}
//     </p>

//     {/* تقييم */}
//     <div className="mb-3">
//         <Stars rating={item.rating} />
//     </div>

//     {/* الأزرار */}
//     <div className="flex gap-4 mt-3">
//         <button   onClick={() => handleAddToCart(item)}

//         className="flex-1 py-2 px-5 rounded-xl font-semibold
//                     bg-indigo-500 text-white shadow-md
//                     hover:bg-indigo-600 hover:shadow-lg
//                     active:scale-95 transition-all duration-300"
//         >
//         أضف إلى السلة
//         </button>
//         <button   onClick={() => handleBuyNow(item)}
//         className="flex-1 py-2 px-5 rounded-xl font-semibold
//                     border border-indigo-500 text-indigo-600
//                     dark:border-lime-400 dark:text-lime-400
//                     hover:bg-indigo-500 hover:text-white
//                     dark:hover:bg-lime-400 dark:hover:text-black
//                     active:scale-95 transition-all duration-300"
//         >
//         شراء الآن
//         </button>
//     </div>

//     {/* خلفية متحركة glow */}
//     <div className="absolute inset-0 -z-10 rounded-3xl
//                     bg-gradient-to-tr from-indigo-400/10 via-transparent to-lime-400/10
//                     opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700"></div>

//     {/* نقاط متحركة صغيرة */}
//     <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/70 dark:bg-yellow-300 animate-pulse"></div>
//     <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-white/50 dark:bg-yellow-400 animate-pulse delay-200"></div>
//     </div>


//         ))}
//         </section>
//         </>
//     );
//     };

//     export default ProductsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stars from '../../Stars';
import TextType from '../../TextAnimations/TextType/TextType';
import Error from './Error'
const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [error, setError]= useState(null)
  const [cart, setCart] = useState([]);
  useEffect(() => {
    
    const fetchData= async () => {
      try{
        const res =await axios.get("/products.json")
        setData(res.data)
      }
      catch (err) {
        setError("error 404")
      }
    }
    fetchData()

  }, []);
if (error) return <Error/>
  

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    // إشعار بسيط عند الإضافة
    const toast = document.createElement("div");
    toast.innerText = `${item.name} تم إضافته إلى السلة!`;
    toast.className =
      "fixed bottom-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg animate-slideIn z-50";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2500);
  };

  const handleBuyNow = (item) => {
    alert(`تمت عملية شراء: ${item.name} بنجاح!`);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(100%) scale(0.8); opacity: 0; }
            100% { transform: translateX(0) scale(1); opacity: 1; }
          }
          .animate-slideIn {
            animation: slideIn 0.4s ease-out forwards;
          }
        `}
      </style>

      {/* نص متحرك */}
      <div className="mx-auto flex flex-auto mt-32 justify-center">
        <TextType
          className="text-3xl font-bold text-center text-lime-300"
          text={[
            "اكتشف تشكيلتنا المتنوعة من المنتجات بعناية فائقة ✨",
            " حيث ندمج بين الجودة العالية والتصميم العصري",
            " لتلبية جميع احتياجاتك بأسلوب أنيق وفريد.",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>

      {/* المنتجات */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-32">
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative border rounded-3xl p-6 shadow-md bg-white/40 dark:bg-neutral-900/60 backdrop-blur-lg border-white/20 dark:border-neutral-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
          >
            {/* صورة المنتج */}
            <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/5]">
              <img
                src={
                  item.image ||
                  "https://cdn.dribbble.com/userupload/43068298/file/original-8db71b0247f2f274f3e051c00cbe32fe.jpg?resize=400x0"
                }
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* نص المنتج */}
            <h2 className="text-xl font-extrabold mb-2 text-neutral-900 dark:text-neutral-100 transition-colors font-cairo">
              {item.name}
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2 font-thin transition-colors line-clamp-3">
              {item.description}
            </p>

            {/* السعر كبادج */}
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm shadow mb-3">
              {item.price}
            </span>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              التصنيف: {item.category}
            </p>

            {/* تقييم */}
            <div className="mb-3">
              <Stars rating={item.rating} />
            </div>

            {/* الأزرار */}
            <div className="flex gap-4 mb-1">
              <button
                onClick={() => handleAddToCart(item)}
                className="flex-1 py-2 px-5 rounded-xl font-semibold bg-indigo-500 text-white shadow-md hover:bg-indigo-600 hover:shadow-lg active:scale-95 transition-all duration-300"
              >
                أضف إلى السلة
              </button>
              <button
                onClick={() => handleBuyNow(item)}
                className="flex-1 py-2 px-5 rounded-xl font-semibold border border-indigo-500 text-indigo-600 dark:border-lime-400 dark:text-lime-400 hover:bg-indigo-500 hover:text-white dark:hover:bg-lime-400 dark:hover:text-black active:scale-95 transition-all duration-300"
              >
                شراء الآن
              </button>
            </div>

            {/* Glow Background */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-400/10 via-transparent to-lime-400/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700"></div>

            {/* نقاط متحركة */}
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/70 dark:bg-yellow-300 animate-pulse"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-white/50 dark:bg-yellow-400 animate-pulse delay-200"></div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductsPage;
