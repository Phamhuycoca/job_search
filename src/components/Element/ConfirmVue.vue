<template>
    <el-button type="primary" @click="open" size="small">Xóa</el-button>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { defineEmits } from 'vue';
const emit = defineEmits();
import { Delete } from '@element-plus/icons-vue'
import { markRaw } from 'vue'

const open = () => {
    ElMessageBox.confirm(
        'Bạn có muốn xóa thông tin ?',
        'Thông báo',
        {
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            type: 'warning',
            icon: markRaw(Delete),
        }
    ).then(action => {
        emit('confirm', action === 'confirm')
    })
}
</script>