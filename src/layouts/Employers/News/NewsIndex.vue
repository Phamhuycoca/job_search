<template>
    <div>
        <el-row class="mb-4" justify="center">
            <el-col :span="22">
                <el-input class="max-w-80" v-model="search" @change="searchData()" size="large"
                    placeholder="Nhập thông tin cần tìm kiếm" :suffix-icon="Search" />
                <el-select size="large" class="ml-4 max-w-60"></el-select>
            </el-col>
            <el-col :span="2" class="flex justify-end items-center">
                <el-button plain type="primary" size="large" @click="dialog = true">Tạo mới</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="jobName" label="Tên công việc" width="300" />
            <el-table-column prop="cityName" label="Khu vực" width="120" />
            <el-table-column prop="workexperienceName" label="Kinh nghiệm làm việc" width="320" />
            <el-table-column prop="formofworkName" label="Hình thức làm việc" width="200" />
            <el-table-column prop="addressJob" label="Địa chỉ" width="400" />
            <el-table-column prop="professionName" label="Nghành nghê" width="200" />
            <el-table-column prop="levelworkName" label="Cấp bậc" width="200" />
            <el-table-column prop="salaryPrice" label="Mức lương" width="200" />
            <el-table-column prop="expirationDate" label="Ngày hết hạn" width="120" />
            <el-table-column prop="workingTime" label="Thời gian làm việc" width="300" />
            <el-table-column fixed="right" label="Tùy chọn" width="150" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small"
                        @click="id = scope.row.jobId, dialogEdit = true">Sửa</el-button>
                    <el-button type="primary" size="small"
                        @click="dialogDelete = true, idRemove = scope.row.jobId">Xóa</el-button>
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
        <NewsCreate :dialog="dialog" @close="dialog = false" @loadData="loadData()" />
        <ConfirmVue :dialogDelete="dialogDelete" @close="dialogDelete = false" @saveData="RemoveItem" />
        <NewsUpdate :dialogEdit="dialogEdit" :id="id" @close="dialogEdit = false" @loadData="loadData()" />

    </div>
</template>

<script lang="ts" setup>
import ConfirmVue from '../../../components/Element/ConfirmVue.vue'
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';
import { ref, watch, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue'
import NewsCreate from '../News/NewsCreate.vue'
import NewsUpdate from '../News/NewsUpdate.vue'
import { useJob } from '../News/Services/job.service'
import { showErrors, showSuccessNotification } from '@/common/helpers';
const { fetchJobs, deleteJob, searchJobs } = useJob();
const dialog = ref(false);
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const id = ref('');

const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const search = ref('');
const tableData = ref<any | undefined>([]);
const idRemove = ref('');
const RemoveItem = async () => {
    const res = await deleteJob(idRemove.value);
    if (res.success) {
        showSuccessNotification(res.message)
    }
    else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    idRemove.value = '';
    dialogDelete.value = false;
    loadData();
}
const loadData = async () => {
    const data = await fetchJobs();
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
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
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