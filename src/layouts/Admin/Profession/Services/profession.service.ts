import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";

import { showErrors } from "@/common/helpers";
import { professionApi } from "./profession.api";
const loading = useLoadingStore();
export const useProfession = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchProfessions = async () => {
    try {
      loading.showLoading(true);
      const res = await professionApi._getList<any>(query);
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
  const searchProfessions = async () => {
    try {
      loading.showLoading(true);

      const res = await professionApi._getList<any>(query);
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
  const createProfession = async (data: any) => {
    try {
      loading.showLoading(true);
      return await professionApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateProfession=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await professionApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await professionApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteProfession=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await professionApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchProfessions,
    createProfession,
    updateProfession,
    deleteProfession,
    query,
    getData,
    searchProfessions
  };
};
