<template>
    <div>
        <el-row class="mb-4" justify="end">
            <el-col :span="2" class="flex justify-end items-center">
                <el-button plain type="primary" size="large" @click="dialog = true">Tạo mới</el-button>
            </el-col>
        </el-row>
        <el-table style="width: 100%" :data="tableData">
            <el-table-column fixed type="index" width="100" align="center" label="STT" />
            <el-table-column prop="jobName" label="Hình ảnh banner" width="600" align="center">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.bannerPath" fit="contain" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Tùy chọn" width="500" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small"
                        @click="dialogEdit = true, id = scope.row.bannerId">Sửa</el-button>
                    <el-button type="primary" size="small"
                        @click="dialogDelete = true, idRemove = scope.row.bannerId">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Banner_Create :dialog="dialog" @close="dialog = false" @loadData="loadData()" />
        <Banner_update :dialogEdit="dialogEdit" :id="id" @close="dialogEdit = false" @loadData="loadData()" />
        <ConfirmVue :dialogDelete="dialogDelete" @close="dialogDelete = false" @saveData="RemoveItem" />

    </div>
</template>

<script lang="ts" setup>
import ConfirmVue from '../../../components/Element/ConfirmVue.vue'

import Banner_Create from '../Banner/banner_create.vue'
import { onMounted, ref } from 'vue';
import { useBanner } from './Services/banner.service';
import Banner_update from './banner_update.vue';
import { showErrors, showSuccessNotification } from '@/common/helpers';
const { fetchData, deleteData } = useBanner();
const dialog = ref(false);
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const id = ref('');
const idRemove = ref('');
const tableData = ref<any | undefined>([]);
const loadData = async () => {
    const res = await fetchData();
    tableData.value = res?.items;
}
onMounted(() => {
    loadData();
})
const RemoveItem = async () => {
    const res = await deleteData(idRemove.value);
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
</script>

<style></style>