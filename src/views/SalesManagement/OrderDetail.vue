<template>
  <div>
    <a-descriptions title="订单详情" layout="vertical" bordered>
      <a-descriptions-item label="订单id">
        {{orderId}}
      </a-descriptions-item>
      <a-descriptions-item label="顾客id" :content="userId"> 
        {{userId}}
      </a-descriptions-item>
      <a-descriptions-item label="下单时间" :content="time">
        {{time}}
      </a-descriptions-item>
      <a-descriptions-item label="订单原价">
        {{originalPrice}} 
      </a-descriptions-item>
      <a-descriptions-item label="订单实付">
        {{paidPrice}}
      </a-descriptions-item>
      <a-descriptions-item label="商品数量">
        {{count}}
      </a-descriptions-item>
      <a-descriptions-item label="收件人姓名">
        {{name}}
      </a-descriptions-item>
      <a-descriptions-item label="联系电话">
        {{phone}}
      </a-descriptions-item>
      <a-descriptions-item label="收货地址">
        {{address}}
      </a-descriptions-item>
      <a-descriptions-item label="物流状态" :span="3">
        <a-badge :status="status_icon" :text="status" />
      </a-descriptions-item>
      <a-descriptions-item label="ISBN码" :span="3">
        {{isbn}}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'OrderDetail'
      });
    },
    created() {
      if(this.$route.params.info){
        this.displayInfo();
      }
      else{
        this.$message.error('订单详情获取出现错误', 5);
      }
    },
    
    data() {
      return {
        orderId: null,
        userId: null,
        originalPrice: null,
        paidPrice: null,
        isbn: null,
        count: null,
        name: null,
        phone: null,
        address: null,
        status: null,
        time: null,
        status_icon: null,
      }
    },
    
    methods: {
      displayInfo(){
        var info = this.$route.params.info
        this.orderId = info.orderId
        this.userId = info.userId
        this.originalPrice = info.originalPrice
        this.paidPrice = info.paidPrice
        this.isbn = info.isbn
        this.count = info.count
        this.name = info.name
        this.phone = info.phone
        this.address = info.address
        this.status = info.status
        this.time = info.time.slice(0,10) + ' ' + info.time.slice(11,19)
        if(this.status == "已付款"){
          this.status_icon = "success"
        }
        else if(this.status == "待收货"){
          this.status_icon = "processing"
        }
        else if(this.status == "待评价"){
          this.status_icon = "error"
        }
        //已评价
        else {
          this.status_icon = "default"
        }
        console.log(this.data)
      }
    }
  };
</script>
