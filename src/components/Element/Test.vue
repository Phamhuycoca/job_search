<template>
  <div class="m-10">
    <h1>Tin tức tuyển dụng</h1>
    <div v-if="jobs.length === 0">Đang tải...</div>
    <div v-else>
      <div class="job" v-for="job in jobs" :key="job.id">
        <img :src="job.image" alt="Ảnh Công Việc" style="max-width: 100px; max-height: 100px;">
        <div>
          <h2>{{ job.title }}</h2>
          <p>Công ty: {{ job.company }}</p>
          <p>Địa điểm: {{ job.location }}</p>
          <p>Mô tả: {{ job.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [] // mảng chứa dữ liệu về công việc
    };
  },
  mounted() {
    // Giả lập cuộc gọi API để lấy dữ liệu về công việc
    setTimeout(() => {
      this.jobs = [
        { id: 1, title: 'Lập Trình Viên Frontend', company: 'Công ty ABC', location: 'Hà Nội', description: 'Miêu tả công việc lập trình viên frontend.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEKEQ2K8sgb1WW2Izq2NmQBOxzlwhrSEuR9BPSikOnw0VzccUz5IWwbTv_jEyehWFhZ4&usqp=CAU' },
        { id: 2, title: 'Lập Trình Viên Backend', company: 'Công ty XYZ', location: 'TP.HCM', description: 'Miêu tả công việc lập trình viên backend.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEKEQ2K8sgb1WW2Izq2NmQBOxzlwhrSEuR9BPSikOnw0VzccUz5IWwbTv_jEyehWFhZ4&usqp=CAU' },
        { id: 3, title: 'Thiết Kế Giao Diện UI/UX', company: 'Công ty 123', location: 'Đà Nẵng', description: 'Miêu tả công việc thiết kế giao diện UI/UX.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEKEQ2K8sgb1WW2Izq2NmQBOxzlwhrSEuR9BPSikOnw0VzccUz5IWwbTv_jEyehWFhZ4&usqp=CAU' }
      ];
    }, 1000);
  }
};
</script>

<style scoped>
/* CSS styles */
.job {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.job img {
  margin-right: 20px;
}
</style>
