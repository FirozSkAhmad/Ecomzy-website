import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { isValid, isValidEmail } from '../validations/validators'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export const Login = () => {

    const initialData = {
        email: "", password: ""
    }

    const [toggle, setToggel] = useState(true)
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})

    const navigate = useNavigate()

    function formHandler(event) {
        const { name, value, type, checked } = event.target

        setFormData((preState) => {
            return {
                ...preState,
                [name]: type === "checkbox" ? checked : value
            }
        })

        setErrors(((preState) => {
            return {
                ...preState,
                [name]: ""
            }
        }))
    }

    async function submitHandler(event) {
        try {
            event.preventDefault()

            const { email, password } = formData

            const credentials = { email, password }

            const errs = {}

            if (!isValid(credentials.email)) {
                errs.email = `please fill the email column`
            } else {
                if (!isValidEmail(credentials.email)) {
                    errs.email = `invalid emailId`
                }
            }

            if (!isValid(credentials.password)) {
                errs.password = `please fill the password column`
            }

            setErrors(errs)

            if (Object.keys(errs).length === 0) {
                const options = {
                    url: "http://localhost:4000/loginUser",
                    method: "POST",
                    data: formData
                }
                const doc = await axios(options)
                console.log(doc)
                const token = doc.data.token
                const tokenData = jwt_decode(token)
                localStorage.setItem("token", token);
                localStorage.setItem("userId", tokenData.userId);
                localStorage.setItem("name", tokenData.name);
                localStorage.setItem("userType", tokenData.userType);
                if (tokenData.userType === "buyer") {
                    navigate("/")
                }
                else {
                    navigate("/seller")
                }
                setFormData(initialData)
            }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data.msg
            setServerErrors(errs)
        }
    }

    return (
        <div className='logincontainer'>
            <form className="container" onSubmit={submitHandler}>
                <label>
                    <p>Email:</p>
                    <input type='email' name='email' value={formData.email} onChange={formHandler} />
                    <div className='errBlock'>
                        {(errors.email) ? <p> {errors.email}</p> : null}
                    </div>
                </label>
                <label className='passwordBlock'>
                    <p>password:</p>
                    <input type={toggle ? "password" : "text"} name='password' value={formData.password} onChange={formHandler} />
                    <div id='icon'>
                        {toggle ? <AiFillEye onClick={() => setToggel(!toggle)} /> : <AiFillEyeInvisible onClick={() => setToggel(!toggle)} />}
                    </div>
                    <div className='errBlock'>
                        {(errors.password) ? <p> {errors.password}</p> : null}
                    </div>
                </label>
                <div className='serErrBlock'>
                    {(serverErrors.message) ? <p> {serverErrors.message}</p> : <br />}
                </div>
                <br />
                <button>Login</button>
            </form>
        </div>
    )
}

