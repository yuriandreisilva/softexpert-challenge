import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import CategorySelect from '../category/CategorySelect';
import { Link } from 'react-router-dom';
import CurrencyInputBrazil from '../utils/CurrencyInputBrazil';
import { Product } from '../../interfaces/Product';

function ProductForm() {
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState<Product>({
        name: '',
        price: '0',
        category_id: 0,
        stock_qty: 0,
        code: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePriceChange = (value: string) => {
        setFormData(prevData => ({
            ...prevData,
            price: value,
        }));
    };


    const updateCategoryId = (categoryId: number) => {
        setFormData({
            ...formData,
            category_id: categoryId,
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await fetch(`${process.env.SERVER_URL}/api/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors || data.error) {
                        console.log("Erros:", data.errors);
                        setError(data.errors.join('\n'));
                    } else {
                        console.log(data);
                        setIsLoading(true);
                        setSuccess("Produto inserido com sucesso!");
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    setError(error.join('\n'));
                    console.error("Erro na requisição:", error);
                });;


        } catch (error) {
            setError("Erro ao inserir produto.");
            console.log("Error: ", error)
        }
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

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="container">
                <h1>Inserir Novo Produto</h1>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        <label className="form-label">Nome do Produto:</label>
                    </div>

                    <CurrencyInputBrazil
                        value={String(formData.price)}
                        onChange={handlePriceChange}
                    />

                    <CategorySelect
                        selectedCategoryId={formData.category_id}
                        updateCategoryId={updateCategoryId}
                    />

                    <div className="form-floating mb-3">
                        <input className="form-control" type="number" name="stock_qty" value={formData.stock_qty} onChange={handleInputChange} required />
                        <label className="form-label">Quantidade em Estoque:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" name="code" value={formData.code} onChange={handleInputChange} required />
                        <label className="form-label">Código:</label>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <Link to="/" className="btn btn-secondary me-2">Cancelar</Link>
                        <button className="btn btn-primary" type="submit" disabled={!!success || isLoading}>
                            {isLoading ? (
                                <div>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Carregando...</span>
                                </div>
                            ) : (
                                'Inserir Produto'
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
        </div >
    );
}

export default ProductForm;
