import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer ced6c6f6-dd9d-4e17-b73e-ffea8cead463',
        'API-KEY': '084ee9be-499c-43aa-be79-62c62cfc50d1'
    },
})