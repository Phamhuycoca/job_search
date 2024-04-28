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
        <el-table :data="tableData" style="width: 100%;">

            <el-table-column type="index" label="STT" width="450" align="center">

            </el-table-column>
            <el-table-column prop="professionName" label="Nghành nghề" align="center" width="600" />
            <el-table-column fixed="right" label="Tùy chọn" min-width="150" align="center">
                <template #default="scope">
                    <el-dropdown size="large" split-button type="primary">
                        <span>
                            Chức năng
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :icon="CirclePlusFilled"
                                    @click="id = scope.row.professionId, dialogEdit = true">
                                    Sửa
                                </el-dropdown-item>
                                <el-dropdown-item :icon="Delete"
                                    @click="dialogDelete = true, idRemove = scope.row.professionId">
                                    Xóa</el-dropdown-item>
                                <el-dropdown-item :icon="Plus"
                                    @click="dialog_levelwork = true, profession = scope.row">Thêm cấp
                                    bậc</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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
        <ProfessionCreate :dialog="dialog" @close="dialog = false" @loadData="loadData()" />
        <ProfessionUpdate :dialogEdit="dialogEdit" :id="id" @close="dialogEdit = false" @loadData="loadData()" />
        <ConfirmVue :dialogDelete="dialogDelete" @close="dialogDelete = false" @saveData="RemoveItem" />
        <LevelworksCreate :profession="profession" :dialog_levelwork="dialog_levelwork"
            @close="dialog_levelwork = false, profession = ''" />
    </div>
</template>

<script lang="ts" setup>
import {
    ArrowDown,
    Check,
    CircleCheck,
    CirclePlus,
    CirclePlusFilled,
    Plus, Search, Delete
} from '@element-plus/icons-vue'
import { onMounted, ref, watch } from "vue"
import ProfessionCreate from '../Profession/ProfessionCreate.vue'
import ProfessionUpdate from '../Profession/ProfessionUpdate.vue'
import ConfirmVue from '../../../components/Element/ConfirmVue.vue'

import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION, optionsSelect } from "@/common/constants";
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { useProfession } from "./Services/profession.service"
import LevelworksCreate from '../Levelworks/LevelworksCreate.vue'
import { useLevelworks } from '../Levelworks/Services/levelworks.service'
const { getLevelworksList } = useLevelworks();
const { fetchProfessions, searchProfessions, deleteProfession } = useProfession();

const profession = ref('');
const dialog_levelwork = ref(false);
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
const tableLevelworks = ref<any | undefined>([]);
const search = ref('');
const professionId = ref();
console.log(professionId.value);
const loadLevels = async (id: any) => {
    const data = await getLevelworksList(id);
    if (data) {
        tableLevelworks.value = data.items;
    }
}
watch(professionId, (newVal, oldval) => {
    alert(newVal);
    if (newVal !== '' || newVal !== null) {
        loadLevels(newVal);
    }

});
const RemoveItem = async () => {
    const res = await deleteProfession(idRemove.value);
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
    const data = await fetchProfessions();
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
    const data = await searchProfessions();
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
<style scoped>
.el-dropdown-link {
    margin: auto;
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>