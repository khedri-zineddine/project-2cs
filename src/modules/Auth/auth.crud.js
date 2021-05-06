import {CrudService} from '../../services';
import { authUrls } from './auth.constants'
export function login(email, password) {
    return CrudService.Post(authUrls.LOGIN_URL, { email, password });
}
export function getUserByToken() {
    return CrudService.Get(authUrls.USER_URL);
}