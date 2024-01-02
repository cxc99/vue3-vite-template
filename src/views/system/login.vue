<template>
  <div class="login">
    <!-- <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登入</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form> -->

    <section>
      <!-- 背景颜色 -->
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>
      <div class="box">
        <!-- 背景圆 -->
        <div class="circle" style="--x: 0"></div>
        <div class="circle" style="--x: 1"></div>
        <div class="circle" style="--x: 2"></div>
        <div class="circle" style="--x: 3"></div>
        <div class="circle" style="--x: 4"></div>
        <!-- 登录框 -->
        <div class="container">
          <div class="form">
            <h2>登录</h2>
            <form @submit.prevent="onSubmit">
              <div class="inputBox">
                <input
                  v-model="form.userName"
                  name="phonenumber"
                  type="text"
                  placeholder="账户"
                  required
                  autofocus />
              </div>

              <div class="inputBox">
                <input
                  v-model="form.password"
                  name="password"
                  type="password"
                  placeholder="密码"
                  required />
              </div>

              <div class="inputBox">
                <input type="submit" value="登录" />
              </div>

              <p class="forget">
                忘记密码?
                <a href="#">点击这里</a>
              </p>
              <p class="forget">
                没有账户?
                <a href="#">注册</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { user } from '@/pinia/modules/user'
const router = useRouter()
const form = reactive({
  userName: '1090113499',
  password: '123456',
})

const useUser = user()

const onSubmit = async () => {
  try {
    const { data, code, msg } = await callApi.post('/sysUser/login', form)

    if (code == 200) {
      localStorage.setItem('token', data.token)
      ElMessage({
        type: 'success',
        message: '登入成功',
      })

      const infoData = {
        userId: data.userId,
        token: data.token,
        nickName: data.nickName,
        userName: data.userName,
        userType: data.userType,
        remark: data.remark,
        sex: data.sex,
        status: data.status,
        delFlag: data.delFlag,
        deptId: data.deptId,
        email: data.email,
        loginDate: data.loginDate,
        avatar: data.avatar,
        phonenumber: data.phonenumber,
      }

      useUser.SET_USER(infoData)
      setTimeout(() => {
        router.push('./system/home')
      }, 1500)
    } else {
      ElMessage({
        type: 'error',
        message: msg,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  // display: grid;
  // place-items: center;
}

section {
  /* 相对定位 */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片 */
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

section .color {
  position: absolute;

  filter: blur(200px);
}

section .color:nth-child(1) {
  top: -350px;
  width: 600px;
  height: 600px;
  background: #ff359b;
}

section .color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 500px;
  height: 500px;
  background: #fffd87;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 500px;
  height: 500px;
  background: #00d2ff;
}

.box {
  position: relative;
}

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  /* 使用filter(滤镜) 属性，改变颜色。
    hue-rotate(deg)  给图像应用色相旋转
    calc() 函数用于动态计算长度值
    var() 函数调用自定义的CSS属性值x*/
  filter: hue-rotate(calc(var(--x) * 70deg));
  /* 调用动画animate，需要10s完成动画，
    linear表示动画从头到尾的速度是相同的，
    infinite指定动画应该循环播放无限次*/
  animation: animate 10s linear infinite;
  /* 动态计算动画延迟几秒播放 */
  animation-delay: calc(var(--x) * -1s);
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }
  50% {
    transform: translateY(50px);
  }
}

.box .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 60px;
  height: 60px;
}

.box .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

.container {
  position: relative;
  width: 400px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
}

.form h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  margin-bottom: 30px;
  cursor: pointer;
}

.form h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0px;
  height: 3px;
  background: #fff;
  transition: 0.5s;
}

.form h2:hover:before {
  width: 53px;
}

.form .inputBox {
  width: 100%;
  margin-top: 20px;
}

.form .inputBox input {
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form .inputBox input::placeholder {
  color: #fff;
}

.form .inputBox input[type='submit'] {
  background: #fff;
  color: #666;
  max-width: 100px;
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
}

.forget {
  margin-top: 6px;
  color: #fff;
  letter-spacing: 1px;
}

.forget a {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
</style>
