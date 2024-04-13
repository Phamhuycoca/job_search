<template>
    <div class="min-h-screen bg-[#F4F5F5]">
        <el-row>
            <el-col :span="17" class="pl-2 mt-4 pr-24 min-h-screen">
                <el-card style="border-radius: 10px;" shadow="never">
                    <el-row>
                        <el-col :span="24">
                            <div class="text-2xl">
                                {{ item.jobName }}
                            </div>
                            <div class="flex w-full justify-between mt-5  text-xl">
                                <div class="min-w-fit">
                                    <div><i
                                            class="ri-exchange-dollar-line rounded-3xl mr-2 text-2xl p-2 bg-[#00B14F] text-gray-100"></i>Mức
                                        lương</div>
                                    <div class="flex w-full justify-center items-center mt-3">
                                        {{ item.salaryPrice }}
                                    </div>
                                </div>
                                <div class="min-w-fit">
                                    <div>
                                        <i
                                            class="ri-map-pin-5-fill rounded-3xl mr-2 text-2xl text-gray-100 p-2 bg-[#00B14F]"></i>
                                        Khu
                                        vực
                                    </div>
                                    <div class="flex w-full justify-center items-center mt-3">
                                        {{ item.cityName }}
                                    </div>
                                </div>
                                <div class="min-w-fit">
                                    <div>
                                        <i
                                            class="ri-hourglass-fill rounded-3xl mr-2 text-2xl p-2 bg-[#00B14F] text-gray-100"></i>
                                        Kinh
                                        nghiệm làm việc
                                    </div>
                                    <div class="flex w-full justify-center items-center mt-3">
                                        {{ item.workexperienceName }}
                                    </div>
                                </div>
                            </div>
                            <el-row class="mt-5 h-14 flex items-center">
                                <el-col :span="18">
                                    <el-button v-if="isAuthenticated" @click="dialog = true, currentItem = item"
                                        class="w-full" style="border-radius: 10px;" color="#00B14F" size="large">Ứng
                                        tuyển công
                                        việc</el-button>
                                    <el-button v-else @click="open4" class="w-full" style="border-radius: 10px;"
                                        color="#00B14F" size="large">Ứng tuyển công
                                        việc</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <div class="float-right bg-gray-200 text-lg p-2 rounded">
                                        Hạn nộp hồ sơ: {{ item.expirationDate }}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card style="border-radius: 10px;" shadow="never" class="mt-5 mb-10">
                    <el-row>
                        <el-col :span="24">
                            <i class="ri-information-line rounded-3xl mr-2 text-2xl p-2 bg-[#00B14F] text-gray-100"></i>
                            <span>Chi tiết tuyển dụng</span>
                        </el-col>
                        <el-col :span="24" class="mt-5 h-full">
                            <el-text tag="b" style="margin-bottom: 100px;font-size: 24px;">Mô tả công việc</el-text>
                            <p size="large" tag="p" class="inline-block">
                                {{ item.jobDescription }}
                            </p>
                        </el-col>
                        <el-col :span="24" class="mt-5 h-full">
                            <el-text tag="b" style="margin-bottom: 100px;font-size: 24px;">Yêu cầu công việc</el-text>
                            <p size="large" tag="p" class="inline-block">
                                {{ item.requestJob }}
                            </p>
                        </el-col>
                        <el-col :span="24" class="mt-5 h-full">
                            <el-text tag="b" style="margin-bottom: 100px;font-size: 24px;">Quyền lợi được
                                hưởng</el-text>
                            <p size="large" tag="p" class="inline-block">
                                {{ item.benefitsJob }}
                            </p>
                        </el-col>
                        <el-col :span="24" class="mt-5 h-full">
                            <el-text tag="b" style="margin-bottom: 100px;font-size: 24px;">Đia điểm làm việc</el-text>
                            <p size="large" tag="p" class="block">
                                {{ item.addressJob }}
                            </p>
                        </el-col>
                        <el-col :span="24" class="mt-5 h-full">
                            <el-button color="#00B14F" v-if="isAuthenticated"
                                @click="dialog = true, currentItem = item">Ứng tuyển công việc</el-button>
                            <el-button color="#00B14F" v-else @click="open4">Ứng tuyển công việc</el-button>

                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="7" class="pr-2">
                <div class="mt-4 mb-10">
                    <el-card class="text-xl" style="border-radius: 10px;" shadow="never">
                        <span> Việc làm liên quan</span>
                    </el-card>
                    <el-card class="mt-5" shadow="never" style="border-radius: 10px;" v-if="total > 0">
                        <el-row v-for="i in jobDatas" :key="i" class="border mt-2 mb-4 rounded">
                            <el-col :span="24" class="flex items-center h-30 w-full">
                                <el-image :src="i.companyLogo" class="max-h-20 max-w-20 ml-2" fit="contain" />
                                <div class="h-full w-full ml-2 mt-4">
                                    <el-row>
                                        <el-col :span="24">
                                            <router-link :to="`/jobdetail/${i.jobId}`" target="_blank"
                                                class="cursor-pointer hover:text-indigo-500 hover:underline">
                                                <el-tooltip :content="i.jobName" placement="top">
                                                    {{ i.jobName }}
                                                </el-tooltip>
                                            </router-link>
                                        </el-col>
                                        <el-col :span="24">
                                            <router-link :to="`/companny/${i.employersId}`"
                                                class="uppercase cursor-pointer hover:text-[blue] hover:underline"
                                                target="_blank">
                                                <el-tooltip :content="i.companyName" placement="top">
                                                    <span class="text-sm w-full text-ellipsis">
                                                        {{ i.companyName }}
                                                    </span>
                                                </el-tooltip>
                                            </router-link>
                                        </el-col>
                                        <div class=" flex items-center">
                                            <div class="mr-2 bg-slate-100 p-1 rounded">
                                                {{ i.salaryPrice }}vnđ
                                            </div>
                                            -
                                            <div class="ml-2 bg-slate-100 p-1 rounded">
                                                {{ i.cityName }}
                                            </div>
                                        </div>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <el-button type="success" class="m-2 float-end" plain v-if="isAuthenticated"
                                    @click="dialog = true, currentItem = i">Ứng
                                    tuyển</el-button>
                                <el-button v-else type="success" class="m-2 float-end" plain @click="open4">Ứng
                                    tuyển</el-button>
                                <!-- <el-button color="#00B14F" class="m-2 float-end">Ứng tuyển</el-button> -->
                            </el-col>
                        </el-row>
                    </el-card>

                    <div v-else class="w-full flex justify-center">
                        <span>Không có dữ liệu</span>
                    </div>
                    <div class="w-full flex justify-center mt-5">
                        <el-button v-if="total > 0" size="large" plain color="blue" @click="seeMore">
                            <i class="ri-eye-line m-2"></i>
                            Xem thêm</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <RecruimentDialog :dialog="dialog" @close="dialog = false" :currentItem="currentItem" />
    </div>

</template>

<script lang="ts" setup>
import RecruimentDialog from '../Recruitment/RecruimentDialog.vue';
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useJobHome } from '../Services/home.service';
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME } from '@/common/constants';
const { isAuthenticated } = useAuthService();
import { useLoadingStore } from '@/store/loading.store';
import { useAuthService } from '@/pages/Auth/Services/auth.service';
import { ElMessage } from 'element-plus';
const { getById, fetchRelatedJobs } = useJobHome();
const dialog = ref(false);
const currentItem = ref([]);
const loading = useLoadingStore();
const jobDatas = ref<any | undefined>([]);
const item = ref<any | ''>('');
const total = ref<number>(0);
const id = ref<any | undefined>('');
    const page = ref<number>(10);
    const seeMore = async () => {
    console.log(page.value += 5);
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.limit = page.value;
    await searchData();

}
onMounted(async () => {

    loading.showLoading(true);
    id.value = router.currentRoute.value.params.id;
    const res = await getById(id.value);
    item.value = res;
    searchData();
    loading.showLoading(false);
})
const searchData = async () => {
    loading.showLoading(true);
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = item.value.cityId;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.levelworkId = item.value.levelworkId;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = item.value.formofworkId;
    const data = await fetchRelatedJobs(id.value);
    jobDatas.value = data?.items;
    total.value = jobDatas.value.length;
    loading.showLoading(false);

};
const open4 = () => {
  ElMessage({
    message: 'Vui lòng đăng nhập',
    type: 'error',
  })
}
</script>

<style></style>