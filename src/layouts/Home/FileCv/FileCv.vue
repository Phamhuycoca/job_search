<template>
    <div class="min-h-screen">
        <div class="text-3xl mt-5 mr-20 mb-5" style="display: flex;justify-content: flex-end;">Danh sách hồ sơ</div>
        <div class="mr-20 mb-2" style="display: flex;justify-content: flex-end;">
            <el-link href="/createcv" class="border text-xl no-underline rounded" style="padding: 8px;">Tạo mới
                cv</el-link>
        </div>
        <div class="w-full px-40">
            <el-row class="mb-10">
                <el-col :span="12" class="p-2" v-for="item in FileCvs" :key="item">
                    <el-card shadow="nerver">
                        <div class="w-full h-full flex">
                            <iframe :src="item.fileCvPath" width="300" height="400"></iframe>
                            <div class="w-full flex flex-col items-center mt-10">
                                <span class="mt-2 mb-2">{{ item.fileCVName }}</span>
                                <div>
                                    <el-button type="primary" @click="viewCV(item.fileCvPath)" plain size="small">Xem
                                        chi tiết</el-button>
                                    <el-button type="danger" plain size="small"
                                        @click="deleteCV(item.fileCvId)">Xóa</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useFileCV } from './filecv.service';
import { useLoadingStore } from '@/store/loading.store';
import { showErrors, showSuccessNotification } from '@/common/helpers';

const { fetchFileCvs, deletefileCV } = useFileCV();
const loading = useLoadingStore();
const viewCV = (fileCv: string) => {
    if (fileCv) {
        window.open(fileCv, '_blank');
    } else {
        console.log('');
    }
}
const FileCvs = ref<any | null>([]);
const loadData = async () => {
    loading.showLoading(true);
    const res = await fetchFileCvs();
    console.log(res?.items);
    FileCvs.value = res?.items;
    loading.showLoading(false);
}
const deleteCV = async (id: string) => {
    loading.showLoading(true);
    const res = await deletefileCV(id);
    if (res.success) {
        showSuccessNotification(res.message)
    }
    else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    loadData();
    loading.showLoading(false);

}

onMounted(async () => {
    loadData();
})

</script>

<style></style>