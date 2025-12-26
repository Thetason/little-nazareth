import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  title: string;
  content: string;
  createdAt: number;
  helpful: number; // 도움됨 카운트
  verified: boolean; // 구매 인증 여부
}

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpful'>) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  markHelpful: (reviewId: string) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: Date.now(),
          helpful: 0,
        };

        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      getReviewsByProduct: (productId) => {
        return get()
          .reviews.filter((review) => review.productId === productId)
          .sort((a, b) => b.createdAt - a.createdAt);
      },

      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter(
          (review) => review.productId === productId
        );

        if (productReviews.length === 0) return 0;

        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / productReviews.length;
      },

      markHelpful: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === reviewId
              ? { ...review, helpful: review.helpful + 1 }
              : review
          ),
        }));
      },
    }),
    {
      name: 'little-nazareth-reviews',
    }
  )
);
