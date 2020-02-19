<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!--
      van-search搜索的组件标签
        v-model：获得、设置 表单域搜索的关键内容
        形式上：输入框+放大镜图标
    -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" />
    <!--
      van-cell搜索的组件标签
        title：单元格标题内容
        icon：单元格项目前边的图标
    -->
    <van-cell-group>
      <van-cell :title="item" icon="search" v-for="(item,k) in suggestionList" :key="k" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入api函数
import { apiSuggestionList } from '@/api/search';
export default {
  name: 'search-index',
  data () {
    return {
      suggestionList: [], // 联想建议数据
      searchText: '' // 搜索关键字
    }
  },
  watch: {
    // 对关键字做监听，有变化就要获取联想数据
    searchText: function (newV) {
      // 关键字如果为空，就停止联想获取
      if (!newV) {
        this.suggestionList = [] // 清除联想数据
        return false
      }

      // 针对this.timer做清除操作，防止定时器累加
      // 另外一个好处，用户频繁输入，中间的间隔时间没有超过1s，那么请求动作是没有的
      clearTimeout(this.timer)

      // 设置防抖，防止频繁发送请求
      // timer是组件data成员，就是临时的，不用在data中事先声明
      this.timer = setTimeout(async () => {
        const result = await apiSuggestionList({ q: newV })
        // data接收联想建议数据
        this.suggestionList = result.options
      }, 1000)
    }
  }
}
</script>

<style scoped lang='less'></style>
