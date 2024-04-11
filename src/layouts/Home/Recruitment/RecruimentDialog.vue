<template>
    <el-dialog v-model="props.dialog" width="600" align-center close-icon="false" :before-close="props.dialog"
        draggable>
        <template #header>
            <h1 class="text-center">Nộp hồ sơ xin việc</h1>
        </template>
        <el-form>
            <el-form-item label="CV cá nhân">
                <input type="file" accept=".pdf" v-if="selectedCv === null" @change="onFileChangedCV" class="ml-5" />
                <div v-else class="ml-5">
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
            <el-form-item label="Nhập nội dung">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                    placeholder="Nhập thông tin" v-model="content" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button plain type="primary" @click="sendRecruiment">
                Ứng tuyển
            </el-button>
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
import { useRecruitment } from "./Services/recruitment.service";
import { showSuccessNotification, showErrorNotification, showErrors, showToasrErrors } from "@/common/helpers";
import { ElMessage } from 'element-plus'

const loading = useLoadingStore();
const { isAuthenticated } = useAuthService();
const { createuseRecruitment } = useRecruitment();
const emit = defineEmits();
const { getInfo, uploadCVJobSeeker } = useJobSeeker();
const props = defineProps(['dialog', 'currentItem']);
const job_Cv = ref("");
const deleteCv = ref<string | null>(null);
const selectedCv = ref<string | null>(null);
const filecv = ref<File | null>(null);
const content = ref('');
const jobId = ref('');
const employersId = ref('');
watch(() => props.dialog, (newValue, oldValue) => {
    if (newValue === true) {
        loadData();
    }
});
watch(() => props.currentItem, (newValue, oldValue) => {
    jobId.value = props.currentItem.jobId;
    employersId.value = props.currentItem.employersId;
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
        uploadCV();
    }
};
const sendRecruiment = async () => {
    loading.showLoading(true);
    const formData = new FormData();
    formData.append('jobId', jobId.value)
    formData.append('employersId', employersId.value);
    formData.append('content', content.value);
    const res = await createuseRecruitment(formData);
    if (res.success) {
        // showSuccessNotification(res.message)
        ElMessage({
            message: res.message,
            type: 'success',
        })
        jobId.value = '';
        content.value = '';
        employersId.value = '';
    }
    else {
        if (res.errors !== undefined) {
            showToasrErrors(res.errors);
            //showErrors(res.errors);
        }
    }
    loading.showLoading(false);
    emit('close');
}
const uploadCV = async () => {
    loading.showLoading(true);
    const formData = new FormData();
    formData.append('deleteCv', deleteCv.value || '');
    if (filecv.value !== null) {
        formData.append("cv", filecv.value);
    }
    await uploadCVJobSeeker(formData);
    loading.showLoading(false);
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
    deleteCv.value = selectedCv.value;
    selectedCv.value = null;
    filecv.value = null;
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