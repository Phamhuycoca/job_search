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
                    Tổng hồ sơ ứng tuyển
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
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column fixed label="Tổng CV" width="100" align="center">
                        <template #default="scope">
                            <div style="color: red;">
                                <el-link :href="'/employers/job_seekerbyid/' + scope.row.jobId">
                                    {{ totals(scope.row.jobId) }}
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed prop="jobName" label="Tên công việc" width="300" />
                    <el-table-column prop="workexperienceName" label="Kinh nghiệm làm việc" width="320" />
                    <el-table-column prop="formofworkName" label="Hình thức làm việc" width="200" />
                    <el-table-column prop="professionName" label="Nghành nghề" width="200" />
                    <el-table-column prop="levelworkName" label="Cấp bậc" width="200" />
                    <el-table-column prop="salaryPrice" label="Mức lương" width="200" />
                    <el-table-column prop="expirationDate" label="Ngày hết hạn" width="120" />
                    <el-table-column fixed="right" label="Tùy chọn" width="200" align="center">
                        <template #default="scope">
                            <el-button type="primary" size="small"
                                @click="$router.push(`recruitment/${scope.row.jobId}`)">Xem
                                danh
                                sách ứng tuyển</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex justify-between items-center my-4">
                    <div>
                        <el-select v-model="seletedValue" size="large" style="width: 70px">
                            <el-option v-for="item in optionsSelects" :key="item.value" :value="item.value" />
                        </el-select>
                        <p class="inline-block ml-2">Totals: {{ totalItems }}</p>
                    </div>
                    <!-- <el-pagination background layout="prev, pager, next" :total="lengthPage" v-model="page" prev-text
                        v-model:current-page="page" /> -->
                    <el-pagination background layout="prev, pager, next" :total="lengthPage" v-model="page"
                        prev-text="Previous" v-model:current-page="page" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { ElTable, ElTableColumn, ElButton, ElRow, ElCol, ElCard, ElIcon, ElLink, ElPagination, ElSelect, ElOption } from 'element-plus';
import { Postcard, Files } from '@element-plus/icons-vue';
import { useEmployers } from '../Account/Services/employers.service';
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from '@/common/constants';
import { useRecruitment } from '@/layouts/Home/Recruitment/Services/recruitment.service';
import { recruitmentApi } from '@/layouts/Home/Recruitment/Services/recruitment.api';
import { useJob } from '../News/Services/job.service';
const { fetchJobs, deleteJob, searchJobs } = useJob();
const { dashBoard } = useEmployers();


interface DashboardData {
    tongSoBaiDang: number;
    tongSoNguoiUngTuyen: number;
    tongSoCVChuaDuyet: number;
    tongSoNguoiDaGuiEmail: number;
}
const optionsSelects = ref(optionsSelect);
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const totalItems = ref<number | undefined>(0);
let page = ref(1);
let lengthPage = ref<number | undefined>(100);
const tableData = ref<any | undefined>([]);
const search = ref('');
const dataItem = ref<DashboardData>({
    tongSoBaiDang: 0,
    tongSoNguoiUngTuyen: 0,
    tongSoCVChuaDuyet: 0,
    tongSoNguoiDaGuiEmail: 0,
});
const recruiments = ref<any | undefined>([]);

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
        ElLink,
        ElPagination,
        ElSelect,
        ElOption,
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



        const loadData = async () => {

            const data = await fetchJobs();
            const res = await recruitmentApi.itemsList();
            recruiments.value = res.data;
            if (data) {
                tableData.value = data.items;
                if (data.totalItems !== undefined) {
                    totalItems.value = data.totalItems;
                    lengthPage.value = Math.ceil(data.totalItems / seletedValue.value) * 10;
                }
            }
        };
        const totals = (id: any) => {
            const filteredArray = recruiments.value.filter((element: any) => element.jobId === id);
            return filteredArray.length;
        };
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
            dashboard();
            loadData();
        });

        return {
            series,
            chartOptions,
            dashboard,
            tableData,
            dataItem,
            totals,
            seletedValue,
            totalItems,
            page,
            lengthPage,
            search,
            optionsSelects
        };
    },
});
</script>
