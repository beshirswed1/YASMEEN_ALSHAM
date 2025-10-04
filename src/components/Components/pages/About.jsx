import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapPin, Mail, Phone, Printer, Feather, Facebook, Twitter, Instagram, Linkedin, Github, Package, Users, Award, Zap, Heart, Clock, DollarSign, Calendar, Globe, Target, Send } from 'lucide-react';
import Url from "../../../assets/mtjr.png"
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
                // Optionally stop observing once visible
                // observer.unobserve(entry.target);
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
  const mapUrl = `https://maps.google.com/maps?q=F7QW%2B45H,Damascus,Suriye&t=&z=15&ie=UTF8&iwloc=B&output=embed`;

// Counter component (for Statistics Section)
const Counter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);
    const isVisible = useIntersectionObserver(counterRef, { threshold: 0.5 });

    useEffect(() => {
        if (!isVisible) return;
        
        let start = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * end);
            setCount(value);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return <span ref={counterRef}>{count.toLocaleString()}</span>;
};

// =====================================================================
// B. Page Data
// =====================================================================

const timelineData = [
    // تم تحديث صور المراحل لتبدو كصور متاجر
    { year: 2005, event: 'النشأة: انطلاق أول متجر صغير في دمشق القديمة', image: 'https://i.pinimg.com/736x/47/e5/42/47e5425b0375d37555e047457b6abb5f.jpg' },
    { year: 2010, event: 'التوسع الأول: افتتاح المتجر الرئيسي في الميدان', image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npcMvgPbAs1Ua9jTf0I0NU6HL2k5WB_97T5COS_7bBHRwHMGY0TkrXu2hpeFKiRQyPV8ouBpFYs_hH2gmM3iTO7ha1OKJhTnXUvYivsulf9rJvtfkcOp4shtpJA6JeR95UNrAQcXA=w408-h306-k-no' },
    { year: 2015, event: 'شراكات دولية: إطلاق خطوط العطور الحصرية المستوردة', image: 'https://lh3.googleusercontent.com/p/AF1QipPTCgTtqNb_qbdqP9p8qDRIOD4TpMa_9Af-Gmnp=w408-h544-k-no' },
    { year: 2020, event: 'الرقمية: إطلاق المتجر الإلكتروني وخدمات الشحن السريع', image: Url
     },
    { year: 2024, event: 'الريادة: الوصول إلى 5 فروع وتحقيق لقب أكبر متجر عطور', image: 'https://static.sayidaty.net/styles/600x380/public/2025-05/426940.jpg.webp?VersionId=3aIKsBPBxotTT8qXzyjhvaLxvTA4ZeYu' },
];

const teamMembers = [
    // تم تحديث صور الفريق لتبدو كصور أشخاص
    { name: 'محمد الصالح', title: ' مساعد الرئيس التنفيذي', image: 'https://png.pngtree.com/png-clipart/20240329/original/pngtree-front-view-man-on-transparent-background-png-image_14713766.png' },
    { name: 'فاطمة الكيلاني', title: 'مديرة الإبداع والتطوير', image: 'https://learning.aljazeera.net/sites/default/files/articles/2020-12/dbba02990c8a3cf9e5ad8ae881ffd8e6_5.jpg' },
    { name: 'خالد النوري', title: 'مدير العمليات واللوجستيات', image: 'https://yt3.googleusercontent.com/ytc/AIdro_k9RvQx-CZat1TBFj3qdVUM6GwbUSJfYu7Sdi5sZoQe6Q=s900-c-k-c0x00ffffff-no-rj' },
];

// =====================================================================
// C. Utility Components (Animations & Styling)
// =====================================================================

// Style for Gradient Text (Tajawal style)
const GradientText = ({ children, className = '' }) => (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 ${className}`}>
        {children}
    </span>
);

// Style for Highlighted Text
const Highlight = ({ children }) => (
    <span className="font-extrabold px-1 py-0.5 rounded-md shadow-md bg-yellow-400/20 text-yellow-300">
        {children}
    </span>
);

// Wrapper for Scroll Fade-In Animation
const FadeInOnScroll = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// =====================================================================
// D. Full Page Component
// =====================================================================

const AboutUsPage = () => {
    // 1. Hero Section Ref (for Title animation)
    const heroTitleRef = useRef(null);

    // 2. About Story - Typewriter Effect & Animation Logic
const storyText = "كل عطر لدينا يحمل حكاية، لكن قصتنا أعظم. من تحت ركام الحرب، وسط الدمار والفقدان الذي خلّفته آلة النظام النصيري الكافر، انطلقنا من متجر صغير في قلب دمشق، حاملين حلمًا كبيرًا بأن نعيد للعطر الشرقي مكانته الرفيعة. رغم كل الصعوبات والليالي التي كادت أن تمحو الأمل، صمدنا وعملنا بلا كلل، لنحوّل الصعاب إلى فرصة. اليوم، بعد سنوات من الإصرار والإتقان، أصبح 'ياسمين الشام' أكثر من متجر؛ إنه رمز للصمود السوري، أيقونة للفخامة، ممتدًا من جذوره العميقة إلى العالمية، ليصبح أكبر وأشهر متجر عطور في سوريا، يروي لكل من يشم رائحته قصة شجاعة وعزيمة لا تُقهر.";
    const [typedText, setTypedText] = useState('');
    const storyRef = useRef(null);
    const isStoryVisible = useIntersectionObserver(storyRef, { threshold: 0.1 });

    // Simulate Typewriter Effect
    useEffect(() => {
        if (!isStoryVisible) {
            setTypedText(''); // Reset on un-intersect
            return;
        }

        let i = 0;
        const typing = setInterval(() => {
            setTypedText(prev => prev + storyText[i]);
            i++;
            if (i === storyText.length) {
                clearInterval(typing);
            }
        }, 30); // Typing speed

        return () => clearInterval(typing);
    }, [isStoryVisible, storyText]);


    // 3. Interactive Map logic (Placeholder for Syria cities)
    const [hoveredCity, setHoveredCity] = useState(null);
const mapCities = [
    { name: 'دمشق', top: '70%', left: '20%', info: 'المقر الرئيسي ونقطة الانطلاق' },
    { name: 'حلب', top: '20%', left: '30%', info: 'مركز التوزيع الشمالي' },
    { name: 'حمص', top: '50%', left: '26%', info: 'نقطة بيع وخدمة رئيسية' },
    { name: 'اللاذقية', top: '35%', left: '10%', info: 'الوصول إلى الساحل' },
    { name: 'حماه', top: '45%', left: '22%', info: 'فرع خدمة العملاء' },
    { name: 'درعا', top: '80%', left: '30%', info: 'تغطية الجنوب' },
    { name: 'ريف دمشق', top: '72%', left: '23%', info: 'مخزن لوجستي إضافي' },
    { name: 'طرطوس', top: '50%', left: '12%', info: 'فرع الساحل الغربي' },
    { name: 'إدلب', top: '20%', left: '20%', info: 'نقطة توزيع الشمال الغربي' },
    { name: 'دير الزور', top: '50%', left: '70%', info: 'فرع الشمال الشرقي' },
    { name: 'الحسكة', top: '20%', left: '70%', info: 'مركز توزيع الشمال الشرقي' },
    { name: 'القنيطرة', top: '86%', left: '12%', info: 'فرع الجنوب الغربي' },
    { name: 'السويداء', top: '85%', left: '20%', info: 'فرع الجنوب الشرقي' },
    { name: 'الرقة', top: '22%', left: '50%', info: 'مركز توزيع منتصف البلاد' },
    { name: 'حلب الشرقية', top: '22%', left: '35%', info: 'نقطة خدمة المنطقة الشرقية' },
];



    // 4. Team Section: Hover logic
    const [hoveredTeam, setHoveredTeam] = useState(null);


    return (
        <div className="min-h-screen bg-gray-900 text-white font-['Cairo']" dir="rtl">
            {/* Custom CSS for Animations and Gradients */}
            <style>{`
                /* Font face import is assumed to be handled globally by the environment/Tailwind config */
                .shadow-gold {
                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
                }
                .hero-bg {
                    background: linear-gradient(135deg, #1f2937 0%, #000000 100%);
                    position: relative;
                    overflow: hidden;
                }
                .hero-bg::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
                    animation: subtle-pulse 10s infinite alternate;
                }
                @keyframes subtle-pulse {
                    0% { opacity: 0.4; }
                    100% { opacity: 0.7; }
                }
                .typewriter-cursor {
                    animation: blink-caret 1s step-end infinite;
                }
                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #fcd34d; }
                }
                .highlight-story span {
                    background-image: linear-gradient(90deg, #fef3c7, #fde047);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
            `}</style>
            
            <main className="max-w-7xl mx-auto">
                
                {/* 1. Hero Section */}
                <section className="hero-bg py-32 md:py-48 rounded-b-3xl text-center px-4">
                    <FadeInOnScroll delay={100} className="w-full">
                        <h1 ref={heroTitleRef} className="text-5xl sm:text-7xl font-extrabold mb-6 animate-slideInDown">
                            <GradientText className="text-8xl md:text-[9rem]">قصة</GradientText>
                            <span className="block mt-4 text-4xl sm:text-6xl text-gray-200">الإتقان من قلب الشام</span>
                        </h1>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={300}>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-8">
                            "من الياسمين ولدت الأسطورة، رحلة عمر من العشق للعطور، نرويها لكم بصدق وفخر."
                        </p>
                    </FadeInOnScroll>
                </section>

                {/* 2. About Story Section */}
                <section className="py-24 px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Story Text */}
                        <FadeInOnScroll className="lg:order-2">
                            <h2 className="text-4xl font-bold mb-6">
                                ولادة <GradientText>أسطورة العطور</GradientText> الشرقية
                            </h2>
                            <p ref={storyRef} className="text-lg text-gray-400 leading-relaxed highlight-story min-h-[10rem]">
                                {typedText}
                                {isStoryVisible && typedText.length < storyText.length && (
                                    <span className="typewriter-cursor border-r-2 border-yellow-400 ml-1"></span>
                                )}
                            </p>
                        </FadeInOnScroll>

                        {/* Image with Hover Effect (Store Interior) */}
                        <FadeInOnScroll className="lg:order-1 relative p-4 group">
                            <img
                                src="https://zworks.net/Decor/file/2023/12/5%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AF%D9%8A%D9%83%D9%88%D8%B1-%D9%85%D8%AD%D9%84-%D8%B9%D8%B7%D9%88%D8%B1.jpg"
                                alt="تصميم داخلي فاخر للمتجر"
                                className="w-full h-auto rounded-3xl object-cover shadow-2xl border-4 border-yellow-500/50 
                                            transition-all duration-700 ease-in-out
                                            group-hover:scale-[1.03] group-hover:shadow-gold group-hover:rotate-1"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/4a4a4a/fff?text=Store+Image+Error" }}
                            />
                            <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl opacity-0 group-hover:opacity-10 transition duration-500 pointer-events-none"></div>
                        </FadeInOnScroll>
                    </div>
                </section>
                
                {/* 3. Timeline Section */}
                <section className="py-24 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-4xl font-bold text-center mb-16">
                            رحلة <GradientText>نمو وتطور</GradientText> متجرنا
                        </h2>
                    </FadeInOnScroll>

                    <div className="relative border-r-4 border-yellow-500/50 pr-4 ml-2 md:ml-0 md:pr-0 md:pl-4 md:border-l-4 md:border-r-0">
                        {timelineData.map((item, index) => (
                            <FadeInOnScroll key={index} delay={index * 200} className="mb-12 flex items-start justify-end md:justify-start">
                                {/* The Circle Point */}
                                <div className="absolute right-0 translate-x-1/2 mt-1 w-5 h-5 bg-yellow-500 rounded-full border-4 border-gray-900 shadow-lg md:left-0 md:-translate-x-1/2"></div>
                                
                                <div className="w-full pl-8 md:pl-0 md:pr-8 text-right md:text-left">
                                    <p className="text-sm font-light text-yellow-400">{item.year}</p>
                                    <h3 className="text-2xl font-semibold mt-1 mb-3">{item.event}</h3>
                                    <img 
                                        src={item.image} 
                                        alt={`حدث عام ${item.year}`}
                                        className="w-32 h-32 rounded-lg object-cover border-2 border-yellow-500/50 mt-3 transition duration-500 hover:scale-[1.05] shadow-xl" 
                                    />
                                </div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </section>

                {/* 4. Statistics Section */}
                <section className="py-24 px-4 bg-gray-800 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 10%, rgba(252, 211, 77, 0.1) 0%, transparent 60%)" }}></div>
                    <FadeInOnScroll>
                        <h2 className="text-4xl font-bold text-center mb-16">
                            أرقامنا <GradientText>تتحدث عن فخرنا</GradientText>
                        </h2>
                    </FadeInOnScroll>

                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        
                        <div className="p-6 rounded-xl bg-gray-900/50 border border-yellow-500/30 transition duration-500 hover:scale-[1.05] hover:shadow-gold/60 cursor-default">
                            <Users size={40} className="text-yellow-400 mx-auto mb-3 animate-bounce" />
                            <p className="text-4xl font-extrabold text-white"><Counter end={85000} /></p>
                            <p className="text-sm text-stone-400 mt-2">عميل سعيد ومخلص</p>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-gray-900/50 border border-yellow-500/30 transition duration-500 hover:scale-[1.05] hover:shadow-gold/60 cursor-default">
                            <Package size={40} className="text-yellow-400 mx-auto mb-3" />
                            <p className="text-4xl font-extrabold text-white"><Counter end={450} /></p>
                            <p className="text-sm text-stone-400 mt-2">منتج عطري فاخر</p>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-gray-900/50 border border-yellow-500/30 transition duration-500 hover:scale-[1.05] hover:shadow-gold/60 cursor-default">
                            <Award size={40} className="text-yellow-400 mx-auto mb-3" />
                            <p className="text-4xl font-extrabold text-white"><Counter end={19} /></p>
                            <p className="text-sm text-stone-400 mt-2">عاماً من الخبرة</p>
                        </div>

                        <div className="p-6 rounded-xl bg-gray-900/50 border border-yellow-500/30 transition duration-500 hover:scale-[1.05] hover:shadow-gold/60 cursor-default">
                            <Zap size={40} className="text-yellow-400 mx-auto mb-3" />
                            <p className="text-4xl font-extrabold text-white"><Counter end={5} /></p>
                            <p className="text-sm text-stone-400 mt-2">فروع منتشرة</p>
                        </div>

                    </div>
                </section>

                {/* 5. Team / Vision Section */}
                <section className="py-24 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-4xl font-bold text-center mb-16">
                            فريقنا <GradientText>ورؤيتنا نحو المستقبل</GradientText>
                        </h2>
                    </FadeInOnScroll>

                    <div className="grid lg:grid-cols-2 gap-12">
                        
                        {/* Vision & Mission */}
                        <FadeInOnScroll delay={200} className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-extrabold mb-4 flex items-center">
                                    <Target size={30} className="text-yellow-400 ml-3" />
                                    رؤيتنا
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    أن نكون العلامة التجارية الأولى للعطور الشرقية الفاخرة، وأن نقدم إرث الشام العطري إلى العالم، مع الحفاظ على <Highlight>جودة المنتج</Highlight> و<Highlight>رضا العميل</Highlight> كأولوية قصوى.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-extrabold mb-4 flex items-center">
                                    <Heart size={30} className="text-yellow-400 ml-3" />
                                    رسالتنا
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    توفير تجربة شمية لا تُنسى من خلال تركيبات عطرية فريدة ومستدامة، تعكس <Highlight>الأصالة السورية</Highlight> وتلبي أذواق عملائنا الباحثين عن التميز والرقي.
                                </p>
                            </div>
                        </FadeInOnScroll>

                        {/* Team Members */}
                        <div className="grid sm:grid-cols-3 gap-6">
                            {teamMembers.map((member, index) => (
                                <FadeInOnScroll key={index} delay={index * 300} className="text-center group"
                                                onMouseEnter={() => setHoveredTeam(member.name)}
                                                onMouseLeave={() => setHoveredTeam(null)}>
                                    <div className={`relative w-36 h-36 sm:w-full sm:h-auto aspect-square mx-auto rounded-full overflow-hidden mb-3 border-4 ${hoveredTeam === member.name ? 'border-yellow-400 scale-[1.05] rotate-1 shadow-gold' : 'border-gray-700'} transition-all duration-500 ease-in-out`}>
                                        <img 
                                            src={member.image} 
                                            alt={member.name} 
                                            className={`w-full h-full object-cover transition-all duration-500 ${hoveredTeam === member.name ? 'grayscale-0' : 'grayscale'}`}
                                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/d8c190/3b3b3b?text=Team" }}
                                        />
                                    </div>
                                    <p className="text-lg font-bold text-white transition duration-300 group-hover:text-yellow-400">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.title}</p>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Interactive Map Section (Syria Cities) */}
                <section className="py-24 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-4xl font-bold text-center mb-16">
                            انتشار <GradientText>ياسمين الشام</GradientText>
                        </h2>
                    </FadeInOnScroll>

                    <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-500/50 bg-gray-800/80 p-8">
                        {/* Placeholder Map of Syria/Region - تم تحديث الصورة لتبدو كخريطة منطقة */}
                        <img 
                            src="https://gisgeography.com/wp-content/uploads/2017/09/Syria-Satellite-Map-678x593.jpg"
                            alt="خريطة انتشار متجر ياسمين الشام الإقليمي"
                            className="w-full h-full object-contain opacity-70"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://maps.google.com/maps?q=Damascus,Syria&t=&z=8&ie=UTF8&iwloc=&output=embed" }}
                        />

                        {/* Interactive Points */}
                        {mapCities.map((city, index) => (
                            <div 
                                key={index} 
                                className="absolute" 
                                style={{ top: city.top, left: city.left }}
                                onMouseEnter={() => setHoveredCity(city)}
                                onMouseLeave={() => setHoveredCity(null)}
                            >
                                {/* Pulse Animation Dot */}
                                <div className="relative w-4 h-4 rounded-full bg-red-600 shadow-lg cursor-pointer transform hover:scale-150 transition duration-300">
                                    <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75"></div>
                                </div>
                                
                                {/* Info Tooltip */}
                                {hoveredCity?.name === city.name && (
                                    <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 p-3 bg-gray-700/90 text-white text-sm rounded-lg shadow-xl animate-fadeIn whitespace-nowrap z-10">
                                        <p className="font-bold text-yellow-300">{city.name}</p>
                                        <p className="mt-1">{city.info}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Call to Action Section (Subscribe / Contact) */}
                <section className="py-24 px-4">
                    <div className="bg-gradient-to-r from-stone-900 to-gray-800 rounded-2xl p-12 shadow-2xl border border-yellow-500/30">
                        <div className="text-center max-w-4xl mx-auto">
                            <FadeInOnScroll delay={100}>
                                <h2 className="text-4xl font-extrabold mb-4">
                                    لا تفوت <GradientText className="text-5xl">جديدنا العطري</GradientText>
                                </h2>
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={300}>
                                <p className="text-gray-400 mb-8 text-lg">
                                    اشترك في النشرة الإخبارية لتصلك أحدث العطور الحصرية والعروض الفاخرة مباشرة إلى بريدك الإلكتروني.
                                </p>
                            </FadeInOnScroll>

                            {/* Subscribe Form (Placeholder) */}
                            <FadeInOnScroll delay={500}>
                                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                                    <input 
                                        type="email" 
                                        placeholder="أدخل بريدك الإلكتروني هنا"
                                        className="w-full sm:w-auto flex-grow p-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 text-right"
                                    />
                                    <button className="flex items-center justify-center p-3 rounded-lg bg-yellow-600 text-gray-900 font-bold hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-gold/70 transform hover:scale-105">
                                        <Send size={20} className="ml-2" />
                                        اشترك الآن
                                    </button>
                                </div>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default AboutUsPage;
