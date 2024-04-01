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
        } else {
            if (res.errors !== undefined) {
                showErrors(res.errors);
            }
        }
        return res;
    }
   
    return{
        login,
    }
}