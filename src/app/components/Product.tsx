'use client';

import { useState } from 'react';
import ProductQuickview from './ProductQuickview';

export default function Product({ product }) {
    
    let [isOpen, setIsOpen] = useState(false);
    const colors = product.variationAttributes.find(variationAttribute => variationAttribute.id === 'color');
    
    const handleOpenQuickview = () => {
        setIsOpen(true);
    };
    
    return (
        <div className="group relative">
            <div className="aspect-h-4 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img src={product.image.link} alt={product.image.alt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <div className="flex items-end p-4">
                    <button type="button" onClick={handleOpenQuickview} className="relative z-10 w-full rounded-md bg-[#E7E8EF] bg-opacity-95 px-4 py-2 text-sm text-gray-900 opacity-0 focus:opacity-100 group-hover:opacity-100">
                        Quick View
                    </button>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={'#'}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.productName}
                        </a>
                    </h3>
                    {colors !== undefined && colors.values !== undefined &&
                        Object.keys(colors.values).map((key) => (
                            <p key={key} className="mt-1 text-sm text-gray-500">{colors.values[key].name}</p>
                        ))}
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            <ProductQuickview isOpen={isOpen} setIsOpen={setIsOpen} product={product} />
        </div>
    );
}