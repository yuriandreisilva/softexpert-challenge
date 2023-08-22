import { Link } from 'react-router-dom';

function Home() {
    const styleCard = {
        width: "18rem"
    };

    return (
        <div className="d-flex justify-content-center justify-content-lg-between flex-wrap m-5">

            <div className="card mb-3" style={styleCard}>
                <div className="card-body">
                    <h5 className="card-title">Produtos</h5>
                    <p className="card-text">Aproveite para gerenciar seus produtos.</p>

                    <Link to="/produtos" className="btn btn-primary">Vamos lá!</Link>

                </div>
            </div>
            <div className="card mb-3" style={styleCard}>
                <div className="card-body">
                    <h5 className="card-title">Categorias</h5>
                    <p className="card-text">Aproveite para gerenciar suas categorias.</p>

                    <Link to="/categorias" className="btn btn-primary">Vamos lá!</Link>

                </div>
            </div>
            <div className="card mb-3" style={styleCard}>
                <div className="card-body">
                    <h5 className="card-title">Vendas</h5>
                    <p className="card-text">Aproveite para gerenciar suas vendas.</p>

                    <Link to="/vendas" className="btn btn-primary">Vamos lá!</Link>

                </div>
            </div>
        </div>
    )
}

export default Home;