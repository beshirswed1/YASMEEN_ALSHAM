import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ضع هنا صورك النهائية أو استبدل روابط الصور */
const defaultProducts = [
  {
    "id": 1,
    "name": "Chanel No. 5",
    "brand": "Chanel",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXooI5Az9IdkczGN_Be4-XvxaBk3S_yhwfw&s",
    "price": "$176"
  },
  {
    "id": 2,
    "name": "Dior Sauvage",
    "brand": "Dior",
    "image": "https://statics-mp.boyner.com.tr/mnresize/900/1254/Boynerimages/5002964028_X_01.jpg?v=20004519",
    "price": "$115"
  },
  {
    "id": 3,
    "name": "Creed Aventus",
    "brand": "Creed",
    "image": "https://fimgs.net/mdimg/perfume/o.9828.jpg",
    "price": "$435"
  },
  {
    "id": 4,
    "name": "Yves Saint Laurent Black Opium",
    "brand": "Yves Saint Laurent",
    "image": "https://statics-mp.boyner.com.tr/mnresize/900/1254/Boynerimages/5000075411_X_01.jpg?v=2211792",
    "price": "$120"
  },
  {
    "id": 5,
    "name": "Guerlain Shalimar",
    "brand": "Guerlain",
    "image": "https://fimgs.net/mdimg/perfume/social.53.jpg",
    "price": "$105"
  },
  {
    "id": 6,
    "name": "Jo Malone London Peony & Blush Suede",
    "brand": "Jo Malone London",
    "image": "https://cdn.beymen.com/mnresize/505/704/productimages/yzrgb2y4.h3b_IMG_01_690251028412.jpg",
    "price": "$140"
  }
]
;

export default function Slider2({ items = defaultProducts, autoplay = true, interval = 3500 }) {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // touch coords
  const startX = useRef(0);
  const endX = useRef(0);

  // go to index (center card)
  const goToIndex = (index) => {
    if (!sliderRef.current) return;
    const cards = Array.from(sliderRef.current.children);
    const idx = Math.max(0, Math.min(index, cards.length - 1));
    const card = cards[idx];
    if (card) {
const scrollPos = card.offsetLeft - sliderRef.current.offsetLeft - (sliderRef.current.clientWidth - card.clientWidth) / 2;
sliderRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
      setCurrent(idx);
    }
  };

  const prev = () => goToIndex(current - 1);
  const next = () => goToIndex(current + 1);

  // autoplay
  useEffect(() => {
    if (!autoplay || isPaused) return;
    const id = setInterval(() => {
      setCurrent((s) => {
        const nextIdx = s + 1 >= items.length ? 0 : s + 1;
        goToIndex(nextIdx);
        return nextIdx;
      });
    }, interval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, isPaused, items.length, interval]);

  // update current on scroll
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(el.children);
        const center = el.getBoundingClientRect().left + el.clientWidth / 2;
        let closest = 0;
        let dist = Infinity;
        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const cC = r.left + r.width / 2;
          const d = Math.abs(center - cC);
          if (d < dist) { dist = d; closest = i; }
        });
        setCurrent(closest);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, items.length]);

  // touch handlers
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const dx = endX.current - startX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    startX.current = 0;
    endX.current = 0;
    setTimeout(() => setIsPaused(false), 600);
  };

  const openProduct = (id) => {
    navigate(`/products`);
  };

  return (
<section className="py-12 px-4 md:px-8 bg-[color:var(--bg-color)] transition-colors duration-500">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <header className="mb-10 text-center">
      <h2 className="text-4xl md:text-4xl font-extrabold font-cairo text-gray-900 dark:text-white">
        أشهر العطور
      </h2>
      <p className=" mt-3 text-lg md:text-base text-lime-500 dark:text-gray-300">
        اختيارات خاصة — اضغط على بطاقة لرؤية التفاصيل.
      </p>
    </header>

    {/* Slider */}
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Previous Button */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full
                   bg-white/80 dark:bg-black/50 backdrop-blur-sm shadow hover:scale-105 transform transition"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full
                   bg-white/80 dark:bg-black/50 backdrop-blur-sm shadow hover:scale-105 transform transition"
      >
        ›
      </button>

      {/* Carousel */}
      <div
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
                   pb-4 px-2 md:px-4 hide-scrollbar"
        role="list"
        aria-label="Product carousel"
      >
        {items.map((p, i) => (
          <article
            key={p.id}
            role="listitem"
            tabIndex={0}
            onClick={() => openProduct(p.id)}
            onKeyDown={(e) => (e.key === "Enter" ? openProduct(p.id) : null)}
            className="group min-w-[300px] md:min-w-[340px] lg:min-w-[380px] snap-start
                       rounded-3xl relative cursor-pointer bg-[color:var(--card-bg)]
                       dark:bg-[color:var(--card-bg)] backdrop-blur-lg
                       border border-[color:var(--card-border)]
                       shadow-md hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02]
                       transition-all duration-500 overflow-hidden"
            style={{
              animation: `slideIn 0.9s ease-out forwards`,
              animationDelay: `${i * 100}ms`,
              opacity: 0,
            }}
          >
            <div className="relative">
              {/* Image */}
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 font-cairo">
                  {p.name}
                </h3>
                <p className="text-sm text-lime-300 dark:text-gray-300 mb-3 line-clamp-2">
                  {p.brand || ""}
                </p>

                <div className="flex items-center justify-between mt-2">

                  <span className="text-sm font-bold text-indigo-50 dark:text-[color:var(--accent)]">
                    {p.price || ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500
                            bg-gradient-to-tr from-indigo-400/10 to-lime-200/10 blur-xl" />
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              current === idx
                ? "bg-indigo-600 dark:bg-[color:var(--accent)] scale-110"
                : "bg-gray-300 dark:bg-neutral-600"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Keyframes + hide scrollbar */}
    <style>{`
      @keyframes slideIn {
        0% { transform: translateX(-30px) scale(0.995); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </div>
</section>

  );
}
