<template>
    <div class="min-h-[600px] w-fu">
        <el-row justify="center">
            <h1 class="mt-5 mb-5 text-2xl">Thông tin tài khoản</h1>
        </el-row>
        <el-row>
            <el-col :span="10" class="flex flex-col justify-center items-center w-full min-h-[500px]">
                <div class="min-h-[450px] max-w-[450px]">
                    <el-image class="w-full h-full rounded-full" fit="cover"
                        src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1712226404/tbwwsprzmea7ca02p6t6.jpg" />
                </div>
                <el-button plain type="danger" :icon="Edit" class="m-4">Thay đổi ảnh đại diện</el-button>
            </el-col>
            <el-col :span="14">
                <div class="w-full border min-h-[550px] p-4">
                    <el-form label-width="auto" label-position="left" model="left" size="large"
                        style="max-width: 1150px">
                        <el-row :gutter="30">
                            <el-col :span="12">
                                <el-form-item label="Tên người dùng">
                                    <el-input />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Email">
                                    <el-input />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Ngày sinh">
                                    <el-date-picker type="date" size="large" style="width: 100%;"
                                        placeholder="Chọn ngày sinh" format="DD/MM/YYYY" value-format="DD/MM/YYYY" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Số điện thoại">
                                    <el-input />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Giới tính">
                                    <el-select></el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Trình độ học vấn">
                                    <el-select></el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="Địa chỉ hiện tại">
                                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" size="large"
                                        placeholder="Nhập thông tin" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Trạng thái tài khoản: ">
                                    Đang hoạt động <div class="ml-2 w-5 h-5 bg-[#6bed6b] rounded-full"></div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="flex justify-evenly items-center mt-12">
                        <el-button plain type="danger">
                            Thay đổi thông tin
                        </el-button>
                        <el-button plain type="primary">
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
const { getInfo, updateJobSeeker } = useJobSeeker();
const file = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const inputLook = ref(true);
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
    console.log(res.data);
}
onMounted(() => {
    loadData();
})

</script>