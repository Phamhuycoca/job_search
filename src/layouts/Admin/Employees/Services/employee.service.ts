import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { employeeApi } from "./employee.api";
import { showErrors } from "@/common/helpers";
const loading = useLoadingStore();
export const useEmployee = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchEmployees = async () => {
    try {
      loading.showLoading(true);
      const res = await employeeApi._getList<any>(query);
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
  const searchEmployees = async () => {
    try {
      loading.showLoading(true);

      const res = await employeeApi._getList<any>(query);
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
      console.error("Error Search Roles:", error);
    } finally {
      loading.showLoading(false);
    }
  };
  const createEmployee = async (data: any) => {
    try {
      loading.showLoading(true);
      return await employeeApi.createData(data);
    } catch (error) {
      console.error("Error Create Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const updateEmployee = async (data: any, id: any) => {
    try {
      loading.showLoading(true);
      return await employeeApi.updateData(data, id);
    } catch (error) {
      console.error("Error Update Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const getData = async (id: any) => {
    try {
      loading.showLoading(true);
      return await employeeApi.getData(id);
    } catch (error) {
      console.error("Error GetDetail Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  const deleteEmployee = async (id: any) => {
    try {
      loading.showLoading(true);
      return await employeeApi.deleteData(id);
    } catch (error) {
      console.error("Error Delete Role:", error);
    } finally {
      loading.showLoading(false);
    }
  };

  return {
    fetchEmployees,
    query,
    searchEmployees,
    createEmployee,
    getData,
    updateEmployee,
    deleteEmployee,
  };
};
