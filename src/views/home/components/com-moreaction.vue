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
    >
      <!--
        van-cell单元格组件
        icon:图标
        title：标题内容
        is-link : 右侧箭头图标
        @click ：单击事件
      -->
      <van-cell-group v-if="isOneLevel">
        <van-cell icon="location-o" title="不感兴趣" @click="articleDislike()" />
        <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isOneLevel=false" />
        <van-cell icon="location-o" title="拉黑作者" />
      </van-cell-group>
      <!--
        van-cell单元格组件
          icon="arrow-left"  左侧箭头图标
          @click ：单击事件
      -->
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel=true" />
        <van-cell title="其他问题" icon="location-o" />
        <van-cell title="标题夸张" icon="location-o" />
        <van-cell title="低俗色情" icon="location-o" />
        <van-cell title="错别字多" icon="location-o" />
        <van-cell title="旧闻重复" icon="location-o" />
        <van-cell title="广告软文" icon="location-o" />
        <van-cell title="内容不实" icon="location-o" />
        <van-cell title="涉嫌违法犯罪" icon="location-o" />
        <van-cell title="侵权" icon="location-o" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入api模块函数
import { apiArticleDislike } from '@/api/article';
export default {
  name: 'com-moreaction',
  data () {
    return {
      isOneLevel: true // 判断展示一级 或 二级 反垃圾内容 true:一级  false:二级
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 接收不喜欢文章id
    articleID: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * 对不感兴趣文章做处理
     */
    async articleDislike () {
      const result = await apiArticleDislike(this.articleID)
      console.log(result)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
