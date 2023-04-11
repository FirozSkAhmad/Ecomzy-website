import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ cmp }) => {
    
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [])

    return (
        <div>
            {cmp}
        </div>
    )
}

export default Protected
