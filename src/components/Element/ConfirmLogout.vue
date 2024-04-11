<template>
    <el-dialog v-model="props.dialog" title="Thông báo" width="500" align-center close-icon="false"
        :before-close="props.dialog" style="border-radius: 5px;">
        <span>Bạn có muốn đăng xuất</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="emit('close')">Hủy</el-button>
                <el-button @click="emit('Logout')" type="primary">
                    Đăng xuẩt
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits();

const props = defineProps(['dialog']);
</script>

<style></style>