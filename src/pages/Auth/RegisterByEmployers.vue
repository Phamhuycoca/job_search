<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <el-image class="mx-auto h-20 w-auto" :src="logo" fit="cover" alt="Your Company" />
            <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng ký nhà tuyển
                dụng
            </h2>
        </div>
        <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nhập tên công
                        ty</label>
                    <div class="mt-1">
                        <el-input style="width: 380px;height: 40px;" placeholder="Nhập tên công ty"
                            v-model="companyName" />
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nhập email</label>
                    <div class="mt-1">
                        <el-input style="width: 380px;height: 40px;" placeholder="Nhập email" v-model="email" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Nhập mật
                            khẩu</label>
                    </div>
                    <div class="mt-1">
                        <el-input style="width: 380px;height: 40px;" placeholder="Nhập mật khẩu" type="password"
                            show-password v-model="password" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Nhập lại mật
                            khẩu</label>
                    </div>
                    <div class="mt-1">
                        <el-input v-model="password_confirm" style="width: 380px;height: 40px;"
                            placeholder="Nhập lại mật khẩu" type="password" show-password />
                    </div>
                </div>
                <div>
                    <el-button type="primary" @click="registerClick"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng
                        ký</el-button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Nếu bạn có tài khoản?
                <router-link to="/loginbyemployers"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Vui
                    lòng đăng
                    nhập</router-link>
            </p>
        </div>
    </div>

</template>

<script lang="ts" setup>
import logo from '../../assets/image-png/logo.png'
import google from '../../assets/image-png/google.png'
import facebook from '../../assets/image-png/facebook.png'
const loading = useLoadingStore();
const { employerregister } = useAuthService();
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useAuthService } from './Services/auth.service';
import { showErrorNotification, showErrors, showSuccessNotification, showToasrErrors } from '@/common/helpers';
import { useLoadingStore } from '@/store/loading.store';
import router from '@/router';
const input = ref('')
const companyName = ref('')
const email = ref('')
const password = ref('')
const password_confirm = ref('')
const registerClick = async () => {
    if (email.value !== '' || companyName.value !== '' || password.value !== '' || password_confirm.value !== '') {
        if (password.value === password_confirm.value) {
            loading.showLoading(true);
            const formData = new FormData();
            formData.append('email', email.value);
            formData.append('companyName', companyName.value);
            formData.append('password', password.value);
            const res = await employerregister(formData);
            if (res.success) {
                showSuccessNotification(res.message);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                if (res.errors !== undefined) {
                    console.log(res.errors);
                    showErrors(res.errors);
                }
            }
            loading.showLoading(false);
        } else {
            ElMessage({
                message: 'Mật khẩu không trùng khớp.',
                type: 'warning',
            })
        }
    } else {
        ElMessage({
            message: 'Vui lòng nhập đầy đủ thông tin.',
            type: 'error',
        })
    }
};
</script>

<style></style>