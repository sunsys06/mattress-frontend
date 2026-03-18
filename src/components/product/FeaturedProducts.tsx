'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { productApi } from '@/lib/api/client';

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        const productList = response.data?.products || response.data || response;
        const mapped = productList.map((p: any) => {
          const variants = (p.variants || []).filter((v: any) => v.isActive !== false);
          const sorted = [...variants].sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
          const lowestVariant = sorted[0];
          const basePrice = parseFloat(lowestVariant?.price) || parseFloat(p.basePrice) || 0;
          const discountPrice = parseFloat(lowestVariant?.salePrice) || parseFloat(p.discountPrice) || basePrice;
          const discountPercent = basePrice > discountPrice
            ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
            : (p.discountPercent || 0);
          const category = p.categories?.[0]?.category?.name || p.category || 'Mattress';
          return { ...p, category, basePrice, discountPrice, discountPercent };
        });
        setProducts(mapped);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, products.length - slidesPerView);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => (c >= maxIndex ? 0 : c + 1));
    }, 3000);
  };

  useEffect(() => {
    if (products.length > 0) startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [products.length, maxIndex]);

  const go = (dir: 'prev' | 'next') => {
    setCurrent(c => dir === 'prev' ? Math.max(0, c - 1) : Math.min(maxIndex, c + 1));
    startAuto();
  };

  const gap = 24;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Slider */}
      <div className="relative">
        {/* Prev button */}
        <button
          onClick={() => go('prev')}
          disabled={current === 0}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-[#1a2a6c] hover:text-[#1a2a6c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap: `${gap}px` }}
            animate={{ x: `calc(-${current} * ((100% + ${gap}px) / ${slidesPerView}))` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: `calc((100% - ${gap * (slidesPerView - 1)}px) / ${slidesPerView})` }}
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next button */}
        <button
          onClick={() => go('next')}
          disabled={current >= maxIndex}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-[#1a2a6c] hover:text-[#1a2a6c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators — centred */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startAuto(); }}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-[#1a2a6c]' : 'w-2.5 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
