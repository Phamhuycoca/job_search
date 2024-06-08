<template>
    <el-card>
        <template #header>
            <span>Danh sách các công ty</span>
        </template>
        <el-scrollbar max-height="400px">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed label="Logo" width="150">
                    <template #default="scope">
                        <el-image style="width: 60px; height: 60px" :src="scope.row.companyLogo" fit="cover" />
                    </template>
                </el-table-column>
                <el-table-column prop="companyName" label="Tên công ty" width="300" />
                <el-table-column prop="companyAddress" label="Địa chỉ" width="600" />
                <el-table-column prop="contactPhoneNumber" label="Số điện thoại" width="150" />
                <el-table-column prop="contactEmail" label="Email liên hệ" width="200" />
                <el-table-column prop="view" label="Nhân lực" width="200" />
                <el-table-column fixed="right" label="Trạng thái" width="150" align="center">
                    <template #default="scope">
                        <el-button round type="success" size="small"
                            @click="duyetCong(scope.row.employersId)">Duyệt</el-button>
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
        </el-scrollbar>
    </el-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useAdmin_Employer } from '../Admin_Employer/Services/admin_employer.service';
import { DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';
const { fetch, search, update } = useAdmin_Employer();
const tableData = ref<any | undefined>([]);
let page = ref(1);
let lengthPage = ref<Number | undefined>(100);
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<Number | undefined>(0);
const loadData = async () => {
    const data = await fetch();
    tableData.value = data?.items;
    if (data) {
        tableData.value = data.items;
        if (data.totalItems !== undefined) {
            totalItems.value = data.totalItems;
            lengthPage.value = Math.ceil(data.totalItems / seletedValue.value) * 10;
        }
    }
}
const duyetCong = async (id: any) => {
    const res = await update(id);
    if (res.success) {
        loadData();
    }
}
onMounted(() => {
    loadData();
})
</script>