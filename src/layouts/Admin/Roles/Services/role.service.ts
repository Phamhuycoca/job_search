import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { roleApi } from "./role.api";
import { useLoadingStore } from "@/store/loading.store";
const loading = useLoadingStore();
export const useRole = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchRoles = async () => {
    try {
      loading.showLoading(true);
      const res = await roleApi._getList<any>(query);
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
  const searchRoles = async () => {
    try {
      loading.showLoading(true);

      const res = await roleApi._getList<any>(query);
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
  const createPole = async (data: any) => {
    try {
      loading.showLoading(true);
      return await roleApi.createData(data);
    } catch (error) {
      console.error("Error Create Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateRole=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await roleApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update Role:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await roleApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail Role:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteRole=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await roleApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete Role:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchRoles,
    query,
    searchRoles,
    createPole,
    getData,
    updateRole,
    deleteRole
  };
};
