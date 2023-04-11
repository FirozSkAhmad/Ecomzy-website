import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Card } from "../components/Card"

const MyProducts = () => {
    const [products, setProducts] = useState([])

    async function getData() {
        const token = localStorage.getItem("token")
        const options = {
            url: "http://localhost:4000/seller/myproducts",
            method: "GET",
            headers: {
                authorization: token
            }
        }
        const doc = await axios(options)
        setProducts(doc.data.docs)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='mainContainer'>
            <div className='itemsContainer'>
                {
                    products.map((item) => {
                        return <Card key={item._id} data={item} />
                    })
                }
            </div>
        </div>
    )
}

export default MyProducts
