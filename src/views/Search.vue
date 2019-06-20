<template>
  <div class="search">
    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <van-skeleton title :row="3" :loading="loading">
      <div>实际内容</div>
    </van-skeleton>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
