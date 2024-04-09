<template>
    <el-dialog v-model="props.dialog" width="500" align-center close-icon="false" :before-close="props.dialog"
        draggable>
        <template #header>Nộp hồ sơ xin việc</template>
        <el-form>
            <el-form-item label="CV cá nhân">
                <input type="file" accept=".pdf" v-if="selectedCv === null" @change="onFileChangedCV" />
                <div v-else>
                    <!-- <embed :src="selectedCv" type="application/pdf" width="100%" height="500px" /> -->
                    <el-button type="primary" plain @click="viewCV">
                        <el-icon class="mr-2">
                            <View />
                        </el-icon>
                        Xem cv</el-button>
                    <el-button color="red" plain @click="onRemoveCV">
                        <el-icon class="mr-2">
                            <Delete />
                        </el-icon>
                        Xóa cv</el-button>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button plain type="danger" @click="handleClose">
                Đóng
            </el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref, watch } from "vue";
import { useJobSeeker } from "../Account/Services/Job_seeker.service";
import { useLoadingStore } from "@/store/loading.store";
import { useAuthService } from "@/pages/Auth/Services/auth.service";
const loading = useLoadingStore();
const { isAuthenticated } = useAuthService();

const emit = defineEmits();
const { getInfo } = useJobSeeker();
const props = defineProps(['dialog', 'currentItem']);
const job_Cv = ref("");
const deleteCv = ref<string | null>(null);
const selectedCv = ref<string | null>(null);
const filecv = ref<File | null>(null);
watch(() => props.dialog, (newValue, oldValue) => {
    if (newValue === true) {
        loadData();
    }
});
const onFileChangedCV = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
        filecv.value = target.files[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                selectedCv.value = e.target.result as string;

            }
        };
        reader.readAsDataURL(filecv.value);
    }
};
const uploadCV = async () => {
    const formData = new FormData();
    formData.append('deleteCv', deleteCv.value || '');
    if (filecv.value !== null) {
        formData.append("cv", filecv.value);
    }
}
const loadData = async () => {
    loading.showLoading(true);
    const res = await getInfo();
    if (res.data.job_Cv !== "string") {
        selectedCv.value = res.data.job_Cv;
    }
    loading.showLoading(false);
};
const onRemoveCV = () => {
    selectedCv.value = null;
    filecv.value = null;
    deleteCv.value = selectedCv.value;
};
const viewCV = () => {
    if (selectedCv.value) {
        window.open(selectedCv.value, '_blank');
    } else {
        console.log('');
    }
}
onMounted(() => {
    if (isAuthenticated.value) {
        loadData();
    }
});
const handleClose = () => {
    emit('close');
};
</script>

<style></style>