import React from 'react'
import { NavLink } from 'react-router-dom'
import "../components/Navbar.css"
import { BsFillCartFill } from "react-icons/bs"
import { useSelector } from 'react-redux'

export const Navbar = () => {
    const { cart } = useSelector((state) => state)
    return (
        <div>
            <nav>
                <div className='imageContainer'>
                    <NavLink to="/"><img src="https://codehelp-shopping-cart.netlify.app/logo.png" width="110px" height="40px" alt="img" /></NavLink>
                </div>
                <div className='linkContainer'>
                    <NavLink style={{ textDecoration: "none" }} to="/"><p>Home</p></NavLink>
                    <NavLink to="/cart"><div className='count'><p>{cart.value.length}</p></div><span id='cartIcon'><BsFillCartFill /></span></NavLink>
                </div>
            </nav>
        </div>
    )
}
