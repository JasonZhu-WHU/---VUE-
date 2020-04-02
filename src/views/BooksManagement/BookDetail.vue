<template>
  <div>
    <div>
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
            <a-form-item label="书籍库存">
              <a-input-number style="float: left;width: 49.3%" :min="0" v-model="stock"/>
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
    </div>
    

    <a-button @click="submit" style="float: left;" type="primary">提交修改</a-button>
    <a-button style="float: right;" @click="cancel">
      放弃修改
    </a-button>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        form: this.$form.createForm(this),
        disabled: true,
        headers: {
          authorization: 'authorization-text',
        },
        //书籍信息
        stock: 0,
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
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'BookDetail'
      });
    },
    
    created(){
      var _this = this;
      _this.axios.get('/api/category').then(function(response) {
        console.log(response.data)
        _this.categories = response.data;
        console.log(_this.$data)
        //先获取categories再获取每一个info
        if(_this.$route.params.isbn){
          _this.isbn = _this.$route.params.isbn;
          console.log(_this.isbn)
          _this.axios.get('/api/book/'+_this.isbn).then(function(response) {
            console.log(response.data)
            var info = response.data;
            _this.title = info.title;
            _this.price = info.price;
            _this.uploadType = info.type;
            _this.author = info.author;
            _this.coverUrl = info.coverUrl;
            _this.stock = info.stock;
            _this.introduction = info.introduction;
          }).catch(function(error) {
            console.log(error)
          })
        }
        else{
          _this.$message.error('页面路由异常');
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    
    methods: {
      selectChanged(index) {
        this.uploadType = this.categories[index].category;
        console.log(this.uploadType)
      },

      handleMenuClick(menu) {
        console.log(menu)
      },

      handleMenuClickRow1(e) {
        console.log(e)
      },

      //上架按钮点击
      submit() {
        var _this = this;
        if(_this.$route.params.isbn){
          this.axios.put('/api/book/'+_this.isbn, {
            isbn: _this.isbn,
            title: _this.title,
            coverUrl: _this.coverUrl,
            price: _this.price,
            introduction: _this.introduction,
            stock: _this.stock,
            author: _this.author,
            category: _this.uploadType,
          }).then(function(response) {
            console.log(response.data);
            if (response.data) {
              _this.$message.success(
                '书籍信息修改成功，自动回退到上个界面',
                5,
              );
              _this.$router.back();
            }
          }).catch(function(error) {
            console.log(error);
            _this.$message.error('书籍信息修改出现错误', 5);
          })
        }
        
      },

      //放弃上架取消btn
      cancel() {
        console.log(this.title)
        console.log(this.isbn)
        console.log(this.price)
        console.log(this.uploadType)
        console.log(this.author)
        console.log(this.coverUrl)
        console.log(this.introduction)
        console.log(this.stock)
        this.$message.warning('信息未修改', 5);
        this.$router.back()
      },

    },
  };
</script>
