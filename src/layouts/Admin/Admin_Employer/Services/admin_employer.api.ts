import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';

class Admin_EmployerApiService extends ApiService {
  createData(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data);
  }
  updateData(id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`);
  }
  employers(DEFAULT_COMMON_LIST_QUERY:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/Employers`, {
        params: DEFAULT_COMMON_LIST_QUERY
        }
    );
}
}
export const admin_emplyerApi = new Admin_EmployerApiService({ baseUrl: "/Admin_Employer" }, axiosInstance);
