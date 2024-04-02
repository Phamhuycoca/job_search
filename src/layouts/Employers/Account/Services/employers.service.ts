import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { employersApi } from "./employers.api";
const loading = useLoadingStore();
export const useEmployers = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getInfo=async()=>{
    try{
      loading.showLoading(true);
      return await employersApi.getInfo();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }finally {
      loading.showLoading(false);
    }
  };
  const updateEmployers = async (data: any, id: any) => {
    try {
      loading.showLoading(true);
      return await employersApi.updateData(data, id);
    } catch (error) {
      console.error("Error Update Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  return {
    query,
    getInfo,
    updateEmployers
  };
};
