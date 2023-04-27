import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { postImage } from "../api";
import { CREATE_POST } from '../utils/mutations';

//AntD imports
import { Button, Checkbox, Form, Input } from 'antd';

function CreatePost() {
    const [imagePreview, setImagePreview] = useState(""); // <- To 
    const [imageFile, setImageFile] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [body, setBody] = useState("");
    const [createPost, { error }] = useMutation(CREATE_POST);
    
    let navigate = useNavigate();

    const handleImagePreview = (e) => {    // <- This will let you preview the uploaded image
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", e => {
                setImagePreview(e.target.result);
                console.log(e.target.result);
            });

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {    // <- This will send the selected image to our api
        try {
            const res = await postImage({ image: imageFile });
            console.log(res.data.data.imageUrl);
            setImageUrl(res.data.data.imageUrl);
            console.log(imageUrl);
            await createPost({
                variables: {body: body, image: imageUrl}
            });
            //navigate('/');
        }
        catch (err) {
            console.log(err)
        }
    }
  return (
    <form className="">
            <div className="uploadImage">
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={(e) => handleImagePreview(e)}
                />
            </div>
            <div
                className="image-preview-div"
                style={{ display: imagePreview === "" ? "none" : "flex" }}
            >
                <img src={imagePreview} alt="" />
            </div>
            <textarea rows="5" cols="33" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
  )
}

export default CreatePost;
