'use server';

import { productSearch } from '../api/sfcc';
import { ProductSearch } from '../types/interface';

export default async function FiltersRequest(requestParams: any) {
    const productSearchConfig: ProductSearch = {
        searchQuery: requestParams.searchQuery,
        refinements: requestParams.type === 'price' ? `price=(${requestParams.refinementValue})` : `size=(${requestParams.refinementValue})`,
    };

    const productSearchResults = await productSearch(productSearchConfig);
    
    return {
        data: productSearchResults
    };
};