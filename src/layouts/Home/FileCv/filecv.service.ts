import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { fileCVApi } from "./filecv.api";
export const useFileCV = () => {
  const query = DEFAULT_COMMON_LIST_QUERY_BY_HOME;
  const uploadFileCv = async (data: any) => {
    try {
      return await fileCVApi.uploadCV(data);
    } catch (error) {
      console.error("Error Create:", error);
    }
  };
  return {
    uploadFileCv,
    query
  };
};
