<template>
    <div class="min-h-screen w-full">
        <el-row class="px-2 mt-2">
            <el-col :span="11">
                <el-row>
                    <el-col :span="24"
                        class="flex items-center rounded-md p-2 hover:border hover:shadow-lg transition duration-300 ease-in-out">
                        <el-image class="w-20 h-20 rounded-md" fit="cover" :src="companny.companyLogo" />
                        <div
                            class="text-xl ml-4 cursor-pointer w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {{ companny.companyName }}
                        </div>
                    </el-col>
                    <el-col :span="24"
                        class="mt-4 p-4 rounded-md hover:border hover:shadow-lg transition duration-300 ease-in-out">
                        <div class="text-[#37a84a] text-2xl mt-2 flex items-center">
                            Giới thiệu về công ty
                            <i class="ri-community-line text-xl ml-1"></i>
                        </div>
                        <div class="indent-8 mt-2 leading-8 text-base text-gray-700">{{ companny.companyDescription
                            }}
                        </div>
                    </el-col>
                    <el-col :span="24"
                        class="mt-4 p-4 rounded-md hover:border hover:shadow-lg transition duration-300 ease-in-out">
                        <div class="text-[#37a84a] text-2xl mt-2 flex items-center">
                            Thông tin liên hệ <i class="ri-information-line text-xl ml-1"></i>
                        </div>
                        <div class="text-base text-gray-700 my-2">
                            <i class="ri-map-pin-range-line ml-2"></i> {{ companny.companyAddress }}
                        </div>
                        <div class="text-base text-gray-700 my-2">
                            <i class="ri-phone-line ml-2"></i> {{ companny.contactPhoneNumber }}
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" class="ml-2">
                <el-row>
                    <el-col :span="24" class="w-full h-14 flex items-center justify-center">
                        <div class="text-2xl ml-4">Thông tin tuyển dụng</div>
                    </el-col>
                    <el-col>
                        <el-scrollbar height="100%">
                            <el-row>
                                <el-col :span="24" v-for="item in jobDatas" :key="item" class="mt-4">
                                    <el-card shadow="hover" class="max-h-[300px]">
                                        <el-row :gutter="20">
                                            <el-col :span="4">
                                                <el-image style="height: 100px; width: 100px" fit="cover"
                                                    :src="item.companyLogo" />
                                            </el-col>
                                            <el-col :span="16" class="w-full max-h-full">
                                                <div class="flex flex-col h-full">
                                                    <div class="cursor-pointer hover:text-indigo-500 hover:underline">
                                                        {{ item.jobName }}
                                                    </div>
                                                    <router-link :to="`/companny/${item.employersId}`"
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
                                                <!-- <el-tooltip content="Số lượt thích 1k" placement="top">
                                                    <div
                                                        class="flex justify-center items-center text-sm cursor-pointer">
                                                        <i :class="{ 'ri-heart-line': !liked, 'ri-heart-fill text-red-500': liked }"
                                                            class="text-3xl cursor-pointer" @click="toggleLike"></i>Like
                                                    </div>
                                                </el-tooltip> -->
                                                <el-tooltip content="Số lượt thích 1k" placement="top">
                                                    <div
                                                        class="flex justify-center items-center text-sm cursor-pointer">
                                                        <i v-if="isAuthenticated"
                                                            :class="{ 'ri-heart-line': !showLikeByJobId(item.jobId).isFavoufite_Job, 'ri-heart-fill text-red-500': showLikeByJobId(item.jobId).isFavoufite_Job }"
                                                            class="text-3xl cursor-pointer m-2"
                                                            @click="toggleLike(item.jobId, !showLikeByJobId(item.jobId).isFavoufite_Job, showLikeByJobId(item.jobId).favoufite_Job_Id)"></i>
                                                        <i v-else class="text-3xl cursor-pointer m-2 ri-heart-line"></i>
                                                        Yêu thích
                                                    </div>
                                                </el-tooltip>
                                                <el-button class="absolute bottom-0" type="success" plain
                                                    v-if="isAuthenticated"
                                                    @click="dialog = true, currentItem = item">Ứng
                                                    tuyển</el-button>
                                                <el-button v-else class="absolute bottom-0" type="success" plain
                                                    @click="open4">Ứng
                                                    tuyển</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <div class="w-full flex justify-center items-center mt-8 mb-8">
                                <el-button size="large" plain color="blue" @click="seeMore">
                                    <i class="ri-eye-line m-2"></i>
                                    Xem thêm</el-button>
                                <!-- <el-button v-if="total > 10" size="large" plain color="green" @click="Collaps">
                                    <i class="ri-eye-close-line m-1"></i>
                                    Thu gọn</el-button> -->
                            </div>
                        </el-scrollbar>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <RecruimentDialog :dialog="dialog" @close="dialog = false" :currentItem="currentItem" />

    </div>
</template>

<script lang="ts" setup>
const { isAuthenticated } = useAuthService();

import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
import { useEmployers } from '../../Employers/Account/Services/employers.service'
const { getById, GetListJobById } = useEmployers();
import router from '@/router';
import { onMounted, ref } from 'vue';
const { fetchfavouriteJobs, changeFavourites } = useFarourite();
import { useAuthService } from '@/pages/Auth/Services/auth.service';
import { showErrors } from '@/common/helpers';
import { useFarourite } from '../Favourite/favourite.service';
import { ElMessage } from 'element-plus';
import RecruimentDialog from '../Recruitment/RecruimentDialog.vue';
const companny = ref<any | undefined>([]);
const jobDatas = ref<any | undefined>([]);
const id = ref<any | undefined>('');
const page = ref<number>(10);
const liked = ref(true);
const total = ref<number>(1);
const dialog = ref(false);
const currentItem = ref([]);
const favourite_jobs = ref<any | undefined>([]);
const open4 = () => {
    ElMessage({
        message: 'Vui lòng đăng nhập',
        type: 'error',
    })
}
const seeMore = async () => {
    console.log(page.value += 5);
    DEFAULT_COMMON_LIST_QUERY.limit = page.value;
    loadData();

}
const showLikeByJobId = (id: any) => {
    const filteredJobs = favourite_jobs.value.filter((x: any) => x.jobId === id);
    if (filteredJobs.length > 0) {
        return {
            isFavoufite_Job: filteredJobs[0].isFavoufite_Job,
            favoufite_Job_Id: filteredJobs[0].favoufite_Job_Id
        };
    } else {
        return {
            isFavoufite_Job: false,
            favoufite_Job_Id: ''
        };
    }
}
const toggleLike = async (item: any, like: any, favoufite_Job_Id: any) => {
    if (isAuthenticated.value) {
        console.log(item, like, favoufite_Job_Id);
        const formData = new FormData();
        formData.append('jobId', item);
        formData.append('isFavoufite_Job', like);
        formData.append('favoufite_Job_Id', favoufite_Job_Id);
        const res = await changeFavourites(formData);
        if (res.success) {
            // const data = await fetchJobHome();
            // jobDatas.value = data?.items;
            // totalItems.value = data?.totalItems;
            loadFavourites();

        }
        else {
            console.log(res.errors);
            if (res.errors !== undefined) {
                showErrors(res.errors);
            }
        }
    }
}
const loadFavourites = async () => {
    const favourites = await fetchfavouriteJobs();
    //favourite_jobs.value = favourites?.items;
    favourite_jobs.value = favourites?.data;
}
const Collaps = async () => {
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    loadData();
}

const loadData = async () => {
    const data = await GetListJobById(id.value);
    jobDatas.value = data.items;
    total.value = jobDatas.value.length;
    if (isAuthenticated.value) {
        loadFavourites();
    }
}
onMounted(async () => {
    id.value = router.currentRoute.value.params.id;
    const res = await getById(id.value);
    companny.value = res;
    loadData();

})
</script>

<style scoped></style>