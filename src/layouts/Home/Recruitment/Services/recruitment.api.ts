import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from './../../../../common/constants';

class RecruitmentApiService extends ApiService {
  createData(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data);
  }
  updateData(data: any, id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`, data);
  }
  deleteData(id: any): Promise<any> {
    return this.client.delete(`${this.baseUrl}/${id}`);
  }
  itemsList():Promise<ItemsList> {
    return this.client.get(`${this.baseUrl}/ItemsByEmployerId`);
  }
  ItemsByJob_seeker(DEFAULT_COMMON_LIST_QUERY:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/ItemsByJob_seeker`,{
      params: DEFAULT_COMMON_LIST_QUERY
      });
  }
  ItemsByEmployer(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any,id:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/ItemsByEmployer/${id}`,{
      params: DEFAULT_COMMON_LIST_QUERY_BY_HOME
      });
  }
  ItemsByEmployerSuitable(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/ItemsByEmployerSuitable`,{
      params: DEFAULT_COMMON_LIST_QUERY_BY_HOME
      });
  }
  ChangeStatus(data:any):Promise<any> 
  {
    return this.client.patch(`${this.baseUrl}/ChangeStatus`, data);
  }
  ChangeFeedback(data:any):Promise<any> 
  {
    return this.client.patch(`${this.baseUrl}/ChangeFeedback`, data);
  }
  Job_SeekerById(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any,id:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/Job_SeekerById/${id}`,{
      params: DEFAULT_COMMON_LIST_QUERY_BY_HOME
      });
  }
}
export const recruitmentApi = new RecruitmentApiService(
  { baseUrl: "/Recruitment" },
  axiosInstance
);
