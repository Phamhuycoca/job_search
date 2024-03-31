import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";

import { showErrors } from "@/common/helpers";
import { cityApi } from "./city.api";
const loading = useLoadingStore();
export const useCity = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchCitys = async () => {
    try {
      loading.showLoading(true);
      const res = await cityApi._getList<any>(query);
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
  const searchCitys = async () => {
    try {
      loading.showLoading(true);

      const res = await cityApi._getList<any>(query);
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
  const createCity = async (data: any) => {
    try {
      loading.showLoading(true);
      return await cityApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateCity=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await cityApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await cityApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const deleteCity=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await cityApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchCitys,
    createCity,
    updateCity,
    deleteCity,
    query,
    getData,
    searchCitys
  };
};
