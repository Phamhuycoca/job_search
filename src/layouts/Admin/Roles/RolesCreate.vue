<template>
    <div>
        <el-dialog v-model="props.dialog" width="500" align-center close-icon="false" :before-close="props.dialog"
            draggable>
            <h1 class="text-center">Tạo mới thông tin</h1>
            <el-form label-width="auto" label-position="top" model="top" style="max-width: 500px" class="mx-auto">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Tên vai trò">
                            <el-input size="large" v-model="name" placeholder="Nhập tên vai trò" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Mô tả vai trò">
                            <el-input size="large" v-model="des" placeholder="Nhập mô tả vai trò" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Cấp quyền">
                            <el-select v-model="permissionId" multiple collapse-tags collapse-tags-tooltip clearable
                                :max-collapse-tags="5" placeholder="Chọn quyền cần cấp">
                                <el-option v-for="item in optionsPermissions" :key="item.permissionId"
                                    :value="item.permissionId" :label="item.permissionName" />
                            </el-select>
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
import { defineProps, onMounted, defineEmits } from "vue";
import { ref } from 'vue'
import { usePermission } from '../Permissions/Services/permission.service'
import { useRole } from '../Roles/Services/role.service'
import { showErrors, showSuccessNotification } from "@/common/helpers";
const emit = defineEmits();
const { fetchPermissions } = usePermission();
const { createPole } = useRole();
const optionsPermissions = ref<any | null>([]);
const permissionId = ref<any | []>([]);
const name = ref('');
const des = ref('');
const loadData = async () => {
    const permissons = await fetchPermissions();
    optionsPermissions.value = permissons?.items;
};
const props = defineProps(['dialog']);
const saveData = async () => {
    const formData = new FormData();
    formData.append('roleName', name.value);
    formData.append('roleDescription', des.value);
    formData.append('permissionId', permissionId.value);
    const res = await createPole(formData);
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

const handleClose = () => {
    emit('close');
};
onMounted(() => {
    loadData();
})

</script>

<style></style>