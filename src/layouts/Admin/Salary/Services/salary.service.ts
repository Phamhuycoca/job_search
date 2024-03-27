import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { salaryApi } from "./salary.api";
const loading = useLoadingStore();
export const useSalary = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchSalarys = async () => {
    try {
      loading.showLoading(true);
      const res = await salaryApi._getList<any>(query);
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
  const searchSalarys = async () => {
    try {
      loading.showLoading(true);

      const res = await salaryApi._getList<any>(query);
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
  const createSalary = async (data: any) => {
    try {
      loading.showLoading(true);
      return await salaryApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateSalary=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await salaryApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await salaryApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteSalary=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await salaryApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchSalarys,
    createSalary,
    updateSalary,
    deleteSalary,
    query,
    getData,
    searchSalarys
  };
};
