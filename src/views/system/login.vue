<template>
  <div class="login">
    <main>
      <!-- 包含登录和注册表单的容器 -->
      <div class="box">
        <!-- 包含登录和注册表单的内部容器 -->
        <div class="inner-box">
          <!-- 包含登录和注册表单的表单容器 -->
          <div class="forms-wrap">
            <!-- 登录表单 -->
            <form v-if="isLogin" autocomplete="off" class="sign-in-form">
              <div class="logo">
                <!-- <h4>前端学习</h4> -->
              </div>
              <!-- 包含标题和切换注册表单的链接的容器 -->
              <div class="heading">
                <h2>欢迎回来</h2>
                <h6>Not registered yet?</h6>
                <span @click="isLogin = false">Sign up</span>
              </div>
              <!-- 包含输入字段和提交按钮的容器 -->
              <div class="actual-form">
                <!-- 包含用户名输入字段的容器 -->
                <div class="input-wrap">
                  <input
                    v-model="form.userName"
                    id="name"
                    type="text"
                    minlength="4"
                    autocomplete="off"
                    required
                    placeholder="请输入账号"
                    class="input-field" />
                </div>
                <!-- 包含密码输入字段的容器 -->
                <div class="input-wrap">
                  <input
                    v-model="form.password"
                    id="password"
                    type="password"
                    autocomplete="off"
                    required
                    placeholder="请输入密码"
                    class="input-field" />
                </div>
                <!-- 登录表单的提交按钮 -->

                <el-button type="primary" @click="onSubmit" class="sign-btn">
                  登陆
                </el-button>
              </div>
            </form>
            <!-- 注册表单 -->
            <form v-else autocomplete="off" class="sign-in-form">
              <!-- 包含网站logo的容器 -->
              <div class="logo"></div>
              <!-- 包含标题和切换登录表单的链接的容器 -->
              <div class="heading">
                <h2>注册</h2>
                <h6>Already have an account?</h6>
                <span @click="isLogin = true">Sign In</span>
              </div>
              <!-- 包含输入字段和提交按钮的容器 -->
              <div class="actual-form">
                <!-- 包含用户名输入字段的容器 -->
                <div class="input-wrap">
                  <input
                    v-model="form.userName"
                    id="sign-name"
                    type="text"
                    minlength="4"
                    autocomplete="off"
                    required
                    placeholder="请输入账号"
                    class="input-field" />
                </div>
                <!-- 包含电子邮件输入字段的容器 -->
                <div class="input-wrap">
                  <input
                    v-model="form.nickName"
                    id="sign-email"
                    type="text"
                    autocomplete="off"
                    required
                    placeholder="请输入名称"
                    class="input-field" />
                </div>
                <!-- 包含密码输入字段的容器 -->
                <div class="input-wrap">
                  <input
                    v-model="form.password"
                    id="sign-password"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    required
                    class="input-field" />
                </div>
                <!-- 注册表单的提交按钮 -->
                <el-button type="primary" @click="onRegister" class="sign-btn">
                  注册
                </el-button>
              </div>
            </form>
          </div>
          <!-- 包含轮播图的容器 -->
          <div class="carousel">
            <!-- 包含轮播图图片的容器 -->
            <div class="images-wrapper">
              <el-carousel :interval="8000">
                <el-carousel-item v-for="item in imgUrl" :key="item">
                  <img :src="item" class="w-full h-full" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>

            <div class="text-12px flex justify-center items-center text-black">
              敬请期待。。。
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { user, UserInfo } from '@/pinia/modules/user'
import { routeStore } from '@/pinia/modules/route'

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.15:2222'
    : 'http://chenxiancheng.top'

const router = useRouter()
const route = useRoute()
const form = reactive({
  userName: '',
  password: '',
  nickName: '',
})

const storeUser = user()

const routeStores = routeStore()

const isLogin = ref(true)

const imgUrl = ref([
  'https://wimg.588ku.com/gif620/23/09/09/3e14475b5952c392a624a7d55b4ffdf9.gif',
  'https://wallpaper-static.cheetahfun.com/wallpaper/sites/scifi/pic5.jpg',
  'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/live/8bc682fba0a8747155409b3bbc2676ac.mp4.jpg',
])

const onSubmit = async () => {
  try {
    const { data, code, msg } = await callApi.post('/sysUser/login', form)

    if (code == 200) {
      localStorage.setItem('token', data.token)
      ElMessage({
        type: 'success',
        message: '登入成功',
      })
      if (route.query.isBlogs) {
        setUserInfo(data)

        return nextTick(() => {
          window.location.replace(url + route.query.path)
        })
        // setTimeout(() => {
        //   const Blogs = window.open(url, '_blank')
        //   setTimeout(() => {
        //     console.log('已发送消息')
        //     const { avatar, deptId, nickName, userName, token, userId } = data
        //     Blogs!.postMessage(
        //       { avatar, deptId, nickName, userName, token, userId },
        //       url,
        //     )
        //   }, 1000)
        // }, 500)
      }

      setUserInfo(data)

      routeStores.SET_THREE_ROUTER(await initMenu(data.deptId))
      routeStores.INIT_ROUER()
      setTimeout(() => {
        router.push('./system/home')
      }, 2000)
    }
  } catch (error) {
    console.log(error)
  }
}

const setUserInfo = (data: UserInfo) => {
  const {
    userId,
    token,
    nickName,
    userName,
    userType,
    remark,
    sex,
    status,
    delFlag,
    deptId,
    email,
    loginDate,
    avatar,
    roles,
  } = data
  const infoData = {
    userId,
    token,
    nickName,
    userName,
    userType,
    remark,
    sex,
    status,
    delFlag,
    deptId,
    email,
    loginDate,
    avatar,
    roles,
  }

  storeUser.SET_USER(infoData)
}

const onRegister = async () => {
  try {
    const { data, code, msg } = await callApi.post('/sysUser/created/user', {
      ...form,
      deptId: '102',
    })

    if (code == 200) {
      ElMessage.success('注册成功')
      isLogin.value = true
    }
  } catch (error) {
    console.log(error)
  }
}

const initMenu = async (deptId: string) => {
  try {
    const { data } = await callApi.post('/role/routes', {
      deptId,
    })
    return data || []
  } catch (error) {
    console.log(error)
    return []
  }
}
</script>

<style lang="scss" scoped>
/* 设置页面背景颜色、字体颜色和背景图片 */
.login {
  color: #fff;
  /* 设置字体颜色为白色 */
  background-image: url(https://wimg.588ku.com/gif620/21/08/30/5f4e5940760de28b2491bf9daece1162.gif);
  /* 设置背景图片 */
  background-repeat: no-repeat;
  /* 设置背景图片不重复 */
  background-size: cover;
  /* 设置背景图片覆盖整个页面 */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  /* 设置字体 */
}

/* 设置主要区域的样式 */
main {
  width: 100%;
  /* 设置主要区域的宽度为100% */
  overflow: hidden;
  /* 隐藏主要区域的溢出内容 */
  min-height: 100vh;
  /* 设置主要区域的最小高度为视口高度 */
  padding: 2rem;
  /* 设置主要区域的内边距为2rem */
  display: flex;
  /* 将主要区域的子元素设置为flex布局 */
  align-items: center;
  /* 在主轴上居中对齐子元素 */
  justify-content: center;
  /* 在交叉轴上居中对齐子元素 */
}

/* 设置.box的样式 */
.box {
  width: 100%;
  /* 设置.box的宽度为100% */
  max-width: 1020px;
  /* 设置.box的最大宽度为1020px */
  height: 640px;
  /* 设置.box的高度为640px */

  background: url(https://wimg.588ku.com/gif620/21/10/14/c5be4e7cfd2f411aa6387bb16876c324.gif);
  /* 设置.box的背景图片 */
  background-repeat: no-repeat;
  /* 设置.box的背景图片不重复 */
  // background-size: cover;
  background-size: cover;
  /* 设置.box的背景图片覆盖整个区域 */
  position: relative;
  /* 设置.box的定位为相对定位 */
  border-radius: 3.3rem;
  /* 设置.box的圆角半径为3.3rem */
  box-shadow: 0 0 20px #b7b2a9;
  /* 设置.box的阴影效果 */
}

/* 设置.inner-box的样式 */
.inner-box {
  position: absolute;
  /* 设置.inner-box的定位为绝对定位 */
  width: calc(100% - 4.1rem);
  /* 设置.inner-box的宽度为100%减去4.1rem */
  height: calc(100% - 4.1rem);
  /* 设置.inner-box的高度为100%减去4.1rem */
  top: 50%;
  /* 设置.inner-box的顶部距离为50% */
  left: 50%;
  /* 设置.inner-box的左侧距离为50% */
  transform: translate(-50%, -50%);
  /* 设置.inner-box的位置为居中 */
}

/* 设置.forms-wrap的样式 */
.forms-wrap {
  position: absolute;
  /* 设置.forms-wrap的定位为绝对定位 */
  height: 100%;
  /* 设置.forms-wrap的高度为100% */
  width: 45%;
  /* 设置.forms-wrap的宽度为45% */
  left: 0;
  /* 设置.forms-wrap的左侧距离为0 */
  top: 0;
  /* 设置.forms-wrap的顶部距离为0 */
  display: grid;
  /* 将.forms-wrap的子元素设置为grid布局 */
  grid-template-columns: 1fr;
  /* 设置.forms-wrap的列数为1 */
  grid-template-rows: 1fr;
  /* 设置.forms-wrap的行数为1 */
  transition: 0.8s ease-in-out;
  /* 设置.forms-wrap的过渡效果 */
}

/* 设置form的样式 */
form {
  max-width: 260px;
  /* 设置form的最大宽度为260px */
  width: 100%;
  /* 设置form的宽度为100% */
  margin: 0 auto;
  /* 设置form的水平居中 */
  height: 100%;
  /* 设置form的高度为100% */
  display: flex;
  /* 将form的子元素设置为flex布局 */
  flex-direction: column;
  /* 设置form的子元素在垂直方向上排列 */
  justify-content: space-evenly;
  /* 在form的子元素之间均匀分布空间 */
  grid-column: 1/2;
  /* 设置form的列为1到2 */
  grid-row: 1/2;
  /* 设置form的行为1到2 */
  transition: opacity 0.02s 0.4s;
  /* 设置form的过渡效果 */
}

/* 设置.logo的样式 */
.logo {
  display: flex;
  /* 将.logo的子元素设置为flex布局 */
  align-items: center;
  /* 在.logo的子元素之间垂直居中 */
}

/* 设置.logo img的样式 */
.logo img {
  height: 27px;
  /* 设置.logo img的高度为27px */
  margin-right: 0.3rem;
  /* 设置.logo img的右侧外边距为0.3rem */
}

/* 设置.logo h4的样式 */
.logo h4 {
  font-size: 1.1rem;
  /* 设置.logo h4的字体大小为1.1rem */
  letter-spacing: 0.5px;
  /* 设置.logo h4的字母间距为0.5px */
  color: floralwhite;
  /* 设置.logo h4的字体颜色为#151111 */
}

/* 选择所有具有.heading类的元素下的h2元素 */
.heading h2 {
  /* 设置字体大小为2.1rem */
  font-size: 2.1rem;
  /* 设置字体粗细为600 */
  font-weight: 600;
  /* 设置字体颜色为#151111 */
  color: aqua;
}

/* 选择所有具有.heading类的元素下的h6元素 */
.heading h6 {
  /* 设置字体大小为0.75rem */
  font-size: 0.75rem;
  /* 设置字体粗细为400 */
  font-weight: 400;
  /* 将元素显示为行内元素 */
  display: inline;
  /* 设置字体颜色为#bababa */
  color: aqua;
}

/* 选择所有具有.toggle类的元素 */
.toggle {
  /* 设置字体颜色为#bbb */
  color: white;
  /* 设置文本阴影 */
  text-shadow: 0 0 20px #bababa;
  /* 去除文本装饰 */
  text-decoration: none;
  /* 设置字体大小为0.75rem */
  font-size: 0.75rem;
  /* 设置字体粗细为500 */
  font-weight: 500;
  /* 设置过渡效果为0.3秒 */
  transition: 0.3s;
}

/* 当鼠标悬停在.toggle元素上时 */
.toggle:hover {
  /* 设置字体颜色为#8371f6 */
  color: #8371f6;
}

/* 选择所有具有.input-wrap类的元素 */
.input-wrap {
  /* 设置相对定位 */
  position: relative;
  /* 设置高度为37像素 */
  height: 37px;
  /* 设置下边距为2rem */
  margin-bottom: 2rem;
}

/* 选择所有具有.input-field类的元素 */
.input-field {
  /* 设置绝对定位 */
  position: absolute;
  /* 设置宽度为100% */
  width: 100%;
  /* 设置高度为100% */
  height: 100%;
  /* 设置背景为透明 */
  background: none;
  /* 去除边框 */
  border: none;
  /* 去除外边框 */
  outline: none;
  /* 设置底部边框为1像素的实线，颜色为#bbb */
  border-bottom: 1px solid #bbb;
  /* 去除内边距 */
  padding: 0;
  /* 设置字体大小为0.95rem */
  font-size: 0.95rem;
  /* 设置字体颜色为#151111 */
  color: pink;
  /* 设置过渡效果为0.4秒 */
  transition: 0.4s;
}

/* 当输入框处于活动状态时 */
.input-field:active {
  /* 设置底部边框颜色为#151111 */
  border-bottom-color: #151111;
}

/* 当输入框处于活动状态时，其后面的label元素 */
.input-field.active + label {
  /* 设置字体大小为0.75rem */
  font-size: 0.75rem;
  /* 将元素向上移动2像素 */
  top: -2px;
}

/* 选择所有具有.sign-btn类的元素 */
.sign-btn {
  /* 设置为内联块元素 */
  display: inline-block;
  /* 设置宽度为100% */
  width: 100%;
  /* 设置高度为43像素 */
  height: 43px;
  /* 设置背景颜色为#151111 */
  background: #b7b2a9;
  /* 设置字体颜色为白色 */
  color: #fff;
  /* 去除边框 */
  border: none;
  /* 设置光标为手型 */
  cursor: pointer;
  /* 设置圆角为0.8rem */
  border-radius: 0.8rem;
  /* 设置下边距为2rem */
  margin-bottom: 2rem;
  /* 设置过渡效果为0.3秒 */
  transition: 0.3s;
}

/* 当鼠标悬停在.sign-btn元素上时 */
.sign-btn:hover {
  /* 设置背景颜色为#8371f6 */
  background-color: #8371f6;
}

/* 选择所有具有.text类的元素 */
.text {
  /* 设置为弹性盒子 */
  display: flex;
  /* 设置字体颜色为白色 */
  color: white;
  /* 设置文本阴影 */
  text-shadow: 0 0 20px #b7b2a9;
  /* 设置字体大小为0.7rem */
  font-size: 0.7rem;
}

/* 选择所有.text元素内的a元素 */
.text a {
  /* 设置字体颜色为#bbb */
  color: #bbb;
  /* 设置过渡效果为0.3秒 */
  transition: 0.3s;
}

/* 当鼠标悬停在.text元素内的a元素上时 */
.text a:hover {
  /* 设置字体颜色为#8371f6 */
  color: #8371f6;
}

/* 当处于注册模式下的登录表单 */
main.sign-up-mode form.sign-in-form {
  /* 设置透明度为0 */
  opacity: 0;
  /* 禁用指针事件 */
  pointer-events: none;
}

/* 当处于注册模式下的注册表单 */
main.sign-up-mode form.sign-up-form {
  /* 设置透明度为1 */
  opacity: 1;
  /* 启用指针事件 */
  pointer-events: all;
}

/* 当处于注册模式下的表单容器 */
main.sign-up-mode .forms-wrap {
  /* 设置左侧位置为55% */
  left: 55%;
}

/* 当处于注册模式下的轮播容器 */
main.sign-up-mode .carousel {
  /* 设置左侧位置为0% */
  left: 0%;
}

/* 选择所有.carousel元素 */
.carousel {
  /* 设置圆角为2rem */
  border-radius: 2rem;
  /* 设置内边距为2rem */
  padding: 2rem;
  /* 设置为绝对定位 */
  position: absolute;
  /* 设置溢出隐藏 */
  overflow: hidden;
  /* 设置高度为100% */
  height: 100%;
  /* 设置宽度为55% */
  width: 55%;
  /* 设置左侧位置为45% */
  left: 45%;
  /* 设置顶部位置为0 */
  top: 0;
  /* 设置阴影效果 */
  box-shadow: 0 0 5px #b7b2a9;
  /* 设置背景颜色为透明 */
  background-color: transparent;
  /* 设置为网格布局 */
  display: grid;
  /* 设置过渡效果为0.8秒 */
  transition: 0.8s ease-in-out;
  /* 设置为相对定位 */
  position: relative;
  /* 设置网格行模板 */
  grid-template-rows: auto 1fr;
}

/* 选择所有.images-wrapper元素 */
.images-wrapper {
  /* 设置为网格布局 */
  display: grid;
  /* 设置网格列模板 */
  grid-template-columns: 2fr;
  /* 设置网格行模板 */
  grid-template-rows: 1fr;
}

/* 选择所有.text-slider元素 */
.text-slider {
  /* 设置为flex布局 */
  display: flex;
  /* 垂直居中 */
  align-items: center;
  /* 水平居中 */
  justify-content: center;
  /* 设置主轴方向为垂直 */
  flex-direction: column;
}

/* 选择所有.text-wrap元素 */
.text-wrap {
  /* 设置最大高度为2.2rem */
  max-height: 2.2rem;
  /* 超出部分隐藏 */
  overflow: hidden;
  /* 底部外边距为2.5rem */
  margin-bottom: 2.5rem;
}

/* 选择所有.text-group元素 */
.text-group {
  /* 设置为flex布局 */
  display: flex;
  /* 设置主轴方向为垂直 */
  flex-direction: column;
  /* 文本居中 */
  text-align: center;
  /* 初始位置为不偏移 */
  transform: translateY(0);
  /* 过渡效果为0.5秒 */
  transition: 0.5s;
}

/* 选择所有.text-group元素下的h2元素 */
.text-group h2 {
  /* 设置行高为2.2rem */
  line-height: 2.2rem;
  /* 设置字体粗细为600 */
  font-weight: 600;
  /* 设置字体大小为1.6rem */
  font-size: 1.6rem;
}

/* 选择所有.bullets元素 */
.bullets {
  /* 顶部外边距为20px */
  margin-top: 20px;
  /* 设置为flex布局 */
  display: flex;
  /* 垂直居中 */
  align-items: center;
  /* 水平居中 */
  justify-content: center;
}

/* 选择所有.bullets元素下的span元素 */
.bullets span {
  /* 设置为块级元素 */
  display: block;
  /* 宽度为0.5rem */
  width: 0.5rem;
  /* 高度为0.5rem */
  height: 0.5rem;
  /* 圆角为0.2rem */
  border-radius: 0.2rem;
  /* 背景颜色为白色 */
  background-color: white;
  /* 设置阴影 */
  box-shadow: 20px #b7b2a9;
  /* 左右外边距为0.25rem */
  margin: 0 0.25rem;
  /* 鼠标指针为手型 */
  cursor: pointer;
  /* 过渡效果为0.3秒 */
  transition: 0.3s;
}

/* 选择所有.bullets元素下的.active元素 */
.bullets span.active {
  /* 宽度为1.1rem */
  width: 1.1rem;
  /* 背景颜色为aqua */
  background-color: aqua;
  /* 圆角为1rem */
  border-radius: 1rem;
}

/* 当屏幕宽度小于等于850px时生效 */
@media (max-width: 850px) {
  /* 选择所有.box元素 */
  .box {
    /* 高度自适应 */
    height: auto;
    /* 最大宽度为550px */
    max-width: 550px;
    /* 溢出隐藏 */
    overflow: hidden;
  }

  /* 选择所有.inner-box元素 */
  .inner-box {
    /* 位置为默认值 */
    position: static;
    /* 变换为默认值 */
    transform: none;
    /* 宽度为默认值 */
    width: revert;
    /* 高度为默认值 */
    height: revert;
    /* 上下左右内边距为2rem */
    padding: 2rem;
  }

  /* 选择所有.forms-wrap元素 */
  .forms-wrap {
    /* 位置为默认值 */
    position: revert;
    /* 宽度为100% */
    width: 100%;
    /* 高度为100% */
    height: 100%;
  }

  /* 选择所有.form元素 */
  .form {
    /* 最大宽度为默认值 */
    max-width: revert;
    /* 上内边距为1.5rem，左右内边距为2.5rem，下内边距为2rem */
    padding: 1.5rem 2.5rem 2rem;
    /* 过渡效果为0.8秒，缓动函数为ease-in-out，透明度过渡效果为线性 */
    transition: transform 0.8s ease-in-out, opacity 0.4s linear;
  }

  /* 选择所有.heading元素 */
  .heading {
    /* 上下外边距为2rem，左右外边距为0 */
    margin: 2rem 0;
  }

  /* 选择所有.sign-up-form元素 */
  form.sign-up-form {
    /* 向右偏移100% */
    transform: translateX(100%);
  }

  /* 选择所有.sign-up-mode元素下的.sign-in-form元素 */
  main.sign-up-mode form.sign-in-form {
    /* 向左偏移100% */
    transform: translateX(-100%);
  }

  /* 选择所有.sign-up-mode元素下的.sign-up-form元素 */
  main.sign-up-mode form.sign-up-form {
    /* 不偏移 */
    transform: translateX(0%);
  }

  /* 选择所有.carousel元素 */
  .carousel {
    /* 位置为默认值 */
    position: revert;
    /* 高度自适应 */
    height: auto;
    /* 宽度为100% */
    width: 100%;
    /* 上下内边距为3rem，左右内边距为2rem */
    padding: 3rem 2rem;
    /* 设置为flex布局 */
    display: flex;
  }

  /* 选择所有.images-wrapper元素 */
  .images-wrapper {
    /* 隐藏 */
    display: none;
  }

  /* 选择所有.text-slider元素 */
  .text-slider {
    /* 宽度为100% */
    width: 100%;
  }
}

/* 当屏幕宽度小于等于530px时生效 */
@media (max-width: 530px) {
  /* 选择所有main元素 */
  main {
    /* 上下左右内边距为1rem */
    padding: 1rem;
  }

  /* 选择所有.box元素 */
  .box {
    /* 边框半径为2rem */
    border-radius: 2rem;
  }

  /* 选择所有.inner-box元素 */
  .inner-box {
    /* 上下左右内边距为1rem */
    padding: 1rem;
  }

  /* 选择所有.carousel元素 */
  .carousel {
    /* 上下内边距为1.5rem，左右内边距为1rem */
    padding: 1rem 1rem;
    /* 边框半径为1.6rem */
    border-radius: 1.6rem;
  }

  /* 选择所有.text-wrap元素 */
  .text-wrap {
    /* 下外边距为1rem */
    margin-bottom: 1rem;
  }

  /* 选择所有.text-group元素下的h2元素 */
  .text-group h2 {
    /* 字体大小为1.2rem */
    font-size: 1.2rem;
  }

  /* 选择所有form元素 */
  form {
    /* 上内边距为1rem，左右内边距为2rem，下内边距为1.5rem */
    padding: 1rem 2rem 1.5rem;
  }
}
</style>
