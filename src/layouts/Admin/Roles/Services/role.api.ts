import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';

class RoleApiService extends ApiService {
   createData(data:any):Promise<any> {
    return this.client.post(`${this.baseUrl}`,data);
   }
}
export const roleApi = new RoleApiService({ baseUrl: '/Role' }, axiosInstance);