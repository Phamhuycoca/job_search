<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <el-image class="mx-auto h-20 w-auto" :src="logo" fit="cover" alt="Your Company" />
            <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng nhập
            </h2>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6">
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
                    <!-- <el-button class="flex justify-center items-center w-48">
                        <el-image :src="google" class="mr-2" />
                        <span class="text-xs">Google</span>
                    </el-button> -->
                    <div class="flex justify-center items-center w-48">

                        <GoogleLogin :callback="callback" prompt cancelOnTapOutside="false" />
                    </div>
                    <!-- <el-button class="flex justify - center items - center w - 48">
                        <el-image :src="google" class="mr-2" />
                        <span class="text-xs">Google</span>
                    </el-button> -->
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
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import logo from '../../assets/image-png/logo.png'
import google from '../../assets/image-png/google.png'
import facebook from '../../assets/image-png/facebook.png'
import { ref } from 'vue'
import { useAuthService } from '../Auth/Services/auth.service'
import { useOneTap, type CredentialResponse } from "vue3-google-signin";
const { loginbyEmail } = useAuthService();
import type { IBodyLogin } from './Services/interfaces';
import router from '../../router';
import { useLoadingStore } from '../../store/loading.store';
import axios from 'axios';
import localStorageAuthService from '@/common/storages/authStorage';
import { showErrors, showSuccessNotification } from '@/common/helpers';

import type { CallbackTypes } from "vue3-google-login";
// const email = ref('');
// const password = ref('');
const loading = useLoadingStore();
const { handleSubmit, resetForm } = useForm();
const callback: CallbackTypes.CredentialCallback = (response) => {
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log("Credential JWT string", response.credential);
    sendTokenToBackend(response.credential);
};

// Handle Google Login

const { value: email, errorMessage: emailError } = useField(
    'email',
    yup
        .string()
        .required("Không được bỏ trống")
);


const { value: password, errorMessage: passwordError } = useField(
    'password',
    yup
        .string()
        .required("Không được bỏ trống")
);
const submitLogin = handleSubmit(async values => {
    const res = await loginbyEmail({ email: values.email, password: values.password });
    if (res.success) {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }
})

// const { isReady, login } = useOneTap({
//     disableAutomaticPrompt: true,
//     onSuccess: (response: CredentialResponse) => {
//         console.log("Success:", response);
//         sendTokenToBackend(response.credential);
//     },
//     onError: () => console.error("Error with One Tap Login"),
// });
const sendTokenToBackend = async (credential: any) => {
    try {
        loading.showLoading(true);
        const response = await axios.post('http://localhost:25874/api/Auth/google-login', { credential });
        console.log(response.data);
        if (response.data.success) {
            showSuccessNotification(response.data.message);
            localStorageAuthService.setAccessToken(response.data.data?.accessToken);
            localStorageAuthService.setAccessTokenExpiredAt(response.data.data?.accessTokenExpiration);
            localStorageAuthService.setRole(response.data.data?.role);
            loading.showLoading(false);
            setTimeout(() => {
                router.push('/');
            }, 3000)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.errors !== undefined) {
                showErrors(error.response?.data.errors);
            }
        }
        loading.showLoading(false);
    };
}
</script>

<style></style>