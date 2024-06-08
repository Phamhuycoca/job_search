import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { bannerApi } from "./banner.api";
const loading = useLoadingStore();
export const useBanner = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchData = async () => {
    try {
      loading.showLoading(true);
      const res = await bannerApi._getList<any>(query);
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
 
  const create = async (data: any) => {
    try {
      loading.showLoading(true);
      return await bannerApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const update=async(data:any,id:any)=>{
    try{
      loading.showLoading(true);
      return await bannerApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

 

  const deleteData = async(id:any)=>{
    try{
      loading.showLoading(true);
      return await bannerApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }finally {
      loading.showLoading(false);
    }
  };
  const getData=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await bannerApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  return {
    query,
    fetchData,
    create,
    update,
    deleteData,
    getData
  };
};
