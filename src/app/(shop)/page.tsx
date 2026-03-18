'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';

import catCoir       from '../../images/1.jpg';
import catSpring      from '../../images/2.webp';
import catEuroTop     from '../../images/3.jpg';
import catFoam        from '../../images/4.webp';
import catLatex       from '../../images/5.jpg';
import catMemoryFoam  from '../../images/ab.webp';

import slide11 from '../../images/11.png';
import slide12 from '../../images/12.png';
import slide13 from '../../images/13.png';
import slide14 from '../../images/14.png';

/* ─────────────────────────── DATA ─────────────────────────── */

const categories = [
  { name: 'Coir',          slug: 'coir-mattress',         image: catCoir      },
  { name: 'Bonnell Spring',slug: 'spring-mattress',        image: catSpring    },
  { name: 'Euro Top',      slug: 'euro-top-mattress',      image: catEuroTop   },
  { name: 'Foam',          slug: 'foam-mattress',          image: catFoam      },
  { name: 'Latex Foam',    slug: 'latex-foam-mattress',    image: catLatex     },
  { name: 'Memory Foam',   slug: 'memory-foam-mattress',   image: catMemoryFoam},
];

const heroFeatures = [
  { icon: '🏅', title: 'Ergonomic Alignment', desc: 'A perfect balance of soft, firm, and cosy.' },
  { icon: '❄️', title: 'So Cool', desc: 'Cooling gel that will keep you comfy sleeping.' },
  { icon: '🔬', title: 'Pillow Labs', desc: 'Developed by delivery engineers & researchers.' },
  { icon: '✅', title: '10-Year Warranty', desc: 'Designed to consistently improve & transitions.' },
];

const compareRows = [
  { feature: 'Primary Material', orthoPro: 'High Density Foam', cloudLuxe: 'Memory Foam', hybridDuo: 'Latex + Springs' },
  { feature: 'Firmness Level', orthoPro: 'Firm (8/10)', cloudLuxe: 'Soft (4/10)', hybridDuo: 'Medium (6/10)' },
  { feature: 'Ideal For', orthoPro: 'Back Pain Sufferers', cloudLuxe: 'Side Sleepers', hybridDuo: 'Active Lifestyles' },
  { feature: 'Warranty', orthoPro: '10 Years', cloudLuxe: '10 Years', hybridDuo: '12 Years', bold: true },
  { feature: 'Pricing', orthoPro: '₹12,999', cloudLuxe: '₹15,499', hybridDuo: '₹19,999', bold: true },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    label: 'Verified Buyer • 2 months ago',
    rating: 5,
    text: '"The Ortho mattress is a life-changer. My chronic back pain disappeared within a week. Best investment for my health!"',
    initials: 'PS',
    color: 'from-[#092f75] to-[#092f75]',
  },
  {
    name: 'Rahul Mehta',
    label: 'Verified Buyer • 2 months ago',
    rating: 5,
    text: '"Ordering was seamless and delivery happened on time. The factory-direct price is unbeatable for this quality."',
    initials: 'RM',
    color: 'from-[#092f75] to-[#092f75]',
  },
  {
    name: 'Ananya Gupta',
    label: 'Verified Buyer • 2 months ago',
    rating: 5,
    text: '"Love the edge support. It feels very premium and hotel-like. The 100-night trial gave me the confidence to buy."',
    initials: 'AG',
    color: 'from-[#092f75] to-[#092f75]',
  },
  {
    name: 'Karthik Reddy',
    label: 'Verified Buyer • 3 months ago',
    rating: 5,
    text: '"Excellent quality and super fast delivery. The mattress feels exactly like a luxury hotel bed. Very happy!"',
    initials: 'KR',
    color: 'from-[#092f75] to-[#092f75]',
  },
  {
    name: 'Meena Iyer',
    label: 'Verified Buyer • 1 month ago',
    rating: 5,
    text: '"The memory foam contours perfectly to my body. I haven\'t slept this well in years. Worth every rupee!"',
    initials: 'MI',
    color: 'from-[#092f75] to-[#092f75]',
  },
];

const faqs = [
  {
    q: 'Which firmness level should I choose?',
    a: 'If you sleep on your back or stomach, a firm mattress (7-8/10) provides better spinal alignment. Side sleepers benefit from a medium-soft option (4-5/10) that cushions the shoulders and hips. If you share the bed or switch positions, a medium (6/10) is a safe all-rounder.',
  },
  {
    q: 'What is the benefit of a Hybrid Mattress?',
    a: 'Hybrid mattresses combine the bounce and support of springs with the pressure relief of foam or latex. You get the best of both worlds — motion isolation, cooling airflow from the coil system, and contouring comfort from the foam layers. Ideal for active lifestyles and couples.',
  },
  {
    q: 'Is a 100-night trial really risk-free?',
    a: 'Yes. If you are not completely satisfied within 100 nights of sleeping on your new mattress, we will arrange a free pickup and issue a full refund — no questions asked. We are confident in our quality and want you to be too.',
  },
];

const SLIDE_BADGES = [
  { badge1: 'Memory Foam',    badge2: 'Deep Sleep',    star: true,  fallback: slide11 },
  { badge1: 'Spring Support', badge2: 'Ortho Care',    star: false, fallback: slide12 },
  { badge1: 'Natural Latex',  badge2: 'Eco Friendly',  star: true,  fallback: slide13 },
  { badge1: 'Euro Top',       badge2: 'Hotel Feel',    star: false, fallback: slide14 },
];

const sixFeatures = [
  { icon: '💨', title: 'Zero-Heat Tech', desc: 'Advanced open-cell structure ensures continuous airflow for sweat-free nights.' },
  { icon: '✨', title: 'Hypoallergenic', desc: 'Certified fabric treatment that repels dust mites and allergens effectively.' },
  { icon: '✔️', title: 'ISO Certified Quality', desc: 'Rigorous testing cycles that simulate 20 years of real-world mattress usage.' },
  { icon: '🚚', title: 'Direct From Factory', desc: 'Eliminating retailers means you get the best materials at honest prices.' },
  { icon: '🛡️', title: 'No Motion Transfer', desc: 'Move without waking your partner, thanks to isolated pocket spring technology.' },
  { icon: '🏅', title: 'Best For Back Health', desc: 'Multi-zone support designed with orthopedists for spine alignment.' },
];

/* ─────────────────────────── HERO SLIDER ─────────────────────────── */

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = SLIDE_BADGES.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % total), 3500);
    return () => clearInterval(timer);
  }, [total]);

  const slide = SLIDE_BADGES[current];

  return (
    <div className="relative rounded-3xl overflow-hidden  aspect-[5/4]">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.fallback}
            alt={slide.badge1}
            fill
            className="object-cover"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" /> */}

      {/* Star badge top-left */}
      {slide.star && (
        <div className="absolute top-5 left-5 bg-yellow-400 text-yellow-900 rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-md">
          ★
        </div>
      )}

      {/* Bottom-left badge */}
      <div className="absolute bottom-12 left-5">
        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-md">
          {slide.badge2}
        </span>
      </div>

      {/* Bottom-right badge */}
      <div className="absolute bottom-12 right-5">
        <span className="bg-[#092f75] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
          {slide.badge1}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDE_BADGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'bg-white w-5 h-2.5' : 'bg-white/50 w-2.5 h-2.5'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── FAQ ITEM ─────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-6 px-1">
        <span className="font-semibold text-[#1a1a2e] text-lg">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-base leading-relaxed pb-6 px-1">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── TESTIMONIAL SLIDER ─────────────────────────── */

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const total = testimonials.length;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, total - slidesPerView);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const gap = 24; // px, matches gap-6

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: `calc(-${current} * ((100% + ${gap}px) / ${slidesPerView}))` }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: `calc((100% - ${gap * (slidesPerView - 1)}px) / ${slidesPerView})` }}
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm h-full flex flex-col">
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-base bg-gradient-to-br ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a2e] text-base">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.label}</p>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-base leading-relaxed italic flex-1">{t.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Nav controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#1a2a6c] hover:text-[#1a2a6c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-[#1a2a6c]' : 'w-2.5 bg-gray-300'}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current >= maxIndex}
          className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#1a2a6c] hover:text-[#1a2a6c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">

      {/* ───── HERO ───── */}
      <section className="relative bg-[#f0f0f0] overflow-hidden">
        {/* Large decorative circle behind the slider */}
        <div
          className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[44vw] h-[44vw] max-w-[500px] max-h-[500px] rounded-full bg-rose-100/60 pointer-events-none hidden lg:block"
          style={{ zIndex: 0 }}
        />
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 1 }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[100px]">
            <path fill="#ffffff" d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,70 L0,70 Z"/>
          </svg>
        </div>

        <div className="relative w-full px-6 lg:px-16 py-16 lg:py-20 max-w-screen-2xl mx-auto" style={{ zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="bg-rose-100 text-rose-600 px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                  Factory Direct: Save Up to 45%
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#1a1a2e] leading-[1.05] mb-6"
              >
                Sleep Better.<br />
                Live Better.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-gray-600 text-base sm:text-lg md:text-xl mb-10 max-w-lg"
              >
                Experience hotel-grade luxury without the middleman markup. Engineered in India for optimal spinal alignment and cooling airflow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link href="/products">
                  <button className="bg-[#1a2a6c] hover:bg-[#0f1d56] text-white font-semibold px-9 py-4 rounded-lg text-base transition-colors duration-200">
                    Shop Now
                  </button>
                </Link>
                <Link href="/products">
                  <button className="border-2 border-gray-300 text-[#1a1a2e] hover:bg-gray-50 font-semibold px-9 py-4 rounded-lg text-base transition-colors duration-200">
                    Compare Mattresses
                  </button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap gap-8"
              >
                {[
                  { icon: '🛡️', label: '10-Year Warranty' },
                  { icon: '🚚', label: 'Free Shipping' },
                  { icon: '✅', label: 'ISO Certified' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-gray-600 text-base font-medium">
                    <span className="text-lg">{b.icon}</span>
                    <span>{b.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — hero image slider */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <HeroSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── HERO FEATURE STRIP ───── */}
      <section className=" bg-white">
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 ">
           
            {heroFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center py-10 px-6 gap-3"
              >
          
                <span className="text-4xl mb-1">{f.icon}</span>
                <p className="font-bold text-[#1a1a2e] text-base">{f.title}</p>
                <p className="text-sm text-gray-500 leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── EXPLORE CATEGORIES ───── */}
      <section className="py-16 bg-white">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">Explore Categories</h2>
              <Link href="/products" className="text-gray-500 text-base font-medium flex items-center gap-1 hover:text-[#1a2a6c] transition-colors">
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link href={`/products?category=${cat.slug}`}>
                  <div className="group flex flex-col items-center gap-3 cursor-pointer">
                    <div className="relative w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 33vw, 16vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#1a1a2e] text-center group-hover:text-[#1a2a6c]">{cat.name}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── FIND YOUR PERFECT MATCH ───── */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <AnimatedSection className="mb-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Bestsellers</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">Find Your Perfect Match</h2>
                <p className="text-gray-500 text-lg mt-2">Every sleeper is different. Discover the collection tailored to your specific comfort needs.</p>
              </div>
              <Link href="/products" className="flex-shrink-0">
                <button className="flex items-center gap-2 bg-[#1a2a6c] hover:bg-[#0f1d56] text-white font-semibold px-7 py-3 rounded-lg text-sm transition-colors">
                  View More <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </AnimatedSection>
          <FeaturedProducts />
        </div>
      </section>

      {/* ───── FESTIVE SALE BANNER ───── */}
      <section className="py-12 bg-white">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-center">
              {/* Full background image */}
              <Image
                src={catLatex}
                alt="Festive Sale"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              {/* Dark overlay so text is readable */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 px-12 py-12 w-full md:w-1/2">
                <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-2">Festive Sale</h2>
                <p className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
                  Up to <span className="font-extrabold text-yellow-300">50% OFF</span>
                </p>
                <Link href="/products">
                  <button className="bg-white hover:bg-gray-100 text-[#1a2a6c] font-semibold px-9 py-3.5 rounded-full text-base transition-colors shadow-md">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───── 6 FEATURE CARDS ───── */}
      <section className="py-16 bg-white">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sixFeatures.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-2xl group-hover:bg-blue-50 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a2e] text-base mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── HOW DO WE COMPARE? ───── */}
      {/* <section className="py-20 bg-[#edf1f7]">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4">How Do We Compare?</h2>
            <p className="text-gray-500 text-lg">Detailed transparency to help you make an informed decision.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm  mx-auto">
             
              <div className="grid grid-cols-4 border-b border-gray-100">
                <div className="py-6 px-8 font-bold text-[#1a1a2e] text-base">Features</div>
                <div className="py-6 px-8 font-bold text-[#1a2a6c] text-base border-l border-gray-100">Ortho Pro</div>
                <div className="py-6 px-8 font-bold text-[#1a1a2e] text-base border-l border-gray-100">Cloud Luxe</div>
                <div className="py-6 px-8 font-bold text-[#1a1a2e] text-base border-l border-gray-100">Hybrid Duo</div>
              </div>
              {compareRows.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-4 border-b border-gray-50 last:border-b-0 ${i % 2 !== 0 ? 'bg-gray-50/40' : ''}`}>
                  <div className="py-6 px-8 text-[#1a1a2e] text-base">{row.feature}</div>
                  <div className={`py-6 px-8 text-base border-l border-gray-100 ${row.bold ? 'font-bold text-[#1a1a2e]' : 'text-gray-600'}`}>{row.orthoPro}</div>
                  <div className={`py-6 px-8 text-base border-l border-gray-100 ${row.bold ? 'font-bold text-[#1a1a2e]' : 'text-gray-600'}`}>{row.cloudLuxe}</div>
                  <div className={`py-6 px-8 text-base border-l border-gray-100 ${row.bold ? 'font-bold text-[#1a1a2e]' : 'text-gray-600'}`}>{row.hybridDuo}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section> */}

      {/* ───── LOVED BY 100,000+ SLEEPERS — SLIDER ───── */}
      <section className="py-20  bg-[#edf1f7]">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4">
              Loved by 100,000+ Sleepers
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gray-300" />
              ))}
            </div>
            <p className="text-gray-500 text-base">Rated 4.9/5 Based on Verified Purchase Reviews</p>
          </AnimatedSection>

          <AnimatedSection>
            <TestimonialSlider />
          </AnimatedSection>
        </div>
      </section>

      {/* ───── THE MATTRESS BUYING GUIDE (FAQ) ───── */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4">The Mattress Buying Guide</h2>
            <p className="text-gray-500 text-lg">Not sure which one to pick? We've got you covered.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden px-8 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───── NEWSLETTER / CTA ───── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="w-full px-6 lg:px-16 max-w-screen-2xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Stay Updated</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4">
              Discover the Newest Mattress Styles &amp; Trends
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
              Experience the finest home furnishings. Order now for free delivery in Karur. Discover comfort that transforms your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <button className="bg-[#1a2a6c] hover:bg-[#0f1d56] text-white font-semibold px-10 py-4 rounded-lg text-base flex items-center gap-2 transition-colors">
                  Explore Products <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-gray-200 text-[#1a1a2e] hover:bg-gray-50 font-semibold px-10 py-4 rounded-lg text-base transition-colors">
                  Know More
                </button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───── FLOATING EXPERT ADVICE BUTTON ───── */}
      {/* <div className="fixed bottom-8 right-6 z-50">
        <Link href="/contact">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-xl text-base transition-colors">
            <Phone className="w-5 h-5" />
            Expert Advice
          </button>
        </Link>
      </div> */}

    </div>
  );
}