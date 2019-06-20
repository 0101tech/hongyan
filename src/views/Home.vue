<template>
  <div class="home">
    <template v-if="activeTabbar == 'discover'">
      <discover />
    </template>
    <template v-if="activeTabbar == 'search'">
      <search />
    </template>
    <template v-if="activeTabbar == 'play'">
      <play />
    </template>
    <template v-if="activeTabbar == 'user'">
      <personal />
    </template>

    <van-tabbar v-model="activeTabbar">
      <van-tabbar-item name="discover" icon="home-o">发现</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="play" icon="smile-o">好玩</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" info="666"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import Discover from "@/views/Discover.vue";
import Search from "@/views/Search.vue";
import Play from "@/views/Play.vue";
import Personal from "@/views/Personal.vue";

export default {
  name: "home",
  data() {
    return {
      activeTabbar: "discover"
    };
  },
  components: {
    Discover,
    Search,
    Play,
    Personal
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.home {
}
</style>
