import React, { useEffect, useState } from 'react'
import { postImage } from "../api";

function TestUpload() {
    const [imagePreview, setImagePreview] = useState(""); // <- To 
    const [imageFile, setImageFile] = useState({});
    const [imageUrl, setImageUrl] = useState(null);

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
        }
        catch (err) {
            console.log(err)
        }
    }
  return (
    <div className="App">
            <div className="uploadImage">
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={(e) => handleImagePreview(e)}
                />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
            <p>{imageUrl}</p>
            <div
                className="image-preview-div"
                style={{ display: imagePreview === "" ? "none" : "flex" }}
            >
                <img src={imagePreview} alt="" />
            </div>
        </div>
  )
}

export default TestUpload;
