<template>
  <el-container class="h-screen">
    <el-aside width="auto" class="h-full bg-[#101726]">
      <el-scrollbar style="width: auto;">
        <el-menu default-active="5" active-text-color="#ffd04b" text-color="#fff" background-color="black"
          :collapse="isCollapse" @open="handleOpen" @close="handleClose"
          style="background-color: #101726; border: none;" class="w-72 h-screen" :default-openeds="['1', '6']"
          router="true">
          <el-image :src="logo" class="w-full h-[50px] sticky top-0" fit="contain" style="display: block;" />
          <el-menu-item index="1" route="/admin/dashboard">
            <el-icon>
              <i class="ri-bar-chart-2-fill"></i>
            </el-icon>
            <template #title>
              <span>Dashboard</span>
            </template>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <i class="ri-news-line"></i>
              </el-icon>
              <span>Quản lý website</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" route="/admin/admin_employer">Danh sách các công ty</el-menu-item>
              <el-menu-item index="2-3" route="/admin/admin_banner">Quản lý banner</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <i class="ri-group-fill"></i> </el-icon><span>Quản lý nhân sự</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" route="/admin/employees">Nhân viên</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <i class="ri-settings-2-fill"></i>
              </el-icon>
              <span>Cài đặt</span>
            </template>
            <el-menu-item-group>
              <template #title>Chức vụ</template>
              <el-menu-item index="4-2" route="/admin/roles">Quản lý chức vụ và phân quyền hệ thống</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <i class="ri-function-line"></i>
              </el-icon>
              <span>Chức năng cho website</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" route="/admin/formofwork">Quản lý hình thức làm việc</el-menu-item>
              <el-menu-item index="5-2" route="/admin/workexperience">Quản lý kinh nghiệm làm việc</el-menu-item>
              <el-menu-item index="5-3" route="/admin/salary">Quản lý lương</el-menu-item>
              <el-menu-item index="5-4" route="/admin/profession">Quản lý thông nghành nghề</el-menu-item>
              <el-menu-item index="5-5" route="/admin/city">Quản lý Khu vực</el-menu-item>
              <el-menu-item index="5-6" route="/admin/companny">Quản lý thông tin nhà tuyển dụng</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="flex justify-between items-center">
        <div @click="isCollapse = !isCollapse" class="cursor-pointer">
          <i class="ri-menu-line"></i>
        </div>
        <div class="w-[90px] flex justify-between items-center">
          <el-badge :value="3" circle>
            <i class="ri-notification-3-line text-xl"></i>
          </el-badge>

          <el-dropdown trigger="click">
            <el-avatar
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu class="w-60">
                <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
                <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
                <el-dropdown-item>Đăng xuất</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="bg-[#F5F7FA]">
        <RouterView />
      </el-main>
    </el-container>
    <ConfirmLogout :dialog="dialog" @close="dialog = false" @Logout="Logout" />
  </el-container>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import logo from "../assets/image-png/logo.png";
const dialog = ref(false);
const Logout = async () => {

}
import {
  Menu as IconMenu,
  Location,
  Setting,
  TrendCharts,
} from "@element-plus/icons-vue";
import router from "@/router";
import ConfirmLogout from "@/components/Element/ConfirmLogout.vue";
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script>
