import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../components/Navbar.css"
import { BsFillCartFill } from "react-icons/bs"
import { useSelector } from 'react-redux'

export const Navbar = () => {
    const { cart } = useSelector((state) => state)

    const navigate = useNavigate()

    function logOut() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div>
            <nav>
                <div className='imageContainer'>
                    <NavLink to="/"><img src="https://codehelp-shopping-cart.netlify.app/logo.png" width="110px" height="40px" alt="img" /></NavLink>
                </div>
                {
                    localStorage.getItem("token") ? localStorage.getItem("userType") === "buyer" ? <div className='linkContainer'>
                        <NavLink style={{ textDecoration: "none" }} to="/"><p>Home</p></NavLink>
                        <NavLink to="/cart"><div className='count'><p>{cart.value.length}</p></div><span id='cartIcon'><BsFillCartFill /></span></NavLink>
                        <p onClick={logOut}>LogOut</p>
                    </div> :
                        <div className='slinkContainer'>
                            <NavLink style={{ textDecoration: "none" }} to="/seller/myproducts"><p>My Products</p></NavLink>
                            <NavLink style={{ textDecoration: "none" }} to="/seller/maddproducts"><p>Add Products</p></NavLink>
                            <p onClick={logOut}>LogOut</p>
                        </div> : <div className='rLinkContainer'>
                        <NavLink style={{ textDecoration: "none" }} to="/login"><p>Login</p></NavLink>
                        <NavLink style={{ textDecoration: "none" }} to="/signup"><p>signUp</p></NavLink>
                    </div>
                }

            </nav>
        </div>
    )
}
