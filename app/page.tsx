"use client";
import { useState, useMemo } from 'react';
import productsData from '../products.json';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  sold: string;
  image: string;
  link: string;
}

const formatPrice = (price: number) => `Rp${price.toLocaleString('id-ID')}`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = productsData as Product[];
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const searchMatch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, products]);

  const handleProductClick = (product: Product) => {
    if (typeof window !== 'undefined') {
      console.log('Click:', product.name);
    }
    window.open(product.link, '_blank');
  };

  const categories = [
    { key: 'all', emoji: '🛍️', name: 'Semua', count: products.length },
    { key: 'skincare', emoji: '🧴', name: 'Skincare', count: products.filter(p => p.category === 'skincare').length },
    { key: 'fashion', emoji: '👗', name: 'Fashion', count: products.filter(p => p.category === 'fashion').length },
    { key: 'shoes', emoji: '👟', name: 'Sepatu', count: products.filter(p => p.category === 'shoes').length },
    { key: 'bag', emoji: '👜', name: 'Tas', count: products.filter(p => p.category === 'bag').length },
    { key: 'accessories', emoji: '💍', name: 'Aksesoris', count: products.filter(p => p.category === 'accessories').length },
    { key: 'food', emoji: '🍜', name: 'Food', count: products.filter(p => p.category === 'food').length },
    { key: 'gadget', emoji: '📱', name: 'Gadget', count: products.filter(p => p.category === 'gadget').length },
    { key: 'home', emoji: '🏠', name: 'Home', count: products.filter(p => p.category === 'home').length },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🛒</span>
              <h1 className="text-2xl font-bold">Racun Shopee</h1>
              <span className="text-xs bg-white text-orange-500 px-2 py-1 rounded-full font-bold">VIRAL</span>
            </div>
            <div className="w-full sm:w-auto flex gap-2">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 sm:w-64 px-4 py-2 rounded-full text-gray-800 outline-none"
              />
              <button className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold">🔍</button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-yellow-400 text-orange-900 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4 font-bold">🔥 PROMO KILAT! Diskon up to 50% — Klik produk favoritmu! 🔥</span>
          <span className="mx-4 font-bold">💯 100% Original — Affiliate Partner Shopee</span>
          <span className="mx-4 font-bold">🚚 Gratis Ongkir Seluruh Indonesia</span>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-orange-500">{products.length}+</div>
            <div className="text-xs text-gray-600">Produk Pilihan</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-orange-500">8</div>
            <div className="text-xs text-gray-600">Kategori</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-orange-500">⭐ 4.8</div>
            <div className="text-xs text-gray-600">Rating Avg</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <h2 className="text-lg font-bold mb-3 text-gray-800">Kategori</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.key
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              {cat.emoji} {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 relative flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{product.discount}%
                  </span>
                )}
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded uppercase">
                  {product.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1 min-h-[2.5rem]">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-orange-500 font-bold">{formatPrice(product.price)}</span>
                  {product.discount > 0 && (
                    <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>⭐ {product.rating}</span>
                  <span>Terjual {product.sold}</span>
                </div>
                <button className="w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-xs font-bold hover:opacity-90">
                  🛒 Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl">🔍</span>
            <p className="text-gray-500 mt-4">Produk tidak ditemukan</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">🛒 Racun Shopee</h3>
          <p className="text-sm text-gray-400 mb-4">Pilihan produk viral & berkualitas dari Shopee</p>
          <p className="text-xs text-gray-500">
            ✅ Affiliate Partner Shopee • 💯 100% Original • 🚚 Gratis Ongkir
          </p>
          <p className="text-xs text-gray-600 mt-4">© 2026 Racun Shopee. Powered by IG @rezero_43</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: inline-block;
        }
      `}</style>
    </main>
  );
}
