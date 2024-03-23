import localStorageAuthService from '@/common/storages/authStorage';
import axios from 'axios';
import router from '@/router';
import { showWarningsNotification, showErrorNotification } from '@/common/helpers';
import { HttpStatus, PageName } from '@/common/constants';

export const logout = (redirectToLogin = true) => {
  localStorageAuthService.resetAll();
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
  let response;
  alert('refresh_token 2');
  try {
    const formData=new FormData()
    formData.append("refresh_token",localStorageAuthService.getRefeshToken())
    response = await axios.post(
      `http://localhost:25874/api/Auth/Refresh_token`,
      formData,
      { 
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    );
    // console.log(response.data.data);
    // console.log(response?.status);
    // console.log(response?.data);
    if (response?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(response.data?.data.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(response.data?.data.accessTokenExpiration);
      localStorageAuthService.setRefeshToken(response.data?.data.refreshToken);
      localStorageAuthService.setRefeshTokenExpiredAt(response.data?.data.refreshTokenExpiration);
      return;
    }
    logout(true);
    return;
  } catch (error) {
    showErrorNotification('Vui lòng đăng nhập lại');
    logout(true);
    return;
  }
};