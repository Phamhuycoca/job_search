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
                        {{ dataItem.tongSoBaiDang }}
                    </span>
                    <el-icon>
                        <Postcard />
                    </el-icon>
                </el-card>
                <el-card style="width: 200px; height:100px;">
                    Tổng hồ sơ ứng tuyển<nav></nav>
                    <span style="color: red;">
                        {{ dataItem.tongSoNguoiUngTuyen }}
                    </span>
                    <el-icon>
                        <Files />
                    </el-icon>
                </el-card>
                <el-card style="width: 200px; height:100px;">
                    Số hồ sơ chưa duyệt
                    <span style="color: red;">
                        {{ dataItem.tongSoCVChuaDuyet }}
                    </span>
                    <el-icon>
                        <Files />
                    </el-icon>
                </el-card>
                <el-card style="width: 200px; height:100px;">
                    Số hồ sơ đã xét chọn
                    <span style="color: red;">
                        {{ dataItem.tongSoNguoiDaGuiEmail }}
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
import { defineComponent, ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { ElTable, ElTableColumn, ElButton, ElRow, ElCol, ElCard, ElIcon } from 'element-plus';
import { Postcard, Files } from '@element-plus/icons-vue';
import { useEmployers } from '../Account/Services/employers.service';
const { dashBoard } = useEmployers();
interface DashboardData {
    tongSoBaiDang: number;
    tongSoNguoiUngTuyen: number;
    tongSoCVChuaDuyet: number;
    tongSoNguoiDaGuiEmail: number;
}

const dataItem = ref<DashboardData>({
    tongSoBaiDang: 0,
    tongSoNguoiUngTuyen: 0,
    tongSoCVChuaDuyet: 0,
    tongSoNguoiDaGuiEmail: 0,
});

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

        const dashboard = async () => {
            const res = await dashBoard();
            dataItem.value = res.data;
            // Cập nhật giá trị của bill nếu cần
        };




        onMounted(() => {
            dashboard();
        })
        return {
            series,
            chartOptions,
            dashboard,
            dataItem
        };
    },
});
</script>
