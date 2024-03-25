<template>
    <div>
        <el-row class="mb-4" justify="center">
            <el-col :span="22">
                <el-input class="max-w-80" @change="searchData()" v-model="search" size="large"
                    placeholder="Nhập thông tin cần tìm kiếm" :suffix-icon="Search" />
            </el-col>
            <el-col :span="2" class="flex justify-end items-center">
                <el-button plain type="primary" size="large">Tạo mới</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="roleName" label="Tên vai trò" width="180" />
            <el-table-column prop="roleDescription" label="Mô tả" width="180" />
            <el-table-column prop="permissionId" label="Cấp quyền" width="1000" />
            <el-table-column fixed="right" label="Operations" width="120">
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
            <el-pagination background layout="prev, pager, next" :total="lengthPage" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, watch } from "vue";
import { useRole } from "../Roles/Services/role.service"
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
import { DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';

const { fetchRoles, searchRoles } = useRole();
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(10);
let page = ref(10);
let lengthPage = ref(1);
const search = ref('');
const tableData = ref<any | undefined>([]);;
const loadData = async () => {
    const data = await fetchRoles();
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
    const data = await searchRoles();
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
    page.value = 10;
    loadData();
});
watch(page, (newVal, oldval) => {
    DEFAULT_COMMON_LIST_QUERY.page = newVal;
    loadData();
});
watch(search, (newval, oldval) => {
    if (newval === "" && oldval !== "") {
        page.value = 10;
    }

});
onMounted(() => {
    DEFAULT_COMMON_LIST_QUERY.keyword = '';
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    loadData();
})
</script>

<style></style>