import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from './../../../../common/constants';

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
  GetListJobById(DEFAULT_COMMON_LIST_QUERY:any,id:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/GetListJobById/${id}`,{
      params: DEFAULT_COMMON_LIST_QUERY
      });
  }
  getInfo():Promise<any> {
    return this.client.get(`${this.baseUrl}/GetInfo`);
  }
  CompannyList(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/CompannyList`,{
      params: DEFAULT_COMMON_LIST_QUERY_BY_HOME
      });
}

dashboard():Promise<any> {
  return this.client.get(`${this.baseUrl}/Dashboard`);
}
//   ListJobsByHome(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any):Promise<any> {
//     return this._getListByHome<any>(DEFAULT_COMMON_LIST_QUERY_BY_HOME);
// }
}
export const employersApi = new EmlployersApiService({ baseUrl: "/Employers" }, axiosInstance);
