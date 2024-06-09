<template>
    <div class="min-h-screen px-10 py-10">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="h-48">
                    <h1 class="text-center">Tìm kiếm thông tin</h1>
                    <el-input placeholder="Nhập từ khóa rồi ấn Enter" size="large" class="my-2 w-full"
                        @change="searchData()" v-model="search" :suffix-icon="Search" />
                    <div class="flex justify-between items-center">
                        <el-select placeholder="Chọn khu vực" size="large" class="my-4" v-model="cityId">
                            <el-option v-for="item in itemsListCitys" :key="item.cityId" :value="item.cityId"
                                :label="item.cityName" />
                        </el-select>
                        <el-button @click="refeshData" size="large" class="mx-2">Làm mới</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" v-if="total > 0">
                <el-row :gutter="10">
                    <el-col :span="12" v-for="item in compannyLists" :key="item">
                        <el-card shadow="hover" class="mb-5">
                            <el-row>
                                <el-col :span="4" class="flex justify-center items-center">
                                    <el-image style="max-height: 128px;height: 100%; max-width: 128px;width: 100%;"
                                        fit="cover" :src="item.companyLogo" />
                                </el-col>
                                <el-col :span="15" class=" h-32 ml-2">
                                    <div class="h-full w-full flex flex-col justify-between">
                                        <el-tooltip effect="dark" :content="item.companyName" placement="top">
                                            <span class="text-md truncate"><i class="ri-community-line mr-2"></i>{{
                                                item.companyName
                                                }}</span>
                                        </el-tooltip>
                                        <el-tooltip effect="dark" :content="item.companyAddress" placement="top">
                                            <span class="text-md truncate"><i class="ri-map-pin-fill mr-2"></i>{{
                                                item.companyAddress }}</span>
                                        </el-tooltip>
                                        <span class="text-md"><i class="ri-phone-fill mr-2"></i>{{
                                            item.contactPhoneNumber }}</span>
                                        <span class="text-md"><i class="ri-road-map-line mr-2"></i>{{ item.cityName
                                            }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="4" style="position: relative;margin-left: 15px;">
                                    <el-tooltip content="Số lượt thích 1k" placement="top">
                                        <div class="flex justify-center items-center text-sm cursor-pointer">
                                            <i :class="{ 'ri-heart-line': !liked, 'ri-heart-fill text-red-500': liked }"
                                                class="text-3xl cursor-pointer" @click="toggleLike"></i>Like
                                        </div>
                                    </el-tooltip>
                                    <el-link :href="`/compannydetail/${item.employersId}`"
                                        style="position: absolute;bottom: 0;display: flex;justify-content: center;width: 100%;align-items: center;"
                                        type="info"><i class="ri-eye-line"></i>Xem
                                        chi tiết</el-link>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="18" v-else class="h-40">
                <span class="w-full flex justify-center items-center text-3xl">Không có dữ liệu</span>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { cityApi } from '@/layouts/Admin/City/Services/city.api';
import { useEmployers } from '@/layouts/Employers/Account/Services/employers.service';
import { onMounted, ref, watch } from 'vue';
const { fetchCompannys, searchCompannys } = useEmployers();
import { Search } from "@element-plus/icons-vue";
import { DEFAULT_COMMON_LIST_QUERY_BY_HOME } from '@/common/constants';
import { useLoadingStore } from '@/store/loading.store';
const liked = ref(true);
const loading = useLoadingStore();
const compannyLists = ref<any | undefined>([]);
const itemsListCitys = ref<any | null>([]);
const cityId = ref("");
const search = ref("");
const total = ref<number>(0);

const searchData = async () => {
    loading.showLoading(true);
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
    const data = await searchCompannys();
    compannyLists.value = data?.items;
    total.value = data?.totalItems;

    loading.showLoading(false);

}
const toggleLike = () => {
    liked.value = !liked.value;
}
const loadData = async () => {
    loading.showLoading(true);
    const res = await fetchCompannys();
    compannyLists.value = res?.items;
    total.value = res?.totalItems;

    loading.showLoading(false);
}
const refeshData = async () => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.salaryId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.formofworkId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.professionId = "";
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.workexperienceId = "";
    cityId.value = "";
    search.value = "";
    loadData();

};
watch(search, (newval, oldval) => {
    if (newval === "" && oldval !== "") {
        DEFAULT_COMMON_LIST_QUERY_BY_HOME.page = 1;
        loadData();
    }
});
watch(cityId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_BY_HOME.cityId = newval;
    loadData();
});
onMounted(async () => {
    const itemcitys = await cityApi.itemsList();
    itemsListCitys.value = itemcitys.data;
    loadData();
})
</script>

<style scoped>
.el-link {
    margin-right: 8px;
}

.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}
</style>