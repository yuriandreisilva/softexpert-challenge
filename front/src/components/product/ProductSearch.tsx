import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces/Product';

interface SearchProductProps {
    onProductSelect: (product: Product) => void;
}

function SearchProduct({ onProductSelect }: SearchProductProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [searchActivated, setSearchActivated] = useState<boolean>(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await fetch(`${process.env.SERVER_URL}/api/products?search=${searchTerm.trim()}`);
            const data = await response.json();
            setSearchResults(data);
        };

        if (searchActivated) {
            fetchSearchResults();
        }
    }, [searchTerm, searchActivated]);

    const handleInputClick = () => {
        console.log("click")
        setSearchActivated(true);
    };

    const handleInputBlur = () => {
        setSearchActivated(false);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value);
        setSearchActivated(true);
    };

    const handleProductClick = (product: Product): void => {
        setSelectedProducts([...selectedProducts, product]);
        setSearchTerm('');
        setSearchResults([]);
        onProductSelect(product);
        setSearchActivated(false);
    };

    const closeProductList = () => {
        setSearchResults([]);
        setSearchActivated(false);
    }

    return (
        <div>
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    type="text"
                    value={searchTerm}
                    onBlur={handleInputBlur}
                    onChange={handleSearchChange}
                    onClick={handleInputClick}
                    placeholder="Pesquisar produto..."
                />
                <label className="form-label">Pesquisar Produto:</label>
            </div>
            <>
                {searchActivated && (searchResults.length === 0 || searchResults === undefined) && (
                    <div className="alert alert-warning" role="alert">
                        Nenhum produto cadastrado ainda!
                    </div>
                )}
            </>

            {searchResults.length > 0 && (
                <>
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeProductList}></button>
                    <ul className="autocomplete-list list-group">
                        {searchResults.map((product) => (
                            <li className="list-group-item list-group-item-action list-group-item-primary" key={product.id} onClick={() => handleProductClick(product)}>
                                {product.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div >
    );
}

export default SearchProduct;
