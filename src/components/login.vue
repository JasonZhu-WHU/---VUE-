<template>
	<div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
		<div id="canvascontainer" ref='can'>
			
		</div>
		<div class='loginbg'>

			<div class="formlist">
				<a-form :form="form" @submit="handleSubmit">
					<div class="welcome">欢迎来到书的世界！</div>
					<div class='form'>
						<a-form-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10}">
							<a-input class='cover' v-decorator="['userName', { rules: [{ required: true, message: '请输入有效的用户名！' }] }]"
							placeholder="请输入您的用户名~" />
						</a-form-item>
						<a-form-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
							<a-input class='cover' v-decorator="
							['password', 
								{ rules: 
									[
										{ required: true, message: '请输入有效的密码！' }
									] 
								}
							]"
							placeholder="请输入您的密码~" />
						</a-form-item>
						<a-form-item :wrapper-col="{ span: 10 }">
							<a-button type="primary" html-type="confirm" class="cover">
								登录
							</a-button>
						</a-form-item>
					</div>
					<router-link :to="{name:'Registry'}">
						<div class="tip">还没有账号？点我注册</div>
					</router-link>
				</a-form>
			</div>
		</div>
	</div>
</template>

<script>
	// import {
	// 	base_url
	// } from '../../util'
	
	export default {
		name: 'login',
		data() {
			return {
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				})
			}
		},
		
	// 	mounted() {
	// 		container = document.createElement('div');
	// 		this.$refs.can.appendChild(container);
	// 		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	// 		camera.position.z = 1000;
	
	// 		scene = new THREE.Scene();
	
	// 		particles = new Array();
	
	// 		var PI2 = Math.PI * 2;
	// 		var material = new THREE.ParticleCanvasMaterial({
	
	// 			color: 0x0078de,
	// 			program: function(context) {
	
	// 				context.beginPath();
	// 				context.arc(0, 0, 1, 0, PI2, true);
	// 				context.fill();
	
	// 			}
	
	// 		});
	
	// 		var i = 0;
	
	// 		for (var ix = 0; ix < AMOUNTX; ix++) {
	
	// 			for (var iy = 0; iy < AMOUNTY; iy++) {
	
	// 				particle = particles[i++] = new THREE.Particle(material);
	// 				particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
	// 				particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
	// 				scene.add(particle);
	
	// 			}
	
	// 		}
	
	// 		renderer = new THREE.CanvasRenderer();
	// 		renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
	// 		container.appendChild(renderer.domElement);
	
	// 		document.addEventListener('mousemove', onDocumentMouseMove, false);
	// 		//
	
	// 		window.addEventListener('resize', onWindowResize, false);
	
	// 		animate();
	// 	},
	// 	methods: {
			
	// 		handleSubmit(e) {
			
	// 			e.preventDefault();
	// 			this.form.validateFields((err, values) => {
	// 				if (!err) {
	// 					console.log('Received values of form: ', values)
	// 				}
	// 			})
	// 		},
			
	// 		handleLogin() {
	// 			//添加下面的代码--zj
	// 			this.loading = true;
	// 			this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
	
	// 				this.$Message.success('登录成功');
	// 				this.loading = false;
	// 				this.$router.push({
	// 					path: '/'
	// 				});
	// 			}).catch(err => {
	// 				this.$Message.success('登录成功');
	// 				this.loading = false;
	// 				this.$router.push({
	// 					'http://localhost:9011': '/'
	// 				});
	// 				// if(err.message=="Failed to fetch")err.message="账户密码错误或无权限"
	// 				// this.$Message.error(err.message);
	// 				// this.loading = false;
	// 			});
	// 		},
	// 		get_code() {
	// 			var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
	// 			if (this.registerForm.account == "") {
	// 				this.$Message.warning("手机号不能为空")
	// 				return
	// 			} else if (!myreg.test(this.registerForm.account)) {
	// 				this.$Message.warning("请输入正确手机号")
	// 				return
	// 			}
	// 			fetch(base_url + "getVerification", {
	// 				method: "post",
	// 				headers: {
	// 					"content-type": "application/json",
	// 					"Authorization": "JWT " + localStorage.getItem("token_huaqi")
	// 				},
	// 				body: JSON.stringify({
	// 					account: this.registerForm.account,
	// 					type: 1
	// 				})
	// 			}).then(res => res.json()).then(res => {
	// 				console.log(res)
	// 				if (!res.success) {
	// 					this.$Message.error(res.errMsg)
	// 					return
	// 				}
	// 				this.$Message.success("已发送")
	// 				this.disable_code = true
	// 				let second = 60
	// 				var timer = setInterval(() => {
	// 					if (second == 0) {
	// 						this.text_code = "重新发送"
	// 						this.disable_code = false
	// 						clearInterval(timer);
	// 					} else {
	// 						this.text_code = second + "s后再次发送"
	// 						second--
	// 					}
	
	// 				}, 1000)
	// 			})
	
	// 		},
	// 		register() {
	// 			var data = this.registerForm
	// 			if (data.passwd == '' || data.account == '' || data.verification == '' || data.companyId == '') {
	// 				this.$Message.error("信息不完整！")
	// 				return
	// 			}
	// 			if (data.passwd != data.passwd_check) {
	// 				this.$Message.error("两次输入密码不同！")
	// 				return
	// 			}
	// 			delete this.registerForm.passwd_check
	// 			fetch(base_url + "userRegister", {
	// 				method: "post",
	// 				headers: {
	// 					"content-type": "application/json",
	// 					"Authorization": "JWT " + localStorage.getItem("token_huaqi")
	// 				},
	// 				body: JSON.stringify(this.registerForm)
	// 			}).then(res => res.json()).then(res => {
	// 				console.log(res)
	// 				if (!res.success) {
	// 					this.$Message.error(res.errMsg)
	// 					return
	// 				}
	// 				this.$Message.success("成功")
	// 				this.loginForm.email = this.registerForm.account
	// 				this.loginForm.password = this.registerForm.passwd
	// 				this.handleLogin()
	// 			})
	// 		}
	// 	},
	// }
	
	// var SEPARATION = 100,
	// 	AMOUNTX = 50,
	// 	AMOUNTY = 50;
	
	// var container;
	// var camera, scene, renderer;
	
	// var particles, particle, count = 0;
	
	// var mouseX = 0,
	// 	mouseY = 0;
	
	// var windowHalfX = window.innerWidth / 2;
	// var windowHalfY = window.innerHeight / 2;
	
	
	// // animate();
	
	// function init() {
	
	
	
	// }
	
	// function onWindowResize() {
	
	// 	windowHalfX = window.innerWidth / 2;
	// 	windowHalfY = window.innerHeight / 2;
	
	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();
	
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	
	// }
	
	// //
	
	// function onDocumentMouseMove(event) {
	
	// 	mouseX = event.clientX - windowHalfX;
	// 	mouseY = event.clientY - windowHalfY;
	
	// }
	
	// function onDocumentTouchStart(event) {
	
	// 	if (event.touches.length === 1) {
	
	// 		event.preventDefault();
	
	// 		mouseX = event.touches[0].pageX - windowHalfX;
	// 		mouseY = event.touches[0].pageY - windowHalfY;
	
	// 	}
	
	// }
	
	// function onDocumentTouchMove(event) {
	
	// 	if (event.touches.length === 1) {
	
	// 		event.preventDefault();
	
	// 		mouseX = event.touches[0].pageX - windowHalfX;
	// 		mouseY = event.touches[0].pageY - windowHalfY;
	
	// 	}
	
	// }
	
	// //
	
	// function animate() {
	
	// 	requestAnimationFrame(animate);
	
	// 	render();
	
	
	// }
	
	// function render() {
	
	// 	camera.position.x += (mouseX - camera.position.x) * .05;
	// 	camera.position.y += (-mouseY - camera.position.y) * .05;
	// 	camera.lookAt(scene.position);
	
	// 	var i = 0;
	
	// 	for (var ix = 0; ix < AMOUNTX; ix++) {
	
	// 		for (var iy = 0; iy < AMOUNTY; iy++) {
	
	// 			particle = particles[i++];
	// 			particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
	// 			particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) *
	// 				2;
	
	// 		}
	
	// 	}
	
	// 	renderer.render(scene, camera);
	
	// 	count += 0.1;
	
	}
</script>

<style>
	.loginbg {
		background: linear-gradient(62deg,
			#719669 0%,
			#4e8c41 50%,
			#58904c 50%,
			#3e8331 100%);
		background-position: center center;
		background-attachment: scroll;
		background-size: cover;
		background-color: #3e8331;
		height: 642px;
		display: flex;
		justify-content: center;
		text-align: center;
		padding-top: 100px;
		padding-bottom: 100px;
	}

	.formlist {

		background-color: rgba(245, 245, 245, 0.911);
		border-radius: 5px;
		box-shadow: #cdcdcd 2px;
		width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;


	}

	.form {

		padding-left: 18%;
	}

	.welcome {
		padding-top: 10%;
		font-size: 28px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.cover {
		width: 300px !important;
		height: 45px !important;
		font-size: 16px !important;
		margin: 5%;
	}

	.tip {
		font-size: 15px;
		padding-bottom: 10%;
		color: black;
	}
	
	.login-container a{color:#0078de;}
	#canvascontainer{
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}
</style>
