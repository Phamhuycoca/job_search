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
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="STT" width="450" align="center" />
            <el-table-column prop="cityName" label="Khu vực" width="600" />
            <el-table-column fixed="right" label="Tùy chọn" width="150" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small"
                        @click="id = scope.row.cityId, dialogEdit = true">Sửa</el-button>
                    <el-button type="primary" size="small"
                        @click="dialogDelete = true, idRemove = scope.row.cityId">Xóa</el-button>
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
        <CityCreate :dialog="dialog" @close="dialog = false" @loadData="loadData()" />
        <CityUpdate :dialogEdit="dialogEdit" :id="id" @close="dialogEdit = false" @loadData="loadData()" />
        <ConfirmVue :dialogDelete="dialogDelete" @close="dialogDelete = false" @saveData="RemoveItem" />

    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import CityCreate from '../City/CityCreate.vue'
import CityUpdate from '../City/CityUpdate.vue'
import ConfirmVue from '../../../components/Element/ConfirmVue.vue'

import { Search } from '@element-plus/icons-vue'
import { useCity } from '../City/Services/city.service'
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from "@/common/constants";
import { showErrors, showSuccessNotification } from "@/common/helpers";
const { fetchCitys, searchCitys, deleteCity } = useCity();

const dialog = ref(false);
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const id = ref('');
const idRemove = ref('');

const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const tableData = ref<any | undefined>([]);
const search = ref('');



const RemoveItem = async () => {
    const res = await deleteCity(idRemove.value);
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
    const data = await fetchCitys();
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
    const data = await searchCitys();
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