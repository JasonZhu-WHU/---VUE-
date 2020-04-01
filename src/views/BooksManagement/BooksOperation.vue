<template>
  <div style="background-color: #ececec; padding: 20px;">

    <a-input-search style="width: 80%;float: left;" placeholder="输入书籍搜索关键字" @search="onSearch" enterButton />
    <a-button @click="showDrawer" type="primary" style="float: right;">
      <a-icon type="plus" />添加书目</a-button>
    <a-drawer title="添加新书目(书目上架)" :width="720" @close="onClose" :visible="visible" :bodyStyle="{paddingBottom: '80px'}">
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="书名">
              <a-input v-decorator="['name', {
                      rules: [{ required: true, message: 'Please enter user name' }]
                    }]"
                placeholder="请输入书名" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="ISBN号">
              <a-input v-decorator="['name', {
                      rules: [{ required: true, message: 'Please enter user name' }]
                    }]"
                placeholder="请输入ISBN号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="价格(人民币¥)">
              <a-input-number id="inputNumber" :min="0" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分类">
              <a-select v-decorator="['type', {
                      rules: [{ required: true, message: 'Please choose the type' }]
                    }]"
                placeholder="Please choose the type">
                <a-select-option value="private">Private</a-select-option>
                <a-select-option value="public">Public</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="作者">
              <a-input v-decorator="['name', {
                      rules: [{ required: true, message: 'Please enter user name' }]
                    }]"
                placeholder="请输入作者名字" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="上传书目图片">
              <a-upload name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers"
                @change="handleChange">
                <a-button>
                  <a-icon type="upload" /> 点击上传书目图片 </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="简介">
              <a-textarea v-decorator="['description', {
                      rules: [{ required: true, message: 'Please enter url description' }]
                    }]"
                :rows="4" placeholder="请输入书籍简要介绍" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div :style="{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              zIndex: 1,
            }">
        <a-button :style="{marginRight: '8px'}" @click="onClose">
          Cancel
        </a-button>
        <a-button @click="onClose" type="primary">Submit</a-button>
      </div>
    </a-drawer>
    <br /><br />

    <div style="padding-top: 10px;"></div>

    <a-spin size="large" :spinning="spinning" />

    <a-row :gutter="16">
      <div v-for="(item, index) in row1_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card :loading="loading" hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button shape="circle" icon="info"></a-button>
              <a-button shape="circle" icon="edit"></a-button>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />1st menu item</a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="user" />2nd menu item</a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="user" />3rd item</a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px"> More
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </template>
            <a-card-meta :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>

    <div style="padding-top: 30px;">

    </div>

    <a-row :gutter="16">
      <div v-for="(item, index) in row2_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card :loading="loading" hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button shape="circle" icon="setting"></a-button>
              <a-button shape="circle" icon="edit"></a-button>
              <a-button shape="circle" icon="ellipsis"></a-button>
            </template>
            <a-card-meta :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>

    <div style="padding-top: 30px;">

    </div>

    <a-row :gutter="16">
      <div v-for="(item, index) in row3_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card :loading="loading" hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button shape="circle" icon="setting"></a-button>
              <a-button shape="circle" icon="edit"></a-button>
              <a-button shape="circle" icon="ellipsis"></a-button>
            </template>
            <a-card-meta :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>

    <div style="padding-top: 30px;">

    </div>

    <a-row :gutter="16">
      <div v-for="(item, index) in row4_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card :loading="loading" hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button shape="circle" icon="setting"></a-button>
              <a-button shape="circle" icon="edit"></a-button>
              <a-button shape="circle" icon="ellipsis"></a-button>
            </template>
            <a-card-meta :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>

    <div style="padding-top: 30px;">

    </div>

    <a-row :gutter="16">
      <div v-for="(item, index) in row5_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card :loading="loading" hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button shape="circle" icon="setting"></a-button>
              <a-button shape="circle" icon="edit"></a-button>
              <a-button shape="circle" icon="ellipsis"></a-button>
            </template>
            <a-card-meta :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>

    <div style="padding-top: 30px;">

    </div>


    <a-pagination v-model="current" :total="totalBooks" @change="pageChanged" :pageSize="10" />

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
      this.getBooks(1);
    },

    data() {
      return {
        loading: true,
        spinning: true,
        current: 1,
        totalBooks: 15,
        totalPages: 5,
        row1_books: [],
        row2_books: [],
        row3_books: [],
        row4_books: [],
        row5_books: [],
        form: this.$form.createForm(this),
        visible: false,
        headers: {
          authorization: 'authorization-text',
        },
      };
    },
    methods: {
      getBooks(page) {
        var _this = this;
        _this.axios.get('/api/book', {
          params: {
            category: null,
            page: page - 1,
            size: 15
          }
        }).then(function(response) {
          var books = response.data.data;
          var totalBooks = Number(response.data.totalElements);
          var totalPages = Number(response.data.totalPages);
          console.log(books);
          _this.totalPages = totalPages;
          _this.totalBooks = totalBooks;
          var bookNum = books.length;
          _this.row2_books = [];
          _this.row3_books = [];
          _this.row4_books = [];
          _this.row5_books = [];
          if (bookNum < 3) {
            _this.row1_books = books;
          } else if (bookNum < 6) {
            _this.row1_books = books.slice(0, 3)
            _this.row2_books = books.slice(3, bookNum)
          } else if (bookNum < 9) {
            _this.row1_books = books.slice(0, 3)
            _this.row2_books = books.slice(3, 6)
            _this.row3_books = books.slice(6, bookNum)
          } else if (bookNum < 12) {
            _this.row1_books = books.slice(0, 3)
            _this.row2_books = books.slice(3, 6)
            _this.row3_books = books.slice(6, 9)
            _this.row4_books = books.slice(9, bookNum)
          } else {
            _this.row1_books = books.slice(0, 3)
            _this.row2_books = books.slice(3, 6)
            _this.row3_books = books.slice(6, 9)
            _this.row4_books = books.slice(9, 12)
            _this.row5_books = books.slice(12, bookNum)
          }
          _this.spinning = false;
          _this.loading = false;
          console.log(_this.$data)
        }).catch(function(error) {
          console.log(error);
        })
      },

      onSearch(value) {
        console.log('search')
        console.log(value)
        console.log(self.row1_books)
      },

      //e即点击的页面数字
      pageChanged(e) {
        console.log(e)
        this.getBooks(e);
      },

      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
      handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
    },
    watch: {

    },
  };
</script>

<style>

</style>
