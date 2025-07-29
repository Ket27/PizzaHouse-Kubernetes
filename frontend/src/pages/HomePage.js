import Navbar from '../Components/Navbar.js';
import { AppState } from '../context/AppProvider.js';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const {user} = AppState();
    if (!user) {
        navigate("/");
        return;
    }
    return(
        <div className='home'>
            <div className="title">
                <h1 className='text'>Welcome To Pizza House</h1>
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
        </div>
    )
}

export default HomePage;
