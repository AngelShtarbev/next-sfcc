interface Variant {
    orderable: Boolean,
    price: Number,
    productId: string,
    variationValues: any
};

interface VariationValue {
    name: string
    orderable: Boolean,
    value: string
};

interface Image {
    alt: string,
    disBaseLink: string,
    link: string,
    title: string
};

interface Images {
    images: [Image],
    variationAttributes: any,
    viewType: string
};

interface VariationAttribute {
    id: string,
    name: string,
    values: [VariationValue]
};

interface Search {
    searchParams: {
        cgid: string,
        pid: string,
        sort: string,
        refinements: [string]
    }
};

interface Product {
    currency: string,
    id: string,
    imageGroups: [Images],
    inventory: any,
    longDescription: string,
    master: string | undefined,
    minOrderQuantity: Number,
    name: string,
    pageDescription: string,
    price: Number,
    pricePerUnit: Number,
    productPromotions: [Promotion] | undefined,
    unitMeasure: string,
    brand: string,
    variationAttributes: [VariationAttribute],
    variants: [Variant]
};

interface Products {
    limit: Number,
    data: [Product],
    total: Number
};

interface Promotion {
    promotionId: string,
    calloutMsg: string | undefined
};

interface ProductHits {
    hits: [ProductHit]
};

interface ProductHit {
    currency: string,
    hitType: string,
    orderable: boolean
    productId: string,
    image: Image,
    inventory: any,
    longDescription: string,
    master: any,
    minOrderQuantity: Number,
    productName: string,
    pageDescription: string,
    price: Number,
    pricePerUnit: Number,
    pricePerUnitMax: Number
    productPromotions: [Promotion] | undefined,
    unitMeasure: string,
    brand: string,
    variationAttributes: [VariationAttribute],
    variants: [Variant]
};

interface GetAccessToken {
    verifier: string,
    code: string,
    usid: string
};

interface ProductSearch {
    searchQuery: string,
    refinements: string
};

interface AuthorizeJson {
    code: string,
    authCode: string,
    usid: string
};

interface AuthorizeResponse {
    status: number,
    json: any,
    headers: any
};

export type {
    Variant,
    Images,
    Image,
    VariationValue,
    VariationAttribute,
    Product,
    Products,
    ProductHits,
    ProductHit,
    AuthorizeResponse,
    AuthorizeJson,
    GetAccessToken,
    ProductSearch
};