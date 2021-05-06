import axios from 'axios';
const URL_ROOT = /*process.env.REACT_APP_URL_APP +*/ '';
export const CrudService = {
    Put,
    Get,
    Post,
    Patch,
    Delete,
    setAuthHeader
};

/**  
    * Authentification using Bearer token -JWT ex- 
    * @param store to get the token of the athentified user
    * @return axios configured to use the given token for the authentication of all requests
**/

function setAuthHeader(store) {
    axios.interceptors.request.use(
        config => {
            const {
                auth: { authToken }
            } = store.getState();
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            return config;
        },
        err => Promise.reject(err)
    );
}

/****************************************  
    * Get request to call an get endPoint
    * @param url The relative path of the service
    * @param params Query params of the get request
    * @param headers Any costum headers needed
    * @return Axios reqeust with the given configuration

****************************************/

function Get(url,params={},headers={}) {
    return axios.get(`${URL_ROOT}${url}`, {
        headers: headers,
        params: params
    })
}

/**  
    * @param url The relative path of the service
    * @param data Body of the get request
    * @param headers Any costum headers needed
    * @return Axios reqeust with the given configuration
**/

function Put(url, data, headers) {
    return axios.put(`${URL_ROOT}${url}`, data, {
        headers: headers
    })
}
function Post(url, data, headers) {
    return axios.post(`${URL_ROOT}${url}`, data, {
        headers: headers
    })
}
function Patch(url, data, headers) {
    return axios.patch(`${URL_ROOT}${url}`, data, {
        headers: headers
    })
}
function Delete(url, data, headers) {
    var config = {
        method: 'delete',
        url: `${URL_ROOT}${url}`,
        headers: headers,
        data: data
    };
    return axios(config)
}