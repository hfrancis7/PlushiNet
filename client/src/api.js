import axios from "axios";

const httplink= "https://plushinet.herokuapp.com/";

//may need to change the url for heroku deployment, not sure what to do
const API = axios.create({
    baseURL: "https://plushinet.herokuapp.com/store-image",
});

export const postImage = (data) =>
    API.post("/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
