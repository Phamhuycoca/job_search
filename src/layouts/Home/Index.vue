<template>
    <div class="min-h-[600px] w-full mb-10">
        <el-row justify="center">
            <h1 class="mt-5 mb-5 text-2xl">Thông tin tài khoản</h1>
        </el-row>
        <el-row>
            <el-col :span="10" class="flex flex-col justify-center items-center w-full min-h-[500px]">
                <div class="min-h-[450px] max-w-[450px]">
                    <!-- <el-image class="w-full h-full rounded-full" fit="cover"
                        src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1712226404/tbwwsprzmea7ca02p6t6.jpg" /> -->
                    <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
                        class="w-full h-full rounded-full border border-inherit" />
                    <label class="custum-file-upload" for="file" v-if="selectedImage === null">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill=""
                                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                        clip-rule="evenodd" fill-rule="evenodd"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="text">
                            <span>Vui lòng chọn ảnh</span>
                        </div>
                        <input id="file" v-if="selectedImage === null" type="file" @change="onFileChanged"
                            class="w-60 h-60 mx-auto rounded-full border border-inherit" />
                    </label>
                </div>
                <el-button plain type="danger" v-if="selectedImage" :disabled="inputLook" @click="onRemoveImage"
                    :icon="Edit" class="m-4">Thay đổi ảnh đại diện</el-button>
            </el-col>
            <el-col :span="14">
                <div class="w-full border min-h-[550px] p-4">
                    <el-form label-width="auto" label-position="left" model="left" size="large"
                        style="max-width: 1150px">
                        <el-row :gutter="30">
                            <el-col :span="12">
                                <el-form-item label="Tên người dùng">
                                    <el-input placeholder="Nhập thông tin" :disabled="inputLook" v-model="fullName" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Email">
                                    <el-input placeholder="Nhập thông tin" v-model="email" disabled="true" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Ngày sinh">
                                    <el-date-picker v-model="birthday" type="date" size="large" style="width: 100%"
                                        :disabled="inputLook" placeholder="Chọn ngày sinh" format="DD/MM/YYYY"
                                        value-format="DD/MM/YYYY" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Số điện thoại">
                                    <el-input placeholder="Nhập thông tin" v-model="phoneNumber"
                                        :disabled="inputLook" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Giới tính">
                                    <el-select v-model="gender" placeholder="Chọn thông tin" :disabled="inputLook">
                                        <el-option value="Name">Nam</el-option>
                                        <el-option value="Name">Nữ</el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Trình độ học vấn">
                                    <el-select v-model="academic_Level" placeholder="Chọn thông tin"
                                        :disabled="inputLook">
                                        <el-option value="Cử nhân">Cử nhân</el-option>
                                        <el-option value="Thạc sĩ">Thạc sĩ</el-option>
                                        <el-option value="Tiến sĩ">Tiến sĩ</el-option>
                                        <el-option value="Giáo sư">Giáo sư</el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="Địa chỉ hiện tại">
                                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                        placeholder="Nhập thông tin" v-model="address" :disabled="inputLook" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="CV cá nhân">
                                    <input type="file" accept=".pdf" v-if="selectedCv === null"
                                        @change="onFileChangedCV" />
                                    <div v-else>
                                        <!-- <embed :src="selectedCv" type="application/pdf" width="100%" height="500px" /> -->
                                        <el-button type="primary" plain @click="viewCV">
                                            <el-icon class="mr-2">
                                                <View />
                                            </el-icon>
                                            Xem cv</el-button>
                                        <el-button color="red" plain @click="onRemoveCV">
                                            <el-icon class="mr-2">
                                                <Delete />
                                            </el-icon>
                                            Xóa cv</el-button>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="Trạng thái tài khoản: ">
                                    Đang hoạt động
                                    <div class="ml-2 w-5 h-5 bg-[#6bed6b] rounded-full"></div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="flex justify-evenly items-center mt-12">
                        <el-button plain type="danger" @click="inputOpen">
                            Thay đổi thông tin
                        </el-button>
                        <el-button plain type="primary" @click="saveData">
                            Lưu lại thông tin
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useJobSeeker } from "../../layouts/Home/Account/Services/Job_seeker.service";
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { useLoadingStore } from "@/store/loading.store";
const { getInfo, updateJobSeeker } = useJobSeeker();
const loading = useLoadingStore();
const file = ref<File | null>(null);
const filecv = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const selectedCv = ref<string | null>(null);
const inputLook = ref(true);
const fullName = ref("");
const birthday = ref("");
const email = ref("");
const phoneNumber = ref("");
const address = ref("");
const gender = ref("");
const job_Cv = ref("");
const avatar = ref("");
const job_SeekerId = ref("");
const academic_Level = ref("");
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
const onFileChangedCV = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
        filecv.value = target.files[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                selectedCv.value = e.target.result as string;

            }
        };
        reader.readAsDataURL(filecv.value);
    }
};
const inputOpen = () => {
    inputLook.value = !inputLook.value;
};
const viewCV = () => {
    if (selectedCv.value) {
        window.open(selectedCv.value, '_blank');
    } else {
        console.log('');
    }
}
const onRemoveImage = () => {
    selectedImage.value = null;
    file.value = null;
};
const onRemoveCV = () => {
    selectedCv.value = null;
    filecv.value = null;
};
const loadData = async () => {
    loading.showLoading(true);
    const res = await getInfo();
    console.log(res.data);

    fullName.value = res.data.fullName;
    birthday.value = res.data.birthday;
    email.value = res.data.email;
    phoneNumber.value = res.data.phoneNumber;
    address.value = res.data.address;
    gender.value = res.data.gender;
    if (res.data.job_Cv !== "string") {
        selectedCv.value = res.data.job_Cv;
    }
    if (res.data.avatar !== "string") {
        selectedImage.value = res.data.avatar;
    }
    job_SeekerId.value = res.data.job_SeekerId;
    academic_Level.value = res.data.academic_Level;
    inputLook.value = true;
    loading.showLoading(false);

};
const saveData = async () => {
    loading.showLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName.value);
    formData.append("birthday", birthday.value);
    formData.append("email", email.value);
    formData.append("phoneNumber", phoneNumber.value);
    formData.append("address", address.value);
    formData.append("gender", gender.value);
    formData.append("job_Cv", job_Cv.value);
    formData.append("job_SeekerId", job_SeekerId.value);
    formData.append("academic_Level", academic_Level.value);
    if (file.value !== null) {
        formData.append("avt", file.value);
    }
    if (filecv.value !== null) {
        formData.append("cv", filecv.value);
    }
    const res = await updateJobSeeker(formData, job_SeekerId.value);
    if (res.success) {
        showSuccessNotification(res.message);
    } else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    loadData();
    loading.showLoading(false);
};
onMounted(() => {
    loadData();
});
</script>
<style scoped>
.custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}

.custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.custum-file-upload .icon svg {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
}

.custum-file-upload .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
    display: none;
}
</style>
