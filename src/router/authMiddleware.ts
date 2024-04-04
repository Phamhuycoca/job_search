import { PageName, Role } from "@/common/constants";
import {
  showErrorNotification,
  showWarningsNotification,
} from "@/common/helpers";
import localStorageAuthService from "@/common/storages/authStorage";
import dayjs from "@/plugins/dayjs";
import { onBeforeRouteUpdate, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router";
export default async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const role = localStorageAuthService.getRole();
  const IS_PUBLIC = to?.meta?.public || false;
  const hasToken = localStorageAuthService.getAccessToken() ? true : false;
  const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
  const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), "second");
  const isExpiredRefresh = dayjs().isAfter(
    dayjs(localStorageAuthService.getRefeshTokenExpiredAt()),
    "second"
  );
  console.log(isExpiredRefresh);
  const RoleRouter = to?.meta?.role||Role.JOB_SEEKER;
  const IS_AUTHENTICATED = tokenExpiredAt && !isExpired && hasToken;
  if(to.name === PageName.LOGIN_PAGE)
  {
    localStorageAuthService.resetAll()
  }
  if (IS_PUBLIC) {
    if(IS_AUTHENTICATED){
      if (role === RoleRouter) {
        return next(true);
      } else {
        showErrorNotification("Bạn không có quyền");
        return next(false);
      }
    }else{
      return next();
    }
  }
  if (!IS_AUTHENTICATED) {
    if (isExpiredRefresh) {
      showWarningsNotification("Vui lòng đăng nhập lại");
      return next({ name: PageName.LOGIN_PAGE });
    } else {
      return next();
    }
  }
  if (!IS_PUBLIC) {
    if (IS_AUTHENTICATED) {
      if (role === RoleRouter) {
        return next(true);
      } else {
        showErrorNotification("Không thể thực hiện");
        return next(false);
      }
    }
  }
  if (!IS_PUBLIC && !IS_AUTHENTICATED) {
    return next({
      name: PageName.LOGIN_PAGE,
    });
  }
  return next();
};
