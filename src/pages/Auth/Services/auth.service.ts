import { authApi } from "./auth.api";
import type { IBodyLogin } from "./interfaces"

export const useAuthService=()=>{
    const login =async(body: IBodyLogin)=>{
        const res = await authApi.login(body);
     
    }
    return{
        login
    }
}