<template>
    <div class="mr-32 ml-32 mt-4">
        <el-carousel :interval="3000" type="card" height="400px" indicator-position="none">
            <el-carousel-item v-for="item in 5" :key="item" class="rounded-lg w-auto">
                <el-image src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1711552112/z5pzxearkrm0uig8p4ot.png"
                    fit="fill" class="w-full h-full" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

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