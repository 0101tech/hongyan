<template>
<div class="home">
  <template v-if="activeTabbar == 'home'">
    <discover />
  </template>
  <template v-if="activeTabbar == 'question'">
    <question />
  </template>
  <template v-if="activeTabbar == 'edit'">
    <moment />
  </template>
  <template v-if="activeTabbar == 'user'">
    <personal />
  </template>

  <van-tabbar v-model="activeTabbar">
    <van-tabbar-item name="home" icon="home-o">发现</van-tabbar-item>
    <van-tabbar-item name="question" icon="question-o">问答</van-tabbar-item>
    <van-tabbar-item name="edit" icon="edit">说说</van-tabbar-item>
    <van-tabbar-item name="user" icon="user-o" info="666">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import Discover from "@/views/Discover.vue";
import Question from "@/views/Question.vue";
import Moment from "@/views/Moment.vue";
import Personal from "@/views/Personal.vue";

export default {
  name: 'home',
  data() {
    return {
      activeTabbar: 'home',
    }
  },
  components: {
    Discover,
    Question,
    Moment,
    Personal,
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.home {}
</style>
