import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class Admin_EmployerApiService extends ApiService {
  createData(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data);
  }
  updateData(id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`);
  }
}
export const admin_emplyerApi = new Admin_EmployerApiService({ baseUrl: "/Admin_Employer" }, axiosInstance);
