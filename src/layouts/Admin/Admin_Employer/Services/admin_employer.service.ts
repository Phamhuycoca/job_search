import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";

import { showErrors } from "@/common/helpers";
import { admin_emplyerApi } from "./admin_employer.api";
const loading = useLoadingStore();
export const useAdmin_Employer = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetch = async () => {
    try {
      loading.showLoading(true);
      const res = await admin_emplyerApi._getList<any>(query);
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
  const search = async () => {
    try {
      loading.showLoading(true);

      const res = await admin_emplyerApi._getList<any>(query);
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
  const update=async(id:any)=>{
    try{
      loading.showLoading(true);
      return await admin_emplyerApi.updateData(id);
    }catch (error) {
      console.error("Error Update:", error);
    }finally {
      loading.showLoading(false);
    }
  };

  const fetchEmployer = async () => {
    try {
      loading.showLoading(true);
      const res = await admin_emplyerApi.employers(query);
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
  return {
    update,
    fetch,
    query,
    search,
    fetchEmployer
  };
};
