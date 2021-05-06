import axios from "axios";
import { authUrls } from './auth.constants'
export function login(email, password) {
    return axios.post(authUrls.LOGIN_URL, { email, password });
}
export function getUserByToken() {
    return axios.get(authUrls.USER_URL);
}