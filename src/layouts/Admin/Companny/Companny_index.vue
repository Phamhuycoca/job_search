<template>
    <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
        <el-table-column prop="date" label="Date" sortable width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" :formatter="formatter" />
        <el-table-column fixed="right" label="Tùy chọn" width="130" align="center">
            <template #default="scope">
                <el-button type="primary" size="small">Duyệt thông tin</el-button>
                <el-button color="red" size="small">Hủy không duyệt</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'

interface User {
    date: string
    name: string
    address: string
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
    return row.address
}

const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Công ty CỔ PHẦN CÔNG NGHỆ TOKYO TECHLAB',
        address: 'Số 1 phố xốm phú lãm , Hà đông hà nôi',
    },
    {
        date: '2016-05-02',
        name: 'Công ty CỔ PHẦN CÔNG NGHỆ TOKYO TECHLAB',
        address: 'Số 1 phố xốm phú lãm , Hà đông hà nôi',
    },
    {
        date: '2016-05-04',
        name: 'Công ty CỔ PHẦN CÔNG NGHỆ TOKYO TECHLAB',
        address: 'Số 1 phố xốm phú lãm , Hà đông hà nôi',
    },
    {
        date: '2016-05-01',
        name: 'Công ty CỔ PHẦN CÔNG NGHỆ TOKYO TECHLAB',
        address: 'Số 1 phố xốm phú lãm , Hà đông hà nôi',
    },
]
</script>