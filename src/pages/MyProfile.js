import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'reactstrap';




const MyProfile = () => {
    let jwt = localStorage.getItem('jwt')
    // first needs to retreive the jwt(authToken) from the local storage

    const [myProfile, setMyProfile] = useState([])

    useEffect(() => {
        axios({
            url: "https://insta.nextacademy.com/api/v1/users/me",
            method: "GET",
            timeout: 0,
            headers: {
                Authorization: `Bearer ${jwt}`
            }


        })
            .then(result => {
                console.log(result.data)
                setMyProfile(result.data)
            })


    }, [])

    const { email, id, profile_picture, username } = myProfile;

    return (


        <Container>


            <div>


                <div className='item'>

                    <img className='item' src=
                        {profile_picture} alt="profile" />  {/* profile Image */}
                    <div className='item' id='email'>{email} </div>  {/* email */}

                    <div className='item' id='username'>{username} </div>  {/* UserName */}


                </div>





            </div>

        </Container>


    )


}






export default MyProfile