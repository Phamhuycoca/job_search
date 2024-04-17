import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { fileCVApi } from "./filecv.api";
export const useFileCV = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchFileCvs = async () => {
    try {
      const res = await fileCVApi.Items(query);
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
  const uploadFileCv = async (data: any) => {
    try {
      return await fileCVApi.uploadCV(data);
    } catch (error) {
      console.error("Error Create:", error);
    }
  };
  const deletefileCV=async(id:any)=>{
    try{
      return await fileCVApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };
  return {
    uploadFileCv,
    query,
    fetchFileCvs,
    deletefileCV
  };
};
