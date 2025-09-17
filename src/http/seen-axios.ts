import type {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import axios from "axios";
import {showNotify} from "vant";
import {envService} from "../config/sys/env";

let seenAxios: AxiosInstance = axios.create();
seenAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<object>) => {
        let tokenName = envService.getClientTokenName();
        config.headers[tokenName] = envService.getClientToken();
        return config;
    }
);
seenAxios.interceptors.response.use((res: AxiosResponse<string, object>) => {
    if (res.status === 500) {
        showNotify({message: res.statusText, type: "danger"});
        console.error(res.data);
    }
    return res;
}, (error) => {
    const res = error.response
    if (res.status === 500) {
        showNotify({message: res.statusText, type: "danger"});
    } else if (res.status === 503) {
        showNotify({message: res.statusText, type: "danger"});
    }
    return Promise.reject(error);
});
export default seenAxios;
