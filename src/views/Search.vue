<template>
  <div class="search">
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      @search="onSearch"
      @clear="keyword = ''"
    />

    <tab-content v-if="keyword" :keyword="keyword" />
    <div
      v-if="!keyword && searchHistory.length > 0"
      class="history van-hairline--bottom"
    >
      <div class="title">
        <span>搜索历史</span><van-icon name="delete" @click="clearHistory" />
      </div>
      <van-tag
        plain
        v-for="(item, index) in searchHistory"
        class="item"
        :key="index"
        @click="selectTag(item)"
        >{{ item }}</van-tag
      >
    </div>
    <div class="hot">
      <div class="title">
        热搜榜
      </div>
      <van-tag
        plain
        v-for="(item, index) in hots"
        class="item"
        :key="index"
        @click="selectTag(item)"
        >{{ item }}</van-tag
      >
    </div>
  </div>
</template>

<script>
import TabContent from "./TabContent";

export default {
  data() {
    return {
      value: "",
      keyword: null,
      searchHistory: [],
      hots: []
    };
  },
  components: {
    TabContent
  },
  methods: {
    onSearch() {
      if (this.value) {
        this.keyword = null;
        setTimeout(() => {
          this.keyword = this.value;
          this.addHistory();
        }, 500);
      }
    },
    addHistory() {
      if (this.searchHistory.indexOf(this.keyword) < 0) {
        this.searchHistory.push(this.keyword);
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(this.searchHistory)
        );
      }
    },
    queryHistory() {
      const searchHistory = localStorage.getItem("searchHistory") || "[]";
      this.searchHistory = JSON.parse(searchHistory);
    },
    queryHotHistory() {
      this.$get("/api/poetry/history").then(response => {
        this.hots = response.result || [];
      });
    },
    clearHistory() {
      localStorage.removeItem("searchHistory");
      this.searchHistory = [];
    },
    selectTag(value) {
      this.value = value;
      this.onSearch();
    }
  },
  mounted() {
    this.queryHistory();
    this.queryHotHistory();
  }
};
</script>

<style lang="less" scoped>
.search {
  height: 100vh;

  .history,
  .hot {
    padding: 16px;

    .item {
      margin: 6px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
