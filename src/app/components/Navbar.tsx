'use client';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Navbar({ navigation, classNames, open, setOpen }: { navigation: any, classNames: any, open: boolean, setOpen: any }) {
    return (
        <>
            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center">
                        <button
                            type="button"
                            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <Link href="/">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </Link>
                        </div>

                        {/* Flyout menus */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {navigation.categories.map((category: any) => (
                                    <Popover key={category.name} className="flex">
                                        {({ open }) => (
                                            <>
                                                <div className="relative flex">
                                                    <Popover.Button
                                                        className={classNames(
                                                            open
                                                                ? 'border-indigo-600 text-indigo-600'
                                                                : 'border-transparent text-gray-700 hover:text-gray-800',
                                                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                        )}
                                                    >
                                                        {category.name}
                                                    </Popover.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                        <div className="relative bg-white">
                                                            <div className="mx-auto max-w-7xl px-8">
                                                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                        {category.featured.map((item: any) => (
                                                                            <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                    <img
                                                                                        src={item.imageSrc}
                                                                                        alt={item.imageAlt}
                                                                                        className="object-cover object-center"
                                                                                    />
                                                                                </div>
                                                                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                    {item.name}
                                                                                </a>
                                                                                <p aria-hidden="true" className="mt-1">
                                                                                    Shop now
                                                                                </p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                        {category.sections.map((section: any) => (
                                                                            <div key={section.name}>
                                                                                <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                    {section.name}
                                                                                </p>
                                                                                <ul
                                                                                    role="list"
                                                                                    aria-labelledby={`${section.name}-heading`}
                                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                >
                                                                                    {section.items.map((item: any) => (
                                                                                        <li key={item.name} className="flex">
                                                                                            <a href={item.href} className="hover:text-gray-800">
                                                                                                {item.name}
                                                                                            </a>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                ))}

                                {navigation.pages.map((page: any) => (
                                    <a
                                        key={page.name}
                                        href={page.href}
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        {page.name}
                                    </a>
                                ))}
                                {
                                    <Link href='/products' className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Products
                                    </Link>
                                }
                            </div>
                        </Popover.Group>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Sign in
                                </a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Create account
                                </a>
                            </div>

                            <div className="hidden lg:ml-8 lg:flex">
                                <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                    <img
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        className="block h-auto w-5 flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-sm font-medium">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </a>
                            </div>

                            {/* Search */}
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <a href="#" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};