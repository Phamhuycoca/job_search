import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { favouriteApi } from "./favourite.api";

export const useFarourite = () => {
    const query = DEFAULT_COMMON_LIST_QUERY_BY_HOME;
    const createFarourite = async (data:any) => {
        try {
            return await favouriteApi.createData(data);
          } catch (error) {
            console.error("Error Create:", error);
          } 
    };
    return{
        createFarourite
    }
}