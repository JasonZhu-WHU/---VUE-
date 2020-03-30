<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-input-search placeholder="输入书籍搜索关键字" @search="onSearch" enterButton />
    <br /><br />
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card hoverable style="width: 300px">
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-button shape="circle" icon="setting"></a-button>
            <a-button shape="circle" icon="edit"></a-button>
            <a-button shape="circle" icon="ellipsis"></a-button>
          </template>
          <a-card-meta title="书名" description="价格 销量">
          </a-card-meta>
        </a-card>
      </a-col>

      <a-col :span="8">
        <a-card hoverable style="width: 300px">
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-button shape="circle" icon="setting"></a-button>
            <a-button shape="circle" icon="edit"></a-button>
            <a-button shape="circle" icon="ellipsis"></a-button>
          </template>
          <a-card-meta title="书名" description="价格 销量">
          </a-card-meta>
        </a-card>
      </a-col>

      <a-col :span="8">
        <a-card hoverable style="width: 300px">
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-button shape="circle" icon="setting"></a-button>
            <a-button shape="circle" icon="edit"></a-button>
            <a-button shape="circle" icon="ellipsis"></a-button>
          </template>
          <a-card-meta title="书名" description="价格 销量">
          </a-card-meta>
        </a-card>
      </a-col>

    </a-row>

    <div style="padding-top: 30px;">

    </div>

    <a-row :gutter="16">
      <a-col :span="8">
        <a-card hoverable style="width: 300px">
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-button shape="circle" icon="setting"></a-button>
            <a-button shape="circle" icon="edit"></a-button>
            <a-button shape="circle" icon="ellipsis"></a-button>
          </template>
          <a-card-meta title="书名" description="价格 销量">
          </a-card-meta>
        </a-card>
      </a-col>

      <a-col :span="8">
        <a-card hoverable style="width: 300px">
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-button shape="circle" icon="setting"></a-button>
            <a-button shape="circle" icon="edit"></a-button>
            <a-button shape="circle" icon="ellipsis"></a-button>
          </template>
          <a-card-meta title="书名" description="价格 销量">
          </a-card-meta>
        </a-card>
      </a-col>

      <a-col :span="8">
        <a-card hoverable style="width: 300px">
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-button shape="circle" icon="setting"></a-button>
            <a-button shape="circle" icon="edit"></a-button>
            <a-button shape="circle" icon="ellipsis"></a-button>
          </template>
          <a-card-meta title="书名" description="价格 销量">
          </a-card-meta>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'BooksOperation'
      });
    },
    created() {
      var _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
        console.log(_this.$axios)
        console.log('init')
        _this.axios.get('/api/book', {
          params: {
            category: null,
            page: 0,
            size: 15
          }
        }).then(function(response) {
          var books = response.data.data;
          console.log(books)
        }).catch(function(error) {
          console.log(error);
        })

      })
    },

    data() {
      return {

      };
    },
    methods: {
      onSearch(value) {
        console.log('search')
        console.log(value)
        this.axios.get('/api/sale/', JSON.stringify({
          category: null,
          page: 0,
          size: 15
        })).then(function(response) {
          console.log(response);
        }).catch(function(error) {
          console.log(error);
        })
      }
    },
    watch: {

    },
  };
</script>

<style>

</style>
