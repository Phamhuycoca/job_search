import { showErrors, showSuccessNotification } from "@/common/helpers";
import { authApi } from "./auth.api";
import type { IBodyLogin } from "./interfaces"
import localStorageAuthService from "@/common/storages/authStorage";

export const useAuthService=()=>{
    let errors;
    const login =async(body: IBodyLogin)=>{
        const res = await authApi.login(body);
        if (res.success) {
            showSuccessNotification(res.message);
            localStorageAuthService.setAccessToken(res.data?.accessToken);
            localStorageAuthService.setAccessTokenExpiredAt(res.data?.accessTokenExpiration);
            localStorageAuthService.setRefeshToken(res.data?.refreshToken);
            localStorageAuthService.setRefeshTokenExpiredAt(res.data?.refreshTokenExpiration);

            console.log(res.data);
        } else {
            if (res.errors !== undefined) {
                showErrors(res.errors);
            }
        }
        return res;
    }
    const hello=async()=>{
        const res = await authApi.hello();
        console.log(res.data);
    }
    return{
        login,
        hello
    }
}