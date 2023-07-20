import { NavLink, Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Test from './test';

function Navbar(props){
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <NavLink className="navbar-brand" to="/">Petal & Stem</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/garden">Gardens</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pest">Pest Detail</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pest">Add a pest</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pest">Pest List</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/species">Add a plant species</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/garden">Your garden</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/garden/${user_id}/plant">Add a Plant</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/test">Test</NavLink>
                    </li>
                </ul>
            </div>
            </nav>
            <Link to="/test"> This shows Nav.js is loading and connected. </Link>
            <Routes>
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    )
}

export default Navbar;
