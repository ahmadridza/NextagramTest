import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = ({ toggle, loginUser }) => {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        // if text then run all of these functions/let my form submit
        e.preventDefault()
        if (!username || !password) return toast('Please fill up all the field');
        console.log(username, password)

        loginUser(username, password)  // what is this for? why?

        setUsername("")
        setPassword("")


        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: `${username}`,
                password: `${password}`

            }
        })


            .then(response => {
                console.log(response)
                toggle()
                toast.success('You are now Logged in', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                })

            })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
            })



    }



    const handleInput = e => {
        setUsername(e.target.value)
        console.log(username)
    }


    const handleInput2 = e => {
        setPassword(e.target.value)
        console.log(password)
    }





    return (
        <div>

            <ModalBody>

                <form onSubmit={handleSubmit}>

                    < p > Username</p >
                    <input onChange={handleInput} value={username} type="text" />


                    <br />

                    < p > Password</p >
                    <input onChange={handleInput2} value={password} type="password" />

                    <br />
                    <br />

                    <Button color="secondary">Login</Button>




                </form>








            </ModalBody>



        </div>
    );
}

export default LoginPage;