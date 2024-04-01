import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { jobApi } from "./job.api";
const loading = useLoadingStore();
export const useJob = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchJobs = async () => {
    try {
      loading.showLoading(true);
      const res = await jobApi._getList<any>(query);
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
    } finally {
      loading.showLoading(false);
    }
  };
  const searchJobs = async () => {
    try {
      loading.showLoading(true);

      const res = await jobApi._getList<any>(query);
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
      console.error("Error Search:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  const createJob = async (data: any) => {
    try {
      loading.showLoading(true);
      return await jobApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateJob=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await jobApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await jobApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteJob=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await jobApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    query,
    getData,
    searchJobs
  };
};
