import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormFeedback, FormText, FormGroup, Label } from 'reactstrap';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';


const Signupage = () => {

    const [username, setUsername] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);


    const checkUsername = newUsername => {

        console.log("Making APi call to check username!");

        axios
            .get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`)
            .then(response => {
                console.log(response.data);
                if (response.data.valid) {
                    setUsernameValid(true)

                } else {
                    setUsernameValid(false);
                }
                // response(usernameValid)

                // console.log(response)
            });

    };


    const handleSubmit = e => {
        e.preventDefault()
        if (!username, !email, !password, !confirmPassword) return toast('Please fill up all the field');
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")


        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        })
            .then(response => {
                console.log(response)
                if (response.data.status === "success")
                    toast('Welcome to Nextagram');
                else {
                    toast.warning("Oops, something went wrong!");
                }

            })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
            })

    }

    // UserName Input
    const handleInput = e => {

        clearTimeout(delay);
        const newUsername = e.target.value;
        setUsername(newUsername);

        const newDelay = setTimeout(() => { checkUsername(newUsername); }, 500);

        setDelay(newDelay)
    }

    // Email Input
    const handleInput2 = e => {
        setEmail(e.target.value)
        console.log(email)
    }
    // UserName Password Input
    const handleInput3 = e => {
        setPassword(e.target.value)
        console.log(password)
    }
    // UserName Confirmpassword Input
    const handleInput4 = e => {
        setConfirmPassword(e.target.value)
        console.log(confirmPassword)
    }


    // UserName Validation
    const getUserNameProp = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return { invalid: true };
        }

        if (usernameValid) {
            return { valid: true };
        } else {
            return { invalid: true };
        }
    };

    const getUserNameFormFeedback = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return (<FormFeedback invalid>Must be at least 6 characters</FormFeedback>);
        }

        if (usernameValid) {
            return (<FormFeedback valid>Sweet! That name is available</FormFeedback>);
        } else {
            return (<FormFeedback invalid>Sorry! Username is taken</FormFeedback>);
        }
    };

    // Password Validation

    const getPasswordProp = () => {
        if (!password.length) {
            return null;
        }

        if (password.length <= 6) {
            return { invalid: true };
        }

        if (passwordValid) {
            return { valid: true };
        } else {
            return { invalid: true };
        }
    };

    const getPasswordFeedback = () => {
        if (!password.length) {
            return null;
        }

        if (password.length <= 6) {
            return (<FormFeedback invalid>Must be at least 6 characters</FormFeedback>);
        }

        if (passwordValid) {
            return (<FormFeedback valid>Sweet! That Password is available</FormFeedback>);
        } else {
            return (<FormFeedback invalid>Sorry! password is taken</FormFeedback>);
        }
    };





    return (
        <div>

            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            type="text" value={username}
                            onChange={handleInput} {...getUserNameProp()} />   {getUserNameFormFeedback()}

                        <FormText>Enter a username between 6 and 20 characters</FormText>

                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={handleInput2} />


                    </FormGroup>


                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={handleInput3}
                            {...getPasswordProp()} />   {getPasswordFeedback()}

                        <FormText>Enter a Password must be between 6 and 20 characters</FormText>

                    </FormGroup>

                    <br />
                    <br />

                    < p > Confirm Password</p >
                    <input onChange={handleInput4} value={confirmPassword} type="password" />

                    <br />
                    <br />



                    <Button color="secondary" >Sign Up!</Button>

                </Form>








            </ModalBody>



        </div>
    );
};

export default Signupage;