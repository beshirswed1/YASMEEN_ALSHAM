import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { 
    Mail, Phone, Clock, MapPin, Send, Facebook, Instagram, Twitter, Linkedin, 
    MessageCircle, Users, Trello, Map, PhoneCall, Globe
} from 'lucide-react';

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
            className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
});

// Style for Gradient Text (Indigo/Silver look)
const GradientText = ({ children, className = '' }) => (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-gray-100 to-indigo-400 ${className}`}>
        {children}
    </span>
);

// =====================================================================
// B. Page Data
// =====================================================================

const contactInfo = [
    { icon: Mail, title: 'البريد الإلكتروني', value: 'yasmine-alsham.com', link: 'mailto:yasmine-alsham.com' },
    { icon: PhoneCall, title: 'رقم الهاتف (واتساب)', value: '+9053776906230', link: 'tel:+9053776906230' },
    { icon: Clock, title: 'ساعات العمل', value: 'يوميًا 10:00 صباحًا - 10:00 مساءً', link: null },
    { icon: MapPin, title: 'الموقع الرئيسي', value: 'سوريا / دمشق / أوتوستراد درعا الدولي', link: 'https://maps.app.goo.gl/F79H+GCC' },
];

const socialMedia = [
    { icon: Facebook, name: 'Facebook', color: 'text-blue-500', link: 'https://www.facebook.com/profile.php?id=100049305971841&locale=ar_AR' },
    { icon: Instagram, name: 'Instagram', color: 'text-pink-500', link: 'https://www.instagram.com/ollx.b27/' },
    { icon: Twitter, name: 'Twitter', color: 'text-cyan-400', link: '#!' },
    { icon: Linkedin, name: 'LinkedIn', color: 'text-indigo-400', link: '#!' },
];

// =====================================================================
// C. Dedicated Components
// =====================================================================

// Contact Info Card Component
const ContactCard = ({ icon: Icon, title, value, link, delay }) => (
    <FadeInOnScroll delay={delay}>
        <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-indigo-500/10 transition-all duration-300 hover:shadow-indigo-500/20 hover:scale-[1.02] h-full flex flex-col items-end text-right">
            <div className="flex items-center justify-end mb-3">
                <h3 className="text-xl font-bold text-gray-100 mr-3">{title}</h3>
                <Icon size={24} className="text-indigo-400" />
            </div>
            <p className="text-gray-300 mb-2 flex-grow">{value}</p>
            {link && (
                <a 
                    href={link} 
                    className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                    {title.includes('البريد') ? 'إرسال بريد' : 'تواصل الآن'}
                </a>
            )}
        </div>
    </FadeInOnScroll>
);

// Social Media Icon Component
const SocialIcon = ({ icon: Icon, color, link, name }) => (
    <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/70 transition-all duration-300 hover:scale-125 hover:shadow-xl ${color} hover:shadow-indigo-500/40`}
        aria-label={name}
    >
        <Icon size={24} className={color} />
    </a>
);


// Contact Form Component
const ContactForm = () => {
    // Placeholder function for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // NOTE: Changed alert() to console.log() to comply with environment restrictions.
        console.log("تم استلام رسالتك! سيقوم فريق ياسمين الشام بالرد عليك قريباً.");
        // In a real application, you would send data to an API here
    };

    return (
        <FadeInOnScroll delay={100} className="w-full">
            <div className="bg-gray-800/70 p-8 md:p-10 rounded-xl shadow-2xl border border-indigo-500/20">
                <h3 className="text-3xl font-bold mb-6 text-center text-white">نموذج التواصل السريع</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* الاسم */}
                    <input 
                        type="text" 
                        placeholder="الاسم الكامل" 
                        required 
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-white text-right placeholder-gray-400 transition-colors"
                    />
                    
                    {/* البريد الإلكتروني */}
                    <input 
                        type="email" 
                        placeholder="البريد الإلكتروني (مطلوب)" 
                        required 
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-white text-right placeholder-gray-400 transition-colors"
                    />
                    
                    {/* رقم الهاتف (اختياري) */}
                    <input 
                        type="tel" 
                        placeholder="رقم الهاتف (اختياري)" 
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-white text-right placeholder-gray-400 transition-colors"
                    />
                    
                    {/* الرسالة */}
                    <textarea 
                        placeholder="رسالتك أو استفسارك (مطلوب)" 
                        rows="5" 
                        required 
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-white text-right placeholder-gray-400 transition-colors"
                    ></textarea>
                    
                    {/* زر الإرسال */}
                    <button 
                        type="submit" 
                        className="w-full flex items-center justify-center p-3 mt-6 rounded-lg 
                                   bg-indigo-600 text-white font-bold text-lg 
                                   hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:scale-[1.01]"
                    >
                        <Send size={20} className="ml-2" />
                        أرسل رسالتك الآن
                    </button>
                </form>
            </div>
        </FadeInOnScroll>
    );
};


// =====================================================================
// D. Full Page Component
// =====================================================================

const ContactUsPage = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const heroRef = useRef(null);
    const mapRef = useRef(null);

    // Hero Entry Animation (Slide Down + Fade In)
    useEffect(() => {
        const timer = setTimeout(() => setIsHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    
    // Coordinates for F79H+GCC, Damascus, Autostrad (Approx: 33.5134 N, 36.3150 E)
    const lat = 33.46904282036132;
    const lng = 36.279478299417676;
    const zoomLevel = 18; // Increased zoom for better location visibility

    // Google Maps Embed URL with updated coordinates and zoom
    const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoomLevel}&output=embed&hl=ar`;

    return (
        <div className="min-h-screen bg-gray-900 text-white font-['Cairo']" dir="rtl">
            {/* Custom CSS for Animations and Gradients */}
            <style>{`
                .hero-shimmer {
                    background: linear-gradient(135deg, #0f172a 0%, #000000 100%); /* Slate/Black Gradient */
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
                    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer 15s infinite linear;
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .map-pulse {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
            
            <main className="max-w-7xl mx-auto pb-12">
                
                {/* 1. Hero Section */}
                <section ref={heroRef} className={`hero-shimmer py-24 md:py-36 rounded-b-3xl text-center px-4 transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
                        <GradientText className="text-6xl md:text-[6rem]">تواصل معنا</GradientText>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-6">
                        "هل لديك سؤال، اقتراح أو طلب؟ فريقنا جاهز لمساعدتك على الفور."
                    </p>
                    <p className="text-base text-gray-500 max-w-4xl mx-auto mt-4">
                        نحن في ياسمين الشام نقدر كل استفسار واقتراح. سواء كنت تبحث عن عطر جديد، تحتاج لمساعدة في الطلب أو ترغب بمشاركة رأيك، فريقنا جاهز للرد على كل أسئلتك بسرعة واحترافية.
                    </p>
                </section>

                {/* 2. Contact Info & Form Section */}
                <section className="py-16 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-3xl font-bold text-center mb-12">
                            نحن هنا <GradientText>للاستماع إليك</GradientText>
                        </h2>
                    </FadeInOnScroll>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* 2a. Contact Info Grid */}
                        <div className="lg:col-span-1 grid grid-cols-1 gap-6 h-full">
                            {contactInfo.map((item, index) => (
                                <ContactCard 
                                    key={index} 
                                    icon={item.icon} 
                                    title={item.title} 
                                    value={item.value} 
                                    link={item.link}
                                    delay={index * 100}
                                />
                            ))}
                            
                            {/* Social Media Icons */}
                            <FadeInOnScroll delay={400} className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-indigo-500/10 text-center">
                                <h4 className="text-xl font-bold text-white mb-4">تابعنا</h4>
                                <div className="flex justify-center space-x-4 space-x-reverse">
                                    {socialMedia.map((social, index) => (
                                        <SocialIcon 
                                            key={index} 
                                            icon={social.icon} 
                                            color={social.color} 
                                            link={social.link}
                                            name={social.name}
                                        />
                                    ))}
                                </div>
                                <a href="#!whatsapp" className="mt-4 inline-flex items-center text-sm font-semibold text-green-500 hover:text-green-400 transition-colors">
                                    <MessageCircle size={18} className="ml-1"/>
                                    تواصل الآن عبر WhatsApp
                                </a>
                            </FadeInOnScroll>
                        </div>

                        {/* 2b. Contact Form */}
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>
                    </div>
                </section>
                
                {/* 3. Interactive Map Section */}
                <section className="py-16 px-4">
                    <FadeInOnScroll>
                        <h2 className="text-3xl font-bold text-center mb-10">
                            موقعنا <GradientText>على الخريطة</GradientText>
                        </h2>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={200} className="rounded-xl overflow-hidden shadow-2xl border-4 border-indigo-500/30">
                        {/* Google Maps Embed - Centered on F79H+GCC, Damascus */}
                        <div ref={mapRef} className="w-full h-[400px] bg-gray-800 relative">
                            {/* Placeholder for Map with an interactive pin/pulse effect */}
                            <iframe
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                // Updated to specific coordinates and zoom 16
                                src={mapEmbedUrl}
                                title="موقع متجر ياسمين الشام في دمشق"
                                className="border-0"
                            ></iframe>
                            
                            {/* Animated Marker (Overlayed on the approximate location) */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <MapPin size={32} className="text-red-500 fill-red-500 map-pulse" />
                            </div>
                        </div>
                    </FadeInOnScroll>
                </section>


                {/* 4. Simple Footer / Copyright */}
                <footer className="text-center py-6 border-t border-gray-800 mt-12">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} ياسمين الشام للعطور. جميع الحقوق محفوظة.
                    </p>
                </footer>
                
            </main>
        </div>
    );
};

export default ContactUsPage;
