import type { IBodyResponse } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';

class FileCvApiService extends ApiService {
  uploadCV(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data,{
        headers: { "Content-Type": "multipart/form-data" },
      });
  }
  Items(DEFAULT_COMMON_LIST_QUERY:any):Promise<any> {
    return this.client.get(`${this.baseUrl}`,{
      params: DEFAULT_COMMON_LIST_QUERY
      });
  }
  deleteData(id: any): Promise<any> {
    return this.client.delete(`${this.baseUrl}/${id}`);
  }
}
export const fileCVApi = new FileCvApiService(
  { baseUrl: "/FileCv" },
  axiosInstance
);
