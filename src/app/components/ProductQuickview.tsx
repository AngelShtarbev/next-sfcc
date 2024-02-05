'use client';

import { Fragment, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';


let productView = {
    rating: 3.9,
    reviewCount: 117,
    href: '#',
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' }
    ]
};

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

function ProductQuickview({ isOpen, setIsOpen, product }) {
    
    const sizes = product.variationAttributes.find(variationAttribute => variationAttribute.id === 'size');
    const colors = product.variationAttributes.find(variationAttribute => variationAttribute.id === 'color');
    
    const hookSelectedSize = sizes !== undefined && sizes.values !== undefined ? sizes.values[sizes.values.length - 1] : {};
    const hookSelectedColor = colors !== undefined && colors.values !== undefined ? colors.values[colors.values.length - 1] : {};
    const [selectedColor, setSelectedColor] = useState(hookSelectedColor);
    const [selectedSize, setSelectedSize] = useState(hookSelectedSize);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setIsOpen(false)}>
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <img src={product.image.link} alt={product.image.alt} className="object-cover object-center" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.productName}</h2>
                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>
                                                <p className="text-2xl text-gray-900">${product.price.toFixed(2)}</p>
                                                {/* Reviews */}
                                                <div className="mt-6">
                                                    <h4 className="sr-only">Reviews</h4>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                                <StarIcon
                                                                    key={rating}
                                                                    className={classNames(
                                                                        productView.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                                                        'h-5 w-5 flex-shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="sr-only">{productView.rating} out of 5 stars</p>
                                                        <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                            {productView.reviewCount} reviews
                                                        </a>
                                                    </div>
                                                </div>
                                            </section>
                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>
                                                <form>
                                                    {/* Colors */}
                                                    {colors !== undefined && colors.values !== undefined &&
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900">Color</h4>
                                                            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                                                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                                                <span className="flex items-center space-x-3">
                                                                    {colors !== undefined && colors.values !== undefined && Object.keys(colors.values).map((key) => (
                                                                        <RadioGroup.Option
                                                                            key={key}
                                                                            value={colors.values[key].value}
                                                                            className={({ active, checked }) =>
                                                                                classNames(
                                                                                    'ring-gray-400',
                                                                                    active && checked ? 'ring ring-offset-1' : '',
                                                                                    !active && checked ? 'ring-2' : '',
                                                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                                                )
                                                                            }
                                                                        >
                                                                            <RadioGroup.Label as="span" className="sr-only">
                                                                                {colors.values[key].name}
                                                                            </RadioGroup.Label>
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className={classNames(
                                                                                    'ring-gray-400',
                                                                                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                                                )}
                                                                            />
                                                                        </RadioGroup.Option>
                                                                    ))}
                                                                </span>
                                                            </RadioGroup>
                                                        </div>}
                                                    {/* Sizes */}
                                                    {sizes !== undefined && sizes.values !== undefined && 
                                                        <div className="mt-10">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Size guide
                                                                </a>
                                                            </div>
                                                            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                                <div className="grid grid-cols-4 gap-4">
                                                                    {sizes !== undefined && sizes.values !== undefined && Object.keys(sizes.values).map((key) => (
                                                                        <RadioGroup.Option
                                                                            key={sizes.values[key].name}
                                                                            value={sizes.values[key].value}
                                                                            disabled={!sizes.values[key].orderable}
                                                                            className={({ active }) =>
                                                                                classNames(
                                                                                    sizes.values[key].orderable
                                                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                                                )
                                                                            }
                                                                        >
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <RadioGroup.Label as="span">{sizes.values[key].name}</RadioGroup.Label>
                                                                                    {sizes.values[key].orderable ? (
                                                                                        <span
                                                                                            className={classNames(
                                                                                                active ? 'border' : 'border-2',
                                                                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                                                            )}
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    ) : (
                                                                                        <span
                                                                                            aria-hidden="true"
                                                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                                        >
                                                                                            <svg
                                                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                                viewBox="0 0 100 100"
                                                                                                preserveAspectRatio="none"
                                                                                                stroke="currentColor"
                                                                                            >
                                                                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                                            </svg>
                                                                                        </span>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                    ))}
                                                                </div>
                                                            </RadioGroup>
                                                        </div>}
                                                    <button
                                                        type="button"
                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={() => setIsOpen(false)}
                                                    >Add to bag
                                                    </button>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default ProductQuickview;