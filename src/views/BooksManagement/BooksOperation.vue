<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-input-search placeholder="输入书籍搜索关键字" @search="onSearch" enterButton />
    <br /><br />
    <a-row :gutter="16">
      <div v-for="(item, index) in row1_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;"/>
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
      <div v-for="(item, index) in row2_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;"/>
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
          <a-card hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;"/>
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
          <a-card hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;"/>
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
          <a-card hoverable style="width: 300px">
            <img alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;"/>
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
   
    
    <a-pagination v-model="current" :total="totalBooks" @change="pageChanged" :pageSize="10"/>
    
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
      this.getBooks();
    },

    data() {
      return {
        current: 1,
        totalBooks: 15,
        totalPages: 5,
        row1_books: [],
        row2_books: [],
        row3_books: [],
        row4_books: [],
        row5_books: [],
      };
    },
    methods: {
      getBooks() {
        var _this = this;
        _this.axios.get('/api/book', {
          params: {
            category: null,
            page: 0,
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
      pageChanged(e){
        console.log(e)
      }
    },
    watch: {

    },
  };
</script>

<style>

</style>
