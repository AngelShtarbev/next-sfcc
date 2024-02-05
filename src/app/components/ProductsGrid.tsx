'use client';

import Filters from "../components/Filters";

export default function ProductsGrid({ products }: {products: any}) {
    return (
        <Filters productsGrid={products}/>
    );
}