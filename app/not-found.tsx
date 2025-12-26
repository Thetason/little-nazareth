import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-light text-gray-300 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-wider">
          Page Not Found
        </h2>
        <p className="text-base text-gray-600 font-light mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
          >
            GO HOME
          </Link>
          <Link
            href="/products"
            className="inline-block px-8 py-3 border border-gray-300 text-gray-600 text-sm tracking-widest font-light hover:bg-gray-50 transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
