<template>
    <div>
        <el-row class="mb-4" justify="center">
            <el-col :span="22">
                <el-input class="max-w-80" size="large" placeholder="Nhập thông tin cần tìm kiếm"
                    :suffix-icon="Search" />
            </el-col>
            <el-col :span="2" class="flex justify-end items-center">
                <el-button plain type="primary" size="large" @click="dialog = true">Tạo mới</el-button>
            </el-col>
        </el-row>
        <el-table style="width: 100%">
            <el-table-column fixed label="Ảnh đại diện" width="150" />
            <el-table-column label="Nhân viên" width="120" />
            <el-table-column label="Giới tính" width="120" />
            <el-table-column label="Email" width="120" />
            <el-table-column label="Số điện thoại" width="120" />
            <el-table-column label="Địa chỉ liên hệ" width="400" />
            <el-table-column fixed="right" label="Tùy chọn" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-between items-center my-4">
            <div>
                <el-select v-model="page" size="large" style="width: 70px">
                    <el-option v-for="item in options" :key="item.value" :value="item.value" />
                </el-select>
                <p class="inline-block ml-2">Total: 100</p>
            </div>
            <el-pagination background layout="prev, pager, next" :total="10" />
        </div>
        <EmployeeCreate :dialog="dialog" @close="dialog = false" />
    </div>
</template>

<script lang="ts" setup>
import EmployeeCreate from '../Employees/EmployeeCreate.vue'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const dialog = ref(false);
const handleClick = () => {
    console.log('click')
}
const page = ref(10);
const options = [
    {
        value: '10',
        label: '10',
    },
    {
        value: '20',
        label: '20',
    },
    {
        value: '30',
        label: '30',
    },
    {
        value: '40',
        label: '40',
    },
    {
        value: '50',
        label: '50',
    },
]

</script>
<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>