import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { job_seekerApi } from "./job_seeker.api";
export const useJobSeeker = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getInfo=async()=>{
    try{
      return await job_seekerApi.getInfo();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };
  const updateJobSeeker = async (data: any, id: any) => {
    try {
      return await job_seekerApi.updateData(data, id);
    } catch (error) {
      console.error("Error Update Role:", error);
    }
  };
  const uploadCVJobSeeker = async (data: any) => {
    try {
      return await job_seekerApi.uploadCv(data);
    } catch (error) {
      console.error("Error uploadCv Role:", error);
    }
  };
  const getInfoById=async(id:any)=>{
    try{
      return await job_seekerApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };
  return {
    query,
    getInfo,
    updateJobSeeker,
    uploadCVJobSeeker,
    getInfoById
  };
};
