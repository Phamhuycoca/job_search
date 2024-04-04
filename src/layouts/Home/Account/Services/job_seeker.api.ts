import type { IBodyResponse } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class Job_seekerApiService extends ApiService {
  updateData(data: any, id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  getData(id: any): Promise<any> {
    return this.client.get(`${this.baseUrl}/${id}`);
  }
  getInfo(): Promise<any> {
    return this.client.get(`${this.baseUrl}/GetInfo`);
  }
}
export const job_seekerApi = new Job_seekerApiService(
  { baseUrl: "/Job_Seeker" },
  axiosInstance
);
