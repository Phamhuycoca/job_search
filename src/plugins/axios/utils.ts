import localStorageAuthService from '@/common/storages/authStorage';
import axios from 'axios';
import router from '@/router';
import { showWarningsNotification, showErrorNotification } from '@/common/helpers';
import { HttpStatus, PageName } from '@/common/constants';

export const logout = (redirectToLogin = true) => {
  //localStorageAuthService.resetAll();
  const currentPage = router.currentRoute;
  if (redirectToLogin && currentPage.value.name !== PageName.LOGIN_PAGE) {
    sessionStorage.setItem('redirect', currentPage.value.fullPath);
    router
      .push({ name: PageName.LOGIN_PAGE })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }
};

export const sendRefreshToken = async () => {
  let responses;
  try {
    const formData=new FormData()
    formData.append("refresh_token",localStorageAuthService.getRefeshToken())
    responses = await axios.post(
      `http://localhost:25874/api/Auth/Refresh_token`,
      formData,
      { 
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    );
    if (responses?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(responses.data?.data.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(responses.data?.data.accessTokenExpiration);
      localStorageAuthService.setRefeshToken(responses.data?.data.refreshToken);
      localStorageAuthService.setRefeshTokenExpiredAt(responses.data?.data.refreshTokenExpiration);
      return;
    }
    logout(true);
    return;
  } catch (error) {
    logout(true);
    return;
  }
};