<template>
    <el-container class="h-screen">
        <el-aside width="auto" class="h-full bg-[#cbf4ca] border">
            <el-scrollbar style="width: auto;">
                <el-menu default-active="5" active-text-color="#c4e7c3" text-color="black" background-color="#ccc"
                    :collapse="isCollapse" style="border: none;" class="w-72 h-screen" :default-openeds="['1', '6']"
                    router="true">
                    <el-image :src="logo" class="w-full h-[50px] sticky top-0" fit="contain" style="display: block;" />
                    <el-menu-item index="1" route="/admin/dashboard" class="rounded-xl">
                        <el-icon>
                            <i class="ri-bar-chart-2-fill"></i>
                        </el-icon>
                        <template #title>
                            <span>Dashboard</span>
                        </template>
                    </el-menu-item>
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
import logo from "../../assets/image-png/logo.png";

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

</script>
<style></style>