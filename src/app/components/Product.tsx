'use client';

import ProductQuickview from "./ProductQuickview";

export default function Product({ product }) {
    
    const handleOpenQuickviewOpen = () => {
        alert('Product Quickview');
    };
    
    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={product.image.link} alt={product.image.alt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={'#'}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.productName}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.variationAttributes[0].values[0].name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            <button type="button" onClick={handleOpenQuickviewOpen} className="relative z-10 w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-sm text-gray-900 opacity-0 focus:opacity-100 group-hover:opacity-100">
                Quick View
            </button>
            <ProductQuickview key={product.productId} productData={product} />
        </div>
    );
}