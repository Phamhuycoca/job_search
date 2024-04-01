<template>
    <div>
        <el-dialog v-model="props.dialog" width="1000" align-center close-icon="false" :before-close="props.dialog"
            draggable>
            <template #header>
                <h1 class="text-center">Tạo mới thông tin</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 1000px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Công việc">
                            <el-input v-model="fullName" size="large" placeholder="Nhập thông tin" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Nghành nghề">
                            <el-select size="large"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Kinh nghiệm">
                            <el-select size="large"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Mức lương">
                            <el-select size="large"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Cấp bậc làm việc">
                            <el-select size="large"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Hình thức làm việc">
                            <el-select size="large"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Khu vực">
                            <el-select size="large"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Thời gian làm việc">
                            <el-input size="large" placeholder="Nhập thông tin" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Địa điểm">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                placeholder="Nhập thông tin" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Yêu cầu công việc">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                placeholder="Nhập thông tin" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Quyền lợi">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                placeholder="Nhập thông tin" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="flex justify-between items-center">
                    <el-button plain type="danger" @click="handleClose">
                        Đóng
                    </el-button>
                    <el-button plain type="primary" @click="saveData">
                        Lưu
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { optionsGender } from "@/common/constants";
import { defineProps, defineEmits, ref, onMounted } from "vue";
import { showErrors, showSuccessNotification } from "@/common/helpers";
const emit = defineEmits();
const props = defineProps(['dialog']);
const file = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const fullName = ref('');
const email = ref('');
const gender = ref('');
const phoneNumber = ref('');
const address = ref('');
const roleId = ref('');
const roles = ref<any | undefined>([]);


const loadRoles = async () => {

}

onMounted(() => {
    loadRoles();
})




const handleClose = () => {
    emit('close');
};

const onFileChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
        file.value = target.files[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                selectedImage.value = e.target.result as string;
            }
        };
        reader.readAsDataURL(file.value);
    }
};
const onRemoveImage = () => {
    selectedImage.value = null;
    file.value = null;
};
const saveData = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName.value);
    formData.append("email", email.value);
    formData.append("gender", gender.value);
    formData.append("phoneNumber", phoneNumber.value);
    formData.append("address", address.value);
    formData.append("roleId", roleId.value);
    if (file.value !== null) {
        formData.append("file", file.value);
    } else {
        formData.append("file", '');
    }
    // const res = await createEmployee(formData);
    // if (res.success) {
    //     showSuccessNotification(res.message)
    // }
    // else {
    //     if (res.errors !== undefined) {
    //         showErrors(res.errors);
    //     }
    // }
    emit('loadData');
    emit('close');
}
</script>

<style scoped>
.el-textarea__inner {
    min-height: 100px !important;
}
</style>