import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Clock, Send, ShoppingCart, Tag } from 'lucide-react';

// =====================================================================
// A. Components & Hooks for Scroll Animations and Effects
// =====================================================================

// Hook to check if an element is visible on screen
const useIntersectionObserver = (elementRef, options) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [elementRef, options]);

    return isVisible;
};

// Wrapper for Scroll Fade-In Animation (Updated with forwardRef)
const FadeInOnScroll = forwardRef(({ children, className = '', delay = 0, threshold = 0.1 }, ref) => {
    const internalRef = useRef(null);
    const targetRef = ref || internalRef;
    const isVisible = useIntersectionObserver(targetRef, { threshold });

    return (
        <div
            ref={targetRef}
            // تقليل مدة الانتقال لتكون أكثر سلاسة
            className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
});

// Style for Gradient Text (Using slightly reduced contrast for Indigo)
const GradientText = ({ children, className = '' }) => (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-400 ${className}`}>
        {children}
    </span>
);


// =====================================================================
// B. Page Data (Real names/USD prices)
// =====================================================================

const featuredOffers = [
    { 
        id: 1, 
        name: 'Dior Sauvage Elixir', 
        description: 'تركيبة مركزة وقوية للرجل الكلاسيكي. فخامة لا تُنسى.',
        oldPrice: 180, 
        newPrice: 120, 
        category: 'رجالي/توابل',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykwJx-Jy5COMC00lLDc-VlaBtj54SR4GBVA&s' 
    },
    { 
        id: 2, 
        name: 'Chanel Coco Mademoiselle', 
        description: 'أناقة لا مثيل لها. مزيج زهري شرقي للمرأة العصرية.',
        oldPrice: 150, 
        newPrice: 90, 
        category: 'نسائي/زهري',
        image: 'https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-9564889645086.jpg' 
    },
    { 
        id: 3, 
        name: 'Tom Ford Oud Wood', 
        description: 'عود نادر وخشب الصندل. عطر دافئ للرجال والنساء.',
        oldPrice: 250, 
        newPrice: 175, 
        category: 'للجنسين/عود',
        image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.89988.jpg' 
    },
    { 
        id: 4, 
        name: 'Gucci Bloom', 
        description: 'باقة من الزهور البيضاء الساحرة. عطر خفيف وطبيعي.',
        oldPrice: 110, 
        newPrice: 77, 
        category: 'نسائي/زهري',
        image: 'https://fimgs.net/mdimg/perfume/o.102753.jpg' 
    },
    { 
        id: 5, 
        name: 'Hermès Terre d’Hermès', 
        description: 'رائحة أرضية وخشبية للرجل العصري. ثابتة ومميزة طوال اليوم.',
        oldPrice: 135, 
        newPrice: 95, 
        category: 'رجالي/خشبي',
        image: 'https://fimgs.net/mdimg/perfume/o.17.jpg' 
    },
    { 
        id: 6, 
        name: 'Yves Saint Laurent Black Opium', 
        description: 'مزيج غني من القهوة والزهور الشرقية. عطر نسائي جذاب وساحر.',
        oldPrice: 160, 
        newPrice: 105, 
        category: 'نسائي/شرقي',
        image: 'https://media.sephora.eu/content/dam/digital/pim/published/Y/YVES_SAINT_LAURENT/703799/327989-media_swatch.jpg?scaleWidth=585&scaleHeight=585&scaleMode=fit' 
    },
];


const seasonalOffersData = [
    { month: 'مارس - أبريل', event: 'خصومات شهر رمضان المبارك', icon: Tag },
    { month: 'مايو - يوليو', event: 'عروض الصيف الساخنة على العطور المنعشة', icon: Clock },
    { month: 'سبتمبر - أكتوبر', event: 'مهرجان إطلاق العطور الخريفية الجديدة', icon: Tag },
    { month: 'نوفمبر - ديسمبر', event: 'تصفية نهاية العام الكبرى (Black Friday)', icon: Clock },
];

// =====================================================================
// C. Dedicated Components for Offers Page
// =====================================================================


// 2. Product Card Component (Clean & Clear Design with Hover Button)
const OfferCard = ({ offer, delay }) => {
    // Calculate Discount Percentage
    const discount = Math.round(((offer.oldPrice - offer.newPrice) / offer.oldPrice) * 100);

    return (
        <FadeInOnScroll delay={delay}> 
            {/* START: Custom Card Design - Simple, elegant, and focused */}
            <div 
                key={offer.id}
                className="group relative border rounded-3xl p-6 shadow-md
                           bg-gray-800/60 
                           backdrop-blur-md border-indigo-500/10 
                           transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1
                           flex flex-col h-full overflow-hidden" 
            >
                {/* Discount Badge (PULSE ANIMATION) - Made smaller and cleaner */}
                <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-lg z-10 animate-pulse">
                    خصم {discount}%
                </div>

                {/* صورة المنتج */}
                <div className="overflow-hidden rounded-2xl mb-4 flex justify-center items-center">
                    <img
                        src={offer.image || "https://placehold.co/300x400/1e1e1e/FFF?text=Perfume"}
                        alt={offer.name}
                        // Added slight border to image for definition
                        className="w-full h-52 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-1 border border-gray-700"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x400/1e1e1e/FFF?text=Perfume+Offer" }}
                    />
                </div>

                {/* نص المنتج */}
                <h2 className="text-xl font-extrabold mb-1 text-white font-['Cairo']" dir="ltr">
                    {/* Name in English (LTR) */}
                    {offer.name}
                </h2>
                <p className="text-sm text-neutral-400 mb-4 font-thin transition-colors flex-grow">
                    {offer.description}
                </p>
                
                {/* Pricing - Clear and Bold */}
                <div className="mt-2 mb-4 flex justify-between items-center border-t border-gray-700/50 pt-3">
                    <div className='text-right'>
                        <p className="text-sm text-gray-500 line-through">
                            ${offer.oldPrice.toLocaleString()}
                        </p>
                        <span className="block text-lime-400 font-extrabold text-3xl transition-colors">
                            ${offer.newPrice.toLocaleString()}
                        </span>
                    </div>
                     {/* Placeholder for category/stars removed */}
                </div>
                
                {/* Interactive Button Container (Slides up on hover) */}
                <a href={`#!offer-${offer.id}`} className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <button className="flex items-center justify-center w-full p-4 bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition duration-300 shadow-md transform hover:scale-[1.01] rounded-b-3xl">
                        <ShoppingCart size={20} className="ml-2" />
                        أضف إلى السلة
                    </button>
                </a>

            </div>
            {/* END: Custom Card Design */}
        </FadeInOnScroll>
    );
};


// =====================================================================
// D. Full Page Component
// =====================================================================

const OffersPage = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const heroRef = useRef(null);

    // Hero Entry Animation (Slide Down + Fade In)
    useEffect(() => {
        const timer = setTimeout(() => setIsHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    

    return (
        <div className="min-h-screen bg-gray-900 text-white font-['Cairo']" dir="rtl">
            {/* Custom CSS for Animations and Gradients (Softer Colors) */}
            <style>{`
                .hero-shimmer {
                    background: linear-gradient(135deg, #1e3a8a 0%, #000000 100%); 
                    position: relative;
                    overflow: hidden;
                }
                .hero-shimmer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%); /* Reduced Opacity */
                    background-size: 200% 100%;
                    animation: shimmer 15s infinite linear;
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
            
            <main className="max-w-7xl mx-auto pb-8">
                
                {/* 1. Hero Section */}
                <section ref={heroRef} className={`hero-shimmer py-20 md:py-32 rounded-b-3xl text-center px-4 transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
                        <GradientText className="text-6xl md:text-[6rem]">اكتشف عروضنا الخاصة</GradientText>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-6">
                        "أفضل العطور بأسعار لا تُقاوم لفترة محدودة! لا تفوّت هذه الفرصة لامتلاك الفخامة."
                    </p>
                </section>

                {/* 2. Featured Offers Section - الكروت الفاخرة الجديدة */}
                <section className="py-12 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-3xl font-bold text-center mb-10">
                            عطور <GradientText>بأسعار استثنائية</GradientText>
                        </h2>
                    </FadeInOnScroll>
                    
                    {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredOffers.map((offer, index) => (
                            <OfferCard key={offer.id} offer={offer} delay={index * 100} />
                        ))}
                    </div>
                </section>

                
                {/* 3. Timeline / Seasonal Offers Section (Horizontal Layout) */}
                <section className="py-12 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-3xl font-bold text-center mb-10">
                            العروض <GradientText>الموسمية السنوية</GradientText>
                        </h2>
                    </FadeInOnScroll>

                    {/* Horizontal Timeline Container */}
                    <div className="flex flex-col md:flex-row justify-between items-start relative overflow-x-auto pb-4 border-b-2 border-indigo-600/10 md:border-b-0">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-lime-500/20 hidden md:block transform -translate-y-1/2"></div>
                        
                        {seasonalOffersData.map((item, index) => (
                            <FadeInOnScroll key={index} delay={index * 150} className="w-full md:w-1/4 flex flex-col items-center text-center px-4 relative mb-8 md:mb-0">
                                {/* The Circle Point */}
                                <div className="relative w-7 h-7 bg-indigo-500 rounded-full border-3 border-gray-900 shadow-lg z-10 mb-3 transform transition duration-500 group hover:scale-125 hover:shadow-indigo-400/30">
                                    <item.icon size={14} className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                    {/* Tooltip on hover (only visible in desktop view) */}
                                    <div className="absolute top-full mt-3 p-2 bg-gray-700/90 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                                        {item.event}
                                    </div>
                                </div>
                                
                                <p className="text-base font-bold text-indigo-400 mt-1">{item.month}</p>
                                <h3 className="text-lg font-semibold mt-1 text-gray-300">{item.event}</h3>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </section>
                
                
            </main>
        </div>
    );
};

export default OffersPage;
