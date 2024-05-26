<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="avatar" label="Ảnh người gửi" width="120" align="center">
                <template #default="scope">
                    <el-image style="width: 60px; height: 60px" :src="scope.row.avatar" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="avatar" label="CV ứng tuyển" width="110" align="center">
                <template #default="scope">
                    <el-link :href="scope.row.job_Cv" target="_blank"
                        :type="scope.row.isStatus ? 'success' : 'error'">Xem
                        cv</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="recruitmentDateTime" label="Ngày gửi cv" width="100" align="center" />
            <el-table-column prop="fullName" label="Người gửi" width="250" align="center" />
            <el-table-column prop="jobName" label="Tên công việc" width="600" />
            <el-table-column fixed="right" label="Đánh giá" width="150" align="center">
                <el-row>
                    <el-col :span="24" class="mb-2">
                        <el-button @click="contactDialog = true">Liên hệ<i
                                class="ri-message-3-line m-2"></i></el-button>
                    </el-col>
                </el-row>
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
            <Contact :Contact="contactDialog" @close="contactDialog = false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelectMultiplier } from '@/common/constants';
import { useRecruitment } from '@/layouts/Home/Recruitment/Services/recruitment.service';
import { onMounted, ref, watch } from 'vue';
import { useAuthService } from "@/pages/Auth/Services/auth.service";
import Contact from './Contact.vue';
const { isAuthenticated, logout } = useAuthService();
import { useLoadingStore } from '@/store/loading.store';
import { fromPairs } from 'lodash';
const loading = useLoadingStore();

const tableData = ref<[]>([]);
const contactDialog = ref(false);
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const { fetchuseRecruitmentsByEmployerSuitable } = useRecruitment();
const loadData = async () => {
    if (isAuthenticated.value) {
        loading.showLoading(true);
        const res = await fetchuseRecruitmentsByEmployerSuitable();
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
onMounted(() => {
    loadData();
})
</script>

<style></style>