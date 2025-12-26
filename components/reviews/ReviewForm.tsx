'use client';

import { useState } from 'react';
import { useReviewStore } from '@/lib/store/reviewStore';
import { motion } from 'framer-motion';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const addReview = useReviewStore((state) => state.addReview);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author || !title || !content) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    addReview({
      productId,
      author,
      rating,
      title,
      content,
      verified: true, // 실제로는 구매 여부 체크 필요
    });

    // 폼 초기화
    setRating(5);
    setTitle('');
    setContent('');
    setAuthor('');

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 p-8"
    >
      <h3 className="text-xl font-light tracking-wide text-gray-900 mb-6">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 별점 선택 */}
        <div>
          <label className="block text-sm text-gray-600 font-light mb-2">
            Rating *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-3xl transition-colors"
              >
                {star <= (hoveredRating || rating) ? (
                  <span className="text-yellow-400">★</span>
                ) : (
                  <span className="text-gray-300">★</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 작성자 */}
        <div>
          <label className="block text-sm text-gray-600 font-light mb-2">
            Name *
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
            placeholder="Your name"
            required
          />
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-sm text-gray-600 font-light mb-2">
            Review Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
            placeholder="Sum up your review in one line"
            required
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm text-gray-600 font-light mb-2">
            Review *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900 resize-none"
            placeholder="Share your experience with this product"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-4 text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
        >
          SUBMIT REVIEW
        </button>
      </form>
    </motion.div>
  );
}
