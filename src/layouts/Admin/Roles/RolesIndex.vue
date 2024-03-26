<template>
    <div>
        <el-row class="mb-4" justify="center">
            <el-col :span="22">
                <el-input class="max-w-80" @change="searchData()" v-model="search" size="large"
                    placeholder="Nhập thông tin cần tìm kiếm" :suffix-icon="Search" />
            </el-col>
            <el-col :span="2" class="flex justify-end items-center">
                <el-button plain type="primary" size="large" @click="dialog = true">Tạo mới</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="roleName" label="Tên vai trò" width="180" />
            <el-table-column prop="roleDescription" label="Mô tả" width="400" />
            <el-table-column prop="permissionName" label="Cấp quyền" width="750" />
            <el-table-column fixed="right" label="Tùy chọn" width="130" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small"
                        @click="id = scope.row.roleId, dialogEdit = true">Sửa</el-button>
                    <ConfirmVue @confirm="RemoveItem" :idRemove="idRemove = scope.row.roleId" />
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
        <RolesCreate :dialog="dialog" @close="dialog = false" @loadData="loadData()" />
        <RolesUpdate :dialogEdit="dialogEdit" :id="id" @close="dialogEdit = false" @loadData="loadData()" />
    </div>
</template>

<script lang="ts" setup>
import RolesCreate from '../Roles/RolesCreate.vue'
import RolesUpdate from '../Roles/RolesUpdate.vue'
import ConfirmVue from '../../../components/Element/ConfirmVue.vue'
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, watch } from "vue";
import { useRole } from "../Roles/Services/role.service"
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
import { DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';
import { showErrors, showSuccessNotification } from '@/common/helpers';
const dialog = ref(false);
const dialogEdit = ref(false);
const id = ref('');
const { fetchRoles, searchRoles, deleteRole } = useRole();
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const search = ref('');
const tableData = ref<any | undefined>([]);
const idRemove = ref('');
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

const handleEdit = (row: any) => {
    console.log(row.roleId)
}
const RemoveItem = async () => {
    const res = await deleteRole(idRemove.value);
    if (res.success) {
        showSuccessNotification(res.message)
    }
    else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    idRemove.value = '';
    loadData();

}

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

<style></style>