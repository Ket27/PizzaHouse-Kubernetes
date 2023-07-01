import { useState, useEffect } from "react"
import axios from "axios";
import Navbar from '../Components/Navbar';
import { AppState } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const MenuPage = () => {
    const [pizzas, setPizzas] = useState([]);

    const navigate = useNavigate();
    
    const getPizzas = async() => {
        try {
            const response = await axios.get("/api/plans/get");
                console.log(response.data.data);
                setPizzas(response.data.data);          
 
        } 
        catch (error) {
            console.log(error);
        }
    } 

    useEffect(()=>{
        getPizzas();
    },[])
    const {user} = AppState();
    if (!user) {
        navigate("/");
        return;
    }
    

    return (
        <div className="home">
            <div className="title">
                <h1 className='text'>Our Menu</h1>
            </div>
            <div className="bgc">                    
            </div>
            <div className='nav'>              
                <div className='user'>
                    <div className='img'>
                    </div>
                    <div>
                        {user.name}
                    </div>
                </div>
                <Navbar/>
            </div>
            <div className="pizzas">
                {pizzas.map((pizza) => (
                <div key={pizza._id} className="pizza" style={pizza.nonVeg?{backgroundColor:"rgb(218, 61, 40)"}:{backgroundColor:"rgb(159, 224, 135)"}}>
                    <div className="pizimg"></div>
                    <h3><Link to = {`/menu/:${pizza._id}`}>{pizza.name}</Link></h3>
                    <h5>{pizza.description}</h5>
                </div>
                ))}
            </div>
        </div>
    )
}

export default MenuPage