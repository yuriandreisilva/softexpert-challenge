import React, { useState, useEffect } from 'react';

function CategorySelect(props: {
    selectedCategoryId: number;
    updateCategoryId: (categoryId: number) => void;
}) {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        fetch(`${process.env.SERVER_URL}/api/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
            });
    }, []);

    return (
        <div className="form-floating mb-3">
            {categories.length === 0 ? (
                <select disabled>
                    <option value="">Nenhuma categoria cadastrada</option>
                </select>
            ) : (

                <select
                    className="form-select"
                    name="category_id"
                    value={props.selectedCategoryId}
                    onChange={event => props.updateCategoryId(Number(event.target.value))}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

            )}
            <label className="form-label">Categoria:</label>
        </div>
    );
}

export default CategorySelect;
