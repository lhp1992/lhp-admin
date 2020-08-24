<template>
  <div class="login-bg">
    <div class="login-main">
      <div class="login-box">
        <div class="login-flex-box">
          <div class="login-tab">
            <div class="login-tab-pane">
              <a :class="{ active: loginType === 'user' }" @click="loginType = 'user'">账户密码登录</a>
            </div>
            <hr />
            <div class="login-tab-pane">
              <a :class="{ active: loginType === 'kpi' }" @click="loginType = 'kpi'">账户证书登录</a>
            </div>
          </div>
          <div class="login-content">
            <login-user-bar class="login-form" v-if="loginType === 'user'" />
            <login-kpi-bar class="login-form" v-if="loginType === 'kpi'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginKpiBar from "./components/LoginKpiBar";
import LoginUserBar from "./components/LoginUserBar";

export default {
  components: {
    "login-kpi-bar": LoginKpiBar,
    "login-user-bar": LoginUserBar
  },
  data() {
    return {
      loginType: "user"
    };
  },
  methods: {
    toHome(params) {
      window.location.href = "../";
    }
  }
};
</script>

<style lang="scss" scoped>
.login-bg {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 410px;
  height: 470px;
  background-color: #fff;
  box-shadow: -19px 19px 20px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  z-index: 1;
}
.login-flex-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.login-content {
  flex: 1;
}
.login-tab {
  margin-top: 50px;
  font-size: 18px;
  color: $textColorDark;
  display: flex;
  align-items: center;
  & hr {
    height: 30px;
    width: 1px;
    border: none;
    background-color: $borderSolidColor;
  }
}
.login-tab-pane {
  flex: 1;
  text-align: center;
  cursor: pointer;
  position: relative;
  & a.active {
    color: $blue;
    &:after {
      width: 30px;
      height: 2px;
      content: "";
      background-color: $blue;
      position: absolute;
      left: 50%;
      margin-left: -15px;
      bottom: -10px;
    }
  }
}
</style>

<style lang="scss">
.login-form {
  height: 100%;
  padding: 70px 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & .el-input,
  & .el-button {
    width: 100%;
  }
  & .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;
  }
}
</style>