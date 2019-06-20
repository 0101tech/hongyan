<template>
<div class="discover">
  <van-tabs v-model="activeTab" swipeable class="tabs">
    <van-tab v-for="(tab,index) in tabs" :title="tab.name" :key="index">
      <tab-content :id="tab.id" />
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import TabContent from './TabContent';

export default {
  data() {
    return {
      activeTab: 0,
      tabs: [{
          id: 1,
          name: "全部"
        },
        {
          id: 2,
          name: "全部"
        },
        {
          id: 3,
          name: "全部"
        },
        {
          id: 4,
          name: "全部"
        },
        {
          id: 5,
          name: "全部"
        },
        {
          id: 6,
          name: "全部"
        },
        {
          id: 7,
          name: "全部"
        },
      ]
    }
  },
  components: {
    TabContent
  }
}
</script>

<style lang="less" scoped>
.discover {
    height: 100vh;
}
</style>
