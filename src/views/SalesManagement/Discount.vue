<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="促销设置" subTitle="暂只支持设置满减类促销" />

    <a-collapse v-model="activeKey">
      <a-collapse-panel header="编辑或删除已有满减促销" key="1">
        <div v-for="(item, index) in discounts" :key="index">
          <b style="margin-right: 5%;">满减促销{{index+1}}:</b>
          <b>满</b>
          <a-input-number v-model="item.total" style="width:7%;margin-left: 1%;" />
          <b style="margin-left: 1%;">减</b>
          <a-input-number v-model="item.discount" style="width:7%;margin-left: 1%;" />
          <b style="margin-left: 1%;">元</b>
          <a-button @click="updateDiscount(item.discountId, item.total, item.discount)" style="margin-left: 5%;" type="primary"
            shape="circle" icon="edit"></a-button>
          <a-button @click="deleteDiscount(item.discountId)" style="margin-left: 1%;" type="danger" shape="circle" icon="delete"></a-button>
          <a-modal title="Title" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <p>您确认要删除这个满减促销吗？</p>
          </a-modal>
        </div>
      </a-collapse-panel>
      <a-collapse-panel header="增加满减促销" key="2">
        <b style="margin-right:5%;">新满减促销：</b>
          <b>满</b>
          <a-input-number v-model="newTotal" style="width:7%;margin-left: 1%;" />
          <b style="margin-left: 1%;">减</b>
          <a-input-number v-model="newDiscount" style="width:7%;margin-left: 1%;" />
          <b style="margin-left: 1%;">元</b>
        <a-button @click="addDiscount" style="margin-left: 5%;" type="primary" shape="circle" icon="plus"></a-button>
        <a-button @click="getTips" style="margin-left: 1%;" shape="circle" icon="info"></a-button>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'DiscountManagement'
      });
    },

    created() {
      this.getDiscounts();
    },

    data() {
      return {
        activeKey: ['1'],
        discounts: [],
        newTotal: "",
        newDiscount: "",
        visible: false,
        confirmLoading: false,
        discountIdToDelete: null,
      };
    },
    methods: {
      getDiscounts() {
        var _this = this;
        _this.axios.get('/api/discount').then(function(response) {
          console.log(response.data)
          _this.discounts = response.data;
        }).catch(function(error) {
          console.log(error)
        })
      },

      updateDiscount(discountId, total, discount) {
        console.log(discountId)
        console.log(total)
        var _this = this;
        this.axios.put('/api/discount/' + discountId, {
          total: Number(total),
          discount: Number(discount)
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '满减促销修改成功',
              5,
            );
            _this.getDiscounts();
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('满减促销修改出现错误', 5);
        })
      },

      deleteDiscount(discountId) {
        this.visible = true;
        this.discountIdToDelete = discountId
      },

      addDiscount() {
        var _this = this;
        console.log(this.newDiscount)
        if (this.newDiscount == "" || this.newTotal == "") {
          this.$message.error('满减促销不得为空', 5);
        }
        this.axios.post('/api/discount', {
          total: _this.newTotal,
          discount: _this.newDiscount
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '满减促销添加成功',
              5,
            );
            _this.getDiscounts();
            _this.newDiscount = "";
            _this.newTotal = "";
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('满减促销添加出现错误', 5);
        })
      },

      getTips() {
        this.$message.info('提示：新满减促销不得与已有满减促销重复，也不得为空', 5);
      },

      handleOk() {
        this.ModalText = '正在删除这个满减促销...';
        this.confirmLoading = true;
        var _this = this;
        this.axios.delete('/api/discount/' + this.discountIdToDelete).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '满减促销删除成功',
              5,
            );
            _this.getDiscounts();
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('满减促销删除出现错误', 5);
        })
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
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
  };
</script>
<style>
</style>
