<template>
    <div>
        <el-row class="mb-4" justify="center">
            <el-col :span="22">
                <el-input class="max-w-80" v-model="search" @change="searchData()" size="large"
                    placeholder="Nhập thông tin cần tìm kiếm" :suffix-icon="Search" />
                <el-select size="large" class="ml-4 max-w-60"></el-select>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed label="Tổng CV" width="100" align="center">
                <template #default="scope">
                    <div style="color: red;">
                        {{ totals(scope.row.jobId) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed prop="jobName" label="Tên công việc" width="300" />
            <el-table-column prop="workexperienceName" label="Kinh nghiệm làm việc" width="320" />
            <el-table-column prop="formofworkName" label="Hình thức làm việc" width="200" />
            <el-table-column prop="professionName" label="Nghành nghê" width="200" />
            <el-table-column prop="levelworkName" label="Cấp bậc" width="200" />
            <el-table-column prop="salaryPrice" label="Mức lương" width="200" />
            <el-table-column prop="expirationDate" label="Ngày hết hạn" width="120" />
            <el-table-column fixed="right" label="Tùy chọn" width="200" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="$router.push(`recruitment/${scope.row.jobId}`)">Xem
                        danh
                        sách ứng tuyển</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-between items-center my-4">
            <div>
                <el-select v-model="seletedValue" size="large" style="width: 70px">
                    <el-option v-for="item in optionsSelect" :key="item.value" :value="item.value" />
                </el-select>
                <p class="inline-block ml-2">Totals: {{ totalItems }}</p>
            </div>
            <el-pagination background layout="prev, pager, next" :total="lengthPage" v-model="page" prev-text
                v-model:current-page="page" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import ConfirmVue from '../../../components/Element/ConfirmVue.vue'
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';
import { ref, watch, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { useJob } from '../News/Services/job.service'
import { showErrors, showSuccessNotification } from '@/common/helpers';
import { useRecruitment } from '@/layouts/Home/Recruitment/Services/recruitment.service';
import { recruitmentApi } from '@/layouts/Home/Recruitment/Services/recruitment.api';
const { fetchJobs, deleteJob, searchJobs } = useJob();
const { fetchuseRecruitmentsByEmployer } = useRecruitment();
const recruiments = ref<any | undefined>([]);
const id = ref('');

const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const search = ref('');
const tableData = ref<any | undefined>([]);
const totals = (id: any) => {
    const filteredArray = recruiments.value.filter((element: any) => element.jobId === id);
    return filteredArray.length;
};

const loadData = async () => {
    const data = await fetchJobs();
    const res = await recruitmentApi.itemsList();
    recruiments.value = res.data;
    if (data) {
        tableData.value = data.items;
        if (data.totalItems !== undefined) {
            totalItems.value = data.totalItems;
            lengthPage.value = Math.ceil(data.totalItems / seletedValue.value) * 10;
        }
    }
};
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    const data = await searchJobs();
    if (data) {
        tableData.value = data.items;
        if (data.totalItems !== undefined) {
            totalItems.value = data.totalItems;
            if (seletedValue.value !== 0) {
                lengthPage.value = Math.ceil(data.totalItems / seletedValue.value) * 10;
            }
        }
    }
}

watch(seletedValue, (newval) => {
    DEFAULT_COMMON_LIST_QUERY.limit = newval;
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    loadData();
    page.value = 1;
});
watch(page, (newVal, oldval) => {
    DEFAULT_COMMON_LIST_QUERY.page = newVal;
    loadData();
});
watch(search, (newval, oldval) => {
    if (newval === "" && oldval !== "") {
        page.value = 1;
    }

});
onMounted(() => {
    loadData();
})
</script>