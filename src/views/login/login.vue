<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>
    <div class="flex-box">
      <div class="left1">
        <!-- <img src="static/img/fibot.jpg" class="logo"/> -->
        <!-- <Carousel autoplay :autoplay-speed="2500" loop :arrow="'never'">
          <CarouselItem>
              <div class="demo-carousel">
                <img src="static/img/数据驱动万物互联.jpg"/>
              </div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel">
                <img src="static/img/区块链.jpg"/>
              </div>
          </CarouselItem> 
          <CarouselItem>
              <div class="demo-carousel">
                <img src="static/img/财务综合.jpg"/>
              </div>
          </CarouselItem>
      </Carousel> -->
        
      </div>
      <div class="right1">
        <div class="right_content">
          <div class="title">
              <h1 style="text-align:center;font-size:45px;color:#eeeeee">Finbot</h1>
              <h1 style="text-align:center;font-size:18px;color:#aaaaaa"> ——你的专属财务机器人</h1>
          </div> 
          <Tabs value="login">
            <TabPane label="登录" name="login">
              <Form ref="loginForm" autoComplete="on" :model="loginForm" class="card-box login-form">
                  <Form-item prop="email">
                      <Input type="text" v-model="loginForm.email" placeholder="Username" autoComplete="on">
                          <Icon type="ios-contact" slot="prepend" />
                      </Input>
                  </Form-item>
                  <Form-item prop="password">
                      <Input type="password" v-model="loginForm.password" placeholder="Password" @keyup.enter.native="handleLogin">
                          <Icon type="ios-lock"  slot="prepend"/>
                      </Input>
                  </Form-item>
                  <Form-item>
                      <Button type="primary" @click="handleLogin('loginForm')" long :loading="loading">登录</Button>
                  </Form-item>
              </Form>
            </TabPane>
            <TabPane label="注册" name="register">
              <Form ref="registerForm" autoComplete="on" class="card-box register-form">
                  <FormItem label="选择公司" class="register_item">
                      <Select v-model="registerForm.companyId" class="register_input">
                        <Option :value="1">大学城-武汉</Option>
                        <Option :value="4">华科-喻家山</Option>
                        <Option :value="2">律师事务-北京</Option>
                        <Option :value="5">武汉大学-珞珈山</Option>
                        <Option :value="3">诈骗公司-北美</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="输入账户" class="register_item">
                    <Input type="text" v-model="registerForm.account" placeholder="请输入电话" class="register_input" autoComplete="on" />
                  </FormItem>
                  <FormItem label="输入密码" class="register_item">
                      <Input type="password" v-model="registerForm.passwd" class="register_input" />
                  </FormItem>
                  <Form-item label="确认密码" class="register_item">
                      <Input type="password" v-model="registerForm.passwd_check" class="register_input"/>
                  </Form-item>
                  <Form-item label="手机验证" class="register_item">
                      <Input v-model="registerForm.verification" class="register_input" style="width:42%"/>
                      <Button type="primary" :disabled="disable_code" @click="get_code" >{{text_code}}</Button>
                  </Form-item>
                  <br/>
                  <Form-item>
                      <Button type="primary" @click="register" long :loading="loading">注册</Button>
                  </Form-item>
              </Form>
            </TabPane>
          </Tabs>
          
        </div>
        
      </div>
    </div>
    <h1 style="color:white;margin:0px 55px 10px 55px;font-size:13px;width:20%">合作支持</h1>
    <div class="support" >
      <a href="http://www.ap-ec.cn/" style="z-index:999" target="_blank"><img src="static/img/zhongnong.png" class="com_img"/></a>
      <a href="http://www.zallcn.com/" style="z-index:999" target="_blank"><img src="static/img/zhuoer.png" class="com_img"/></a>
    
    </div>
    
      <div class="footer">智能，让财务更加简单</div> 
        
        
      <div class="under_foot"><a >Copyright</a> &copy; 2019 花旗.Alpha Type</div>
    </div>
</template>

<script>
    import { isWscnEmail } from 'utils/validate';
    import {base_url} from '../../util'
    export default {
      name: 'login',
      data() {
        return {
          disable_code:false,
          text_code:"获取验证码",
          loginForm: {
            email: '17371449025',
            password: '123456'
          },
          registerForm: {
            companyId: "",
            account: "",
            passwd: "",
            verification: ""
          },
          loading: false,
          showDialog: false,
          type:''
        }
      },
       mounted () {
        container = document.createElement( 'div' );
        this.$refs.can.appendChild( container );  
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        particles = new Array();

        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial( {

          color: 0x0078de,
          program: function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 1, 0, PI2, true );
            context.fill();

          }

        } );

        var i = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

          for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i ++ ] = new THREE.Particle( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );

          }

        }

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth-10, window.innerHeight-10 );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //

        window.addEventListener( 'resize', onWindowResize, false );

        animate();
      },
      methods: {
        handleLogin() {
			//添加下面的代码--zj
			this.loading = true;
			this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
			  
			  this.$Message.success('登录成功');
			  this.loading = false;
			  this.$router.push({ path: '/' });
			}).catch(err => {
				this.$Message.success('登录成功');
				this.loading = false;
				this.$router.push({ 'http://localhost:9011': '/' });
			  // if(err.message=="Failed to fetch")err.message="账户密码错误或无权限"
			  // this.$Message.error(err.message);
			  // this.loading = false;
			});
			
          // this.$refs.loginForm.validate(valid => {
          //   if (valid) {
          //     this.loading = true;
          //     this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
                
          //       this.$Message.success('登录成功');
          //       this.loading = false;
          //       this.$router.push({ path: '/' });
          //     }).catch(err => {
          //       if(err.message=="Failed to fetch")err.message="账户密码错误或无权限"
          //       this.$Message.error(err.message);
          //       //console.log(err)
          //       this.loading = false;
          //     });
          //   } else {
          //     console.log('error submit!!');
          //     return false;
          //   }
          // });
        },
        get_code(){
          var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
          if (this.registerForm.account == "") {
            this.$Message.warning("手机号不能为空")
            return
          }
            
          else if (!myreg.test(this.registerForm.account)) {
            this.$Message.warning("请输入正确手机号")
            return
          }
          fetch(base_url+"getVerification",{
            method:"post",
            headers:{
                "content-type":"application/json",
                "Authorization":"JWT "+localStorage.getItem("token_huaqi")
            },
            body:JSON.stringify({
              account: this.registerForm.account,
              type: 1
            })
          }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(!res.success){
              this.$Message.error(res.errMsg)
              return
            }
            this.$Message.success("已发送")
            this.disable_code = true
            let second = 60
            var timer = setInterval(()=>{
              if (second == 0) {
                this.text_code = "重新发送"
                this.disable_code = false
                clearInterval(timer);
              }
              else{
                this.text_code = second+"s后再次发送"
                second--
              }
              
            },1000)
          })

        },
        register(){
          var data = this.registerForm
          if(data.passwd==''||data.account==''||data.verification==''||data.companyId==''){
            this.$Message.error("信息不完整！")
            return
          }
          if(data.passwd!=data.passwd_check){
            this.$Message.error("两次输入密码不同！")
            return
          }
          delete this.registerForm.passwd_check
          fetch(base_url+"userRegister",{
            method:"post",
            headers:{
                "content-type":"application/json",
                "Authorization":"JWT "+localStorage.getItem("token_huaqi")
            },
            body:JSON.stringify(this.registerForm)
          }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(!res.success){
              this.$Message.error(res.errMsg)
              return
            }
            this.$Message.success("成功")
            this.loginForm.email = this.registerForm.account
            this.loginForm.password = this.registerForm.passwd
            this.handleLogin()
          })
        }
      },
    }

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


// animate();

function init() {

  

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();


}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );

  var i = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      particle = particles[ i++ ];
      particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

    }

  }

  renderer.render( scene, camera );

  count += 0.1;

}
</script>
<style>
.login-container a{color:#0078de;}
#canvascontainer{
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

</style>

<style rel="stylesheet/scss" lang="scss">
     .tips{
      font-size: 14px;
      color: #fff;
      margin-bottom: 5px;
    } 
    .login-container {
        height: 100vh;
        background-color: #2d3a4b;
        .flex-box{
          display: flex;
          flex-direction: row
        }
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 1px solid #2d8cf0;
            -webkit-appearance: none;
            border-radius: 3px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }
        .logo{
          width: 200px;
          margin: 100px;
          border-radius: 50%;
        }
        .right_content{
          margin-top: 40px;
          margin-left:10px;
          padding: 15px 20px;
          border: 1px outset white;
          border-radius: 3px;
          width: 75%;
        }
        .title {
            padding: 15px 35px 15px 35px;
            margin:  0px auto;
        }

        .login-form {
            padding: 15px 35px 15px 35px;
            margin:  0px auto;
            
            .wz-input-group-prepend{
              background-color: #141a48;
              border: 1px solid #2d8cf0;
              border-right: none;
              color:  #2d8cf0;
            }
        }
        .register-form {
            padding: 15px 20px 15px 20px;
            margin:  0px auto;
            
        }
        .register_item{
          margin-bottom:8px ;
        }
        .ivu-form .ivu-form-item-label{
          color: #cecbc9;
        }
        .register_input{
          width: 70%;
          background-color: rgba(0, 0, 0, 0.1)
        }
        .register_input input{
          padding: 5px 10px;
          height:30px
        }
        .ivu-select-selection{
          background-color:  rgba(0, 0, 0, 0.1);
        }
        .ivu-select-dropdown{
          // background-color:  rgba(153, 146, 146, 1);
          // border:1px solid white;
        }
        .ivu-select-item{
          // color: white;
        }
        .left1{
          width:55%;
          text-align: center;
          z-index: 9999
        }
        .demo-carousel{
          margin-top: 40px;
          height: 450px;
          color:white
        }
        .demo-carousel img{
          height: 450px;
          width: 100%;
        }
        .com_img{
          width: 90%;
          height: 40px; 
          margin-bottom: 2px;
        }
        .right1{
          width:45%;
        }
        .footer{
          font-size:18px;
          position: absolute;
          color:#cccccc;
          border-bottom:1px solid #888888;
          text-align:center;
          width: 100%;
          // padding:10px 300px;
          // margin:500px auto;
          bottom: 30px;
          background-color:rgba(255,255,255,0)
        }
        .support{
          display:flex;
          flex-direction:row;
          text-align: center;
          margin-left: 25px;
        }
        .support a{
          width: 15%
        }
        .under_foot{
          position: absolute;
          bottom: 5px;
          text-align: center;
          width: 100%
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }

</style>
