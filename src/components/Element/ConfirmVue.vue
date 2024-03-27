<template>
    <div>
        <el-dialog v-model="props.dialogDelete" width="450" align-center close-icon="false"
            :before-close="props.dialogDelete" style="border-radius: 10px;">
            <template #header>
                <h1 class="text-left text-3xl">Thông báo</h1>
            </template>
            <div class="flex items-center">
                <Delete class="w-10 h-10 text-[#E6A23C] mr-4" />
                <span class="text-xl">Bạn có muốn xóa thông tin ?</span>
            </div>
            <template #footer>
                <div class="flex justify-between items-center mt-4">
                    <el-button type="danger" @click="emit('close')">Hủy</el-button>
                    <el-button type="primary" @click="emit('saveData')">Xác nhận</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Delete } from '@element-plus/icons-vue'
const props = defineProps(['dialogDelete']);
const emit = defineEmits();

</script>