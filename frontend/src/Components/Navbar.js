import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navb">
           <Link to ="/home"> Home </Link>
            <Link to = "/menu"> Menu </Link>
        </div>
    )
}

export default Navbar