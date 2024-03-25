import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';

class EmployeeApiService extends ApiService {
    
}
export const employeeApi = new EmployeeApiService({ baseUrl: '/Auth' }, axiosInstance);