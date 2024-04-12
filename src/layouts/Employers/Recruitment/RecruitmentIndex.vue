<template>
    <div>
        <el-row class="mb-4">
            <el-col :span="24" class="flex justify-between">
                <el-input class="max-w-80" @change="searchData()" v-model="search" size="large"
                    placeholder="Nhập thông tin cần tìm kiếm" />
                <el-select size="large" placeholder="Sắp xếp theo kinh nghiệm làm việc" class="ml-4 max-w-72"
                    v-model="workexperienceId">
                    <el-option v-for="item in itemsListWorkexperienceks" :key="item.workexperienceId"
                        :value="item.workexperienceId" :label="item.workexperienceName" />
                </el-select>
                <el-select size="large" placeholder="Sắp xếp theo nghành" class="ml-4 max-w-60" v-model="professionId">
                    <el-option v-for="item in itemsListProfessions" :key="item.professionId" :value="item.professionId"
                        :label="item.professionName" />
                </el-select>
                <el-select size="large" placeholder="Sắp xếp theo hình thức làm việc" class="ml-4 max-w-72"
                    v-model="formofworkId">
                    <el-option v-for="item in itemsListFormofworks" :key="item.formofworkId" :value="item.formofworkId"
                        :label="item.formofworkName" />
                </el-select>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="avatar" label="Ảnh người gửi" width="120" align="center">
                <template #default="scope">
                    <el-image style="width: 60px; height: 60px" :src="scope.row.avatar" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="avatar" label="CV ứng tuyển" width="110" align="center">
                <template #default="scope">
                    <el-link :href="scope.row.job_Cv" target="_blank" :type="scope.row.isStatus ? 'success' : 'error'"
                        @click="ChangeStatus(scope.row.recruitmentId)">Xem
                        cv</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="recruitmentDateTime" label="Ngày gửi cv" width="100" align="center" />
            <el-table-column prop="fullName" label="Người gửi" width="180" align="center" />
            <el-table-column prop="jobName" label="Tên công việc" width="300" />
            <el-table-column prop="content" label="Nội dung đính kèm" width="400" />
            <el-table-column fixed="right" label="Đánh giá" width="200" align="center">
                <template #default="scope">
                    <el-row>
                        <el-col :span="24" class="mb-2">
                            <el-button @click="ChangeFeedback(scope.row.recruitmentId)" type="primary" plain
                                class="min-w-[100px]" size="small">Phù hợp</el-button>
                        </el-col>
                        <el-col :span="24" class="mt-2">
                            <el-button type="danger" plain class="min-w-[100px]"
                                @click="deleteItem(scope.row.recruitmentId)" size="small">Không phù hợp</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-between items-center my-4">
            <div>
                <el-select v-model="seletedValue" size="large" style="width: 70px">
                    <el-option v-for="item in optionsSelectMultiplier" :key="item.value" :value="item.value" />
                </el-select>
                <p class="inline-block ml-2">Totals: {{ totalItems }}</p>
            </div>
            <el-pagination background layout="prev, pager, next" :total="lengthPage" v-model="page" prev-text
                v-model:current-page="page" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_BY_HOME, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelectMultiplier } from '@/common/constants';
import { formofworkApi } from "@/layouts/Admin/Formofwork/Services/formofwork.api";
import { professionApi } from "@/layouts/Admin/Profession/Services/profession.api";
import { workexperiencekApi } from "@/layouts/Admin/Workexperience/Services/workexperience.api";
import { useRecruitment } from '@/layouts/Home/Recruitment/Services/recruitment.service';
const { fetchuseRecruitmentsByEmployer, searchByEmployer, changeStatus, deleteuseRecruitment, changeFeedback } = useRecruitment();
import { useAuthService } from "@/pages/Auth/Services/auth.service";
const { isAuthenticated, logout } = useAuthService();
import { useLoadingStore } from '@/store/loading.store';
import { onMounted, ref, watch } from 'vue';
const loading = useLoadingStore();
const search = ref("");

const tableData = ref<[]>([]);
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const professionId = ref("");
const workexperienceId = ref("");
const formofworkId = ref("");
const itemsListFormofworks = ref<any | null>([]);
const itemsListProfessions = ref<any | null>([]);
const itemsListWorkexperienceks = ref<any | null>([]);
const loadData = async () => {
    if (isAuthenticated.value) {
        loading.showLoading(true);
        const res = await fetchuseRecruitmentsByEmployer();
        console.log(res);
        tableData.value = res?.items;
        console.log(res?.totalItems);
        if (res) {
            tableData.value = res.items;
            if (res.totalItems !== undefined) {
                totalItems.value = res.totalItems;
                lengthPage.value = Math.ceil(res.totalItems / seletedValue.value) * 10;
            }
        }
        loading.showLoading(false);
    }
}
const ChangeStatus = async (recruitmentId: string) => {
    const res = await changeStatus({ isStatus: true, recruitmentId: recruitmentId });
    if (res.success) {
        loadData();
    }

}
const ChangeFeedback = async (recruitmentId: string) => {
    const res = await changeFeedback({ isFeedback: true, recruitmentId: recruitmentId });
    if (res.success) {
        loadData();
    }
}
const deleteItem = async (recruitmentId: string) => {
    const res = await deleteuseRecruitment(recruitmentId);
    if (res.success) {
        loadData();
    }
}
const searchData = async () => {
    loading.showLoading(true);
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    const data = await searchByEmployer();
    tableData.value = data?.items;
    totalItems.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / 10) * 10;
    loading.showLoading(false);


};
watch(seletedValue, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.limit = newval;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    loadData();
    page.value = 1;
});
watch(page, (newVal, oldval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = newVal;
    loadData();
});
watch(formofworkId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = newval;
    loadData();
});
watch(professionId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.professionId = newval;
    loadData();
});
watch(workexperienceId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.workexperienceId = newval;
    loadData();
});
watch(search, (newval, oldval) => {
    if (newval === "" && oldval !== "") {
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
        loadData();
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = "";
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.salaryId = "";
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = "";
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.professionId = "";
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.workexperienceId = "";
        formofworkId.value = "";
        professionId.value = "";
        workexperienceId.value = "";
    }
});
onMounted(async () => {
    loadData();
    const itemformofworks = await formofworkApi.itemsList();
    itemsListFormofworks.value = itemformofworks.data;
    const itemprofessions = await professionApi.itemsList();
    itemsListProfessions.value = itemprofessions.data;
    const itemworkexperienceks = await workexperiencekApi.itemsList();
    itemsListWorkexperienceks.value = itemworkexperienceks.data;
})
</script>

<style></style>