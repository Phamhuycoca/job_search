<template>
    <div>
        <el-dialog v-model="props.dialog" width="400" align-center close-icon="false" :before-close="props.dialog"
            draggable>
            <template #header>
                <h1 class="text-center">Tạo mới thông tin</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 800px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Nghành nghề">
                            <el-input v-model="professionName" size="large" placeholder="Nhập thông tin" />
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
import { defineProps, defineEmits, ref, onMounted } from "vue";
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { useProfession } from "./Services/profession.service";
const { createProfession } = useProfession();
const emit = defineEmits();
const props = defineProps(['dialog']);
const professionName = ref('');

const handleClose = () => {
    emit('close');
};

const saveData = async () => {
    const formData = new FormData();
    formData.append('professionName', professionName.value);
    const res = await createProfession(formData);
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