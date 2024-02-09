'use server';

import { Suspense } from 'react';
import { productSearch } from '../api/sfcc';
import Loading from '../loading';
import ProductsGrid from '../components/ProductsGrid';
import { ProductSearch } from '../types/interface';

export default async function Products() {
    const productSearchConfig: ProductSearch = {
        searchQuery: 'Shirt',
        refinements: ''
    };

    const productSearchResults = await productSearch(productSearchConfig);

    return (
      <>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Suspense fallback={<Loading />}>
                    <ProductsGrid products={productSearchResults} />
                </Suspense>
            </div>
        </div>
      </>
    );
};