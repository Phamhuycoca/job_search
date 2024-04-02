<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" class="text-2xl mb-5 text-center">Thông tin tài khoản</el-col>
      <el-col :span="6">
        <el-card class="h-auto">
          <div class="w-full flex justify-center mb-5">
            <!-- <el-image
              :src="logo"
              class="w-60 h-60 rounded-full border border-inherit"
              fit="contain"
            /> -->
            <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
              class="w-60 h-60 rounded-full border border-inherit" />
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
          <div class="w-full flex justify-center h-1/6">
            <el-button color="red" v-if="selectedImage" :disabled="inputLook"  :icon="Edit" plain @click="onRemoveImage">Xoá ảnh</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <div class="w-full border min-h-[550px] p-4">
          <el-form label-width="auto" label-position="left" model="left" size="large" style="max-width: 1150px">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="Tên công ty">
                  <el-input :disabled="inputLook" placeholder="Nhập thông tin" v-model="companyName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Email">
                  <el-input disabled="true" placeholder="Nhập thông tin" v-model="email" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số điện thoại">
                  <el-input :disabled="inputLook" placeholder="Nhập thông tin" v-model="contactPhoneNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Thành phố">
                  <el-select placeholder="Chọn thông tin" :disabled="inputLook" v-model="cityId">
                    <el-option v-for="item in Cities" :key="item.cityId" :value="item.cityId" :label="item.cityName" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Email liên hệ">
                  <el-input :disabled="inputLook" placeholder="Nhập thông tin" v-model="contactEmail" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Link website công ty">
                  <el-input :disabled="inputLook" placeholder="Nhập thông tin" v-model="companyWebsite" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="Địa chỉ hiện tại công ty">
                  <el-input type="textarea" v-model="companyAddress" :disabled="inputLook"
                    :autosize="{ minRows: 4, maxRows: 6 }" size="large" placeholder="Nhập thông tin" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="Mô tả về công ty">
                  <el-input v-model="companyDescription" type="textarea" :disabled="inputLook"
                    :autosize="{ minRows: 8, maxRows: 10 }" size="large" placeholder="Nhập thông tin" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-button color="red" plain @click="inputOpen">Thay đổi thông tin</el-button>
          <el-button type="primary" plain @click="saveData">Lưu thông tin</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useEmployers } from "../Account/Services/employers.service";
import { cityApi } from "@/layouts/Admin/City/Services/city.api";
import logo from "../../../assets/image-png/logo.png";
import { showErrors, showSuccessNotification } from "@/common/helpers";
const Cities = ref<any | undefined>([]);
const file = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const inputLook = ref(true);
const { getInfo, updateEmployers } = useEmployers();
const companyName = ref("");
const companyAddress = ref("");
const email = ref("");
const contactEmail = ref("");
const contactPhoneNumber = ref("");
const companyWebsite = ref("");
const companyDescription = ref("");
const cityId = ref("");
const employersId = ref("");
const loadData = async () => {
  const res = await getInfo();
  companyName.value = res.data.companyName;
  companyAddress.value = res.data.companyAddress;
  contactEmail.value = res.data.contactEmail;
  contactPhoneNumber.value = res.data.contactPhoneNumber;
  companyWebsite.value = res.data.companyWebsite;
  companyDescription.value = res.data.companyDescription;
  cityId.value = res.data.cityId;
  employersId.value = res.data.employersId;
  selectedImage.value = res.data.companyLogo;
  email.value = res.data.email;
  const cities = await cityApi.itemsList();
  Cities.value = cities.data;
  inputLook.value = true;
};
const onRemoveImage = () => {
  selectedImage.value = null;
  file.value = null;
};
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
const inputOpen = () => {
  inputLook.value = !inputLook.value;
};
const saveData = async () => {
  const formData = new FormData();
  formData.append("companyName", companyName.value);
  formData.append("email", email.value);
  formData.append("companyAddress", companyAddress.value);
  formData.append("contactEmail", contactEmail.value);
  formData.append("contactPhoneNumber", contactPhoneNumber.value);
  formData.append("companyWebsite", companyWebsite.value);
  formData.append("companyDescription", companyDescription.value);
  formData.append("cityId", cityId.value);
  formData.append("employersId", employersId.value);
  if (file.value !== null) {
    formData.append("file", file.value);
  } else {
    formData.append("file", "");
  }
  const res = await updateEmployers(formData, employersId.value);
  if (res.success) {
    showSuccessNotification(res.message);
  } else {
    if (res.errors !== undefined) {
      showErrors(res.errors);
    }
  }
  loadData();
}
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
>
