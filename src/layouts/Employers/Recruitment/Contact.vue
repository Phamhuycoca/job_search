<template>
    <div>
        <el-dialog v-model="props.Contact" title="Gửi thư hẹn phỏng vấn" width="800">
            <el-col :span="24">
                <el-form-item label="Người nhận">
                    <el-input size="large" placeholder="Nhập thông tin" disabled="" v-model="email" />
                </el-form-item>
                <el-form-item label="Nhập nội dung">
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                        placeholder="Nhập thông tin" />
                </el-form-item>
                <el-form-item label="Thời gian">
                    <el-date-picker type="date" size="large" style="width: 100%;" placeholder="Chọn ngày"
                        format="DD/MM/YYYY" value-format="DD/MM/YYYY" />
                </el-form-item>
            </el-col>
            <template #footer>
                <div class="flex justify-end items-center">

                    <div class="dialog-footer">
                        <el-button @click="handleClose" color="green">Gửi</el-button>
                    </div>
                    <div class="dialog-footer">
                        <el-button @click="handleClose">Cancel</el-button>
                    </div>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
const emit = defineEmits();
const email = ref('Phamkhachuy240702@gmail.com')

const props = defineProps(['Contact']);
const handleClose = () => {
    emit('close');
};

</script>

<style></style>