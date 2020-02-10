import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FormGroup, FormText, Form, Button } from 'reactstrap'





const UploadPage = () => {

    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    const handleChange = e => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))

        setImageFile(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Authorization of the user
        let jwt = localStorage.getItem("jwt");
        // Formdata object to hold the image file to send to the server
        let formData = new FormData();
        // Append the key:value pair to the formData object
        formData.append("image", imageFile);

        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
            .then(response => {
                if (response.data.success) {
                    setMessage("Image Uploaded Successfully!")
                    setPreviewImage(null)
                    setImageFile(null)
                }
            })
            .catch(error => {
                console.log(error.response);
            });



    }





    return (
        <>
            {/* Image Preview */}
            <div className='card'>

                {previewImage ? (
                    <img
                        src={previewImage}
                        width='100%'
                        height='100%'
                        alt="preview"
                    />
                ) : (
                        <h3 className='text-center'>
                            {message ? message : 'Live Preview'}
                        </h3>
                    )}
            </div>

            {/* Submit Form */}

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <input
                        type='file'
                        name='image-file'
                        onChange={handleChange}


                    />

                    <FormText>
                        Make Sure the Image being uploaded is a supported format
                </FormText>
                </FormGroup>


                <Button color='primary'>Upload</Button>

            </Form>
        </>
    )

}


export default UploadPage