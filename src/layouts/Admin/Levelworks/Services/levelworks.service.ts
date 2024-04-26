import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";

import { showErrors } from "@/common/helpers";
import { levelworksApi } from "./levelworks.api";
const loading = useLoadingStore();
export const useLevelworks = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchLevelworks = async () => {
    try {
      loading.showLoading(true);
      const res = await levelworksApi._getList<any>(query);
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
  const searchLevelworks = async () => {
    try {
      loading.showLoading(true);

      const res = await levelworksApi._getList<any>(query);
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
  const createLevelworks = async (data: any) => {
    try {
      loading.showLoading(true);
      return await levelworksApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateLevelworks=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await levelworksApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getLevelworks=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await levelworksApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteLevelworks=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await levelworksApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchLevelworks,
    createLevelworks,
    updateLevelworks,
    deleteLevelworks,
    query,
    getLevelworks,
    searchLevelworks,
  };
};
