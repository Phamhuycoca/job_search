import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { permissionApi } from "./permission.api";
const loading = useLoadingStore();
export const usePermission = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchPermissions = async () => {
    try {
      loading.showLoading(true);
      const res = await permissionApi.getPermissions();
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
//   const searchRoles = async () => {
//     try {
//       loading.showLoading(true);

//       const res = await permissionApi._getList<any>(query);
//       console.log("search");
//       if (res.success) {
//         return {
//           items: res.items,
//           totalItems: res.totalItems,
//         };
//       }
//       return {
//         items: [],
//         totalItems: 0,
//       };
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }finally {
//       loading.showLoading(false);
//     }
//   };
  return {
    fetchPermissions,
    query,
  };
};
