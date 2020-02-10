import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingIndicator from './LoadingIndicator'



const UserImages = ({ id }) => {


    const [isLoading, setIsLoading] = useState(true)
    const [images, setImages] = useState([])


    useEffect(() => {
        // performing a GET request
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
            .then(result => {
                // If successful, we do stuffs with 'result'
                ; // putting the results in a state (user)

                setImages(result.data);
                setIsLoading(false);



            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })

    })


    if (isLoading) { return <LoadingIndicator /> }


    return (


        <div className="ID">
            {images.map((imageUrl, i) => (

                <div className="username" key={i}>
                    <img className='item' src=
                        {imageUrl} alt="profile" />

                    {/* <div className='item'>{ID.username} </div> */}

                </div>



            )

            )
            }
        </div >




    );
}

export default UserImages;