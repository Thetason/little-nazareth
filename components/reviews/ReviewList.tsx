'use client';

import { useReviewStore, Review } from '@/lib/store/reviewStore';
import { motion } from 'framer-motion';

interface ReviewListProps {
  productId: string;
}

export function ReviewList({ productId }: ReviewListProps) {
  const { getReviewsByProduct, getAverageRating, markHelpful } = useReviewStore();
  const reviews = getReviewsByProduct(productId);
  const averageRating = getAverageRating(productId);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400">
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-16 text-center">
        <p className="text-base text-gray-400 font-light tracking-wide mb-4">
          No reviews yet
        </p>
        <p className="text-sm text-gray-500 font-light">
          Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 평균 별점 요약 */}
      <div className="bg-white border border-gray-200 p-8">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-light text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 mb-1">{renderStars(Math.round(averageRating))}</div>
            <p className="text-sm text-gray-500 font-light">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          <div className="flex-grow">
            {/* 별점 분포 (간단 버전) */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percentage = (count / reviews.length) * 100;

              return (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-600 font-light w-12">
                    {star} star
                  </span>
                  <div className="flex-grow bg-gray-200 h-2">
                    <div
                      className="bg-yellow-400 h-2"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-light w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <ReviewItem
            key={review.id}
            review={review}
            index={index}
            onMarkHelpful={markHelpful}
          />
        ))}
      </div>
    </div>
  );
}

interface ReviewItemProps {
  review: Review;
  index: number;
  onMarkHelpful: (reviewId: string) => void;
}

function ReviewItem({ review, index, onMarkHelpful }: ReviewItemProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400">
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white border border-gray-200 p-8"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {renderStars(review.rating)}
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 font-light">
                ✓ Verified Purchase
              </span>
            )}
          </div>
          <h4 className="text-base font-light text-gray-900 mb-1">
            {review.title}
          </h4>
          <p className="text-sm text-gray-500 font-light">
            {review.author} · {formatDate(review.createdAt)}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-700 font-light leading-relaxed mb-4">
        {review.content}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onMarkHelpful(review.id)}
          className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors"
        >
          Helpful ({review.helpful})
        </button>
      </div>
    </motion.div>
  );
}
