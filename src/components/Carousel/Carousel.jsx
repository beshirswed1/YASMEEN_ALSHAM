/*
	Installed from https://reactbits.dev/tailwind/
*/

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
// replace icons with your own if needed
import {
    FiSearch,
    FiShoppingCart,
    FiHeart, 
    FiGift, 
    FiStar

} from "react-icons/fi";

const DEFAULT_ITEMS = [
  {
    title: "Text Animations",
    image: "https://cdn.salla.sa/NVYXa/74d9ecd2-1cbc-46e5-9325-66cff7a5daf8-1000x1000-5laRmssBuQx3J9Z78dUY5AWQVYAQnvsWuu0WAsK7.jpg",
    id: 1,
    icon: <FiSearch className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Animations",
    image: "https://cdn.salla.sa/QdWYyN/ce6ce1af-3a89-421a-9f0a-719e780fdb23-946x1000-hgtsZaSqrbCPdcqS8ql2jIBDohVxlqvqF4CEYQD3.png",
    id: 2,
    icon: <FiShoppingCart className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Components",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5MBocUjedCsyp0dEVIjzWJXopY3DCEaQEbVtt3D1PPFoyCmBjK3B5qRthYteTUBLHUI&usqp=CAU",
    id: 3,
    icon: <FiHeart className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Backgrounds",
    image: "https://cdn.salla.sa/QdWYyN/10404504-a2a4-4174-9a6f-ea36885bd6c7-970x1000-3DxRSmcP996tf3thsoFaGaLQJB94HCr6J8zDos9N.jpg",
    id: 4,
    icon: <FiGift className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Common UI",
    image: "https://cdn.salla.sa/gwPOv/bbafc603-ea85-48be-afed-7b1be66d14ad-1000x1000-snN9ibJmNKnFgZEZ0aoTO1aT3YIPm02wnvuNDFTI.png",
    id: 5,
    icon: <FiStar className="h-[16px] w-[16px] text-white" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
  <motion.div
    key={index}
    className={`relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing ${
      round ? "items-center justify-center text-center" : "items-start justify-between"
    }`}
    style={{
      width: itemWidth,
      height: round ? itemWidth : "100%",
      rotateY: rotateY,
      // الخلفية هنا
      backgroundImage: `url(${item.image})`,
      backgroundSize: "cover",           // تغطي المساحة بالكامل (لو بدك محافظ على الصورة كاملة استخدم 'contain')
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      ...(round && { borderRadius: "50%" }),
    }}
    transition={effectiveTransition}
  >
    {/* Overlay (لضمان قابلية القراءة على أي صورة) */}
    <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

    {/* hidden img for screen readers (accessibility) */}
    <img className="sr-only" src={item.image} alt={item.title} />


  </motion.div>
);

        })}
      </motion.div>
      <div
        className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""}`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
