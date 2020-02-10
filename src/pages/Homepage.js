import React from 'react'

import UserImages from '../components/UserImages';
import { Container } from 'reactstrap';




function Homepage({ users }) {


    return (
        <Container>
            <div className="masonry">
                {users.map((user, i) => {
                    const { username, id, profileImage } = user;
                    return (
                        <div className='item' key={i}>

                            <img className='item' src=
                                {profileImage} alt="profile" />  {/* profile Image */}


                            <div className='item' id='username'>{username} </div>  {/* UserName */}

                            <UserImages className='UI' id={user.id} />   {/* UserImages */}



                        </div>
                    )
                }


                )}
            </div>

        </Container>




    );
}

export default Homepage;
