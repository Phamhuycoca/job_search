import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { recruitmentApi } from "./recruitment.api";
export const useRecruitment = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchuseRecruitments = async () => {
    try {
      const res = await recruitmentApi._getList<any>(query);
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
  const createuseRecruitment = async (data: any) => {
    try {
      return await recruitmentApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    }
  };

  const updateuseRecruitment=async(data:any,id:any)=>{
    try{
      return await recruitmentApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }
  };

  const deleteuseRecruitment=async(id:any)=>{
    try{
      return await recruitmentApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };

  return {
    query,
    fetchuseRecruitments,
    createuseRecruitment,
    updateuseRecruitment,
    deleteuseRecruitment,
  };
};
