<template>
    <el-container class="h-screen">
        <el-aside width="260px" class="max-h-screen">
            <el-scrollbar class=" bg-black relative ">
                <el-menu default-active="5" active-text-color="#eebe77" background-color="black" text-color="white"
                    style="border: none;" router="true">
                    <el-image :src="logo" class="w-full h-[50px] sticky top-0" fit="contain" style="display: block;" />
                    <el-menu-item index="1" route="/employers/index">
                        <el-icon><icon-menu /></el-icon>
                        <template #title>Dashboard</template>
                    </el-menu-item>
                    <el-menu-item index="2" route="/employers/news">
                        <el-icon><icon-menu /></el-icon>
                        <template #title>Đăng tin tuyển dụng</template>
                    </el-menu-item>
                    <!-- <el-menu-item index="3" route="/employers/recruitment">
                        <el-icon><icon-menu /></el-icon>
                        <template #title>Danh sách ứng viên ứng tuyển</template>
                    </el-menu-item> -->
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>Quản lý thông tin ứng tuyển</span>
                        </template>
                        <el-menu-item index="3-1" route="/employers/job_recruitment">Danh sách ứng viên</el-menu-item>
                        <el-menu-item index="3-2" route="/employers/suitable">Danh sách ứng viên phù hợp</el-menu-item>
                    </el-sub-menu>
                </el-menu>
                <el-menu style="position: absolute; bottom: 0;width: 100%;z-index: 1000;" background-color="#b1b3b8"
                    text-color="black" active-text-color="#eebe77" router="true">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-avatar
                                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar>
                            <span>
                                Thông tin tài khoản
                            </span>
                        </template>
                        <el-menu-item index="1-1" route="/employers/account">
                            Thông tin tài khoản
                        </el-menu-item>
                        <el-menu-item index="1-2" @click="Logout">Đăng xuất</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header class="flex justify-end items-center ">
                <div class="w-[90px] flex justify-end items-center">
                    <el-dropdown trigger="click">
                        <el-badge :value="count" circle>
                            <i class="ri-notification-3-line text-xl"></i>
                        </el-badge>
                        <template #dropdown class="mr-10">
                            <el-dropdown-menu style="width: 400px; padding: 0; height: 100%;">
                                <div
                                    class="flex flex-col rounded-xl border-gray-300 hover:border-gray-500 overflow-hidden shadow-xl w-full border-1">
                                    <div
                                        class="h-14 bg-white border-b transition-all gap-2 p-4 flex flex-row items-center">
                                        <span class="flex-grow font-bold">Thông báo</span>
                                    </div>
                                    <div class="flex flex-col bg-whiteflex-grow bg-white">
                                        <el-scrollbar max-height="600px">
                                            <div class="min-hv-4 overflow-y-auto flex-grow p-2"
                                                style="max-height:calc(60vh - 56px)" v-for="item in notifications"
                                                :key="item">
                                                <div
                                                    class="h-8 px-3 py-6 mx-auto text-sm hover:bg-slate-300 w-full flex items-center cursor-pointer rounded-md">
                                                    {{ item.message }}
                                                </div>
                                            </div>
                                        </el-scrollbar>
                                    </div>
                                    <div class="flex p-4 bg-white border-t h-14 hover:text-brand">
                                        Xem tất cả
                                    </div>
                                </div>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main class="bg-slate-100">
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import * as signalR from "@microsoft/signalr";

import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import logo from "../../assets/image-png/logo.png";
import { useRecruitment } from '@/layouts/Home/Recruitment/Services/recruitment.service';
const { fetchuseRecruitmentsByEmployer } = useRecruitment();
const { isAuthenticated, logout } = useAuthService();
import { useAuthService } from "@/pages/Auth/Services/auth.service";
const { fetchNotificationsByEmployer } = useNotifications();
const total_notifications = ref<number>(0);
const notifications = ref<any | undefined>([]);
import {
    Menu as IconMenu,
    Location,
    Setting,
    TrendCharts,
} from "@element-plus/icons-vue";
import router from "@/router";
import { useNotifications } from "@/store/notification";
const isCollapse = ref(false);
const count = ref<any>(0);
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const loadNotifications = async () => {
    const res = await fetchNotificationsByEmployer();
    notifications.value = res?.data;
    count.value = notifications.value.length;
}
async function setupSignalRConnection() {
    try {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:25874/notificationHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        await loadNotifications();

        connection.on("ReceiveNotification", (message: string) => {
            loadNotifications();
        });

        await connection.start();
    } catch (error) {
        console.error('Error setting up SignalR connection:', error);
    }
}
const loadData = async () => {
    if (isAuthenticated.value) {
        // setupSignalRConnection();
    }
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const Logout = () => {
    alert('Logout');
}
onMounted(() => {
    loadData();
})
</script>
<style scoped>
.el-card__header {
    background-color: aquamarine;
}
</style>