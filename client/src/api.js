import axios from "axios";

const link = "https://plushinet.herokuapp.com/store-image"//||
            //"http://localhost:3001/store-image";

console.log(link);

const API = axios.create({
    baseURL: link,
});

export const postImage = (data) =>
    API.post("/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });