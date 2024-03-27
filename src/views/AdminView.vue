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
              <span>Quản lý chức năng</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">Bài đăng</el-menu-item>
              <el-menu-item index="2-2">Quảng cáo</el-menu-item>
              <el-menu-item index="2-3">Banner</el-menu-item>
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
              <el-menu-item index="4-2" route="/admin/roles">Quản lý phân quyền hệ thống</el-menu-item>
              <el-menu-item index="4-1">Quản lý chức vụ</el-menu-item>
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
              <el-menu-item index="5-2">Quản lý kinh nghiệm làm việc</el-menu-item>
              <el-menu-item index="5-2">Quản lý khu vực</el-menu-item>
              <el-menu-item index="5-3">Quản lý mẫu cv</el-menu-item>
              <el-menu-item index="5-4">Quản lý thông tin nhà tuyển dụng</el-menu-item>
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
  </el-container>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import logo from "../assets/image-png/logo.png";

import {
  Menu as IconMenu,
  Location,
  Setting,
  TrendCharts,
} from "@element-plus/icons-vue";
import router from "@/router";
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>
