import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginPage from '../pages/Loginpage';
import Signupage from '../pages/Signupage'

const ModalMain = (props) => {
    const {
        buttonLabel,
        className,
        loginUser
    } = props;

    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => {
        setModal(!modal)
        setIsLogin(true)
    };

    return (
        <div>


            <Button color="transparent" onClick={toggle}>{buttonLabel}Log in</Button>
            {/* create a Logout function that delete the token from JWT which then  (this comment was made 7/2) */}


            {/* Login Button needs to add if else statement like below... if JWT is removed toggle the button to Log Out... create logout element to delete token in jwt (this comment was made 7/2)*/}





            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{isLogin ? 'Login' : 'Sign Up'} Page</ModalHeader>

                {
                    isLogin ? <LoginPage toggle={toggle} loginUser={loginUser} /> : <Signupage />
                }


                <ModalFooter>
                    <Button color="secondary" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up?' : 'Log In?'}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalMain;