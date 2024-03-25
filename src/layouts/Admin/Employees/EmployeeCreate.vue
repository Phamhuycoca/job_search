<template>
    <div>
        <el-dialog v-model="props.dialog" width="800" align-center close-icon="false" :before-close="props.dialog"
            draggable>
            <template #header>
                <h1 class="text-center">Tạo mới thông tin</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 800px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Nhân viên">
                            <el-input size="large" placeholder="Nhập họ tên" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ảnh đại diện">
                            <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
                                class="w-24 h-32 mr-10" />
                            <input v-if="selectedImage === null" type="file" @change="onFileChanged">
                            <el-button v-if="selectedImage" type="danger" @click="onRemoveImage">Xóa</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Email">
                            <el-input size="large" placeholder="Nhập email" />
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
                            <el-input size="large" placeholder="Nhập số điện thoại" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Chức vụ">
                            <el-select v-model="gender" placeholder="Chọn chức vụ" size="large">
                                <el-option v-for="item in optionsGender" :key="item.value" :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Địa chỉ liên hệ">
                            <el-input v-model="name" autosize type="textarea" clearable
                                placeholder="Nhập địa chỉ liên hệ"></el-input>
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
import { defineProps, defineEmits, ref } from "vue";
const emit = defineEmits();
const props = defineProps(['dialog']);
const file = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const gender = ref<Boolean | null>(null);
const name = ref<String | null>(null);
const optionsGender = [
    {
        value: 'Nam',
        label: true,
    },
    {
        value: 'Nữ',
        label: false,
    }
]









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
const saveData = () => {
    console.log(file.value);
}
</script>

<style scoped>
.el-textarea__inner {
    min-height: 100px !important;
}
</style>