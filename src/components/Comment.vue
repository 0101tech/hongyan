<template>
  <div class="comments">
    <van-tabs
      value="0"
      sticky
      animated
      swipeable
      :offset-top="offsetTop"
      class="tabs"
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
          class="comment-list"
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
        <div v-if="this.comments.length === 0" class="empty">
          暂无评论，快来抢沙发
        </div>
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
        <div v-if="this.praises.length === 0" class="empty">
          还没有点赞哦
        </div>
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
        <div v-if="this.favorites.length === 0" class="empty">
          还没有收藏哦
        </div>
      </van-tab>
    </van-tabs>

    <div class="comment-box">
      <van-cell-group>
        <van-field
          v-model="commentContent"
          type="textarea"
          placeholder="抒情..."
          rows="1"
          autosize
        >
          <van-button
            slot="button"
            size="small"
            type="default"
            :loading="addCommentLoading"
            @click="addComment"
            >发送</van-button
          >
        </van-field>
      </van-cell-group>
    </div>
  </div>
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
      favoritePageNum: 0,
      commentContent: "",
      addCommentLoading: false
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
    },
    addComment() {
      this.addCommentLoading = true;
      this.$post("/api/comment/1/" + this.poetryId, {
        content: this.commentContent
      })
        .then(response => {
          if (response.success) {
            this.commentContent = "";
            this.comments = [response.result].concat(this.comments);
            this.addCommentLoading = false;
            document
              .getElementById("comment")
              .scrollIntoView({ behavior: "smooth" });
          }
        })
        .catch(e => {
          console.log(e);
          this.addCommentLoading = false;
        });
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
  color: #333;

  .comment-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 1;
  }
  .tabs {
    min-height: calc(100vh - 140px);
    padding-bottom: 50px;

    .count {
      font-size: 10px;
      color: #888;
      display: inline-block;
    }
    .empty {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 12px;
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
}
</style>
