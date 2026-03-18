'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ShieldCheck, Truck, Headphones, BadgePercent,
  ArrowRight, Users, Package, Clock, MapPin,
  ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle2, Star, Award, Zap, Factory, Ban, Home,
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import bg from "../../../images/bg.jpg"
import about from "../../../images/ab.webp"

/* ════════════════════════ DATA ════════════════════════ */

const stats = [
  { value: 1078, suffix: '+', label: 'Happy Customers', icon: Users },
  { value: 81,   suffix: '+', label: 'Products',        icon: Package },
  { value: 5,    suffix: '+', label: 'Years in Service',icon: Clock },
  { value: 0,    isText: true, displayText: 'Pan India', suffix: '', label: 'Delivery', icon: MapPin },
];

const missionAccordion = [
  {
    id: 'quality',
    title: 'QUALITY',
    icon: ShieldCheck,
    content: 'Produce quality mattresses in factory and sell them directly to consumers, eliminating the middleman and providing real value. Our quality control process ensures every mattress meets the highest standards before it leaves our factory.',
  },
  {
    id: 'courteous',
    title: 'COURTEOUS',
    icon: Headphones,
    content: 'Be courteous to our customers and educating them about the product they are buying. We believe an informed customer is a happy customer — we take the time to explain materials, benefits, and options clearly.',
  },
  {
    id: 'winwin',
    title: 'WIN-WIN',
    icon: Award,
    content: 'Always strive for the win-win solution in dealings with customers, fellow employees and suppliers. This means you can take your time, shop around, compare our brand feature for feature, and make an informed buying decision with complete confidence.',
  },
];

const beliefSlides = [
  {
    icon: '🏆',
    title: 'Total Client Satisfaction',
    subtitle: 'Quality, and Price – Our first priority',
    desc: 'Everything we do starts and ends with the customer. From design to delivery, your satisfaction drives every decision we make.',
  },
  {
    icon: '💎',
    title: 'Uncompromising Quality',
    subtitle: 'COMFORT, VALUES, and PRICES',
    desc: 'Mattress Factory Products is a promise in QUALITY, COMFORT, VALUES, and PRICES. Built right, built to last.',
  },
  {
    icon: '🤝',
    title: 'Best Purchase Guarantee',
    subtitle: 'For your home, hotel, and budget',
    desc: 'If you choose to buy from us, you can rest assured that you have made the best purchase for your home, for your guest, and for your budget.',
  },
  {
    icon: '🌱',
    title: 'Integrity & Excellence',
    subtitle: 'Established principles, modern execution',
    desc: 'Our principles continually guide our employees to strive for excellence, act with integrity and produce products of value built right and built to last.',
  },
];

const differenceItems = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    desc: 'Pure materials with rigorous quality control ensuring lasting comfort for years. Every mattress passes our 21-point inspection.',
  },
  {
    icon: BadgePercent,
    title: 'Fair Pricing',
    desc: 'Factory-direct prices without middlemen. Maximum value guaranteed — you pay for the mattress, not the markup.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    desc: 'Our sleep experts are available to guide your perfect mattress choice. We educate, not pressure.',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    desc: 'Free delivery, easy returns, and hassle-free setup at your doorstep. Pan India shipping with zero extra charge.',
  },
];

const middlemanSteps = [
  { icon: Factory, step: '01', title: 'We Manufacture', desc: 'Every mattress produced in our own factories in Karur with strict quality checks at every stage.' },
  { icon: Ban,     step: '02', title: 'No Middleman',   desc: 'We skip the retailer entirely, saving you the double mark-up that traditional stores charge.' },
  { icon: Home,    step: '03', title: 'Direct to You',  desc: 'Premium mattresses delivered straight to your door at the lowest possible factory price.' },
];

/* ════════════════════════ ANIMATED COUNTER ════════════════════════ */

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let n = 0;
        const step = Math.ceil(value / 60);
        const t = setInterval(() => {
          n += step;
          if (n >= value) { setCount(value); clearInterval(t); } else setCount(n);
        }, 24);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ════════════════════════ ACCORDION ════════════════════════ */

function AccordionItem({
  item, isOpen, onClick,
}: {
  item: typeof missionAccordion[0];
  isOpen: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      layout
      className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
        isOpen ? ' shadow-lg shadow-blue-100' : 'border-gray-100 hover:border-blue-200'
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-7 py-5 transition-colors ${isOpen ? 'bg-[#0c2461]' : 'bg-white hover:bg-gray-50'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-white/20' : 'bg-[#eff6ff]'}`}>
            <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#1d4ed8]'}`} />
          </div>
          <span className={`font-extrabold text-base tracking-widest uppercase ${isOpen ? 'text-white' : 'text-[#0c2461]'}`}>
            {item.title}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-gray-400'}`} />
        </motion.div>
      </div>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-7 py-6 bg-[#f0f7ff] border-t border-[#092f75]">
              <p className="text-gray-700 text-base leading-relaxed">{item.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════ BELIEF SLIDER ════════════════════════ */

function BeliefSlider() {
  const [current, setCurrent] = useState(0);
  const total = beliefSlides.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 4000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Track */}
      <div className="relative h-64 sm:h-56">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-br from-[#0c2461] to-[#1d4ed8] rounded-3xl p-6 sm:p-10 flex items-center gap-5 sm:gap-8"
          >
            <div className="text-6xl flex-shrink-0">{beliefSlides[current].icon}</div>
            <div>
              <p className="text-[#f0f0f0] text-sm font-bold uppercase tracking-widest mb-1">{beliefSlides[current].subtitle}</p>
              <h3 className="text-white font-extrabold text-2xl mb-3">{beliefSlides[current].title}</h3>
              <p className="text-blue-100 text-base leading-relaxed">{beliefSlides[current].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {beliefSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#092f75]/50' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════ PAGE ════════════════════════ */

export default function AboutPage() {
  const [openAccordion, setOpenAccordion] = useState<string>('quality');

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden min-h-[480px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src={bg} alt="about background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0c2461]/30" />
        </div>
        {/* Glows */}
        {/* <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#092f75]/50 rounded-full blur-3xl pointer-events-none" /> */}

        <div className="relative z-10 w-full px-6 lg:px-20 py-28 max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 bg-white/10 border border-white/20 rounded-full px-5 py-2"
              >
                {/* <span className="w-2 h-2 rounded-full bg-[#092f75]/50 animate-pulse" /> */}
                <span className="text-[#f0f0f0] text-sm font-semibold tracking-widest uppercase">About Us</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-6"
              >
                A Brand Built on<br />
                <span className="text-[#092f75] bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                  Comfort &amp; Trust
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#f0f0f0] text-xl leading-relaxed"
              >
                Learn what makes MATTRESS FACTORY different and how our passion and vision guide every product we create.
              </motion.p>
            </div>

            {/* Right side numbers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 flex-shrink-0 w-full lg:w-auto"
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-[#f0f0f0] mx-auto mb-2" />
                    <div className="text-3xl font-extrabold text-white mb-1">
                      {s.isText ? s.displayText : <AnimatedCounter value={s.value} suffix={s.suffix} />}
                    </div>
                    <p className="text-[#f0f0f0] text-xs font-medium">{s.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ OUR STORY ═══════ */}
      <section className="py-28 bg-white">
        <div className="w-full px-6 lg:px-20 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <AnimatedSection direction="right">
              <div className="relative">
                {/* Main image block */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                style={{backgroundImage: `url(${about.src})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                  <img
                    src="/images/about-factory.jpg"
                    alt="Our Factory"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <Image src={about} alt="about" />
                  </div> */}
                </div>
                {/* Floating badge top-left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-6 -left-6 bg-[#0c2461] text-white rounded-2xl px-6 py-4 shadow-2xl"
                >
                  <p className="text-3xl font-extrabold">5+</p>
                  <p className="text-[#f0f0f0] text-xs font-semibold">Years of Trust</p>
                </motion.div>
                {/* Floating badge bottom-right */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-[#f0f0f0] text-white rounded-2xl px-6 py-4 shadow-xl"
                >
                  <p className="text-2xl font-extrabold text-black">1078+</p>
                  <p className="text-black text-xs font-semibold">Happy Customers</p>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-0.5 bg-[#092f75]/50" />
                  <p className="text-[#1d4ed8] text-sm font-bold uppercase tracking-widest">Our Story</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2461] leading-tight mb-8">
                  Premium Mattress <br />Manufacturing </h2>
                <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                  <p>
                   At our mattress factory, we focus on crafting high-quality mattresses designed for comfort, durability, and healthy sleep.
                    Using advanced manufacturing techniques and carefully selected materials, every mattress is built to support the body and improve sleep quality. 
                

                  </p>
                  <p>
                  Our commitment to precision and quality ensures that each product meets the highest standards.

Our production process combines modern technology with skilled craftsmanship. 
                    
                  </p>
                  <p>From foam cutting and spring assembly to stitching and finishing, every stage is handled with strict quality control.
 This allows us to create mattresses that provide excellent support, pressure relief, and long-lasting performance for different sleeping preferences.</p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 mt-8 bg-[#0c2461] hover:bg-[#092f75]/50 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base"
                >
                  Explore Products <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════ MISSION — ACCORDION ═══════ */}
      <section className="py-28 bg-[#f8faff]">
        <div className="w-full px-6 lg:px-20 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left sticky */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <AnimatedSection direction="right">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-0.5 bg-[#092f75]/50" />
                  <p className="text-[#1d4ed8] text-sm font-bold uppercase tracking-widest">Our Purpose</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2461] leading-tight mb-6">
                  Mission<br />Statement
                </h2>
                <div className="w-16 h-1.5 bg-[#092f75]/50 rounded-full mb-7" />
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  At Mattress Factory, our mission is simple:{' '}
                  <span className="font-bold text-[#0c2461] italic">"Providing luxury mattress at a budget price"</span>
                </p>
                {/* Highlight quote box */}
                <div className="bg-[#0c2461] rounded-2xl p-7 border-l-4 border-blue-400">
                  <p className="text-blue-100 text-base leading-relaxed italic">
                    "You can take your time and shop around without worry. Compare our brand to national brands, feature for feature, and make an informed buying decision with complete confidence."
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right accordion */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left" delay={0.1}>
                <div className="space-y-4">
                  {missionAccordion.map((item) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isOpen={openAccordion === item.id}
                      onClick={() => setOpenAccordion(openAccordion === item.id ? '' : item.id)}
                    />
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PHILOSOPHY — BELIEF SLIDER ═══════ */}
      <section className="py-28 bg-white">
        <div className="w-full px-6 lg:px-20 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <AnimatedSection direction="right">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-0.5 bg-[#092f75]/50" />
                  <p className="text-[#1d4ed8] text-sm font-bold uppercase tracking-widest">Core Values</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2461] leading-tight mb-6">Philosophy</h2>
                <div className="w-16 h-1.5 bg-[#092f75]/50 rounded-full mb-7" />
                <p className="text-gray-600 text-lg leading-relaxed mb-3">
                  <strong className="text-[#0c2461]">Nice of you to drop by!</strong>
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-3">
                  Our philosophy is very much simple,
                </p>
                <p className="text-[#0c2461] text-lg font-semibold leading-relaxed mb-6 bg-[#eff6ff] rounded-xl px-6 py-4 border border-blue-100">
                  "Uncompromising quality in everything we do and provide you the product at the{' '}
                  <span className="text-[#1d4ed8] font-extrabold">lowest competitive prices</span>"
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Established 25 years ago, the principles on which our company is based serve to continually guide our employees to strive for excellence, act with integrity and produce products that are built right and built to last.
                </p>
              </div>
            </AnimatedSection>

            {/* Right slider */}
            <AnimatedSection direction="left" delay={0.15}>
              <div>
                <p className="text-[#1d4ed8] font-bold text-base uppercase tracking-widest mb-6">What We Believe In……</p>
                <BeliefSlider />
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ═══════ ELIMINATING THE MIDDLEMAN ═══════ */}
      <section className="py-28 relative overflow-hidden bg-[#0c2461]">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-blue-800/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-20 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <AnimatedSection direction="right">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5 bg-[#092f75]/50" />
                <p className="text-[#f3f4f7] text-sm font-bold uppercase tracking-widest">Our Advantage</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Best Online Mattress —{' '}
                <span className="text-[#f0f0f0]">Eliminating<br />The Middleman</span>
              </h2>
              <div className="w-16 h-1.5 bg-[#092f75]/50 rounded-full" />
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.15}>
              <div className="space-y-5 text-blue-100 text-lg leading-relaxed">
                <p>
                  Did you know that when you buy a mattress from a retail store, that mattress is being <strong className="text-white">sold for the second time?</strong>
                </p>
                <p>
                  The factory sells to a retailer, who in turn sells it to you — with costs and mark-ups at both stages.
                </p>
                <p>
                  At Mattress Factory, we eliminate the middleman and only sell our mattresses once. We manufacture all products in our own local factories and sell them direct — no extra step, no extra mark-up. <strong className="text-white">Same great quality at a great low price.</strong>
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* 3 Step cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {middlemanSteps.map((item, i) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/15 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center mb-5 group-hover:bg-[#092f75]/50 transition-colors">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[#f0f0f0] text-xs font-bold uppercase tracking-widest">Step {item.step}</span>
                    <h3 className="text-white font-extrabold text-xl mt-2 mb-3">{item.title}</h3>
                    <p className="text-[#f0f0f0] text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ MISSION & VISION ═══════ */}
      <section className="py-28 bg-[#f8faff]">
        <div className="w-full px-6 lg:px-20 max-w-screen-2xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-5">
              <div className="w-10 h-0.5 bg-[#092f75]/50" />
              <p className="text-[#1d4ed8] text-sm font-bold uppercase tracking-widest">Direction</p>
              <div className="w-10 h-0.5 bg-[#092f75]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2461] mb-4">Mission &amp; Vision</h2>
            <div className="w-16 h-1.5 bg-[#092f75]/50 rounded-full mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                label: 'Our Mission',
                icon: Award,
                accent: '#1d4ed8',
                text: 'To continuously craft comfortable and premium-value mattresses for every household. We envision making durable, innovative and eco-friendly sleep solutions accessible to all, while maintaining our heritage of craftsmanship.',
                bg: 'from-[#0c2461] to-[#1d4ed8]',
              },
              {
                label: 'Our Vision',
                icon: Zap,
                accent: '#60a5fa',
                text: "To be India's most trusted home furnishings brand, renowned for blending quality, innovation, and customer comfort. Each product is a step toward making premium sleep accessible to every family.",
                bg: 'from-[#1d4ed8] to-[#3b82f6]',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border-2 border-gray-100 rounded-3xl p-10 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#1d4ed8]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0c2461] mb-5">{card.label}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{card.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT MAKES US DIFFERENT ═══════ */}
      <section className="py-28 bg-white">
        <div className="w-full px-6 lg:px-20 max-w-screen-2xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-5">
              <div className="w-10 h-0.5 bg-[#092f75]/50" />
              <p className="text-[#1d4ed8] text-sm font-bold uppercase tracking-widest">Why Choose Us</p>
              <div className="w-10 h-0.5 bg-[#092f75]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2461] mb-4">What Makes Us Different</h2>
            <div className="w-16 h-1.5 bg-[#092f75]/50 rounded-full mx-auto mb-5" />
            <p className="text-gray-500 text-xl max-w-xl mx-auto">Thoughtfully made home essentials that balance quality, comfort, and value.</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differenceItems.map((f, i) => {
              const Icon = f.icon;
              return (
                <StaggerItem key={f.title}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(29,78,216,0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-[#092f75] bg-white transition-all duration-300 cursor-default"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#eff6ff] flex items-center justify-center group-hover:bg-[#0c2461] transition-colors duration-300">
                      <Icon className="w-9 h-9 text-[#1d4ed8] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0c2461] mb-3">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      {/* <section className="py-28 bg-gradient-to-br from-[#0c2461] via-[#1d4ed8] to-[#2563eb] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#092f75]/50/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-20 max-w-screen-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              Ready to Transform<br />Your Sleep?
            </h2>
            <p className="text-blue-200 text-xl mb-12 max-w-xl mx-auto">
              Explore our complete range of premium mattresses. Order now for free delivery across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-[#0c2461] font-extrabold px-12 py-5 rounded-xl text-lg shadow-2xl hover:shadow-blue-300/40 transition-shadow"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0c2461] font-extrabold px-12 py-5 rounded-xl text-lg transition-all"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section> */}

    </div>
  );
}