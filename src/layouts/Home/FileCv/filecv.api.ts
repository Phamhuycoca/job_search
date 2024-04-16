import type { IBodyResponse } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class FileCvApiService extends ApiService {
  uploadCV(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data,{
        headers: { "Content-Type": "multipart/form-data" },
      });
  }
}
export const fileCVApi = new FileCvApiService(
  { baseUrl: "/FileCv" },
  axiosInstance
);
