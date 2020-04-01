<template>
  <a-layout id="layout">
    <a-layout-header class="header">
     <div class="logo" >
        <a-icon type="project" />
        书林Forests 后台管理系统
      </div>
      <a-menu @click="topBtnClicked" theme="dark" mode="horizontal" :defaultSelectedKeys="[]" :style="{ lineHeight: '64px'}">
        <a-menu-item key="1">使用帮助</a-menu-item>
        <a-menu-item key="2">问题反馈</a-menu-item>
        <a-menu-item key="3">关于我们</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu @click="handleClick" 
          mode="inline"
          :defaultSelectedKeys="['1']" 
          :openKeys.sync="openKeys" 
          :theme="theme"
          :style="{ height: '100%', borderRight: 0 }">
          <a-sub-menu key="sub1" @titleClick="titleClick">
            <span slot="title">
              <a-icon type="book" /><span>书目管理</span></span>
            <a-menu-item key="书目操作">书目操作</a-menu-item>
            <a-menu-item key="书目统计">书目统计</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title">
              <a-icon type="account-book" /><span>销售管理</span></span>
            <a-menu-item key="订单管理">订单管理</a-menu-item>
            <a-menu-item key="销售分析">销售分析</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="user" /><span>商家管理</span></span>
            <a-menu-item key="设置管理员">设置管理员</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '530px' }">
          <div>
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'home'
      });
      document.querySelector('body').setAttribute('style', 'background:#;')
    },
    data() {
      return {
        collapsed: false,
        current: ['mail'],
        openKeys: [],
        openTopBtns: [],
        theme: 'dark',
        mode: 'inline',
      };
    },
    methods: {
      //点击item
      handleClick(e) {
        var _this = this;
        console.log('点击item：', e);
        if (e.key == "书目操作") {
          _this.$router.push({
            name: 'BooksOperation',
            params: {
              
            }
          });
        } else if (e.key == "书目统计") {
          _this.$router.push({
            name: 'BooksStatistics',
            params: {

            }
          });
        } else if (e.key == "订单管理") {
          _this.$router.push({
            name: 'SalesList',
            params: {

            }
          });
        } else if (e.key == "销售分析") {
          _this.$router.push({
            name: 'SalesStatistics',
            params: {

            }
          });
        }
      },
      //点击大的分类title
      titleClick(e) {
        console.log('titleClick', e);
      },
      //点击顶端标题
      topBtnClicked(e){
        console.log('top btn clicked', e);
        this.$data.openTopBtns = [];
      }
    },
    watch: {
      openKeys(val) {
        console.log('openKeys', val);
      },
    },
  };
</script>
<style>
  #layout .logo {
    float: left;
    color: aliceblue;
  }
</style>
