<template>
    <div>
        <el-row class="mb-4">
            <apexchart width="500" type="donut" :options="chartOptions" :series="series"></apexchart>
            <el-button @click="dashboard">Làm mới</el-button>
        </el-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
    name: 'VueChart',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const bill = ref({
            bill_Count: 100,
            don_hang_chua_thanh_toan: 20,
            don_hang_dang_giao: 30,
            don_hang_da_giao: 50,
        });

        const series = computed(() => [
            bill.value.bill_Count,
            bill.value.don_hang_chua_thanh_toan,
            bill.value.don_hang_dang_giao,
            bill.value.don_hang_da_giao,
        ]);

        const labels = [
            'Tổng số đơn hàng',
            'Đơn hàng chưa thanh toán',
            'Đơn hàng đang giao',
            'Đơn hàng đã giao',
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
                        width: 800
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }));

        const dashboard = () => {
            // Cập nhật giá trị của bill nếu cần
        };

        return {
            series,
            chartOptions,
            dashboard,
        };
    },
});
</script>