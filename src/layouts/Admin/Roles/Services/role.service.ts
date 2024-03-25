import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { roleApi } from "./role.api";
import { useLoadingStore } from "@/store/loading.store";
const loading = useLoadingStore();
export const useRole = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchRoles = async () => {
    try {
      loading.showLoading(true);
      const res = await roleApi._getList<any>(query);
      console.log(res);
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
      console.error("Error fetching user:", error);
    }finally {
      loading.showLoading(false);
    }
  };
  const searchRoles = async () => {
    try {
      loading.showLoading(true);

      const res = await roleApi._getList<any>(query);
      console.log("search");
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
      console.error("Error fetching user:", error);
    }finally {
      loading.showLoading(false);
    }
  };
  return {
    fetchRoles,
    query,
    searchRoles,
  };
};
