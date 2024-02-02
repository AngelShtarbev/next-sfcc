'use client'

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <div className="mx-auto mt-10 max-w-xs sm:flex sm:max-w-none sm:justify-center">
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-orange-600 shadow-sm hover:bg-orange-100 sm:px-8"
          onClick={() => router.push('/products')}>
          Shop products
        </button>
      </div>
      <Footer />
    </main>
  );
}
