<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="添加新管理员账号" subTitle="直接输入新管理员的账号和密码及头像地址,暂不提供修改和删除" />
    <div style="padding-top: 40px;">
      <a-input placeholder="Username" v-model="username" style="width:60%">
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
      <a-input type="password" v-model="password" placeholder="Password" style="width:60%;padding-top: 40px;">
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);padding-top: 40px;" />
      </a-input>
      <a-input placeholder="Profile" v-model="profile" style="width:60%;padding-top: 40px;">
        <a-icon slot="prefix" type="android" style="color: rgba(0,0,0,.25);padding-top: 40px;" />
      </a-input>
      <br/>
      <div style="padding-top: 40px;"></div>
      <a-button @click="add" type="primary">添加账号</a-button>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        username: "",
        password: "",
        profile: "",
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'Manager'
      });
    },
    methods: {
      add(){
        if(this.username == "" || this.password=="" || this.profile == ""){
          this.$message.info('管理员账号和密码均不可为空', 5);
        }
        else{
          var _this = this;
          this.axios.post('/api/user/seller', {
            username: this.username,
            password: this.password,
            profile: this.profile,
          }).then(function(response) {
            console.log(response.data);
            if (response.data) {
              _this.$message.success(
                '管理员添加成功',
                5,
              );
            }
          }).catch(function(error) {
            console.log(error);
            _this.$message.error('管理员添加出现错误', 5);
          })
        }
      }
    },
  };
</script>
<style>

</style>
