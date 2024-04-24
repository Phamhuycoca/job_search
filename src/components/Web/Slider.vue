<template>
    <!-- <div ref="container" class="fader">
        <div v-for="(src, idx) in images" :key="idx" class="fader__slide" :style="{ opacity: opacities[idx] }">
            <img :src="src" />
        </div>
        <div v-for="(item, index) in compannyLists" :key="index" class="fader__slide"
            :style="{ opacity: opacities[index] }">

            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card shadow="hover" class="mb-5">
                        <el-row>
                            <el-col :span="4" class="flex justify-center items-center">
                                <el-image style="max-height: 128px;height: 100%; max-width: 128px;width: 100%;"
                                    fit="cover" :src="item.companyLogo" />
                            </el-col>
                            <el-col :span="15" class=" h-32 ml-2">
                                <div class="h-full w-full flex flex-col justify-between">
                                    <el-tooltip effect="dark" :content="item.companyName" placement="top">
                                        <span class="text-md truncate"><i class="ri-community-line mr-2"></i>{{
                                            item.companyName
                                        }}</span>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" :content="item.companyAddress" placement="top">
                                        <span class="text-md truncate"><i class="ri-map-pin-fill mr-2"></i>{{
                                            item.companyAddress }}</span>
                                    </el-tooltip>
                                    <span class="text-md"><i class="ri-phone-fill mr-2"></i>{{
                                        item.contactPhoneNumber }}</span>
                                    <span class="text-md"><i class="ri-road-map-line mr-2"></i>{{ item.cityName
                                        }}</span>
                                </div>
                            </el-col>
                            <el-col :span="4" style="position: relative;margin-left: 15px;">
                                <el-link :href="`/companny/${item.employersId}`"
                                    style="position: absolute;bottom: 0;display: flex;justify-content: center;width: 100%;align-items: center;"
                                    type="info"><i class="ri-eye-line"></i>Xem
                                    chi tiết</el-link>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div> -->
    <div style="margin-top: 100px;" class="px-2">
        <el-row>
            <span class="text-2xl my-4 uppercase w-full">Danh sách việc làm</span>
        </el-row>
        <el-carousel>
            <el-carousel-item style="height: 100%;">
                <el-row :gutter="10">
                    <el-col :span="8" v-for="(item, index) in compannyLists" :key="index">
                        <el-card shadow="hover" class="mb-5">
                            <el-row>
                                <el-col :span="4" class="flex justify-center items-center">
                                    <el-image style="max-height: 128px;height: 100%; max-width: 128px;width: 100%;"
                                        fit="cover" :src="item.companyLogo" />
                                </el-col>
                                <el-col :span="15" class=" h-32 ml-2">
                                    <div class="h-full w-full flex flex-col justify-between">
                                        <el-tooltip effect="dark" :content="item.companyName" placement="top">
                                            <span class="text-md truncate"><i class="ri-community-line mr-2"></i>{{
                                                item.companyName
                                            }}</span>
                                        </el-tooltip>
                                        <el-tooltip effect="dark" :content="item.companyAddress" placement="top">
                                            <span class="text-md truncate"><i class="ri-map-pin-fill mr-2"></i>{{
                                                item.companyAddress }}</span>
                                        </el-tooltip>
                                        <span class="text-md"><i class="ri-phone-fill mr-2"></i>{{
                                            item.contactPhoneNumber }}</span>
                                        <span class="text-md"><i class="ri-road-map-line mr-2"></i>{{ item.cityName
                                            }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="4" style="position: relative;margin-left: 15px;">
                                    <el-link :href="`/companny/${item.employersId}`"
                                        style="position: absolute;bottom: 0;display: flex;justify-content: center;width: 100%;align-items: center;"
                                        type="info"><i class="ri-eye-line"></i>Xem
                                        chi tiết</el-link>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'
import { useEmployers } from '@/layouts/Employers/Account/Services/employers.service';
const { fetchCompannys, searchCompannys } = useEmployers();
const compannyLists = ref<any | undefined>([]);
const images = [
    "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
];
const total = ref<number>(0);

const animation = { duration: 20000, easing: (t: any) => t }
const opacities = ref([])
console.log(total.value.toString().length);
const [container] = useKeenSlider({
    slides: images.length,
    loop: true,

    defaultAnimation: {
        duration: 5000
    },
    detailsChanged: (s: any) => {
        opacities.value = s.track.details.slides.map((slide: any) => slide.portion)
    },
    renderMode: "performance",
    drag: false,
    created(s: any) {
        s.moveToIdx(5, true, animation)
    },
    updated(s: any) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s: any) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
})
const loadData = async () => {
    const res = await fetchCompannys();
    compannyLists.value = res?.items;
    total.value = res?.totalItems;
}
onMounted(() => {
    loadData();
})
</script>

<style>
.fader {
    height: 50vw;
    position: relative;
    overflow: hidden;
}

@media (min-width: 768px) {
    .fader {
        height: 300px;
    }
}

.fader__slide {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
}

.fader img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>