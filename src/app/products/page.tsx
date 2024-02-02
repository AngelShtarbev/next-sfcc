import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from 'react';
import { productSearch } from "../api/sfcc";
import Loading from "../loading";
import Product from "../components/Product";

export default async function Products() {
    const products = await productSearch('Shirt');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Header />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                    <Suspense fallback={<Loading />}>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products.map((product: any) => (
                                <Product key={product.productId} product={product} />
                            ))}
                        </div>
                    </Suspense>
                </div>
            </div>
            <Footer />
        </main>
    );
}