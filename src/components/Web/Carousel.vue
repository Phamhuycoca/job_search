<template>
    <div class="mr-32 ml-32 mt-4">
        <el-carousel :interval="3000" type="card" height="250px" indicator-position="none">
            <el-carousel-item v-for="item in listImage" :key="item" class="rounded-lg w-auto h-full">
                <el-image :src="item.src" fit="fill" class="w-full h-full" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const listImage = ref([
    { src: 'https://static.topcv.vn/img/Banner%20Top%20CV%20T4%20(1)%20(1).png' },
    { src: 'https://static.topcv.vn/img/banner_Rtechno2103.png' },
    { src: 'https://static.topcv.vn/img/wulKjY7b7tqWMnmRevQEM1VoiSLCfh3J_1710413484____4a70cafd01769805bf2f3939b325bacf.jpg' },
    { src: 'https://static.topcv.vn/img/CVO_T1_1100x220.png' },
])
</script>
<style scoped>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.el-card {
    --el-card-padding: 0px !important;
}
</style>