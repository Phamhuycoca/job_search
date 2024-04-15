<template>
  <div class="flex justify-center mt-10">
    <div ref="contentToConvert" style="height: auto; min-height: 800px;min-width:790px;">
      <el-card class="border">
        <el-row>
          <el-col :span="5" class="flex justify-between">
            <div class="w-40 h-40">
              <img src="https://i.pinimg.com/736x/70/82/9f/70829fa30ca37d67dde72c4760b680f9.jpg" />
            </div>
          </el-col>
          <el-col :span="17" class="ml-10">
            <div>
              <h1 class="text-3xl">
                <input class="border-none bg-transparent outline-none" type="text"
                  placeholder="Điền vị trí công việc...">
              </h1>
            </div>
            <div class="flex flex-col justify-between h-36 mt-2">
              <div class="flex">
                <span class="mr-5 w-20">Họ và tên</span>
                <input class="border-none bg-transparent outline-none" type="text" placeholder="Điền họ tên...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">Giới tính</span>
                <input class="border-none bg-transparent outline-none" type="text" placeholder="Điền giới tính...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">SĐT</span>
                <input class="border-none bg-transparent outline-none" type="text" placeholder="Điền số điện thoại...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">Email</span>
                <input class="border-none bg-transparent outline-none" type="text" placeholder="Điền email...">
              </div>
              <div class="flex">
                <span class="mr-5 w-20">Địa chỉ</span>
                <input class="border-none bg-transparent outline-none" type="text" placeholder="Điền địa chỉ...">
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-10">
          <el-col :span="24">
            <div>
              <span class="text-3xl underline decoration-zinc-300">Mục tiêu nghề nghiệp</span>
              <textarea id="message" rows="4"
                class="block p-2.5 mt-2 w-full h-auto text-sm border-none bg-transparent outline-none bg-gray-50 border-gray-300 dark:placeholder-gray-400 "
                placeholder="Điền thông tin..."></textarea>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-5">
          <el-col :span="24">
            <div>
              <span class="text-3xl underline decoration-zinc-300">Kinh nghiệm làm việc</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <button @click="convertToPdf">Chuyển đổi sang PDF</button>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';
export default {
  data() {
    return {
      imageData: null // Dữ liệu base64 của hình ảnh được tải lên
    };
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Chuyển đổi hình ảnh thành dạng dữ liệu base64
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
    convertToPdf() {
      const element = this.$refs.contentToConvert;

      // Thiết lập chiều cao của tài liệu PDF
      const options = {
        border: 1,
        width: 800, // Chiều rộng 1000 pixel
        height: 800
        // Bạn có thể thay đổi giá trị 800 thành chiều cao mong muốn của bạn
      };

      // Chuyển đổi HTML sang PDF và thiết lập tùy chọn chiều cao
      html2pdf().from(element).set(options).save();
    }
  }
}
</script>
