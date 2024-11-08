import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer 71e0c2ff-de01-496f-ad09-99efe054ca5b',

    },
})