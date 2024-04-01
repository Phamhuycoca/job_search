<template>
    <div>
        <el-dialog v-model="props.dialogEdit" width="1200" align-center close-icon="false" :before-close="props.dialogEdit"
            draggable>
            <template #header>
                <h1 class="text-center">Cập nhật thông tin</h1>
            </template>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 1150px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Công việc">
                            <el-input v-model="jobName" size="large" placeholder="Nhập thông tin" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Nghành nghề">
                            <el-select size="large" placeholder="Chọn thông tin" v-model="professionId">
                                <el-option v-for="item in Professions" :key="item.professionId"
                                    :value="item.professionId" :label="item.professionName" />
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Kinh nghiệm">
                            <el-select size="large" placeholder="Chọn thông tin" v-model="workexperienceId">
                                <el-option v-for="item in Workexperiences" :key="item.workexperienceId"
                                    :value="item.workexperienceId" :label="item.workexperienceName" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Mức lương">
                            <el-select size="large" placeholder="Chọn thông tin" v-model="salaryId">
                                <el-option v-for="item in Salaries" :key="item.salaryId" :value="item.salaryId"
                                    :label="item.salaryPrice" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Cấp bậc làm việc">
                            <el-select size="large" placeholder="Chọn thông tin" v-model="levelworkId">
                                <el-option v-for="item in Levelworks" :key="item.levelworkId" :value="item.levelworkId"
                                    :label="item.levelworkName" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Hình thức làm việc">
                            <el-select size="large" placeholder="Chọn thông tin" v-model="formofworkId">
                                <el-option v-for="item in Formofworks" :key="item.formofworkId"
                                    :value="item.formofworkId" :label="item.formofworkName" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Khu vực">
                            <el-select size="large" placeholder="Chọn thông tin" v-model="cityId">
                                <el-option v-for="item in Cities" :key="item.cityId" :value="item.cityId"
                                    :label="item.cityName" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Thời gian làm việc">
                            <el-date-picker type="date" size="large" style="width: 100%;"
                                placeholder="Chọn ngày hết hạn" format="DD/MM/YYYY" value-format="DD/MM/YYYY"
                                v-model="expirationDate" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Thời gian làm việc">
                            <el-input size="large" placeholder="Nhập thông tin" v-model="workingTime" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Địa điểm">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                placeholder="Nhập thông tin" v-model="addressJob" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Yêu cầu công việc">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                placeholder="Nhập thông tin" v-model="requestJob" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Quyền lợi">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                placeholder="Nhập thông tin" v-model="benefitsJob" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="flex justify-end items-center">
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
import { optionsGender } from "@/common/constants";
import { defineProps, defineEmits, ref, onMounted, watch } from "vue";
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { cityApi } from "@/layouts/Admin/City/Services/city.api";
import { salaryApi } from "@/layouts/Admin/Salary/Services/salary.api";
import { formofworkApi } from "@/layouts/Admin/Formofwork/Services/formofwork.api";
import { professionApi } from "@/layouts/Admin/Profession/Services/profession.api";
import { workexperiencekApi } from "@/layouts/Admin/Workexperience/Services/workexperience.api";
import { levelworksApi } from "@/layouts/Admin/Levelworks/Services/levelworks.api";
import { useJob } from "./Services/job.service";
const { getData,updateJob } = useJob();
const emit = defineEmits();
const props = defineProps(['dialogEdit', 'id']);
const jobName = ref('');
const requestJob = ref('');
const benefitsJob = ref('');
const addressJob = ref('');
const workingTime = ref('');
const expirationDate = ref('');
const workexperienceId = ref('');
const formofworkId = ref('');
const cityId = ref('');
const salaryId = ref('');
const professionId = ref('');
const levelworkId = ref('');
const employersId = ref('');

const Workexperiences = ref<any | undefined>([]);
const Salaries = ref<any | undefined>([]);
const Professions = ref<any | undefined>([]);
const Levelworks = ref<any | undefined>([]);
const Formofworks = ref<any | undefined>([]);
const Cities = ref<any | undefined>([]);

watch(() => props.id, (newValue, oldValue) => {
    if (newValue !== '') {
        getDetail(newValue);
    }
});
const getDetail = async (id: any) => {
    const res = await getData(id);
    salaryId.value = res.data.salaryId;
    jobName.value=res.data.jobName;
requestJob.value=res.data.requestJob;
benefitsJob.value=res.data.benefitsJob;
addressJob.value=res.data.addressJob;
workingTime.value=res.data.workingTime;
expirationDate.value=res.data.expirationDate;
workexperienceId.value=res.data.workexperienceId;
formofworkId.value=res.data.formofworkId;
cityId.value=res.data.cityId;
professionId.value=res.data.professionId;
levelworkId.value=res.data.levelworkId;
employersId.value=res.data.employersId;
}

const loadDrops = async () => {
    const professions = await professionApi.itemsList();
    Professions.value = professions.data;
    const workexperiences = await workexperiencekApi.itemsList();
    Workexperiences.value = workexperiences.data;
    const salaries = await salaryApi.itemsList();
    Salaries.value = salaries.data;
    const levelworks = await levelworksApi.itemsList();
    Levelworks.value = levelworks.data;
    const formofworks = await formofworkApi.itemsList();
    Formofworks.value = formofworks.data;
    const cities = await cityApi.itemsList();
    Cities.value = cities.data;
}

onMounted(() => {
    loadDrops();
})




const handleClose = () => {
    emit('close');
};


const saveData = async () => {
    const formData = new FormData();
    formData.append("jobName", jobName.value);
    formData.append("requestJob", requestJob.value);
    formData.append("benefitsJob", benefitsJob.value);
    formData.append("addressJob", addressJob.value);
    formData.append("workingTime", workingTime.value);
    formData.append("expirationDate", expirationDate.value);
    formData.append("workexperienceId", workexperienceId.value);
    formData.append("formofworkId", formofworkId.value);
    formData.append("levelworkId", levelworkId.value);
    formData.append("cityId", cityId.value);
    formData.append("professionId", professionId.value);
    formData.append("salaryId", salaryId.value);
    formData.append("employersId", employersId.value);
    formData.append("jobId", props.id);
    const res = await updateJob(formData, props.id);
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

<style scoped>
.el-textarea__inner {
    min-height: 100px !important;
}
</style>