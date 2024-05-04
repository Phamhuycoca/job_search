import { notificationApi } from "@/apis/notification";
import { defineStore } from "pinia";
import { useLoadingStore } from "./loading.store";
import { showErrors } from "@/common/helpers";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
const query = DEFAULT_COMMON_LIST_QUERY;

export const useNotifications = defineStore('notifications', {
    state: () => ({
      notifications: [],
    }),
    actions: {
      async createNoti(data: any) {
        console.log(data);
        const formData=new FormData();
        formData.append("jobId",data.jobId);
        formData.append("job_SeekerId",data.job_SeekerId);
        return await notificationApi.sendNotification(data);

      },
      
        async fetchNotifications(){
          try {
            const res = await notificationApi.GetNotificationByJobSeeker(query);
            if (res.errors !== undefined) {
              showErrors(res.errors);
          }
            if (res.success) {
              return {
                items: res.items,
                totalItems: res.totalItems,
              };
            }
            return {
              items: [],
              totalItems: 0,
            };
          } catch (error) {
            console.error("Error Fetching:", error);
          } 
        }

    }
  });