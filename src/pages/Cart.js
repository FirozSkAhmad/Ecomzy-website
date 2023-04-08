import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CartCard } from '../components/CartCard'
import "./Cart.css"


export const Cart = () => {
    const navigate = useNavigate()
    const { cart } = useSelector((state) => state)
    let totalPrice
    if (cart.value.length > 0) {
        totalPrice = cart.value.reduce((acc, cur) => {
            return acc += cur.price
        }, 0)
    }
    return (
        <div className='mainContainer'>
            {
                cart.value.length === 0 ?
                    <div className='emptyCart'>
                        <p>Your cart is empty!</p>
                        <button onClick={() => navigate("/")}>Shop Now</button>
                    </div>
                    :
                    <div className='itemsContainer'>
                        <div className='cartItems'>
                            {cart.value.map((item) => {
                                return <CartCard key={item.id} data={item} />
                            })}
                        </div>
                        <div className='cartSummary'>
                            <div className='cartSummaryHead'>
                                <div id='head'>
                                    <p>YOUR CART</p>
                                    <h1>SUMMARY</h1>
                                </div>

                                <p>Total Items:<span id='total'>{cart.value.length}</span></p>
                            </div>

                            <div id='amountContainer'>
                                <p>Total Amount:<span id='totalPrice'>${totalPrice}</span></p>
                                <button>Checkout Now</button>
                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}
