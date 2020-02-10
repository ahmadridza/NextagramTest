import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom' // Navlink is define as link because Navlink have been used in this document
import ModalMain from './ModalMain'

const Searchbar = ({ loginUser, currentUser, logoutUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    return (
        // 
        <div>
            <Navbar color="transparent" light expand="md" fontSize="50px">
                <NavbarBrand href="/">NexTagram</NavbarBrand>  {/* the "/" is refering to the home page*/}
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>


                        {currentUser ? (
                            <NavItem className="mr-5">
                                <NavbarText>Hello, {currentUser.username}</NavbarText>
                            </NavItem>
                        ) : (
                                ""
                            )}


                        {/* HomePage Route */}
                        <NavItem>
                            <NavLink activeClassName="active" tag={Link} to="/">
                                Home
                                 </NavLink>
                        </NavItem>

                        {/* UserPage Route */}

                        <NavItem>
                            <NavLink activeClassName="active" tag={Link} to="/users/3">
                                User
                            </NavLink>  {/* the "/users/3" is refering to the userpage*/}
                        </NavItem>
                        {/* My Profile Route */}
                        <NavItem>
                            <NavLink activeClassName="active" tag={Link} to="/profile">
                                My Profile
                            </NavLink>  {/* the "/profile" is refering to the my profile page*/}
                        </NavItem>

                        {/* Upload Image Route */}
                        <NavItem>
                            <NavLink activeClassName="active" tag={Link} to="/uploadimage">
                                Upload Image
                            </NavLink>  {/* the "/profile" is refering to the my profile page*/}
                        </NavItem>

                    </Nav>

                    {/* Login and Log out toggle */}

                    <NavbarText>

                        {currentUser ? (


                            <NavLink onClick={logoutUser} style={{ cursor: "pointer" }}>
                                Logout
                </NavLink>

                        ) : (


                                <ModalMain

                                    loginUser={loginUser} />



                            )}



                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Searchbar;