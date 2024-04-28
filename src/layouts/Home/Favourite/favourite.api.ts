import type {
  IBodyResponse,
  ICommonListQueryByHome,
  ItemsList,
} from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from "@/common/constants";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

class FavouriteApiService extends ApiService {
  changeFavourite(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}/FavouriteJob`, data);
  }
  // favourite_Jobs(DEFAULT_COMMON_LIST_QUERY_BY_HOME:any):Promise<any> {
  //   return this.client.get(`${this.baseUrl}/Favourite_Jobs`, {
  //       params: DEFAULT_COMMON_LIST_QUERY_BY_HOME
  //       }
  //   );
  itemsList(): Promise<ItemsList> {
    return this.client.get(`${this.baseUrl}/Favourite_Jobs`);
  }
}
export const favouriteApi = new FavouriteApiService(
  { baseUrl: "/Favourite" },
  axiosInstance
);
