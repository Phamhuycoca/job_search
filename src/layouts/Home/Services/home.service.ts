import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { showErrors } from "@/common/helpers";
import { homeApi } from "./home.api";
export const useJobHome = () => {
  const query_by_home = DEFAULT_COMMON_LIST_QUERY_BY_HOME;
  const fetchJobHome = async () => {
    try {
      const res = await homeApi.ListJobsByHome(query_by_home);
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
  const searchJobHome = async () => {
    try {

      const res = await homeApi.ListJobsByHome(query_by_home);
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
    } 
  };
  return {
    query_by_home,
    fetchJobHome,
    searchJobHome
  };
};
