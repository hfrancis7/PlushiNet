import axios from "axios";

//may need to change the url for heroku deployment, not sure what to do
const API = axios.create({
    baseURL: "http://localhost:3001/store-image",
});

export const postImage = (data) =>
    API.post("/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
