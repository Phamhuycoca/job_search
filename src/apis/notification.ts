import type {  IBodyResponse, ICommonListQueryByHome, ItemsList } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from '@/common/constants';

class NotificationApiService extends ApiService {
      createData(data: any): Promise<any> {
        return this.client.post(`${this.baseUrl}`, data);
      }
      updateData(data: any, id: any): Promise<any> {
        return this.client.patch(`${this.baseUrl}/${id}`, data);
      }
      getData(id: any): Promise<any> {
        return this.client.get(`${this.baseUrl}/${id}`);
      }
      deleteData(id: any): Promise<any> {
       return this.client.delete(`${this.baseUrl}/${id}`);
      }
      itemsList():Promise<ItemsList> {
        return this.client.get(`${this.baseUrl}/ItemsList`);
      }
      GetNotificationByJobSeeker(DEFAULT_COMMON_LIST_QUERY:any):Promise<any> {
        return this.client.get(`${this.baseUrl}/GetNotificationByJobSeeker`, {
            params: DEFAULT_COMMON_LIST_QUERY
            }
      )
    }
    sendNotification(data: any): Promise<any> {
      return this.client.post(`${this.baseUrl}/send`, data);
    };
}
export const notificationApi = new NotificationApiService({ baseUrl: '/Notification' }, axiosInstance);