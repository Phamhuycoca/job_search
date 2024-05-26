<template>
    <div>
        <el-row>
            <el-col :span="10">
                <apexchart width="500" type="donut" :options="chartOptions" :series="series"></apexchart>
                <el-button @click="dashboard">Làm mới</el-button>
            </el-col>
            <el-col :span="14" class="grid gap-6 grid-cols-4 grid-rows-4">
                <el-card style="width: 200px; height:100px;">
                    Số bài đăng
                    <span style="color: red;">
                        10
                    </span>
                    <el-icon>
                        <Postcard />
                    </el-icon>
                </el-card>
                <el-card style="width: 200px; height:100px;">
                    Tổng hồ sơ
                    <span style="color: red;">
                        10
                    </span>
                    <el-icon>
                        <Files />
                    </el-icon>
                </el-card>
                <el-card style="width: 200px; height:100px;">
                    Hồ sơ phù hợp
                    <span style="color: red;">
                        10
                    </span>
                    <el-icon>
                        <Files />
                    </el-icon>
                </el-card>
                <el-card style="width: 200px; height:100px;">
                    Hồ sơ chưa duyệt
                    <span style="color: red;">
                        10
                    </span>
                    <el-icon>
                        <Files />
                    </el-icon>
                </el-card>
            </el-col>
            <el-col>
                <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="Date" width="120">
                        <template #default="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column property="name" label="Name" width="320" />
                    <el-table-column property="address" label="Address" show-overflow-tooltip />
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { ElTable, ElTableColumn, ElButton, ElRow, ElCol, ElCard, ElIcon } from 'element-plus';
import { Postcard, Files } from '@element-plus/icons-vue';

interface User {
    date: string;
    name: string;
    address: string;
}

export default defineComponent({
    name: 'VueChart',
    components: {
        apexchart: VueApexCharts,
        ElTable,
        ElTableColumn,
        ElButton,
        ElRow,
        ElCol,
        ElCard,
        ElIcon,
        Postcard,
        Files,
    },
    setup() {
        const bill = ref({
            bill_Count: 100,
            don_hang_da_giao: 50,
        });

        const series = computed(() => [bill.value.bill_Count, bill.value.don_hang_da_giao]);

        const labels = [
            'Số hồ sơ phù hợp',
            'Số người ứng tuyển',
        ];

        const chartOptions = computed(() => ({
            chart: {
                id: 'vuechart-example',
            },
            labels,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 800,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            }],
        }));

        const dashboard = () => {
            // Cập nhật giá trị của bill nếu cần
        };

        const tableData = ref<User[]>([
            { date: '2024-05-03', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
            { date: '2024-05-02', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
            { date: '2024-05-04', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
            { date: '2024-05-01', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
            { date: '2024-05-08', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
            { date: '2024-05-06', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
            { date: '2024-05-07', name: 'Nguyên Văn Tom', address: 'Số 1, phố xốm phú lãm hà đông-Hà nội' },
        ]);

        const multipleTableRef = ref<InstanceType<typeof ElTable>>();
        const multipleSelection = ref<User[]>([]);



        return {
            series,
            chartOptions,
            dashboard,
            tableData,
            multipleTableRef,
        };
    },
});
</script>
