<template>
  <div>
    <el-container>

      <el-header class="sticky top-0 flex items-center border bg-white z-[1000]" style="padding: 0px!important;">
        <router-link to="/">
          <el-image :src="logo" class="w-40 h-[50px] cursor-pointer" fit="contain">
          </el-image>
        </router-link>
        <div class="w-full h-full flex justify-between items-center">
          <div class="flex w-[300px] justify-between">
            <el-link href="/joblist" class="-m-2 block p-2 font-medium text-gray-900">Việc làm</el-link>
            <el-link href="/compannylist" class="-m-2 block p-2 font-medium text-gray-900">Công ty</el-link>
            <el-link href="#" class="-m-2 block p-2 font-medium text-gray-900">Tin tức</el-link>
            <el-link href="/createcv" class="-m-2 block p-2 font-medium text-gray-900">CV xin việc</el-link>
          </div>
          <div>
            <div v-if="isShow" class="w-[80px] flex justify-between items-center">
              <el-dropdown trigger="click">
                <el-badge :value="total_notifications" circle>
                  <i class="ri-notification-3-line text-xl"></i>
                </el-badge>
                <template #dropdown>
                  <el-card body-style="padding:0;margin:4px 0px 4px 0px;" class="w-[450px]">
                    <template #header>
                      <div class="w-full text-2xl">
                        Thông báo
                      </div>
                    </template>
                    <el-scrollbar max-height="600px">
                      <el-dropdown-menu class="w-full" v-for="item in notifications" :key="item"
                        v-if="total_notifications > 0">
                        <el-dropdown-item>
                          {{ item.message }}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                      <el-dropdown-menu class="w-full flex justify-center" v-else>
                        <div class="text-2xl">
                          Không có thông báo
                        </div>
                      </el-dropdown-menu>
                    </el-scrollbar>
                    <template #footer>
                      <div class="w-full flex justify-between items-center">
                        <el-text size="large" class="cursor-pointer">Xem tất cả</el-text>
                        <el-text size="large" class="cursor-pointer">Đọc tất cả</el-text>
                      </div>
                    </template>
                  </el-card>
                </template>
              </el-dropdown>
              <el-dropdown trigger="click">
                <el-avatar :src="currentProfile.avatar"
                  v-if="currentProfile.avatar !== null || currentProfile.avatar !== ' ' || currentProfile !== null"></el-avatar>
                <el-avatar v-else
                  src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713533834/account_gzt5kr.png"></el-avatar>
                <template #dropdown>
                  <el-dropdown-menu class="w-60">
                    <router-link to="/job_seeker">
                      <el-dropdown-item>
                        Thông tin tài khoản
                      </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
                    <router-link to="/managercv">
                      <el-dropdown-item>Quản lý hồ sơ/CV</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item @click="dialog = true">Đăng xuất</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div v-else class="w-[80px] flex justify-between items-center">
              <el-badge circle class="cursor-pointer">
                <i class="ri-notification-3-line text-xl"></i>
              </el-badge>
              <el-dropdown trigger="click">
                <el-icon class="mr-4">
                  <i class="ri-account-circle-line text-2xl"></i>
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu class="w-full">
                    <el-dropdown-item>
                      <router-link to="/login">Đăng nhập/đăng với tư cách ký ứng viên</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link to="/loginbyemployers">
                        Đăng nhập/đăng ký với tư cách nhà tuyển dụng
                      </router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>

      <el-main style="padding: 0px!important;height: 100%;">
        <div v-if="$router.currentRoute.value.path === '/'">
          <Carousel />
          <Main class="mt-10 mb-10" />

          <Slider />
        </div>
        <RouterView v-else />
        <!-- <el-button v-if="showScrollButton" class="scroll-to-top w-20 h-16 z-[1000]" @click="scrollToTop" plain
          type="danger">
          <el-icon class="text-3xl">
            <ArrowUpBold />
          </el-icon>
        </el-button> -->
        <i v-if="showScrollButton" @click="scrollToTop"
          class="ri-arrow-up-circle-fill text-5xl scroll-to-top w-20 h-16 z-[1000]"></i>
      </el-main>
    </el-container>
    <Footer />
    <ConfirmLogout :dialog="dialog" @close="dialog = false" @Logout="Logout" />
  </div>
</template>

<script lang="ts" setup>
import * as signalR from "@microsoft/signalr";
const { fetchNotifications } = useNotifications();
//const connection = ref<signalR.HubConnection | null>(null);
import Carousel from '../components/Web/Carousel.vue'
import Main from '../components/Web/Main.vue'
import Slider from '../components/Web/Slider.vue'
import Footer from '../components/Web/Footer.vue';
import logo from "../assets/image-png/logo.png"
import { Search } from "@element-plus/icons-vue";
import { onBeforeUnmount, onMounted, ref } from 'vue';
const dialog = ref(false);
const { isAuthenticated, logout, getProfileJob_Seeker } = useAuthService();
const isShow = ref(false);
import { useAuthService } from '../pages/Auth/Services/auth.service';
import { useRecruitment } from '@/layouts/Home/Recruitment/Services/recruitment.service';
import ConfirmLogout from '@/components/Element/ConfirmLogout.vue';
import { useNotifications } from "@/store/notification";
const { fetchuseRecruitmentsByJob_seeker } = useRecruitment();
const total_notifications = ref<number>(0);
const notifications = ref<any | undefined>([]);
const currentProfile = ref<any | undefined>([]);

const count = ref<any>(0);
const Logout = async () => {
  const res = await logout();
  if (res) {
    dialog.value = false;
    setTimeout(() => {
      window.location.href = '/';
    }, 2000)
  }
}
const loadNotifications = async () => {
  const res = await fetchNotifications();
  notifications.value = res?.items;
  total_notifications.value = res?.totalItems;
}
// const connection = new signalR.HubConnectionBuilder()
//   .withUrl("http://localhost:25874/notificationHub")
//   .configureLogging(signalR.LogLevel.Information)
//   .build();

// connection.on("ReceiveNotification", (message: string) => {
//   loadNotifications();
// });

// connection.start().catch(err => console.error(err));
async function setupSignalRConnection() {
  try {
    // Setup SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:25874/notificationHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    await loadNotifications();

    // Configure the connection to listen for "ReceiveNotification" events
    connection.on("ReceiveNotification", (message: string) => {
      // Call the loadNotifications function asynchronously when a notification is received
      loadNotifications();
    });

    // Start the connection
    await connection.start();
  } catch (error) {
    console.error('Error setting up SignalR connection:', error);
  }
}
onMounted(async () => {
  if (isAuthenticated.value) {
    const res = await fetchuseRecruitmentsByJob_seeker();
    count.value = res?.totalItems;
    const profile = await getProfileJob_Seeker();
    currentProfile.value = profile.data;
    setupSignalRConnection();

  }
  isShow.value = isAuthenticated.value;
  window.addEventListener('scroll', handleScroll);
})
const showScrollButton = ref(false);
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 100; // Adjust 1000 to your desired scroll threshold
}
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
})
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}


.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none !important;
}
</style>
