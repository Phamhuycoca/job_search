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
      console.error("Error Fetching Roles:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  const searchRoles = async () => {
    try {
      loading.showLoading(true);

      const res = await roleApi._getList<any>(query);
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
      console.error("Error Search Roles:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  const createPole = async (data: any) => {
    try {
      loading.showLoading(true);
      const res = await roleApi.createData(data);
      console.log(res);
    } catch (error) {
      console.error("Error Search Roles:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  return {
    fetchRoles,
    query,
    searchRoles,
    createPole,
  };
};
