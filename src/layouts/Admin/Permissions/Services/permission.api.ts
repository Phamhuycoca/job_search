import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';

class PermissionApiService extends ApiService {
   getPermissions():Promise<any> {
    return this.client.get(`${this.baseUrl}`);
   }
}
export const permissionApi = new PermissionApiService({ baseUrl: '/Permissions' }, axiosInstance);