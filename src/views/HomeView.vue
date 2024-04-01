<template>
  <div>
    <el-container class="h-max-[1000px]">
      <el-header class="sticky top-0 flex items-center border bg-white z-[1000]" style="padding: 0px!important;">
        <el-image :src="logo" class="w-40 h-[50px]" fit="contain"></el-image>
        <div class="w-full h-full flex justify-between items-center">
          <el-menu ellipsis mode="horizontal" :popper-offset="16" class="w-full">
            <el-menu-item index="1">Việc làm</el-menu-item>
            <el-menu-item index="2">
              <template #title>Công ty</template>
            </el-menu-item>
            <el-sub-menu index="3" :popper-offset="8">
              <template #title>Khu vực</template>
              <el-menu-item index="3-1">Miền bắc</el-menu-item>
              <el-menu-item index="3-2">Miền trung</el-menu-item>
              <el-menu-item index="3-3">Miền nam</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <div>
            <div class="w-[340px] flex justify-between items-center">
              <el-input style="width: 240px" size="large" placeholder="Search" :suffix-icon="Search" />
              <!-- <el-badge :value="3" circle>
                <i class="ri-notification-3-line text-xl"></i>
              </el-badge> -->
              <el-badge circle class="cursor-pointer">
                <i class="ri-notification-3-line text-xl"></i>
              </el-badge>
              <!-- <el-dropdown trigger="click">
                <el-avatar
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar>
                <template #dropdown>
                  <el-dropdown-menu class="w-60">
                    <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
                    <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
                    <el-dropdown-item>Quản lý hồ sơ/CV</el-dropdown-item>
                    <el-dropdown-item>Đăng xuất</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown> -->
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

      <el-main class=" " style="padding: 0px!important;">
        <Carousel />
        <Main class="mt-10 mb-10" />
        <Slider />
        <!-- <RouterView /> -->
      </el-main>
    </el-container>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Carousel from '../components/Web/Carousel.vue'
import Main from '../components/Web/Main.vue'
import Slider from '../components/Web/Slider.vue'
import Footer from '../components/Web/Footer.vue';
import logo from "../assets/image-png/logo.png"
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped></style>
