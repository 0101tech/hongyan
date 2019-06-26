<template>
  <div class="search">
    <van-search placeholder="请输入搜索关键词" v-model="value" @search="onSearch" />
    <tab-content v-if="keyword" :keyword="keyword" />
  </div>
</template>

<script>
import TabContent from "./TabContent";

export default {
  data() {
    return {
      value: "",
      keyword: null
    }
  },
  components: {
    TabContent
  },
  methods: {
    onSearch() {
      this.keyword = null;
      setTimeout(() => {
        this.keyword = this.value;
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  height: 100vh;
}
</style>
