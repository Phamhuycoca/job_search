import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import type { IBodyLogin, ILoginResponse } from './interfaces';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/Login`, body);
  }
  async hello(): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/Hello`);
  }
}
export const authApi = new AuthApiService({ baseUrl: '/Auth' }, axiosInstance);