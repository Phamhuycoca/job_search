<template>
    <div>
        <el-dialog v-model="props.dialogEdit" width="400" align-center close-icon="false"
            :before-close="props.dialogEdit" draggable>
            <template #header>
                <h1 class="text-center">Cập nhật thông tin</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 800px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Kinh nghiệm làm việc">
                            <el-input v-model="name" size="large" placeholder="Nhập thông tin" />
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
import { defineProps, defineEmits, ref, onMounted, watch } from "vue";
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { useWorkexperience } from "./Services/workexperience.service";
const { updateWorkexperience, getData } = useWorkexperience();
const emit = defineEmits();
const name = ref('');

const props = defineProps(['dialogEdit', 'id']);
watch(() => props.id, (newValue, oldValue) => {
    if (newValue !== '') {
        getDetail(newValue);
    }
});
const getDetail = async (id: any) => {
    const res = await getData(id);
    name.value = res.data.workexperienceName;
}
const handleClose = () => {
    emit('close');
};

const saveData = async () => {
    const formData = new FormData();
    formData.append('workexperienceName', name.value);
    formData.append('workexperienceId', props.id);
    const res = await updateWorkexperience(formData, props.id);
    if (res.success) {
        showSuccessNotification(res.message)
    }
    else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    emit('loadData');
    emit('close');
}
</script>