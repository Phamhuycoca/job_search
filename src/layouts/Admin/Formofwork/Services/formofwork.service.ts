import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { formofworkApi } from './formofwork.api';
const loading = useLoadingStore();
export const useFormofwork = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchFormofworks = async () => {
    try {
      loading.showLoading(true);
      const res = await formofworkApi._getList<any>(query);
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
      console.error("Error Fetching Roles:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  const searchFormofworks = async () => {
    try {
      loading.showLoading(true);

      const res = await formofworkApi._getList<any>(query);
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
      console.error("Error Search Roles:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  const createFormofwork = async (data: any) => {
    try {
      loading.showLoading(true);
      return await formofworkApi.createData(data);
    } catch (error) {
      console.error("Error Create Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateFormofwork=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await formofworkApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update Role:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await formofworkApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail Role:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteFormofwork=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await formofworkApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete Role:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchFormofworks,
    createFormofwork,
    updateFormofwork,
    deleteFormofwork,
    query,
    getData,
    searchFormofworks
  };
};
