<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="apple" />
        登录
      </span>
      欢迎登录书林
      <a-form id="loginForm" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input class="Input" v-model="username" v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username">
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input class="Input" v-model="password" v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="android" />
        添加新用户
      </span>
      请先验证您的身份
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import axios from 'axios'
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'normal_login'
      });
      document.querySelector('body').setAttribute('style', 'background:#B0C4DE')
    },
    methods: {
      handleSubmit(e) {
        var _this = this;
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
          }
          console.log(values)
          axios.post('/api/user/seller/authentication', {
            username: values.username,
            password: values.password
          }).then(function(response) {
            console.log(response);
            if (response.data.userId == 0 || response.data == "") {
              console.log("login failed");
              alert("请输入正确的用户名或密码！")
            } else {
              _this.$router.push({
                name: 'Home',
                params: {
                  userId: response.data.userId
                }
              });

            }
          }).catch(function(error) {
            console.log(error);
          })
        })
      },
    },
  };
</script>
<style>
  #loginForm .login-form {
    max-width: 300px;
  }

  #loginForm .login-form-forgot {
    float: right;
  }

  #loginForm .login-form-button {
    top: 30px;
    width: 30%;
  }

  #loginForm .Input {
    top: 30px;
    width: 30%;
  }
</style>
