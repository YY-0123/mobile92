<template>
  <div class="user-login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单部分
      vant里边没有form相关组件，只有普通表单域组件
      van-cell-group是对普通表单域组件做封装
    -->
    <van-cell-group>
      <!--van-field 输入框表单域组件
        label="手机号" 表单域前边的名字设置
        required：不进行校验，设置表单域前边有"红星"
        clearable：表单域内容可以通过“叉号”清除
      -->
      <ValidationProvider>
        <van-field
          v-model="loginForm.mobile"
          type="text"
          placeholder="请输入手机号码"
          label="手机号"
          required
          clearable
        />
      </ValidationProvider>
      <ValidationProvider>
        <van-field
          v-model="loginForm.code"
          type="password"
          placeholder="请输入验证码"
          label="验证码"
          required
          clearable
        >
          <!-- 命名插槽应用，提示相关按钮，是要给van-field组件内部的slot去填充的
        size="small" 设置按钮大小的
        type="primary" 设置按钮背景颜色
          -->
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </ValidationProvider>
    </van-cell-group>
    <div class="login-btn">
      <!--van-button
        type:按钮背景颜色
        size:按钮大小的
        round：圆圈效果
        block：块级样式设置，占据一行
      -->
      <van-button type="info" size="small" round block @click="login()">登录</van-button>
    </div>
  </div>
</template>
<script>
// 验证相关模块导入
import { ValidationProvider } from "vee-validate";
import { apiUserLogin } from "@/api/user.js";
export default {
  name: "user-login",
  components: {
    // 注册
    ValidationProvider
  },
  data() {
    return {
      loginForm: {
        mobile: "",
        code: ""
      }
    };
  },
  methods: {
    // 登录系统
    async login() {
      // 调用api，校验账号信息有效，如下api请求有可能【成功】，还有可能【失败】
      try {
        const result = await apiUserLogin(this.loginForm);
        // console.log(result) // {token:xx,refresh_token:xx}
        // 通过vuex维护服务器端返回的token等秘钥信息
        this.$store.commit("updateUser", result);
        this.$toast.success("登录成功");
        // 页面跳转
        this.$router.push("/");
      } catch (err) {
        // 错误信息提示 vant组件库方法
        this.$toast.fail("手机号或验证码错误" + err);
        // this.$toast.success('手机号或验证码错误' + err) // 成功提示
      }
    }
  }
};
</script>
 <style lang="less" scoped>
.login-btn {
  margin: 40px;
}
</style>
