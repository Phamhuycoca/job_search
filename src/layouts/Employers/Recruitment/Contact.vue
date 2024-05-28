<template>
    <div>
        <el-dialog v-model="props.Contact" title="Gửi thư hẹn phỏng vấn" width="800" close-icon="false"
            :before-close="props.Contact" draggable>
            <el-col :span="24">
                <el-form-item label="Người nhận">
                    <el-input size="large" placeholder="Nhập thông tin" disabled="" v-model="from" />
                </el-form-item>
                <el-form-item label="Email nhận">
                    <el-input size="large" placeholder="Nhập thông tin" disabled="" v-model="mailSend" />
                </el-form-item>
                <el-form-item label="Tiêu đề">
                    <el-input size="large" placeholder="Nhập thông tin" v-model="title" />
                </el-form-item>
                <el-form-item label="Nhập nội dung">
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                        placeholder="Nhập thông tin" v-model="content" />
                </el-form-item>
                <el-form-item label="Thời gian">
                    <el-date-picker type="date" size="large" style="width: 100%;" placeholder="Chọn ngày" v-model="date"
                        format="DD/MM/YYYY" value-format="DD/MM/YYYY" />
                </el-form-item>
            </el-col>
            <template #footer>
                <div class="flex justify-end items-center">

                    <div class="dialog-footer">
                        <el-button @click="sendEmail" color="green">Gửi</el-button>
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
import { useJobSeeker } from "@/layouts/Home/Account/Services/Job_seeker.service";
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";
import { useEmail } from "../Email/email.service";
import { showErrorNotification, showSuccessNotification } from "@/common/helpers";
const emit = defineEmits();
const { getInfoById } = useJobSeeker();
const { senMail } = useEmail();
const mailSend = ref('');
const from = ref('');
const title = ref('');
const content = ref('');
const date = ref('');
const id = ref('');
const props = defineProps(['Contact', 'currentData']);
watch(() => props.currentData, (newValue, oldValue) => {
    if (newValue !== '') {
        console.log(newValue.job_SeekerId);
        id.value = newValue.job_SeekerId;
        getData(id.value);
    }
});
const sendEmail = async () => {
    const formData = new FormData();
    formData.append('mailSend', mailSend.value);
    formData.append('from', from.value);
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('date', date.value);
    const res = await senMail(formData);
    console.log(res);
    if (res.success) {
        showSuccessNotification(res.message);
        emit('close');
    } else {
        showErrorNotification('Có loỗi xảy ra');
    }

}
const getData = async (id: any) => {
    const res = await getInfoById(id);
    mailSend.value = res.data.email;
    from.value = res.data.fullName;
    console.log(res);
}
onMounted(async () => {
    await getData(id.value);
})
const handleClose = () => {
    emit('close');
};

</script>

<style></style>