<template>
    <div class="min-h-[600px] w-full">
        <el-row justify="center" :gutter="20">
            <el-col :span="19">
                <el-row :gutter="15" v-if="total > 0">
                    <el-col :span="12" v-for="item in jobDatas" :key="item">
                        <el-card shadow="hover" class="max-h-[300px] mb-4">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <el-image style="height: 100px; width: 100px" fit="cover" :src="item.companyLogo" />
                                </el-col>
                                <el-col :span="16" class="w-full max-h-full">
                                    <div class="flex flex-col h-full">
                                        <router-link :to="`/jobdetail/${item.jobId}`"
                                            class="cursor-pointer hover:text-indigo-500 hover:underline">
                                            <el-tooltip :content="item.jobName" placement="top">
                                                {{ item.jobName }}
                                            </el-tooltip>
                                        </router-link>
                                        <router-link :to="`/compannydetail/${item.employersId}`"
                                            class="uppercase cursor-pointer hover:text-[blue] hover:underline">
                                            <el-tooltip :content="item.companyName" placement="top">
                                                {{ item.companyName }}
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flex items-center">
                                            <div class="mr-2 bg-slate-100 p-1 rounded">
                                                {{ item.salaryPrice }}vnđ
                                            </div>
                                            -
                                            <div class="ml-2 bg-slate-100 p-1 rounded">
                                                {{ item.cityName }}
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="mr-2"> {{ item.formofworkName }} </div> - <div
                                                class="ml-2 text-sm">Hạn {{
                                                    item.expirationDate
                                                }}</div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="4" class="w-full max-h-full relative">
                                    <el-tooltip content="Số lượt thích 1k" placement="top">
                                        <div class="flex justify-center items-center text-sm cursor-pointer">
                                            <i class="text-3xl cursor-pointer m-2 ri-heart-fill text-red-500"></i>
                                            Yêu thích
                                        </div>
                                    </el-tooltip>
                                    <el-button class="absolute bottom-0" type="success" plain v-if="isAuthenticated"
                                        @click="dialog = true, currentItem = item">Ứng
                                        tuyển</el-button>
                                    <el-button v-else class="absolute bottom-0" type="success" plain @click="open4">Ứng
                                        tuyển</el-button>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <div class="w-full flex justify-center">
                        <span class="text-2xl">Không có dữ liệu</span>
                    </div>
                </el-row>
                <!-- <div class="float-end mt-4">
                    <el-pagination background layout="prev, pager, next" :total="totalItems" v-model="page" prev-text
                        v-model:current-page="page" />
                </div> -->

            </el-col>
        </el-row>
        <RecruimentDialog :dialog="dialog" @close="dialog = false" :currentItem="currentItem" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useLoadingStore } from '@/store/loading.store';
import { useFarourite } from './favourite.service';
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
const { isAuthenticated } = useAuthService();

import RecruimentDialog from '../Recruitment/RecruimentDialog.vue';
import { useAuthService } from '@/pages/Auth/Services/auth.service';
import { ElMessage } from 'element-plus';
const loading = useLoadingStore();
const { fetchEmployer } = useFarourite();
const totalItems = ref<Number | undefined>(0);
const total = ref<number>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const jobDatas = ref<any | undefined>([]);
const dialog = ref(false);
const currentItem = ref([]);
const loadJobs = async () => {
    const data = await fetchEmployer();
    jobDatas.value = data?.items;
    console.log(jobDatas.value);
    totalItems.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / 10) * 10;
    total.value = data?.totalItems;
};
const open4 = () => {
    ElMessage({
        message: 'Vui lòng đăng nhập',
        type: 'error',
    })
}
onMounted(() => {
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    loadJobs();
})
</script>

<style></style>