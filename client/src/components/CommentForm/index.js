import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from '../../utils/mutations';
import { QUERY_POST } from "../../utils/queries";


function CommentForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createPost, { loading, error }] = useMutation(CREATE_POST);
    const { data } = useQuery(QUERY_POST, { variables: { id: postId }, skip: true });
    const postId = data?.createPost?.id;

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createPost({ variables: { title, content } });
            console.log(data.createPost);
            setTitle('');
            setContent('');
            postId = data.createPost.id;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={handleContentChange} />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
                {error && <p>Error creating post :(</p>}
            </form>
            {postId && (
                <div>
                    <h2>{data.post.title}</h2>
                    <p>{data.post.content}</p>
                </div>
            )}
        </div>
    );
}

export default CommentForm;