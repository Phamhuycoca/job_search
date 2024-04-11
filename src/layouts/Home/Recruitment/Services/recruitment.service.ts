import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { recruitmentApi } from "./recruitment.api";
export const useRecruitment = () => {
  const query = DEFAULT_COMMON_LIST_QUERY_BY_HOME;
  const fetchuseRecruitmentsByJob_seeker = async () => {
    try {
      const res = await recruitmentApi.ItemsByJob_seeker(query);
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
  const fetchuseRecruitmentsByEmployer=async()=>{
    try {
      const res = await recruitmentApi.ItemsByEmployer(query);
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

  const changeFeedback =async(data:any)=>{
    try{
      return await recruitmentApi.ChangeFeedback(data);
    }catch (error) {
      console.error("Error ChangeFeedback:");
    }
  };

  const changeStatus =async(data:any)=>{
    try{
      return await recruitmentApi.ChangeStatus(data);
    }catch (error){
      console.error("Error ChangeStatus");
    }
  };

  const searchByEmployer=async()=>{
    try {
      const res = await recruitmentApi.ItemsByEmployer(query);
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
  }
  

  return {
    query,
    fetchuseRecruitmentsByJob_seeker,
    createuseRecruitment,
    updateuseRecruitment,
    deleteuseRecruitment,
    fetchuseRecruitmentsByEmployer,
    changeFeedback,
    changeStatus,
    searchByEmployer
  };
};
