import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from '../../utils/mutations';
import AuthService from '../../utils/auth.js'



function PostForm(props) {
    //const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createPost, { loading, error }] = useMutation(CREATE_POST);

    const handleFormSubmit = async (event) => {
        try{
            const mutationResponse = await createPost({
                variables: {productId: this.props.id, body: content},
                headers: {Authorization: AuthService.getToken()}
            })

        }catch(err){
            console.log(err);
        }
        //setContent('');
    }

    //const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                {/* <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label> */}
                <label>
                    Content:
                    <textarea value={content} onChange={handleContentChange} />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
                {error && <p>Error creating post :(</p>}
            </form>
        </div>
    );
}

export default PostForm;