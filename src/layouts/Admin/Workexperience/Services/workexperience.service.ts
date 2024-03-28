import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { workexperiencekApi } from "./workexperience.api";
import { showErrors } from "@/common/helpers";
const loading = useLoadingStore();
export const useWorkexperience = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchWorkexperiences = async () => {
    try {
      loading.showLoading(true);
      const res = await workexperiencekApi._getList<any>(query);
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
  const searchWorkexperiences = async () => {
    try {
      loading.showLoading(true);

      const res = await workexperiencekApi._getList<any>(query);
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
  const createWorkexperience = async (data: any) => {
    try {
      loading.showLoading(true);
      return await workexperiencekApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateWorkexperience=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await workexperiencekApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await workexperiencekApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteWorkexperience=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await workexperiencekApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchWorkexperiences,
    createWorkexperience,
    updateWorkexperience,
    deleteWorkexperience,
    query,
    getData,
    searchWorkexperiences
  };
};
