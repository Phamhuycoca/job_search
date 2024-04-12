<template>
    <div class="min-h-screen">
        <el-row>
            <el-col :span="18" class="pl-0 pr-24">
                <el-card>
                    <el-row>
                        <!-- <el-col :span="24"
                            class="flex items-center rounded-md p-2 hover:border hover:shadow-lg transition duration-300 ease-in-out">
                            <el-image class="w-20 h-20 rounded-md" fit="cover" :src="companny.companyLogo" />
                            <div
                                class="text-xl ml-4 cursor-pointer w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {{ companny.companyName }}
                            </div>
                        </el-col> -->
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6">
                a
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useJobHome } from '../Services/home.service';
const { getById, searchJobHome } = useJobHome();

const id = ref<any | undefined>('');
onMounted(async () => {
    id.value = router.currentRoute.value.params.id;
    const res = await getById(id.value);
    console.log(res);

})
</script>

<style></style>