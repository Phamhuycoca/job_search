<template>
    <div>
        <el-row>
            <el-col :span="24" class="pl-2 pr-2">
                <div style="border-radius: 5px">
                    <div class="flex justify-evenly items-center">
                        <el-select placeholder="Chọn theo khu vực" style="width: 320px"></el-select>
                        <el-select placeholder="Chọn theo nghành" style="width: 320px"></el-select>
                        <el-select placeholder="Chọn theo kinh nghiệm làm việc" style="width: 320px"></el-select>
                        <el-select placeholder="Chọn theo hình thức làm việc" style="width: 320px"></el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="pl-2 pr-2">
                <el-row class="flex items-center justify-center m-10">
                    <el-input style="width: 340px" size="large" placeholder="Nhập thông tin tìm kiếm"
                        :suffix-icon="Search" />
                    <el-button class="ml-4" size="large">Tìm kiếm</el-button>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12" v-for="item in 10" :key="item" class="mt-4">
                        <el-card shadow="hover" class="h-[300px]">
                            a
                        </el-card>
                    </el-col>
                </el-row>
                <div class="text-center mt-4">
                    <nav aria-label="Page navigation">
                        <ul class="inline-flex space-x-2">
                            <li><button
                                    class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg></button>
                            </li>
                            <li><button
                                    class="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">1</button>
                            </li>
                            <li><button
                                    class="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">2</button>
                            </li>
                            <li><button
                                    class="w-10 h-10 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 rounded-full focus:shadow-outline">3</button>
                            </li>
                            <li><button
                                    class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
</script>

<style></style>
