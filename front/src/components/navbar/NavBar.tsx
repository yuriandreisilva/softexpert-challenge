import react from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../home/Home';
import ProductForm from '../product/ProductForm';
import CategoryForm from '../category/CategoryForm';
import SaleForm from '../sale/SaleForm';


function NavBar() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Soft Seller</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/produtos" className="nav-link active" aria-current="page" >Produtos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/categorias" className="nav-link active" aria-current="page" >Categorias</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/vendas" className="nav-link active" aria-current="page" >Vendas</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<ProductForm />} />
                <Route path="/categorias" element={<CategoryForm />} />
                <Route path="/vendas" element={<SaleForm />} />
            </Routes>
        </Router>
    )
}

export default NavBar;