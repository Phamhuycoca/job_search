<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <el-image class="mx-auto h-20 w-auto" :src="logo" fit="cover" alt="Your Company" />
            <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng nhập
            </h2>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nhập email</label>
                    <div class="mt-2">
                        <el-input v-model="email" style="width: 380px;height: 40px;" placeholder="Nhập email" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Nhập mật
                            khẩu</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-blue-400 hover:text-indigo-500">Quên mật khẩu?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <el-input v-model="password" style="width: 380px;height: 40px;" placeholder="Nhập mật khẩu"
                            type="password" show-password />

                    </div>
                </div>

                <div>
                    <el-button type="primary" @click="submitLogin"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng
                        nhập</el-button>
                </div>
                <div class="flex">
                    <el-button class="flex justify-center items-center w-48">
                        <el-image :src="google" class="mr-2" />
                        <span class="text-xs">Google</span>
                    </el-button>
                    <el-button class="flex justify-center items-center w-48">
                        <el-image :src="facebook" class="mr-2" />
                        <span class="text-xs">Facebook</span>
                    </el-button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Nếu bạn chưa có tài khoản?
                <router-link to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Vui
                    lòng đăng
                    ký</router-link>
            </p>
        </div>
    </div>

</template>

<script lang="ts" setup>
import logo from '../../assets/image-png/logo.png'
import google from '../../assets/image-png/google.png'
import facebook from '../../assets/image-png/facebook.png'
import { ref } from 'vue'
import { useAuthService } from '../Auth/Services/auth.service'
import { authApi } from './Services/auth.api'
import { showErrors, showSuccessNotification } from '../../common/helpers'
const email = ref('');
const password = ref('');
const submitLogin = async () => {
    const res = await authApi.login({ email: email.value, password: password.value });
    if (res.success) {
        showSuccessNotification(res.message);
    } else {
        showErrors(res.errors);
    }
}
</script>

<style></style>