<template>
    <div>
        <el-row class="mb-4" justify="center">
            <el-col :span="22">
                <el-input class="max-w-80" v-model="search" @change="searchData()" size="large"
                    placeholder="Nhập thông tin cần tìm kiếm" :suffix-icon="Search" />
            </el-col>
            <el-col :span="2" class="flex justify-end items-center">
                <el-button plain type="primary" size="large" @click="dialog = true">Tạo mới</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed label="Ảnh đại diện" width="150" align="center">
                <template #default="scope">
                    <el-image style="width: 60px; height: 60px" :src="scope.row.avatar" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="fullName" label="Nhân viên" width="120" />
            <el-table-column prop="gender" label="Giới tính" width="120" />
            <el-table-column prop=email label="Email" width="120" />
            <el-table-column prop="phoneNumber" label="Số điện thoại" width="120" />
            <el-table-column prop="address" label="Địa chỉ liên hệ" width="400" />
            <el-table-column prop="roleName" label="Vai trò" width="200" />
            <el-table-column fixed="right" label="Tùy chọn" width="120">
                <template #default>
                    <el-button link type="primary" size="small">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
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
        <EmployeeCreate :dialog="dialog" @close="dialog = false" />
    </div>
</template>

<script lang="ts" setup>
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';
import EmployeeCreate from '../Employees/EmployeeCreate.vue'
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { useEmployee } from './Services/employee.service';
const dialog = ref(false);
const dialogEdit = ref(false);
const id = ref('');
const { fetchEmployees, searchEmployees, deleteEmployee } = useEmployee();
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const search = ref('');
const tableData = ref<any | undefined>([]);
const idRemove = ref('');
const loadData = async () => {
    const data = await fetchEmployees();
    if (data) {
        tableData.value = data.items;
        if (data.totalItems !== undefined) {
            totalItems.value = data.totalItems;
            lengthPage.value = Math.ceil(data.totalItems / seletedValue.value) * 10;
        }
    }
};

const handleEdit = (row: any) => {
    console.log(row.roleId)
}


const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    const data = await searchEmployees();
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
    DEFAULT_COMMON_LIST_QUERY.keyword = '';
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    loadData();
})

</script>
<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>