<template>
    <div class="min-h-screen px-10 my-5">
        <el-row justify="center" :gutter="20">
            <el-col :span="5" class="border h-96">
                <h1 class="text-center text-2xl mt-4">Tìm kiếm thông tin</h1>
                <div class="py-4 h-full max-h-72 flex flex-col justify-around items-center w-full max-w-80 m-auto">
                    <el-select placeholder="Chọn theo khu vực" size="large" class="max-w-72 w-full mb-2"
                        v-model="cityId">
                        <el-option v-for="item in itemsListCitys" :key="item.cityId" :value="item.cityId"
                            :label="item.cityName" />
                    </el-select>
                    <el-select placeholder="Chọn mức lương" size="large" class="max-w-72 w-full my-1"
                        v-model="salaryId">
                        <el-option v-for="item in itemsListSalarys" :key="item.salaryId" :value="item.salaryId"
                            :label="item.salaryPrice" />
                    </el-select>
                    <el-select placeholder="Chọn theo nghành" size="large" class="max-w-72 w-full my-1"
                        v-model="professionId">
                        <el-option v-for="item in itemsListProfessions" :key="item.professionId"
                            :value="item.professionId" :label="item.professionName" />
                    </el-select>
                    <el-select placeholder="Chọn theo kinh nghiệm làm việc" size="large" class="max-w-72 w-full my-1"
                        v-model="workexperienceId">
                        <el-option v-for="item in itemsListWorkexperienceks" :key="item.workexperienceId"
                            :value="item.workexperienceId" :label="item.workexperienceName" />
                    </el-select>
                    <el-select placeholder="Chọn theo hình thức làm việc" size="large" class="max-w-72 w-full my-1"
                        v-model="formofworkId">
                        <el-option v-for="item in itemsListFormofworks" :key="item.formofworkId"
                            :value="item.formofworkId" :label="item.formofworkName" />
                    </el-select>
                    <el-input size="large" class="max-w-72 w-full my-1" @change="searchData()" v-model="search"
                        placeholder="Nhập thông tin tìm kiếm rồi ấn Enter" :suffix-icon="Search" />
                </div>
            </el-col>
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
                                            <i v-if="isAuthenticated"
                                                :class="{ 'ri-heart-line': !showLikeByJobId(item.jobId).isFavoufite_Job, 'ri-heart-fill text-red-500': showLikeByJobId(item.jobId).isFavoufite_Job }"
                                                class="text-3xl cursor-pointer m-2"
                                                @click="toggleLike(item.jobId, !showLikeByJobId(item.jobId).isFavoufite_Job, showLikeByJobId(item.jobId).favoufite_Job_Id)"></i>
                                            <i v-else class="text-3xl cursor-pointer m-2 ri-heart-line"></i>
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
                <div class="float-end mt-4">
                    <el-pagination background layout="prev, pager, next" :total="totalItems" v-model="page" prev-text
                        v-model:current-page="page" />
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";

import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from '@/common/constants';
import { showErrors } from '@/common/helpers';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { useFarourite } from '../Favourite/favourite.service';
import { useEmployers } from '@/layouts/Employers/Account/Services/employers.service';
import { useRecruitment } from '../Recruitment/Services/recruitment.service';
import { useAuthService } from '@/pages/Auth/Services/auth.service';
import { useLoadingStore } from '@/store/loading.store';
import { useJobHome } from '../Services/home.service';
import { cityApi } from '@/layouts/Admin/City/Services/city.api';
import { salaryApi } from '@/layouts/Admin/Salary/Services/salary.api';
import { formofworkApi } from '@/layouts/Admin/Formofwork/Services/formofwork.api';
import { professionApi } from '@/layouts/Admin/Profession/Services/profession.api';
import { workexperiencekApi } from '@/layouts/Admin/Workexperience/Services/workexperience.api';

const { fetchfavouriteJobs, changeFavourites } = useFarourite();
const { fetchCompannys, searchCompannys } = useEmployers();
const compannyLists = ref<any | undefined>([]);
const { createuseRecruitment } = useRecruitment();
const { isAuthenticated } = useAuthService();
const loading = useLoadingStore();
const dialog = ref(false);
const currentItem = ref([]);
const { fetchJobHome, searchJobHome } = useJobHome();
const itemsListCitys = ref<any | null>([]);
const itemsListSalarys = ref<any | null>([]);
const itemsListFormofworks = ref<any | null>([]);
const itemsListProfessions = ref<any | null>([]);
const itemsListWorkexperienceks = ref<any | null>([]);
const jobDatas = ref<any | undefined>([]);
const search = ref("");
const cityId = ref("");
const salaryId = ref("");
const professionId = ref("");
const workexperienceId = ref("");
const formofworkId = ref("");
const totalItems = ref<Number | undefined>(0);
const total = ref<number>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const liked = ref(true);
const favourite_jobs = ref<any | undefined>([]);
const loadData = async () => {
    loading.showLoading(true);
    const itemcitys = await cityApi.itemsList();
    itemsListCitys.value = itemcitys.data;
    const itemsalarys = await salaryApi.itemsList();
    itemsListSalarys.value = itemsalarys.data;
    const itemformofworks = await formofworkApi.itemsList();
    itemsListFormofworks.value = itemformofworks.data;
    const itemprofessions = await professionApi.itemsList();
    itemsListProfessions.value = itemprofessions.data;
    const itemworkexperienceks = await workexperiencekApi.itemsList();
    itemsListWorkexperienceks.value = itemworkexperienceks.data;
    loading.showLoading(false);


};

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


const open4 = () => {
    ElMessage({
        message: 'Vui lòng đăng nhập',
        type: 'error',
    })
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
const searchData = async () => {
    loading.showLoading(true);
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    const data = await searchJobHome();
    jobDatas.value = data?.items;
    totalItems.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / 10) * 10;
    total.value = data?.totalItems;
    if (isAuthenticated.value) {
        loadFavourites();
    }
    loading.showLoading(false);

};

const refeshJobs = async () => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.salaryId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.professionId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.workexperienceId = "";
    cityId.value = "";
    salaryId.value = "";
    formofworkId.value = "";
    professionId.value = "";
    workexperienceId.value = "";
    search.value = "";
    loadJobs();

};
const loadJobs = async () => {
    loading.showLoading(true);

    const data = await fetchJobHome();
    jobDatas.value = data?.items;
    totalItems.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / 10) * 10;
    total.value = data?.totalItems;
    const res = await fetchCompannys();
    compannyLists.value = res?.items;
    loading.showLoading(false);
    if (isAuthenticated.value) {
        loadFavourites();
    }
};
watch(cityId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = newval;
    loadJobs();
});
watch(formofworkId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = newval;
    loadJobs();
});
watch(professionId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.professionId = newval;
    loadJobs();
});
watch(workexperienceId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.workexperienceId = newval;
    loadJobs();

});
watch(salaryId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.salaryId = newval;
    loadJobs();

});
watch(search, (newval, oldval) => {
    if (newval === "" && oldval !== "") {
        refeshJobs();
        loadJobs();
    }
});
watch(page, (newVal, oldval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = newVal;
    loadJobs();
});


onMounted(() => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.salaryId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.professionId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.workexperienceId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.keyword = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.levelworkId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.limit = 10;

    loadData();
    loadJobs();
});
</script>

<style></style>