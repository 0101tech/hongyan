<template>
  <div class="tab-content">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="我是有底线的"
        @load="onLoad"
      >
        <div
          v-for="item in poetryList"
          :key="item.id"
          class="item van-hairline--bottom"
          @click="toDetail(item.id)"
        >
          <div class="author-info">
            <div class="avatar">
              <van-image src="https://img.yzcdn.cn/vant/cat.jpeg">
                <template v-slot:error
                  >加载失败</template
                >
              </van-image>
            </div>
            <div class="author">
              {{ item.authorName }}
            </div>
            <div class="dynasty">
              {{ item.dynasty }}
            </div>
          </div>
          <div class="title-content">
            <div class="title van-ellipsis">{{ item.title }}</div>
            <div class="content">{{ item.content }}</div>
          </div>
          <div class="tips">
            <span class="tips-item">
              <van-icon name="like-o" />
              <span class="count">
                {{ item.likeCount | formatCount }}
              </span></span
            >
            <span class="tips-item">
              <van-icon name="chat-o" />
              <span class="count">
                {{ item.commentCount | formatCount }}
              </span>
            </span>
            <span class="tips-item">
              <van-icon name="star-o" />
              <span class="count">
                {{ item.favoriteCount | formatCount }}
              </span>
            </span>
            <span class="tips-item">
              <van-icon name="eye-o" />
              <span class="count">
                {{ item.readCount | formatCount }}
              </span>
            </span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isRefresh: false,
      isLoading: false,
      finished: false,
      pageNum: 0,
      poetryList: []
    };
  },
  methods: {
    async query() {
      this.$get("/api/poetry", {pageNum: this.pageNum, pageSize: 20}).then(response => {
        const result = response.result;
        if (result.list.length > 0) {
          if (this.pageNum == 1) {
            this.poetryList = [];
          }
          this.poetryList = this.poetryList.concat(result.list);
          if (result.pages <= this.pageNum) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        } else {
          this.finished = true;
        }
        this.isRefresh = false;
        this.isLoading = false;
      }).catch(e => {
        console.log(e);
        this.pageNum--;
      });
    },
    onLoad() {
      this.pageNum++;
      this.query();
    },
    onRefresh() {
      this.pageNum = 1;
      this.query();
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.tab-content {
  height: 100%;
  font-size: 14px;
  margin-bottom: 96px;

  .item {
    padding: 12px 12px 0;

    .author-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 24px;
        height: 24px;

        .van-image {
          width: 100%;
          height: 100%;
        }
        /deep/ img {
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .author {
        font-size: 14px;
        color: #333;
        margin-left: 6px;
        flex: 1;
      }
      .dynasty {
        font-size: 12px;
        color: #888;
      }
    }
    .title-content {
      margin-top: 6px;

      .title {
        font-size: 14px;
        color: #333;
        line-height: 28px;
      }
      .content {
        font-size: 12px;
        color: #888;
        line-height: 24px;
        max-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .tips {
      display: flex;
      justify-content: space-around;
      height: 36px;
      align-items: center;

      .tips-item {
        display: flex;
        align-items: center;

        .count {
          color: #888;
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
