import React, {Component} from 'react';
import api from  '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom';

export default class Main extends Component{
    state = {
        results: [],
        page: 0,
        pages: 0,
        idProcurado: '',
    }

    componentDidMount(){
        this.loadProducts();    
        this.handleChange = this.handleChange.bind(this);
    }

    loadProducts = async (page = 0) =>{
        const response = await api.get(`/pokemon/?offset=${page}&limit=4`);
        const {results} = response.data;

        this.setState({ results: results,page,pages:response.data.count})
    };

    prevPage = () => {
        const{page} = this.state;
        if(page === 0) return;
        const pageNumber = page-4;
        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const{page,pages} = this.state;
        if(page === pages) return;
        const pageNumber = page+4;
        this.loadProducts(pageNumber);
    }

    handleChange(event) {
        this.setState({idProcurado: event.target.value});
    }


    render(){
        const{ results,page,pages} = this.state;
        return (
            <div className='product-list'>
                <div className='search'>
                    <input type="text" placeholder="Search with a pokemonID..." value={this.state.idProcurado} onChange={this.handleChange} />
                    <Link id="button" to={`/products/${this.state.idProcurado}`} >Procurar</Link>
                </div>
                {results.map(product => (
                    <article key={product.url.replace("https://pokeapi.co/api/v2/pokemon/", "")}>
                        <strong>{product.name}({product.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/","")})</strong>
                        <Link to={`/products/${product.url.replace("https://pokeapi.co/api/v2/pokemon/", "")}`} >Acessar</Link>
                    </article>
                ))}
                 <div className='actions'> 
                    <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === pages} onClick={this.nextPage}>Proximo</button>
                </div>
            </div>         
  
        )
    }
}