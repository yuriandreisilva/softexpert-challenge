import React, { useEffect, useState } from 'react';
import { Product } from '../../interfaces/Product';
import { Link } from 'react-router-dom';
import { Sale } from '../../interfaces/Sale';
import formatCurrency from '../../utils/functions/price/convertToBr';

interface SelectedProductsListProps {
    selectedProducts: Product[];
    setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

function SelectedProductsList({ selectedProducts, setSelectedProducts }: SelectedProductsListProps): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [progress, setProgress] = useState<number>(0);

    const [taxPercentages, setTaxPercentages] = useState<{ [categoryId: number]: number }>({});

    const formDataSale = selectedProducts.map(product => ({
        product_id: product.id,
        sold_quantity: String(product.sold_quantity ?? 0),
    }));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        console.log(formDataSale)
        await fetch(`${process.env.SERVER_URL}/api/sale`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataSale),
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.log("Erros:", data.errors);
                    setError(data.errors.join('\n'));
                } else {
                    setIsLoading(true);
                    setSuccess("Venda inserida com sucesso!");
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
            });;
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [error]);


    useEffect(() => {
        if (success) {
            const interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress < 100) {
                        return prevProgress + 1;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        return prevProgress;
                    }
                });
            }, 20);

            return () => {
                clearInterval(interval);
            };
        }
    }, [success]);

    const handleQuantityChange = (productId: number | undefined, newQuantity: number): void => {
        console.log("qty:", newQuantity);

        newQuantity = Math.min(Math.max(newQuantity, 1), selectedProducts.find(product => product.id === productId)?.stock_qty ?? 1);

        const updatedProducts = selectedProducts.map((product) =>
            product.id === productId ? { ...product, sold_quantity: newQuantity } : product
        );
        setSelectedProducts(updatedProducts);
    };

    useEffect(() => {
        const fetchTaxPercentages = async () => {
            const uniqueCategoryIds = [...new Set(selectedProducts.map(product => product.category_id))];

            for (const categoryId of uniqueCategoryIds) {
                try {
                    const response = await fetch(`${process.env.SERVER_URL}/api/category/tax?category_id=${categoryId}`);
                    const percentage = await response.json();
                    console.log(percentage);
                    if (percentage) {
                        setTaxPercentages(prevPercentages => ({
                            ...prevPercentages,
                            [categoryId]: percentage
                        }));
                    } else {
                        console.error(`Porcentagem do imposto não encontrada para a categoria ${categoryId}`);
                    }
                } catch (error) {
                    console.error(`Erro ao buscar porcentagem do imposto para a categoria ${categoryId}:`, error);
                }
            }
        };

        fetchTaxPercentages();
    }, [selectedProducts]);


    const calculateTotalWithTax = (product: Product): number => {
        const taxPercentage = taxPercentages[product.category_id] ?? 0;
        return Number(product.price) * (product.sold_quantity ?? 1) + (Number(product.price) * (product.sold_quantity ?? 1) * taxPercentage / 100);
    };

    return (
        <div className="selected-products-container table-responsive">
            <h2>Produtos Selecionados</h2>
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="border border-2 rounded-3">
                    <table className="table table-hover align-middle text-center" style={{ height: "15rem" }} >
                        <thead className="align-middle">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Produto</th>
                                <th scope="col">Valor Unitário</th>
                                <th scope="col">Quantidade Vendida</th>
                                <th scope="col">Valor Total s/ Imposto</th>
                                <th scope="col">Valor Imposto</th>
                                <th scope="col">Valor Total c/ Imposto</th>
                                <th scope="col align-middle">Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((product, index) => (
                                <tr key={`tr-${product.id}`}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.name}</td>
                                    <td>{formatCurrency(Number(product.price))}
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <div className="input-group-prepend">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            product.id,
                                                            Math.max((product.sold_quantity ?? 0) - 1, 0)
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <input
                                                className="form-control text-center"
                                                id={`sold_quantity_${product.id}`}
                                                name={`sold_quantity_${product.id}`}
                                                type="number"
                                                min={1}
                                                max={product.stock_qty}
                                                value={Math.min(Math.max(product.sold_quantity ?? 1, 1), product.stock_qty)}
                                                onChange={(event) => {
                                                    const newValue = Math.min(
                                                        parseInt(event.target.value),
                                                        product.stock_qty
                                                    );
                                                    const updatedProducts = selectedProducts.map((p) =>
                                                        p.id === product.id
                                                            ? { ...p, sold_quantity: newValue }
                                                            : p
                                                    );
                                                    setSelectedProducts(updatedProducts);
                                                }}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            product.id,
                                                            Math.min(
                                                                (product.sold_quantity ?? 1) + 1,
                                                                product.stock_qty
                                                            )
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{formatCurrency(Number(product.price) * (product.sold_quantity ?? 1))}</td>
                                    <td>{taxPercentages[product.category_id]}%</td>
                                    <td>{formatCurrency(calculateTotalWithTax(product))}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger rounded-5 mt-2"
                                            onClick={() => {
                                                const updatedProducts = selectedProducts.filter(
                                                    (_, i) => i !== index
                                                );
                                                setSelectedProducts(updatedProducts);
                                            }}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody >
                        <tfoot>
                            <tr>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col">Total Sem Imposto {formatCurrency(selectedProducts.reduce((total, product) => total + (Number(product.price) * (product.sold_quantity ?? 1)), 0))}</td>
                                <td scope="col"></td>
                                <td scope="col">Total Com Imposto {formatCurrency(selectedProducts.reduce((total, product) => total + calculateTotalWithTax(product), 0))}</td>
                                <td scope="col align-middle"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="d-flex justify-content-end my-3">
                    <Link to="/" className="btn btn-secondary me-2">Cancelar</Link>
                    <button className="btn btn-primary" type="submit" disabled={!!success || isLoading}>
                        {isLoading ? (
                            <div>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Carregando...</span>
                            </div>
                        ) : (
                            'Salvar Venda'
                        )}
                    </button>
                </div>
            </form >

            {
                success && (
                    <>
                        <div className="progress mt-3" role="progressbar" aria-label="Success example" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div className="progress-bar bg-success" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="alert alert-success mt-3" role="alert">
                            {success}
                        </div>
                    </>
                )
            }

            {
                error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error.split('\n').map((errorMessage, index) => (
                            <p className="mb-0" key={index}>{errorMessage}</p>
                        ))}
                    </div>
                )
            }
        </div >
    );
}

export default SelectedProductsList;
