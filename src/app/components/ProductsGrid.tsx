'use client';

import Filters from "../components/Filters";

export default function ProductsGrid({ products }) {
    return (
        <Filters productsGrid={products}/>
    );
}