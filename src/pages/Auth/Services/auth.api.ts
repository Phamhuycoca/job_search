import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import type { IBodyLogin, ILoginResponse } from './interfaces';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    console.log(body);
    return this.client.post(`${this.baseUrl}/Login`, body);
  }

}
export const authApi = new AuthApiService({ baseUrl: '/Auth' }, axiosInstance);