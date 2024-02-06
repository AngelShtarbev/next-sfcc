import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from 'react';
import { productSearch } from "../api/sfcc";
import Loading from "../loading";
import ProductsGrid from "../components/ProductsGrid";

export default async function Products() {
    const productSearchConfig = {
        searchQuery: 'Shirt'
    };
    
    const productSearchResults = await productSearch(productSearchConfig);

    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <Suspense fallback={<Loading />}>
                        <ProductsGrid products={productSearchResults} />
                    </Suspense>
                </div>
            </div>
        </main>
        <Footer />
      </>
    );
}