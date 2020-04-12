<template>
  <div>
    <!-- 走马灯 -->
    <a-carousel autoplay>
      <div v-for="caro in carousels" :key="caro.carouselUrl">
        <img :src="caro.carouselUrl" style="object-fit:contain;" />
      </div>
    </a-carousel>
  </div>
</template>

<script>
  export default {
    created() {
      this.getCarousels();
    },

    data() {

      return {
        carousels: [{
            carouselId: 1,
            carouselUrl: "https://s1.ax1x.com/2020/04/08/GROCm4.jpg"
          },
          {
            carouselId: 2,
            carouselUrl: "https://s1.ax1x.com/2020/04/08/GRXAbQ.jpg"
          },
          {
            carouselId: 3,
            carouselUrl: "https://s1.ax1x.com/2020/04/08/GRXoZQ.jpg"
          },
          {
            carouselId: 4,
            carouselUrl: "https://s1.ax1x.com/2020/04/08/GRjteg.jpg"
          }
        ]
      };
    },

    methods: {
      getCarousels() {
        var _this = this;
        this.axios.get('/api/carousel').then(function(response) {
          console.log(response.data);
          if(response.data.length != 0){
            _this.carousels = response.data
          }
          else{
            _this.$message.error('轮播图目前为空，请先添加，显示为测试数据', 5);
          }
        }).catch(function(error) {
          console.log(error);
          _this.$message.error('轮播图获取出现错误', 5);
        })
      }
    }
  }
</script>

<style scoped>
  .ant-carousel /deep/ .slick-slide {
    text-align: center;
    height: 450px;
    line-height: 450px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel /deep/ .slick-slide h3 {
    color: #ea1;
  }
</style>
