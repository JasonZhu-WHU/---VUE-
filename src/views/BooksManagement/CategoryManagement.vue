<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="书目分类管理" subTitle="编辑/增加/删除书籍分类" />

    <a-collapse v-model="activeKey">
      <a-collapse-panel header="编辑或删除已有分类" key="1">
        <div v-for="(item, index) in categories" :key="index">
          <b style="margin-right: 5%;">分类{{index+1}}:</b>
          <a-input v-model="item.category" style="width:50%" />
          <a-button @click="updateCategory(item.categoryId, item.category)" style="margin-left: 1%;" type="primary"
            shape="circle" icon="edit"></a-button>
          <a-button @click="deleteCategory(item.categoryId)" style="margin-left: 1%;" type="danger" shape="circle" icon="delete"></a-button>
          <a-modal title="删除分类再次确认" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <p>您确认要删除这个分类吗？</p>
          </a-modal>
        </div>
      </a-collapse-panel>
      <a-collapse-panel header="增加分类" key="2">
        <b style="margin-right:5%;">新分类:</b>
        <a-input v-model="newCategory" style="width:50%" />
        <a-button @click="addCategory" style="margin-left: 1%;" type="primary" shape="circle" icon="plus"></a-button>
        <a-button @click="getTips" style="margin-left: 1%;" shape="circle" icon="info"></a-button>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'CategoryManagement'
      });
    },

    created() {
      this.getCategories();
    },

    data() {
      return {
        activeKey: ['1'],
        categories: [],
        newCategory: "",
        visible: false,
        confirmLoading: false,
        categoryIdToDelete: null,
      };
    },
    methods: {
      getCategories() {
        var _this = this;
        _this.axios.get('/api/category').then(function(response) {
          console.log(response.data)
          _this.categories = response.data;
          console.log(_this.$data)
        }).catch(function(error) {
          console.log(error)
        })
      },

      updateCategory(categoryId, name) {
        console.log(categoryId)
        console.log(name)
        var _this = this;
        this.axios.put('/api/category/' + categoryId, {
          category: name,
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '分类修改成功',
              5,
            );
            _this.getCategories();
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('分类修改出现错误', 5);
        })
      },

      deleteCategory(categoryId) {
        this.visible = true;
        this.categoryIdToDelete = categoryId
      },

      addCategory() {
        var _this = this;
        console.log(this.newCategory)
        if (this.newCategory == "") {
          this.$message.error('新分类不得为空', 5);
        }
        this.axios.post('/api/category', {
          category: this.newCategory,
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '分类添加成功',
              5,
            );
            _this.getCategories();
            _this.newCategory = "";
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('分类添加出现错误', 5);
        })
      },

      getTips() {
        this.$message.info('提示：新分类不得与已有分类重复，也不得为空', 5);
      },

      handleOk(categoryId) {
        this.ModalText = '正在删除这个分类...';
        this.confirmLoading = true;
        console.log(categoryId)
        var _this = this;
        this.axios.delete('/api/category/' + this.categoryIdToDelete).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '分类删除成功',
              5,
            );
            _this.getCategories();
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('分类删除出现错误', 5);
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
