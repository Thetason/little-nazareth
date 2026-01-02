"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { characters, getCharacterById } from "@/lib/characters";
import { products, categories } from "@/lib/productData";
import { storyContent } from "@/lib/storyData";
import { StorySection } from "@/components/story/StorySection";
import { ProgressBar } from "@/components/story/ProgressBar";
import { useCartStore } from "@/lib/store/cartStore";
import { ProductCard } from "@/components/products/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { AuthButton } from "@/components/auth/AuthButton";

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

// 히어로 영상 데이터
const heroVideos = [
  {
    id: "bear",
    name: "코코",
    videoUrl: "/hero-videos/coco-story1.mp4",
    character: "🐻",
    color: "#8B6F47",
    nickname: "꾸벅꾸벅 코코아 찐빵곰",
  },
  {
    id: "lion",
    name: "아리",
    videoUrl: "/hero-videos/lion-story.mp4",
    character: "🦁",
    color: "#FFA552",
    nickname: "딸꾹질쟁이 꼬마 대장",
  },
];

export default function Home() {
  // 랜덤 히어로 영상 선택 - 클라이언트 사이드에서만 실행 (hydration 에러 방지)
  const [currentHeroVideo, setCurrentHeroVideo] = useState(heroVideos[0]); // 기본값: 첫 번째 영상

  useEffect(() => {
    // 클라이언트 사이드에서만 랜덤 선택
    const randomVideo = heroVideos[Math.floor(Math.random() * heroVideos.length)];
    setCurrentHeroVideo(randomVideo);
  }, []);

  // 현재 영상의 캐릭터 데이터
  const currentCharacter = {
    id: currentHeroVideo.id,
    name: currentHeroVideo.name,
    emoji: currentHeroVideo.character,
    color: currentHeroVideo.color,
    nickname: currentHeroVideo.nickname,
  };

  const [showProductButton, setShowProductButton] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // 모바일 메뉴 상태
  const [selectedProductImages, setSelectedProductImages] = useState<string[] | null>(null); // 이미지 갤러리
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스

  // 제품 필터링 & 정렬
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // 스토리 오버레이 상태
  const [showStoryOverlay, setShowStoryOverlay] = useState(false);
  const [currentStorySection, setCurrentStorySection] = useState(0);
  const storyDragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 장바구니
  const addToCart = useCartStore((state) => state.addItem);

  const totalStorySections = storyContent.length;

  // Calculate story progress (0 to 1)
  const storyProgress = useTransform(
    storyDragX,
    [-(totalStorySections - 1) * (typeof window !== 'undefined' ? window.innerWidth : 1000), 0],
    [1, 0]
  );

  // 제품 필터링 (재고 + 카테고리 + 검색)
  const filteredProducts = products.filter((product) => {
    const isInStock = product.inStock; // 재고 있는 것만
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.koreanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isInStock && matchesCategory && matchesSearch;
  });

  // 제품 정렬
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.koreanName.localeCompare(b.koreanName);
      case 'featured':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }
  });

  // 스토리 드래그 핸들러
  const handleStoryCloudDragging = (progressValue: number) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const targetX = -progressValue * (totalStorySections - 1) * width;
    storyDragX.set(targetX);
  };

  const handleStoryCloudDragEnd = (progressValue: number) => {
    const targetSection = Math.round(progressValue * (totalStorySections - 1));
    goToStorySection(targetSection);
  };

  const handleStoryDragEnd = () => {
    const x = storyDragX.get();
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const targetSection = Math.round(-x / width);
    const clampedSection = Math.max(0, Math.min(targetSection, totalStorySections - 1));

    animate(storyDragX, -clampedSection * width, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });

    setCurrentStorySection(clampedSection);
  };

  const goToStorySection = (index: number) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    animate(storyDragX, -index * width, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
    setCurrentStorySection(index);
  };


  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#B5A4D9] via-[#FFB893] to-[#9CC5A1]">

      {/* Hero Video Section - 전체 화면 배경 */}
      <main className="relative z-10 min-h-screen">

        {/* Background Hero Video - 전체 화면 */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-200 via-orange-200 to-green-200">
          <video
            key={currentHeroVideo.id}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
            onLoadedData={(e) => {
              console.log('Video loaded:', currentHeroVideo.videoUrl);
              e.currentTarget.play().catch((err) => {
                console.error('Video play error:', err);
              });
            }}
            onError={(e) => {
              console.error('Video error:', currentHeroVideo.videoUrl);
            }}
          >
            <source src={currentHeroVideo.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Mobile Menu Button - 모바일에서만 표시 */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="text-2xl">{showMobileMenu ? '✕' : '🛒'}</span>
        </button>

        {/* Left Sidebar - Shop (투명 오버레이) */}
        <aside
          className={`
            ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            fixed left-0 top-0 h-screen z-40 w-full
            lg:w-[28%]
            overflow-y-auto
            transition-transform duration-300 ease-in-out
            lg:block
          `}
          style={{
            backgroundColor: showMobileMenu ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
            borderRight: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="p-4 lg:p-6">
            {/* Shop Header */}
            <div className="mb-6 rounded-lg px-4 py-3 flex items-center justify-between" style={{ backgroundColor: 'rgba(200, 230, 240, 0.65)', backdropFilter: 'blur(4px)' }}>
              <div>
                <h2 className="text-2xl font-light tracking-wider text-gray-900 mb-2">
                  SHOP
                </h2>
                <p className="text-xs text-gray-800">
                  Praying Pals Collection
                </p>
              </div>
              {/* 모바일 닫기 버튼 */}
              <button
                onClick={() => setShowMobileMenu(false)}
                className="lg:hidden w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Auth Section */}
            <div className="mb-6">
              <AuthButton />
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors rounded placeholder-gray-600"
                style={{
                  backgroundColor: 'rgba(200, 230, 240, 0.65)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(100,100,100,0.3)'
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6 rounded-lg px-4 py-3" style={{ backgroundColor: 'rgba(200, 230, 240, 0.65)', backdropFilter: 'blur(4px)' }}>
              <h3 className="text-xs tracking-widest font-medium text-gray-900 mb-3 uppercase">
                Category
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                    selectedCategory === 'all'
                      ? 'bg-white/40 text-gray-900 font-medium border-2 border-gray-700/60'
                      : 'text-gray-800 hover:bg-white/20'
                  }`}
                >
                  ALL
                </button>
                {Object.entries(categories).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                      selectedCategory === key
                        ? 'bg-white/40 text-gray-900 font-medium border-2 border-gray-700/60'
                        : 'text-gray-800 hover:bg-white/20'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Product Count */}
            <div className="mb-6 pb-6 rounded-lg px-4 py-3" style={{ backgroundColor: 'rgba(200, 230, 240, 0.65)', backdropFilter: 'blur(4px)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-900">
                  {sortedProducts.length} products
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs text-gray-900 px-2 py-1 focus:outline-none focus:border-gray-900 transition-colors rounded"
                  style={{
                    backgroundColor: 'rgba(200, 230, 240, 0.7)',
                    border: '1px solid rgba(100,100,100,0.4)'
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="space-y-6">
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group rounded-lg p-4 transition-all"
                  style={{ backgroundColor: 'rgba(200, 230, 240, 0.65)', backdropFilter: 'blur(4px)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(200, 230, 240, 0.75)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(200, 230, 240, 0.65)'}
                >
                  <div
                    className="aspect-square overflow-hidden mb-3 rounded-lg cursor-pointer relative"
                    style={{ backgroundColor: 'rgba(200, 230, 240, 0.7)' }}
                    onClick={() => {
                      if (product.images && product.images.length > 0) {
                        setSelectedProductImages(product.images);
                        setCurrentImageIndex(0);
                      }
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.koreanName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const char = characters.find((c) => c.id === product.characterId);
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"><span class="text-6xl">${char?.emoji || '🧸'}</span></div>`;
                        }
                      }}
                    />
                    {/* 멀티 이미지 표시 */}
                    {product.images && product.images.length > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        📷 {product.images.length}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {product.koreanName}
                    </h3>
                    <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {product.price.toLocaleString()}원
                    </p>
                    <button
                      onClick={() => {
                        addToCart(product);
                        alert(`${product.koreanName}이(가) 장바구니에 추가되었습니다!`);
                      }}
                      className="w-full mt-2 py-2 text-xs font-medium text-white bg-gray-900/80 hover:bg-gray-900 border border-gray-700 transition-colors rounded"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-16 rounded-lg" style={{ backgroundColor: 'rgba(200, 230, 240, 0.65)', backdropFilter: 'blur(4px)' }}>
                  <p className="text-sm text-gray-900">No products found</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Center Content - Logo, Video Badge, Progress Bar */}
        <div className="relative min-h-screen">
          {/* Top: Logo - 영상 위에 오버레이 */}
          <div className="absolute top-4 md:top-8 left-0 right-0 text-center animate-fade-in px-4" style={{ zIndex: 20 }}>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider mb-1"
              style={{
                color: '#8B5E3C',
                textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)',
                fontFamily: 'Georgia, serif'
              }}
            >
              Praying Pals
            </h1>
            <p className="text-xs md:text-sm text-[#8B7355] tracking-wider">
              Little Nazareth · 하늘 솜사탕 마을
            </p>
          </div>


          {/* Bottom: Cloud Progress Bar - 구름 드래그로 스토리 시작 */}
          <div className="absolute bottom-16 md:bottom-20 left-0 right-0 px-4" style={{ zIndex: 50 }}>
            {!showStoryOverlay && (
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="text-white/90 text-xs md:text-sm bg-black/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full text-center"
                >
                  ☁️ 구름을 드래그해서 이야기를 시작하세요 ☁️
                </motion.p>
                <ProgressBar
                  progress={storyProgress}
                  onDraggingCloud={(progress) => {
                    handleStoryCloudDragging(progress);
                    // 구름을 조금이라도 드래그하면 스토리 오버레이 활성화
                    if (progress > 0.05) {
                      setShowStoryOverlay(true);
                    }
                  }}
                  onDragCloud={handleStoryCloudDragEnd}
                  totalSections={totalStorySections}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 상품보러가기 버튼 - 모바일에서 위치 조정 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20"
        onMouseEnter={() => setShowProductButton(true)}
        onMouseLeave={() => setShowProductButton(false)}
      >
        <Link
          href="/products"
          className="flex items-center gap-2 md:gap-3 bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden"
          style={{
            padding: showProductButton ? '10px 20px 10px 14px' : '10px 14px',
            width: showProductButton ? 'auto' : '52px',
          }}
        >
          <span className="text-xl md:text-2xl">🛍️</span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: showProductButton ? 'auto' : 0,
              opacity: showProductButton ? 1 : 0,
            }}
            className="font-bold text-sm md:text-base whitespace-nowrap"
          >
            상품보러가기
          </motion.span>
        </Link>
      </motion.div>

      {/* 하단 네비게이션 - 브랜딩 카피 유지, 가로 스크롤 */}
      <nav className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex justify-center px-2 md:px-6 pb-3 md:pb-6">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl w-full max-w-full md:max-w-none overflow-x-auto scrollbar-hide"
          >
            <div className="flex items-center gap-3 md:gap-8 px-4 md:px-12 py-3 md:py-5 min-w-max">
              {/* Menu Item 1 */}
              <Link href="/story" className="flex items-center gap-2 md:gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-amber-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-xl md:text-3xl">🏠</span>
                </div>
                <span className="text-xs md:text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors leading-tight whitespace-nowrap">
                  리틀 나자렛에서<br className="hidden md:block" />시작하는 새로운 하루
                </span>
              </Link>

              <div className="w-px h-10 md:h-14 bg-gray-300 shrink-0" />

              {/* Menu Item 2 */}
              <Link href="/world" className="flex items-center gap-2 md:gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-xl md:text-3xl">🌍</span>
                </div>
                <span className="text-xs md:text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors whitespace-nowrap">
                  3D 월드
                </span>
              </Link>

              <div className="w-px h-10 md:h-14 bg-gray-300 shrink-0" />

              {/* Menu Item 3 */}
              <Link href="/test" className="flex items-center gap-2 md:gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-xl md:text-3xl">✨</span>
                </div>
                <span className="text-xs md:text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors leading-tight whitespace-nowrap">
                  나한테 꼭 맞는<br className="hidden md:block" />친구찾기 테스트
                </span>
              </Link>

              <div className="w-px h-10 md:h-14 bg-gray-300 shrink-0" />

              {/* Menu Item 4 */}
              <button className="flex items-center gap-2 md:gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-xl md:text-3xl">▶️</span>
                </div>
                <span className="text-xs md:text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors whitespace-nowrap">
                  영상
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Story Overlay - 구름 드래그로 스토리 시작 */}
      <AnimatePresence>
        {showStoryOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-mint-400 to-mint-500"
          >
            {/* Close button - 모바일 최적화 */}
            <button
              onClick={() => setShowStoryOverlay(false)}
              className="fixed top-4 right-4 md:top-8 md:right-8 z-[60] w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <span className="text-xl md:text-2xl">✕</span>
            </button>

            {/* Draggable Story Container */}
            <motion.div
              ref={containerRef}
              className="flex h-full cursor-grab active:cursor-grabbing"
              style={{ x: storyDragX }}
              drag="x"
              dragConstraints={{
                left: -(totalStorySections - 1) * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                right: 0,
              }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              onDragEnd={handleStoryDragEnd}
            >
              {/* Render all story sections */}
              {storyContent.map((section, index) => (
                <div key={section.id} className="flex-shrink-0 w-screen h-screen">
                  <StorySection section={section} index={index} />
                </div>
              ))}
            </motion.div>

            {/* Progress Bar with Cloud */}
            <ProgressBar
              progress={storyProgress}
              onDraggingCloud={handleStoryCloudDragging}
              onDragCloud={handleStoryCloudDragEnd}
              totalSections={totalStorySections}
            />

            {/* Navigation buttons - 모바일 최적화 */}
            <div className="fixed top-1/2 -translate-y-1/2 left-2 md:left-8 z-[60]">
              {currentStorySection > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => goToStorySection(currentStorySection - 1)}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-2xl md:text-3xl">←</span>
                </motion.button>
              )}
            </div>

            <div className="fixed top-1/2 -translate-y-1/2 right-2 md:right-8 z-[60]">
              {currentStorySection < totalStorySections - 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => goToStorySection(currentStorySection + 1)}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-2xl md:text-3xl">→</span>
                </motion.button>
              )}
            </div>

            {/* Drag hint - 모바일 최적화 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: currentStorySection === 0 ? 1 : 0, y: 0 }}
              transition={{
                duration: 1,
                repeat: currentStorySection === 0 ? Infinity : 0,
                repeatType: 'reverse',
              }}
              className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg z-[60] pointer-events-none"
            >
              <p className="text-xs md:text-sm text-gray-700 flex items-center gap-2">
                <span>☁️ 구름을 드래그해서 이야기를 시작하세요 ☁️</span>
              </p>
            </motion.div>

            {/* Section indicators - 모바일 최적화 */}
            <div className="fixed bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-[60]">
              {[...Array(totalStorySections)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStorySection(i)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                    i === currentStorySection
                      ? 'bg-white w-6 md:w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이미지 갤러리 모달 */}
      <AnimatePresence>
        {selectedProductImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedProductImages(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedProductImages(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <span className="text-2xl">✕</span>
              </button>

              {/* 메인 이미지 */}
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={selectedProductImages[currentImageIndex]}
                  alt={`제품 이미지 ${currentImageIndex + 1}`}
                  className="w-full h-auto"
                />
              </div>

              {/* 이미지 네비게이션 */}
              {selectedProductImages.length > 1 && (
                <>
                  {/* 이전 버튼 */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + selectedProductImages.length) % selectedProductImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <span className="text-2xl">←</span>
                  </button>

                  {/* 다음 버튼 */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % selectedProductImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <span className="text-2xl">→</span>
                  </button>

                  {/* 썸네일 */}
                  <div className="flex gap-2 mt-4 justify-center">
                    {selectedProductImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex
                            ? 'border-white scale-110'
                            : 'border-white/30 hover:border-white/60'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`썸네일 ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* 이미지 카운터 */}
                  <div className="text-center mt-4 text-white text-sm">
                    {currentImageIndex + 1} / {selectedProductImages.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
