import React, { useState } from 'react';
import { Product } from '../../interfaces/Product';
import SearchProduct from '../product/ProductSearch';
import SelectedProductsList from '../product/SelectedProductsList';

function SaleForm(): JSX.Element {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const handleProductSelect = (product: Product): void => {
        setSelectedProducts([...selectedProducts, product]);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="container">
                <h1>Selecionar Produto</h1>
                <SearchProduct onProductSelect={handleProductSelect} />
                <SelectedProductsList selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
            </div>
        </div>
    );
}

export default SaleForm;
