import React from 'react';
import { MapPin, Mail, Phone, Printer, Facebook, Twitter, Instagram, Linkedin, Github, Feather } from 'lucide-react';

// مكون رابط مخصص بتأثيرات ذهبية
const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-stone-400 hover:text-yellow-400 transition duration-300 ease-in-out block mb-2 text-right text-sm"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

// مكون رابط أيقونة مخصص لشبكات التواصل
const SocialIconLink = ({ href, Icon }) => (
  <a
    href={href}
    className="text-stone-400 hover:text-yellow-400 transition duration-300 mx-3 p-2 rounded-full hover:bg-stone-700/50"
    aria-label="رابط تواصل اجتماعي"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={20} />
  </a>
);

const Footer = () => {
  const addressDetails = 'سوريا \\ دمشق \\ الميدان \\ جانب مقبرة الحقله';
  const mapUrl = `https://maps.google.com/maps?q=F7QW%2B45H,Damascus,Suriye&t=&z=15&ie=UTF8&iwloc=B&output=embed`;

  return (
    <footer className="bg-stone-900 text-stone-300 mt-12 rounded-t-2xl shadow-2xl overflow-hidden font-inter" dir="rtl">
      
      {/* القسم العلوي: روابط التواصل الاجتماعي */}
      <div className="border-b border-yellow-700/30 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="mb-4 md:mb-0 text-sm md:text-base text-stone-400 font-medium tracking-wide">
            تواصل معنا عبر شبكات التواصل الاجتماعي الفاخرة:
          </span>
          <div className="flex space-x-2 space-x-reverse md:space-x-4">
            <SocialIconLink href="#!" Icon={Facebook} />
            <SocialIconLink href="#!" Icon={Twitter} />
            <SocialIconLink href="#!" Icon={Instagram} />
            <SocialIconLink href="#!" Icon={Linkedin} />
            <SocialIconLink href="#!" Icon={Github} />
          </div>
        </div>
      </div>

      {/* القسم الأوسط: الشبكة */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* العمود 1: وصف المتجر */}
          <div className="text-right">
            <h5 className="text-2xl font-extrabold text-white mb-4 flex items-center justify-end border-b border-yellow-500/50 pb-2">
              <Feather className="text-yellow-400 ml-3" size={30} />
              ياسمين الشام للعطور
            </h5>
            <p className="text-stone-500 text-sm leading-relaxed mt-4">
              نقدم لكم رحلة عطرية فريدة من قلب دمشق، مهد الحضارات وأرض الياسمين. أجود أنواع العطور التي تعكس الفخامة والأصالة الشرقية.
            </p>
          </div>

          {/* العمود 2: روابط المتجر */}
          <div className="text-right">
            <h6 className="text-lg font-bold text-white mb-5 uppercase tracking-wider">استكشف المتجر</h6>
            <nav className="space-y-2">
              <FooterLink href="#!">العطور النسائية الفاخرة</FooterLink>
              <FooterLink href="#!">توليفات العطور الرجالية</FooterLink>
              <FooterLink href="#!">مجموعة العود والبخور</FooterLink>
              <FooterLink href="#!">سياسة الشحن والإرجاع</FooterLink>
            </nav>
          </div>
          
          {/* العمود 3: خريطة */}
          <div className="text-right">
            <h6 className="text-lg font-bold text-white mb-5 uppercase tracking-wider flex items-center justify-end">
              <MapPin className="text-yellow-400 ml-2" size={24} />
              <span className="mr-2">موقعنا على الخريطة</span>
            </h6>
            <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-yellow-500/70 shadow-xl">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="الموقع الدقيق لمتجر ياسمين الشام في دمشق"
              ></iframe>
            </div>
          </div>

          {/* العمود 4: التواصل */}
          <div className="text-right">
            <h6 className="text-lg font-bold text-white mb-5 uppercase tracking-wider">تواصل معنا</h6>
            <address className="not-italic space-y-3 text-sm">
              <p className="flex items-center justify-end text-stone-400">
                <span className="ml-3 text-right">{addressDetails}</span>
                <MapPin size={20} className="text-yellow-400 flex-shrink-0" />
              </p>
              <p className="flex items-center justify-end text-stone-400">
                <span className="ml-3">info@yasmeenalsham.com</span>
                <Mail size={20} className="text-yellow-400 flex-shrink-0" />
              </p>
              <p className="flex items-center justify-end text-stone-400">
                <span className="ml-3">+ 963 11 234 5678</span>
                <Phone size={20} className="text-yellow-400 flex-shrink-0" />
              </p>
              <p className="flex items-center justify-end text-stone-400">
                <span className="ml-3">+ 963 11 234 5679</span>
                <Printer size={20} className="text-yellow-400 flex-shrink-0" />
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* القسم السفلي: الحقوق */}
      <div className="bg-stone-800 text-center py-4 text-sm border-t border-yellow-700/50">
        © {new Date().getFullYear()} حقوق النشر محفوظة لـ:
        <a
          className="font-semibold text-white hover:text-yellow-400 transition duration-300 mr-1"
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ياسمين الشام للعطور
        </a>
      </div>
    </footer>
  );
};

export default Footer;
