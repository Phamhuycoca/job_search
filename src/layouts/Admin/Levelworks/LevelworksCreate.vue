<template>
    <div>
        <el-dialog v-model="props.dialog_levelwork" width="500" align-center close-icon="false"
            :before-close="props.dialog_levelwork" draggable>
            <template #header>
                <h1 class="text-center">{{ 'Cấp bậc làm việc nghành ' + props.profession.professionName }}</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 800px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Cấp bậc làm việc">
                            <el-input size="large" v-model="levelworkName" placeholder="Nhập thông tin" />
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
import { defineProps, defineEmits, ref, watch } from "vue";
import { useLevelworks } from "./Services/levelworks.service";
import { professionApi } from "../Profession/Services/profession.api";
import { showErrors, showSuccessNotification } from "@/common/helpers";
const emit = defineEmits();
const props = defineProps(['dialog_levelwork', 'profession']);
const { createLevelworks } = useLevelworks();
const professionId = ref('');
const levelworkName = ref('');
const handleClose = () => {
    emit('close');
};
watch(() => props.profession, (newVal) => {
    professionId.value = newVal.professionId;
});
const saveData = async () => {

    const formData = new FormData();
    formData.append('levelworkName', levelworkName.value);
    formData.append('professionId', professionId.value);
    const res = await createLevelworks(formData);
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

<style></style>