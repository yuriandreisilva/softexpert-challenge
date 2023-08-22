import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface CategoryFormData {
    name: string;
    tax_percentage: number;
}

function CategoryForm() {
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        tax_percentage: 0,
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await fetch(`${process.env.SERVER_URL}/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors) {
                        console.log("Erro cliente:", data.errors);
                        setError(data.errors.join('\n'));
                    } else {
                        console.log("Mensagem de sucesso:", data.message);
                        setIsLoading(true);
                        setSuccess("Categoria inserida com sucesso!");
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    console.error("Erro requisição:", error);
                });;


        } catch (error) {
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
                <h1>Inserir Nova Categoria</h1>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        <label className="form-label">Nome do Categoria:</label>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">%</span>
                        <div className="form-floating">
                            <input className="form-control" type="number" id="inputPercentage" name="tax_percentage" value={formData.tax_percentage} onChange={handleInputChange} required />

                            <label htmlFor="inputPercentage" className="form-label">Percentual Imposto:</label>
                        </div>
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
                                'Inserir Categoria'
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

export default CategoryForm;
