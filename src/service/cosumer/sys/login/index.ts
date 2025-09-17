import type {AxiosResponse} from "axios";
import {API_PUBLIC} from "../../../../http/public-service-api";
import seenAxios from "../../../../http/seen-axios";
import type{R} from "../../../../model/sys/api-result";
import {StatusCode} from "../../../../model/sys/api-result";

class LoginService {
    /**
     * 清理登陆会话
     * @returns 清除会话信息成功
     */
    clearLoginSession = (): Promise<boolean> => {
        return seenAxios<R<boolean>>({
            ...API_PUBLIC.logout,
        }).then((res: AxiosResponse<R<boolean>>) => {
            if ((res.data.code ) === StatusCode.SUCCESS) {
                return res.data.data;
            }
            return false;
        });
    };
    /**
     * 是否已登陆，且未过期
     * @returns   已登陆
     */
    isLogin = (): Promise<boolean> => {
        return seenAxios<R<boolean>>({
            ...API_PUBLIC.validateToken,
        }).then((res: AxiosResponse<R<boolean>>) => {
            return (res.data.code ) === StatusCode.SUCCESS;
        });
    };
}

const loginService = new LoginService();

export default loginService;
