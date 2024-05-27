import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class EmailApiService extends ApiService {
    sendEmail(data:any):Promise<any> {
        return this._create(`/SendEmail/`+data);
    }
}
export const emailApi = new EmailApiService({ baseUrl: "/Email" }, axiosInstance);
