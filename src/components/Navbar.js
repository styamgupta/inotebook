import React from 'react'
import { Link ,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    let navigate = useNavigate();
    const clicklogout =()=>{
        localStorage.removeItem("token");
        console.log("remove")
        // this is undefind not working
        let a =navigate("/login");  
        console.log(a)
         }
    // use location is using for get location likr / ,/about then i can use for highlight line no.19 per use kiya
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">I-Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    
                    {!localStorage.getItem("token")?<form className="d-flex"><Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign up</Link>
                    </form>:<Link onClick={clicklogout} to="/login" className="btn btn-primary mx-1" role="button">Log Out</Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
