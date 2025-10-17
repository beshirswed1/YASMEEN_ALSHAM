import Carousel from '../../Carousel/Carousel.jsx'
import React from 'react';
import Styles from './home.module.css'
import sprayVideo from '../../../assets/Spray.mp4';
import Products from "./ProductsPage.jsx"; // صفحة المنتجات
import TextType from '../../TextAnimations/TextType/TextType.jsx';
import { Link } from "react-router-dom";
import Slider1 from "../Slider.jsx";
import Slider2 from "../Slider-2.jsx"
import Testimonials from "../Testimonials.jsx"
import Footer from "../footer.jsx"







export default function Home() {
return(
<div className='' style={{marginTop:'100px'}}>

    <section className={Styles.sectionReset}> {/* امسح أي بوردر قديم للـ section */}
      <div className={Styles.box}>
        <video
          className={Styles.bgVideo}
          src={sprayVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/spray-poster.jpg" /* اختياري: صورة بوستر لوقت التحميل */
          aria-hidden="true"
        />
        <div className={Styles.overlay} />
        <div className={Styles.content}>
          <h1 className={Styles.h}>ياسمين الشام</h1>
          <h3 className={Styles.ht}>
            اجمل تاركيب العطورات من روائح ياسمين الشام العتيقه والاصيله
          </h3>
          <Link to="/Products" className={Styles.boxBtn}>
            منتجاتنا
          </Link>
        </div>
        {/* عنصر ديكور (blob) لمنح شكل مبتكر دون كسر الفيديو */}
        <div className={Styles.decor} aria-hidden="true" />
      </div>
    </section>



<div className="flex justify-center mt-16">
<TextType  className='
mt-16
text-lime-500 text-4xl md:text-5xl lg:text-6xl 
    font-extrabold 
    text-transparent 
    bg-clip-text 
    bg-gradient-to-r from-lime-400  to-sky-600 
    text-center 
    tracking-wide 
    drop-shadow-lg 
    animate-fadeIn
    transition-all 
    duration-500 
    ease-out 
    hover:scale-110 
    hover:drop-shadow-[0_0_25px_Emerald]
    hover:from-teal-400 hover:via-sky-600 hover:to-lime-400
    font-[Tajawal]'
    

  text={["افضل البكجات", "توفير اكتر", "للهدايا"]}
  typingSpeed={90}
  pauseDuration={2500}
  showCursor={true}
  cursorCharacter="..."
/></div>

<div className='flex justify-center' style={{ height: '600px', position: 'relative',  marginTop:'60px', }}>
  <Carousel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={true}
  />
</div>
<section id='Slider1'><Slider1/>
</section>
<section id='Slider2'><Slider2/>
</section>
<section id='Testimonials'><Testimonials/>
</section>
<section id='Footer'><Footer/>
</section>





</div>
);
}
