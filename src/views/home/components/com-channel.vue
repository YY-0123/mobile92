<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    closeable
    round
    position="bottom"
    :style="{ height: '20%' }"
    close-icon-position="top-left"
  >
    <!--
    弹出层组件van-popup
    v-model="布尔变量"  设置弹出层是否显示
    现在 通过 :value 和 @input 把v-model给体现出来的，因为具体的控制开关
    @input="$emit('input',$event)" 当前popup允许这样操作，直接传递$event就可以了
    @input="$emit('input')" 当前popup允许这样操作，直接传递$event就可以了
    我们自己设计底层代码，那么 要这样设置 @input="$emit('input',$event.target.value)"

    是要放到父组件的v-model里边的
    现在这个弹出层是否显示的控制模式 与 之前的弹出框的操作完全一致

    closeable 有关闭图标
    round  圆角
    position="bottom" 弹出层是从底部弹出
    :style="{ height: '20%' }"  弹出层高度
    close-icon-position="top-left" 关闭按钮要在左上脚显示
    -->
  </van-popup>
</template>

<script>
export default {
  name: 'com-channel',
  props: {
    // 接收父组件v-model的数据信息
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
