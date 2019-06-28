<template>
  <van-tabs
    value="0"
    sticky
    animated
    swipeable
    :offset-top="offsetTop"
    class="comments"
  >
    <van-tab>
      <div slot="title">
        评论 <span class="count">{{ commentCount | formatCount }}</span>
      </div>
      <van-list
        v-model="commentIsLoading"
        :error.sync="commentIsError"
        error-text="请求失败，点击重新加载"
        :finished="commentFinished"
        finished-text="我是有底线的"
        @load="onLoadComment"
      >
        <div
          v-for="item in comments"
          class="comment-item van-hairline--bottom"
          :key="item.id"
        >
          <div class="user-info">
            <div class="avatar">
              <van-image :src="item.userName">
                <template v-slot:error>
                  <img src="../assets/images/avatar.png" />
                </template>
              </van-image>
            </div>
            <div class="user-name-time">
              <div class="user-name">
                {{ item.userName }}
              </div>
              <div class="time">
                {{ item.createTime | timestampFormat }}
              </div>
            </div>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </van-list>
    </van-tab>
    <van-tab>
      <div slot="title">
        点赞 <span class="count">{{ praiseCount | formatCount }}</span>
      </div>
      <van-list
        v-model="praiseIsLoading"
        :error.sync="praiseIsError"
        error-text="请求失败，点击重新加载"
        :finished="praiseFinished"
        finished-text="我是有底线的"
        @load="onLoadPraise"
      >
        <div
          v-for="item in praises"
          class="praise-item van-hairline--bottom"
          :key="item.id"
        >
          <div class="avatar">
            <van-image :src="item.userName">
              <template v-slot:error>
                <img src="../assets/images/avatar.png" />
              </template>
            </van-image>
          </div>
          <div class="user-name">
            {{ item.userName }}
          </div>
        </div>
      </van-list>
    </van-tab>
    <van-tab>
      <div slot="title">
        收藏 <span class="count">{{ favoriteCount | formatCount }}</span>
      </div>
      <van-list
        v-model="favoriteIsLoading"
        :error.sync="favoriteIsError"
        error-text="请求失败，点击重新加载"
        :finished="favoriteFinished"
        finished-text="我是有底线的"
        @load="onLoadFavorite"
      >
        <div
          v-for="item in favorites"
          class="favorite-item van-hairline--bottom"
          :key="item.id"
        >
          <div class="avatar">
            <van-image :src="item.userName">
              <template v-slot:error>
                <img src="../assets/images/avatar.png" />
              </template>
            </van-image>
          </div>
          <div class="user-name">
            {{ item.userName }}
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      praises: [],
      comments: [],
      favorites: [],
      offsetTop: 46,
      praiseIsLoading: false,
      praiseIsError: false,
      praiseFinished: false,
      praisePageNum: 0,
      commentIsLoading: false,
      commentIsError: false,
      commentFinished: false,
      commentPageNum: 0,
      favoriteIsLoading: false,
      favoriteIsError: false,
      favoriteFinished: false,
      favoritePageNum: 0
    };
  },
  props: [
    "poetryId",
    "praiseCount",
    "commentCount",
    "favoriteCount",
    "readCount"
  ],
  methods: {
    async queryPraise() {
      const param = { pageNum: this.praisePageNum, pageSize: 20 };
      this.$get("/api/praise/1/" + this.poetryId, param)
        .then(response => {
          const result = response.result;
          if (result.list.length > 0) {
            if (this.praisePageNum == 1) {
              this.poetryList = [];
            }
            this.praises = this.praises.concat(result.list);
            if (result.pages <= this.praisePageNum) {
              this.praiseFinished = true;
            } else {
              this.praiseFinished = false;
            }
          } else {
            this.praiseFinished = true;
          }
          this.praiseIsLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.praiseIsError = true;
          this.praisePageNum--;
        });
    },
    onLoadPraise() {
      this.praisePageNum++;
      this.queryPraise();
    },
    async queryComment() {
      const param = { pageNum: this.commentPageNum, pageSize: 20 };
      this.$get("/api/comment/1/" + this.poetryId, param)
        .then(response => {
          const result = response.result;
          if (result.list.length > 0) {
            if (this.commentPageNum == 1) {
              this.poetryList = [];
            }
            this.comments = this.comments.concat(result.list);
            if (result.pages <= this.commentPageNum) {
              this.commentFinished = true;
            } else {
              this.commentFinished = false;
            }
          } else {
            this.commentFinished = true;
          }
          this.commentIsLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.commentIsError = true;
          this.commentPageNum--;
        });
    },
    onLoadComment() {
      this.commentPageNum++;
      this.queryComment();
    },
    async queryFavorite() {
      const param = { pageNum: this.favoritePageNum, pageSize: 20 };
      this.$get("/api/favorite/poetry/" + this.poetryId, param)
        .then(response => {
          const result = response.result;
          if (result.list.length > 0) {
            if (this.favoritePageNum == 1) {
              this.poetryList = [];
            }
            this.favorites = this.favorites.concat(result.list);
            if (result.pages <= this.favoritePageNum) {
              this.favoriteFinished = true;
            } else {
              this.favoriteFinished = false;
            }
          } else {
            this.favoriteFinished = true;
          }
          this.favoriteIsLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.favoriteIsError = true;
          this.favoritePageNum--;
        });
    },
    onLoadFavorite() {
      this.favoritePageNum++;
      this.queryFavorite();
    }
  },
  mounted() {
    this.offsetTop =
      (document.documentElement.clientWidth * this.offsetTop) / 375;
  }
};
</script>

<style lang="less" scoped>
.comments {
  min-height: calc(100vh - 91px);
  color: #333;

  .count {
    font-size: 10px;
    color: #888;
    display: inline-block;
  }
  .comment-item {
    padding: 12px;

    .user-info {
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
        /deep/ .van-image__error {
          background-color: transparent;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .user-name-time {
        margin-left: 6px;
        flex: 1;
        display: flex;
        align-items: center;

        .user-name {
          font-size: 14px;
          color: #333;
          line-height: 14px;
          flex: 1;
        }
        .time {
          font-size: 10px;
          color: #888;
          line-height: 10px;
        }
      }
    }
    .content {
      font-size: 12px;
      margin-top: 6px;
    }
  }
  .praise-item,
  .favorite-item {
    display: flex;
    align-items: center;
    padding: 12px;

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
      /deep/ .van-image__error {
        background-color: transparent;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .user-name {
      margin-left: 6px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
