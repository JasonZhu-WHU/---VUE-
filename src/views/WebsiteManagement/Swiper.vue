<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="目前客户端的轮播效果" subTitle="可以在下方重新管理轮播图" />
    <div style="padding-top: 40px;"></div>
    <Carousel style="margin: 0 20px;" />
    
    <div style="padding-top: 40px;"></div>
    
    <a-collapse v-model="activeKey">
      <a-collapse-panel header="编辑或删除已有轮播图" key="1">
        <div v-for="(item, index) in carousels" :key="index">
          <b style="margin-right: 5%;">分类{{index+1}}:</b>
          <a-input v-model="item.carouselUrl" style="width:50%" />
          <a-button @click="updateCarousel(item.carouselId, item.carouselUrl)" style="margin-left: 1%;" type="primary"
            shape="circle" icon="edit"></a-button>
          <a-button @click="deleteCarousel(item.carouselId)" style="margin-left: 1%;" type="danger" shape="circle" icon="delete"></a-button>
          <a-modal title="Title" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <p>您确认要删除这个轮播图吗？</p>
          </a-modal>
        </div>
      </a-collapse-panel>
      <a-collapse-panel header="增加轮播图" key="2">
        <b style="margin-right:5%;">新轮播图:</b>
        <a-input v-model="newCarousel" style="width:50%" />
        <a-button @click="addCarousel" style="margin-left: 1%;" type="primary" shape="circle" icon="plus"></a-button>
        <a-button @click="getTips" style="margin-left: 1%;" shape="circle" icon="info"></a-button>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
  import Carousel from '@/components/Carousel'
  export default {
    components: {
      Carousel,
    },
    
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'CarouselManagement'
      });
    },
    
    created () {
      this.getCarousels()
    },
  
    data () {
      return {
        activeKey: ['1'],
        carousels: [],
        newCarousel: "",
        visible: false,
        confirmLoading: false,
        carouselIdToDelete: null,
      };
    },
    
    methods: {
      getCarousels() {
        var _this = this;
        _this.axios.get('/api/carousel').then(function(response) {
          console.log(response.data)
          _this.carousels = response.data;
        }).catch(function(error) {
          console.log(error)
        })
      },
      
      updateCarousel(carouselId, url) {
        console.log(carouselId)
        console.log(url)
        var _this = this;
        this.axios.put('/api/carousel/' + carouselId, {
          carouselUrl: url,
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '轮播图修改成功',
              5,
            );
            _this.getCarousels();
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('轮播图修改出现错误', 5);
        })
      },
      
      deleteCarousel(carouselIdToDelete) {
        this.visible = true;
        this.carouselIdToDelete = carouselIdToDelete
      },
      
      addCarousel() {
        var _this = this;
        console.log(this.newCarousel)
        if (this.newCarousel == "") {
          this.$message.error('新轮播图url不得为空', 5);
        }
        this.axios.post('/api/carousel', {
          carouselUrl: _this.newCarousel,
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '轮播图添加成功',
              5,
            );
            _this.getCarousels();
            _this.newCarousel = "";
          }
        }).catch(function(error) {
          console.log(error);
          _this.$message.error('轮播图添加出现错误', 5);
        })
      },
      
      getTips() {
        this.$message.info('提示：新轮播图不得与已有轮播图重复，也不得为空', 5);
      },
      
      handleOk(carouselId) {
        this.ModalText = '正在删除这个轮播图...';
        this.confirmLoading = true;
        console.log(carouselId)
        var _this = this;
        this.axios.delete('/api/carousel/' + this.carouselIdToDelete).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '轮播图删除成功',
              5,
            );
            _this.getCarousels();
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('轮播图删除出现错误', 5);
        })
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 1000);
      },
      
      handleCancel() {
        this.$message.info('放弃本次删除操作', 5);
        this.visible = false;
      },
    },
    
    watch: {
      activeKey(key) {
        console.log(key);
      },
    },
  }
</script>

<style>
</style>
