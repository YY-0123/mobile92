<template>
  <div>
    <!--
        弹出框组件
        v-model="show"  // 控制是否显示对话框 true展示  false隐藏
        :show-confirm-button="false"  // 不显示 “确定” 按钮
        close-on-click-overlay // 点击旁处  关闭对话框

        @input:当前组件的value值发生变化，要传递给
        父组件的v-model里边去的,使得弹出框可以不断完成关闭、显示动作

        注意：
          $emit('input',$event)就这样配置，van-dialog内部已经把$event.target.value都集成好了

          如果当前标签是普通的input框标签，那么$emit('input',$event.target.value)两个参数就都需要设置全乎

    -->
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-confirm-button="false"
      close-on-click-overlay
    >更多内容</van-dialog>
  </div>
</template>

<script>
export default {
  name: 'com-moreaction',
  data () {
    return {
      show: true
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
