import { showErrors, showSuccessNotification } from "@/common/helpers";
import { authApi } from "./auth.api";
import type { IBodyLogin } from "./interfaces"
import localStorageAuthService from "@/common/storages/authStorage";
import { computed } from "vue";
import dayjs from "dayjs";
import { useLoadingStore } from "@/store/loading.store";

export const useAuthService=()=>{
    let errors;
    const loading = useLoadingStore();

    const loginbyEmail =async(body: IBodyLogin)=>{
        loading.showLoading(true);
        const res = await authApi.login(body);
        if (res.success) {
            showSuccessNotification(res.message);
            localStorageAuthService.setAccessToken(res.data?.accessToken);
            localStorageAuthService.setAccessTokenExpiredAt(res.data?.accessTokenExpiration);
            localStorageAuthService.setRefeshToken(res.data?.refreshToken);
            localStorageAuthService.setRefeshTokenExpiredAt(res.data?.refreshTokenExpiration);
            localStorageAuthService.setRole(res.data?.role);
            loading.showLoading(false);
        } else {
            if (res.errors !== undefined) {
                showErrors(res.errors);
                loading.showLoading(false);
            }
        }
        return res;
    }
    const employerslogin =async(body: IBodyLogin)=>{
        loading.showLoading(true);
        const res = await authApi.employerslogin(body);
        if (res.success) {
            showSuccessNotification(res.message);
            localStorageAuthService.setAccessToken(res.data?.accessToken);
            localStorageAuthService.setAccessTokenExpiredAt(res.data?.accessTokenExpiration);
            localStorageAuthService.setRefeshToken(res.data?.refreshToken);
            localStorageAuthService.setRefeshTokenExpiredAt(res.data?.refreshTokenExpiration);
            localStorageAuthService.setRole(res.data?.role);
            loading.showLoading(false);
            
        } else {
            if (res.errors !== undefined) {
                showErrors(res.errors);
                loading.showLoading(false);
            }
        }
        return res;
    }
    const isAuthenticated = computed(() => {
        const token = localStorageAuthService.getAccessToken();
        const expiredAt = localStorageAuthService.getAccessTokenExpiredAt();
        return Boolean(token && expiredAt && !dayjs(dayjs(expiredAt)).isBefore());
      });
      const hasToken = computed(() => {
        return !!localStorageAuthService.getAccessToken();
      });
    return{
        loginbyEmail,
        employerslogin,
        isAuthenticated,
        hasToken
    }
}