import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Go Home
        </button>
      </Link>
    </div>
  );
}
