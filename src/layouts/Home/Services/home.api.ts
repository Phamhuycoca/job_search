import type {  IBodyResponse, ICommonListQueryByHome } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from '@/common/constants';

class HomeApiService extends ApiService {
    ListJobsByHome(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any):Promise<any> {
        return this._getListByHome<any>(DEFAULT_COMMON_LIST_QUERY_BY_HOME);
    }
    ItemById(id:any):Promise<any> {
        return this.client.get(`${this.baseUrl}/ItemById/${id}`,);
    }
}
export const homeApi = new HomeApiService({ baseUrl: '/Home' }, axiosInstance);