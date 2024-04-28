import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { favouriteApi } from "./favourite.api";
import { showErrors } from "@/common/helpers";

export const useFarourite = () => {
    const query = DEFAULT_COMMON_LIST_QUERY_BY_HOME;
    const fetchfavouriteJobs = async () => {
      try {
        //const res = await favouriteApi.favourite_Jobs(DEFAULT_COMMON_LIST_QUERY_BY_HOME);
        return await favouriteApi.itemsList();
      } catch (error) {
        console.error("Error Fetching:", error);
      } 
    };
    const changeFavourites = async (data:any) => {
        try {
            return await favouriteApi.changeFavourite(data);
          } catch (error) {
            console.error("Error Create:", error);
          } 
    };
    return{
        changeFavourites,
        fetchfavouriteJobs
    }
}