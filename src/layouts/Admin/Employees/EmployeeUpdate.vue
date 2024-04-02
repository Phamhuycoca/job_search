<template>
    <div>
        <el-dialog v-model="props.dialogEdit" width="800" align-center close-icon="false"
            :before-close="props.dialogEdit" draggable>
            <template #header>
                <h1 class="text-center">Cập nhật thông tin</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 800px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Nhân viên">
                            <el-input v-model="fullName" size="large" placeholder="Nhập họ tên" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ảnh đại diện">
                            <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
                                class="w-32 h-32 mr-10" />
                            <input v-if="selectedImage === null" type="file" @change="onFileChanged" />
                            <el-button v-if="selectedImage" class="ml-19" type="danger"
                                @click="onRemoveImage">Xóa</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Email">
                            <el-input v-model="email" size="large" placeholder="Nhập email" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Giới tính">
                            <el-select v-model="gender" placeholder="Chọn giới tính" size="large">
                                <el-option v-for="item in optionsGender" :key="item.value" :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Số điện thoại">
                            <el-input v-model="phoneNumber" size="large" placeholder="Nhập số điện thoại" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Chức vụ">
                            <el-select v-model="roleId" placeholder="Chọn chức vụ" size="large">
                                <el-option v-for="item in roles" :key="item.roleId" :value="item.roleId"
                                    :label="item.roleName" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Địa chỉ liên hệ">
                            <el-input v-model="address" autosize type="textarea" clearable
                                placeholder="Nhập địa chỉ liên hệ"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="flex justify-between items-center">
                    <el-button plain type="danger" @click="handleClose"> Đóng </el-button>
                    <el-button plain type="primary" @click="saveData"> Lưu </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { optionsGender } from "@/common/constants";
import { defineProps, defineEmits, ref, onMounted, watch } from "vue";
import { useRole } from "../Roles/Services/role.service";
import { useEmployee } from "../Employees/Services/employee.service";
import { showErrors, showSuccessNotification } from "@/common/helpers";
const { fetchRoles } = useRole();
const { updateEmployee, getData } = useEmployee();
const emit = defineEmits();
const props = defineProps(["dialogEdit", "id"]);
const file = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const fullName = ref("");
const email = ref("");
const gender = ref("");
const phoneNumber = ref("");
const address = ref("");
const roleId = ref("");
const roles = ref<any | undefined>([]);
const imageDelete = ref<string | null>(null);

const loadRoles = async () => {
    const res = await fetchRoles();
    roles.value = res?.items;
};
watch(
    () => props.id,
    (newValue, oldValue) => {
        if (newValue !== "") {
            getDetail(newValue);
        }
    }
);

onMounted(() => {
    loadRoles();
});
const getDetail = async (id: any) => {
    const res = await getData(id);
    console.log(res.data);
    roleId.value = res.data.roleId;
    fullName.value = res.data.fullName;
    email.value = res.data.email;
    gender.value = res.data.gender;
    phoneNumber.value = res.data.phoneNumber;
    address.value = res.data.address;
    selectedImage.value = res.data.avatar;
    if (res.data.avatar !== null) {
        imageDelete.value = res.data.avatar;
    } else {
        imageDelete.value = null;
    }
};

const handleClose = () => {
    emit("close");
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
    formData.append("userId", props.id);
    if (file.value !== null) {
        formData.append("file", file.value);
    } else {
        formData.append("file", "");
    }
    if (imageDelete.value !== null) {
        formData.append("imageDelete", imageDelete.value);
    } else {
        formData.append("imageDelete", "");
    }
    const res = await updateEmployee(formData, props.id);
    if (res.success) {
        showSuccessNotification(res.message);
    } else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    emit("loadData");
    emit("close");
};
</script>

<style scoped>
.el-textarea__inner {
    min-height: 100px !important;
}
</style>
