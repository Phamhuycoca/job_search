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
                                    <el-button class="w-full" style="border-radius: 10px;" color="#00B14F"
                                        size="large">Ứng tuyển công
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
                            <el-button color="#00B14F">Ứng tuyển công việc</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="7" class="pr-2">
                <div class="mt-4">
                    <el-card class="text-xl" style="border-radius: 10px;" shadow="never">
                        <span> Việc làm liên quan</span>
                    </el-card>
                    <el-card class="mt-5" shadow="never">
                        <el-row v-for="i in jobDatas" :key="i">
                            <el-col class="text-2xl">
                                {{ i.jobName }}
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useJobHome } from '../Services/home.service';
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from '@/common/constants';
import { useLoadingStore } from '@/store/loading.store';
const { getById, searchJobHome } = useJobHome();
const loading = useLoadingStore();
const jobDatas = ref<any | undefined>([]);
const item = ref<any | ''>('');
const id = ref<any | undefined>('');
onMounted(async () => {
    loading.showLoading(true);
    id.value = router.currentRoute.value.params.id;
    const res = await getById(id.value);
    item.value = res;
    searchData();
    loading.showLoading(false);
})
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = item.value.cityId;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.levelworkId = item.value.levelworkId;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = item.value.formofworkId;
    const data = await searchJobHome();
    jobDatas.value = data?.items;
};
</script>

<style></style>