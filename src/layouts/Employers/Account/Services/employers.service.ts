import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { employersApi } from "./employers.api";
export const useEmployers = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const query_by_home=DEFAULT_COMMON_LIST_QUERY_BY_HOME;
  const getInfo=async()=>{
    try{
      return await employersApi.getInfo();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };
  const updateEmployers = async (data: any, id: any) => {
    try {
      return await employersApi.updateData(data, id);
    } catch (error) {
      console.error("Error Update Role:", error);
    }
  };
  const getById=async(id:any)=>{
    try{
      const res:any=await employersApi._getDetail(id);
      if (res.errors !== undefined) {
        showErrors(res.errors);
    }
      return res.data;
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };
  const GetListJobById=async(id:any)=>{
    try{
      const res:any=await employersApi.GetListJobById(query,id);
      if (res.errors !== undefined) {
        showErrors(res.errors);
    }
      return res;
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };
  const fetchCompannys=async ()=>{
    try {
      const res = await employersApi.CompannyList(query_by_home);
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
  };
  const searchCompannys=async ()=>{
    try {
      const res = await employersApi.CompannyList(query_by_home);
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
  };
  const dashBoard=async()=>{
    try{
      return await employersApi.dashboard();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };
  return {
    query,
    getInfo,
    updateEmployers,
    getById,
    GetListJobById,
    fetchCompannys,
    searchCompannys,
    dashBoard
  };
};
