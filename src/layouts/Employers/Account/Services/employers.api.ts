import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class EmlployersApiService extends ApiService {
  updateData(data: any, id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`, data,{
        headers: { "Content-Type": "multipart/form-data" },
      });
  }
  getData(id: any): Promise<any> {
    return this.client.get(`${this.baseUrl}/${id}`);
  }
  itemsList():Promise<ItemsList> {
    return this.client.get(`${this.baseUrl}/ItemsList`);
  }
  getInfo():Promise<any> {
    return this.client.get(`${this.baseUrl}/GetInfo`);
  }
}
export const employersApi = new EmlployersApiService({ baseUrl: "/Employers" }, axiosInstance);
