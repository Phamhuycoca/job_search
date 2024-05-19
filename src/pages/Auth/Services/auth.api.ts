import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import type { IBodyLogin, ILoginResponse } from './interfaces';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/JobSeekerLogin`, body);
  }
  register(data:any): Promise<any> {
    return this.client.post(`${this.baseUrl}/JobSeekerRegister`, data);
  }
  employerslogin(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/EmployersLogin`, body);
  }
  logout():Promise<any>{
    return this.client.post(`${this.baseUrl}/logout`,);
  }
  getProfileJob_Seeker():Promise<any>{
    return this.client.get(`${this.baseUrl}/GetProfileJob_Seeker`,);
  }
}
export const authApi = new AuthApiService({ baseUrl: '/Auth' }, axiosInstance);