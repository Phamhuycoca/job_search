<template>
  <div class="flex justify-center items-center">
    <div ref="contentToConvert" style="height: auto; min-height: 800px;min-width:790px;">
      <el-card class="border">
        <el-row>
          <el-col :span="7" class="flex justify-between">
            <div class="w-40 h-40">
              <label for="file" class="labelFile flex items-center justify-center">
                <div v-if="imageData" class="image-container" @mouseover="showButton = true"
                  @mouseleave="showButton = false">
                  <img v-if="imageData" :src="imageData" alt="Uploaded Image">
                  <button v-if="showButton" class="centered-button" @click="deleteImage">Xóa ảnh</button>
                </div>

                <div v-else>
                  <span><svg xml:space="preserve" viewBox="0 0 184.69 184.69" xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" width="60px" height="60px">
                      <g>
                        <g>
                          <g>
                            <path d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
				C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
				C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
				c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
				c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
				c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
				c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
				v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                              style="fill:#010002;"></path>
                          </g>
                          <g>
                            <path d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
				c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
				L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
				c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
				C104.91,91.608,107.183,91.608,108.586,90.201z" style="fill:#010002;"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <p>Tải ảnh lên</p>
                </div>
              </label>
              <input class="input" name="text" id="file" type="file" ref="imageInput" accept="image/*"
                @change="handleImageChange" />
            </div>
          </el-col>
          <el-col :span="14" class="ml-10">
            <div>
              <h1 class="text-3xl">
                <input class="border-none bg-transparent outline-none" type="text"
                  placeholder="Điền vị trí công việc...">
              </h1>
            </div>
            <div class="flex flex-col justify-between h-36 mt-2 ">
              <div class="flex">
                <span class="mr-5 w-20">Họ và tên</span>
                <input class="border-none bg-transparent outline-none w-[400px]" type="text"
                  placeholder="Điền họ tên...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">Giới tính</span>
                <input class="border-none bg-transparent outline-none w-[400px]" type="text"
                  placeholder="Điền giới tính...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">SĐT</span>
                <input class="border-none bg-transparent outline-none w-[400px]" type="text"
                  placeholder="Điền số điện thoại...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">Email</span>
                <input class="border-none bg-transparent outline-none w-[400px]" type="text"
                  placeholder="Điền email...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">Địa chỉ</span>
                <input class="border-none bg-transparent outline-none w-[400px]" type="text"
                  placeholder="Điền địa chỉ...">
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-10">
          <el-col>
            <el-col :span="24">
              <div>
                <span class="text-xl font-medium underline decoration-zinc-300">Học vấn</span>
                <el-row>
                  <el-col :span="24" class="mt-3 h-24 flex flex-col justify-between">
                    <input class="w-full border-none bg-transparent outline-none" type="text"
                      placeholder="Tên trường...">
                    <input class="w-full border-none bg-transparent outline-none" type="text"
                      placeholder="Nghành học...">
                    <input class="w-full border-none bg-transparent outline-none" type="text"
                      placeholder="Năm tốt nghiệp...">
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="mt-5">
          <el-col :span="24">
            <div>
              <span class="text-xl font-medium underline decoration-zinc-300">Mục tiêu nghề nghiệp</span>
              <textarea id="message" ref="textarea" @input="autoResize"
                class="autoresize block p-2.5 mt-3 w-full h-auto text-sm border-none bg-transparent outline-none bg-gray-50 border-gray-300 dark:placeholder-gray-400"
                placeholder="Điền nội dung..."></textarea>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-5">
          <el-col :span="24">
            <div class="relative">
              <span class="text-xl font-medium underline decoration-zinc-300">Kinh nghiệm làm việc</span>
              <div v-for="(textarea, index) in textareas" :key="index" class="relative mt-3">
                <textarea :rows="textarea.rows" v-model="textarea.content"
                  class="block p-2.5 mt-2 w-full h-auto text-sm border-none bg-transparent outline-none bg-gray-50 border-gray-300 dark:placeholder-gray-400"
                  placeholder="Điền nội dung..." @mouseover="toggleDeleteIcon(index, true)"
                  @mouseleave="toggleDeleteIcon(index, false)"></textarea>
                <span v-if="index >= 1"
                  class="absolute top-0 right-0 p-2 opacity-0 transition-opacity duration-300 cursor-pointer"
                  @click="removeTextarea(index)" @mouseover="toggleDeleteIcon(index, true)"
                  @mouseleave="toggleDeleteIcon(index, false)">
                  <i class="ri-delete-bin-6-line text-red-500"></i>
                </span>
              </div>
              <span
                class="absolute top-0 right-0 p-2 opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer"
                @click="addTextarea">
                <i class="ri-add-line text-gray-500"></i>
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-5">
          <el-col :span="24">
            <div class="relative">
              <span class="text-xl font-medium underline decoration-zinc-300">Kĩ năng nghề nghiệp</span>
              <div v-for="(inputExp, index) in inputExps" :key="index" class="relative mt-3">
                <el-row class="mt-3">
                  <el-col :span="7" class="pt-4">
                    <input v-model="inputExp.name" class="border-none bg-transparent outline-none" type="text"
                      placeholder="Tên kĩ năng...">
                  </el-col>
                  <el-col :span="17">
                    <textarea v-model="inputExp.description" rows="2"
                      class="block p-2.5 mt-2 w-full h-auto text-sm border-none bg-transparent outline-none bg-gray-50 border-gray-300 dark:placeholder-gray-400"
                      placeholder="Mô tả kĩ năng..."></textarea>
                  </el-col>
                </el-row>
                <span v-if="index >= 1"
                  class="absolute top-0 right-0 p-2 opacity-0 transition-opacity duration-300 cursor-pointer"
                  @click="removeinputExp(index)" @mouseover="toggleinputExp(index, true)"
                  @mouseleave="toggleinputExp(index, false)">
                  <i class="ri-delete-bin-6-line text-red-500"></i>
                </span>
              </div>

              <span
                class="absolute top-0 right-0 p-2 opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer"
                @click="addinputExp">
                <i class="ri-add-line text-gray-500"></i>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <button class="mb-20" @click="convertToPdf">Chuyển đổi sang PDF</button>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';
export default {
  data() {
    return {
      textareas: [
        { rows: 4, content: '' }
      ],
      inputExps: [{ name: '', description: '' }],
      showDeleteIcon: false,
      imageData: null,
      showButton: false
    };
  },
  methods: {
    addinputExp() {
      this.inputExps.push({ name: '', description: '' });
    },
    removeinputExp(index) {
      this.inputExps.splice(index, 1); // Xóa một đối tượng từ mảng
    },
    addTextarea() {
      this.textareas.push({ rows: 4, content: '' });
    },
    removeTextarea(index) {
      if (index !== 0) {
        this.textareas.splice(index, 1);
      }
    },
    toggleDeleteIcon(index, value) {
      this.showDeleteIcon = value;
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageData = reader.result;
        };
        reader.onerror = error => {
          console.error('Error converting image to base64:', error);
        };
      }
    },
    deleteImage() {
      this.imageData = null;
    },
    convertToPdf() {
      const element = this.$refs.contentToConvert;

      const options = {
        border: 1,
        width: 800,
        height: 800
      };
      html2pdf().from(element).set(options).save();
    },
    autoResize() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  },
  mounted() {
    this.autoResize();
  },
}
</script>
<style scoped>
.autoresize {
  resize: none;
  overflow-y: hidden;
  height: auto;
}

.relative:hover .absolute {
  opacity: 100;
}

.input {
  max-width: 190px;
  display: none;
}

.labelFile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 190px;
  border: 2px dashed #ccc;
  align-items: center;
  text-align: center;
  padding: 5px;
  color: #404040;
  cursor: pointer;
}

.image-container {
  position: relative;
  display: inline-block;
}

.centered-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  width: 100px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
  color: #333333;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}


.image-container:hover .centered-button {
  opacity: 1;
}
</style>