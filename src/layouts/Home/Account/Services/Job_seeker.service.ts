import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { job_seekerApi } from "./job_seeker.api";
const loading = useLoadingStore();
export const useJobSeeker = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getInfo=async()=>{
    try{
      loading.showLoading(true);
      return await job_seekerApi.getInfo();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };
  const updateJobSeeker = async (data: any, id: any) => {
    try {
      loading.showLoading(true);
      return await job_seekerApi.updateData(data, id);
    } catch (error) {
      console.error("Error Update Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  return {
    query,
    getInfo,
    updateJobSeeker
  };
};
