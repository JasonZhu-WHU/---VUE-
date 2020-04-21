<template>
  <div style="background-color: #ececec; padding: 20px;">

    <a-input-search style="width: 80%;float: left;" placeholder="输入书籍搜索关键字" @search="onSearch" enterButton />
    <a-button @click="showDrawer" type="primary" style="float: right;">
      <a-icon type="plus" />添加书目</a-button>
    <a-drawer title="添加新书目(书目上架)" :width="720" @close="cancel" :visible="visible" :bodyStyle="{paddingBottom: '80px'}">
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="书名">
              <a-input v-model="title" placeholder="请输入书名" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="ISBN号">
              <a-input v-model="isbn" placeholder="请输入ISBN号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="单品价格">
              <a-input-number v-model="price" :min="0" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="书籍分类">
              <a-select @change="selectChanged" v-decorator="['type']" placeholder="请选择类型">
                <a-select-option v-for="(item, index) in categories" :key="index">{{item.category}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="书籍作者">
              <a-input v-model="author" placeholder="请输入作者名字" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="书目图片URL">
              <a-input v-model="coverUrl" placeholder="请输入图片URL" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="书籍简介">
              <a-textarea v-model="introduction" :rows="4" placeholder="请输入书籍简要介绍" />
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
        <a-button :style="{marginRight: '8px'}" @click="cancel">
          Cancel
        </a-button>
        <a-button @click="submit" type="primary">Submit</a-button>
      </div>
    </a-drawer>
    <br /><br />

    <div style="padding-top: 10px;"></div>

    <a-spin size="large" :spinning="spinning" />

    <a-row :gutter="16">
      <div v-for="(item, index) in row1_books" :key="index" :title="item.title">
        <a-col :span="8">
          <a-card :loading="loading" hoverable style="width: 300px">
            <img @click="toDetail(item.isbn)" alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="info"></a-button>
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="edit"></a-button>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick" @openChange="openMenu(item)">
                  <a-menu-item key="1">
                    <a-icon type="delete" />书目下架（删除）</a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="pay-circle" />调整价格</a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="rocket" />更多功能敬请期待</a-menu-item>
                </a-menu>

                <a-button style="margin-left: 8px"> More
                  <a-icon type="down" />
                </a-button>

              </a-dropdown>
            </template>
            <a-modal title="下架" :visible="popVisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
              <p>您确认要下架这本书吗？</p>
            </a-modal>
            <a-modal title="价格调整" v-model="modalVisible" @ok="modalOK" @cancel="modalCancel">
              <p>请输入您想设置的新价格：</p>
              <a-input prefix="￥" suffix="RMB" v-model="newPrice" />
            </a-modal>
            <a-card-meta :loading="loading" :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
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
            <img @click="toDetail(item.isbn)" alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="info"></a-button>
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="edit"></a-button>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick" @openChange="openMenu(item)">
                  <a-menu-item key="1">
                    <a-icon type="delete" />书目下架（删除）</a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="pay-circle" />调整价格</a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="rocket" />更多功能敬请期待</a-menu-item>
                </a-menu>
    
                <a-button style="margin-left: 8px"> More
                  <a-icon type="down" />
                </a-button>
    
              </a-dropdown>
            </template>
            <a-modal title="下架" :visible="popVisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
              <p>您确认要下架这本书吗？</p>
            </a-modal>
            <a-modal title="价格调整" v-model="modalVisible" @ok="modalOK" @cancel="modalCancel">
              <p>请输入您想设置的新价格：</p>
              <a-input prefix="￥" suffix="RMB" v-model="newPrice" />
            </a-modal>
            <a-card-meta :loading="loading" :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
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
            <img @click="toDetail(item.isbn)" alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="info"></a-button>
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="edit"></a-button>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick" @openChange="openMenu(item)">
                  <a-menu-item key="1">
                    <a-icon type="delete" />书目下架（删除）</a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="pay-circle" />调整价格</a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="rocket" />更多功能敬请期待</a-menu-item>
                </a-menu>
    
                <a-button style="margin-left: 8px"> More
                  <a-icon type="down" />
                </a-button>
    
              </a-dropdown>
            </template>
            <a-modal title="下架" :visible="popVisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
              <p>您确认要下架这本书吗？</p>
            </a-modal>
            <a-modal title="价格调整" v-model="modalVisible" @ok="modalOK" @cancel="modalCancel">
              <p>请输入您想设置的新价格：</p>
              <a-input prefix="￥" suffix="RMB" v-model="newPrice" />
            </a-modal>
            <a-card-meta :loading="loading" :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
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
            <img @click="toDetail(item.isbn)" alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="info"></a-button>
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="edit"></a-button>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick" @openChange="openMenu(item)">
                  <a-menu-item key="1">
                    <a-icon type="delete" />书目下架（删除）</a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="pay-circle" />调整价格</a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="rocket" />更多功能敬请期待</a-menu-item>
                </a-menu>
    
                <a-button style="margin-left: 8px"> More
                  <a-icon type="down" />
                </a-button>
    
              </a-dropdown>
            </template>
            <a-modal title="下架" :visible="popVisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
              <p>您确认要下架这本书吗？</p>
            </a-modal>
            <a-modal title="价格调整" v-model="modalVisible" @ok="modalOK" @cancel="modalCancel">
              <p>请输入您想设置的新价格：</p>
              <a-input prefix="￥" suffix="RMB" v-model="newPrice" />
            </a-modal>
            <a-card-meta :loading="loading" :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
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
            <img @click="toDetail(item.isbn)" alt="example" :src="item.coverUrl" slot="cover" style="width:300px;height: 350px;" />
            <template class="ant-card-actions" slot="actions">
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="info"></a-button>
              <a-button @click="toDetail(item.isbn)" shape="circle" icon="edit"></a-button>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick" @openChange="openMenu(item)">
                  <a-menu-item key="1">
                    <a-icon type="delete" />书目下架（删除）</a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="pay-circle" />调整价格</a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="rocket" />更多功能敬请期待</a-menu-item>
                </a-menu>
    
                <a-button style="margin-left: 8px"> More
                  <a-icon type="down" />
                </a-button>
    
              </a-dropdown>
            </template>
            <a-modal title="下架" :visible="popVisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
              <p>您确认要下架这本书吗？</p>
            </a-modal>
            <a-modal title="价格调整" v-model="modalVisible" @ok="modalOK" @cancel="modalCancel">
              <p>请输入您想设置的新价格：</p>
              <a-input prefix="￥" suffix="RMB" v-model="newPrice" />
            </a-modal>
            <a-card-meta :loading="loading" :title="item.title" :description="`价格：${item.price}元   销量：${item.sales}个   库存：${item.stock}个`">
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
      this.getCatgories();
      this.getBooks(1);
      this.getTime();
    },

    data() {
      return {
        loading: true,
        spinning: true,
        categories: [],
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
        modalVisible: false,
        popVisible: false,
        confirmLoading: false,
        headers: {
          authorization: 'authorization-text',
        },

        //正在操作的card的下拉菜单对应的书的isbn
        isbnOperating: null,
        //调整价格的input绑定输入
        newPrice: null,
        
        //上传书籍（上架）
        isbn: null,
        title: null,
        coverUrl: null,
        price: null,
        author: null,
        uploadType: null,
        introduction: null,
        time: null,
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
        }).catch(function(error) {
          console.log(error);
        })
      },

      getCatgories() {
        var _this = this;
        _this.axios.get('/api/category').then(function(response) {
          console.log(response.data)
          _this.categories = response.data;
          console.log(_this.$data)
        }).catch(function(error) {
          console.log(error)
        })
      },

      getTime() {
        this.time = Date.parse(new Date());
      },

      //点击搜索或回车
      onSearch(value, event) {
        console.log('search')
        console.log(value)
        console.log(event)
        var _this = this;
        _this.spinning = true;
        _this.loading = true;
        _this.axios.get('/api/search', {
          params: {
            keyword: value,
            order: "title",
            lowestPrice: null,
            highestPrice: null,
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
        }).catch(function(error) {
          console.log(error)
          _this.spinning = false;
          _this.loading = false;
          this.$message.error('书籍搜索出现错误', 5);
        })
      },

      selectChanged(index) {
        this.uploadType = this.categories[index].category;
        console.log(this.uploadType)
      },

      //打开了某个card的下拉菜单
      openMenu(item) {
        console.log(item.isbn)
        this.isbnOperating = item.isbn
      },

      //点击了下拉菜单的某个选项
      handleMenuClick(e) {
        console.log(e.key)
        if (this.isbnOperating) {
          //书籍下架
          if (e.key == "1") {
            this.deleteBook()
          }
          //调整价格
          else if (e.key == "2") {
            this.adjustPrice(this.isbnOperating)
          }
          //
          else {
            this.$message.info('更多功能敬请期待', 5);
          }
        } else {
          this.$message.error('下拉菜单出现商品选取错误', 5);
        }
      },

      adjustPrice(isbn) {
        console.log(isbn)
        this.modalVisible = true;
      },

      modalOK(e) {
        console.log(e);
        this.modalVisible = false;
        console.log(this.newPrice)
        console.log(this.isbnOperating)
        var _this = this;
        this.axios.put('/api/book/'+_this.isbnOperating+'/price', {
          price: _this.newPrice,
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '成功调整价格至'+_this.newPrice+"元",
              5,
            );
            _this.getBooks(_this.current)
          }
        }).catch(function(error) {
          console.log(error);
          _this.$message.error('书籍调整价格出现错误', 5);
        })
      },
      
      modalCancel(e) {
        console.log(e);
        this.popVisible = false;
        this.$message.warning('放弃调整价格');
        console.log(this.modalVisible)
      },

      deleteBook() {
        this.popVisible = true;
      },
      
      handleOk() {
        this.ModalText = '正在删除这个满减促销...';
        this.confirmLoading = true;
        var _this = this;
        this.axios.delete('/api/book/' + this.isbnOperating).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '书籍成功下架',
              5,
            );
            _this.getBooks(this.current);
          }
        }).catch(function(error) {
          console.log(error);
          this.$message.error('书籍删除出现错误', 5);
        })
        setTimeout(() => {
          this.popVisible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      
      handleCancel() {
        this.$message.info('放弃本次删除操作', 5);
        this.popVisible = false;
      },

      infoClickRow1(e) {
        console.log(e)
      },
      deleteClickRow1(e) {
        console.log(e)
      },

      //e即点击的页面数字
      pageChanged(e) {
        console.log(e)
        this.current = e;
        this.getBooks(e);
      },

      //展示抽屉（书籍上架浮窗）
      showDrawer() {
        this.visible = true;
      },

      //查看商品详情
      toDetail(isbn) {
        this.$router.push({
          name: 'BookDetail',
          params: {
            isbn: isbn
          }
        });
      },

      //上架按钮点击
      submit() {
        var _this = this;
        this.axios.post('/api/book', {
          isbn: this.isbn,
          title: this.title,
          coverUrl: this.coverUrl,
          price: this.price,
          introduction: this.introduction,
          author: this.author,
          category: this.uploadType,
          time: this.time
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            _this.$message.success(
              '书籍上架成功',
              5,
            );
            _this.visible = false;
            _this.getBooks(_this.current);
          }
        }).catch(function(error) {
          console.log(error);
          _this.visible = false;
          _this.$message.error('书籍上架出现错误', 5);
        })
      },

      //放弃上架取消btn
      cancel() {
        this.visible = false;
        this.$message.warning('书籍上架取消', 5);
        console.log(this.title)
        console.log(this.isbn)
        console.log(this.price)
        console.log(this.uploadType)
        console.log(this.author)
        console.log(this.coverUrl)
        console.log(this.introduction)
        console.log(this.time)
      },
    },
    watch: {

    },
  };
</script>

<style>

</style>
