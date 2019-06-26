<template>
  <div class="discover">
    <!-- <van-tabs v-model="activeTab" sticky swipeable animated class="tabs">
      <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
        <tab-content :id="tab.id" />
      </van-tab>
    </van-tabs> -->
    <van-nav-bar title="发现" />
    <tab-content />
  </div>
</template>

<script>
import TabContent from "./TabContent";

export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          id: 1,
          name: "推荐"
        },
        {
          id: 2,
          name: "热门"
        }
      ]
    };
  },
  components: {
    TabContent
  }
};
</script>

<style lang="less" scoped>
.discover {
  height: 100vh;
}
</style>
