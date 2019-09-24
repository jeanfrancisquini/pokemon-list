import React,{Component} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom';


export default class Product extends Component{
    state = {
        product: [],
        sprites: [],
    }
    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await api.get(`/pokemon/${id}`);
        this.setState({product: response.data,sprites: response.data.sprites});
    }
    render(){
        const {product,sprites} = this.state;
        console.log(product);
        return (
            <div className='product-info'>
                <h1>{product.name}</h1> 
                <img src={`${sprites.front_default}`} alt="Smiley face" height="100" width="100"></img>
                <div className='actions'> 
                    <Link to={`/`} id="button">Voltar</Link>
                </div>
                
            </div>
        );
    }
} 
