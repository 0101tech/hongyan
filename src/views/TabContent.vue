<template>
  <div class="tab-content">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <template v-if="poetryList.length > 0">
        <van-list
          v-model="isLoading"
          :error.sync="isError"
          error-text="请求失败，点击重新加载"
          :finished="finished"
          finished-text="我是有底线的"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in poetryList"
            :key="item.id"
            class="item van-hairline--bottom"
          >
            <div class="author-info">
              <div class="avatar">
                <van-image :src="item.authorId | getAvatarUrl">
                  <template v-slot:error>
                    <img src="../assets/images/avatar.png" />
                  </template>
                </van-image>
              </div>
              <div class="author">
                {{ item.authorName }}
              </div>
              <div class="dynasty">
                {{ item.dynasty }}
              </div>
            </div>
            <div class="title-content" @click="toDetail(item.id, 'top')">
              <div class="title van-ellipsis">{{ item.title }}</div>
              <div class="content">{{ item.content }}</div>
            </div>
            <div class="tips">
              <span class="tips-item" @click="praise(item.id, index)">
                <van-icon v-if="item.praise" name="like" />
                <van-icon v-else name="like-o" />
                <span class="count">
                  {{ item.praiseCount | formatCount }}
                </span>
              </span>
              <span class="tips-item" @click="toDetail(item.id, 'comment')">
                <van-icon name="chat-o" />
                <span class="count">
                  {{ item.commentCount | formatCount }}
                </span>
              </span>
              <span class="tips-item" @click="favorite(item.id, index)">
                <van-icon v-if="item.favorite" name="star" />
                <van-icon v-else name="star-o" />
                <span class="count">
                  {{ item.favoriteCount | formatCount }}
                </span>
              </span>
              <span class="tips-item" @click="share(item.id, index)">
                <van-icon name="share" />
              </span>
            </div>
          </div>
        </van-list>
      </template>
      <div class="empty" v-else>
        空空如也
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { imageHost } from "../utils/const.js";

export default {
  data() {
    return {
      isRefresh: false,
      isLoading: false,
      isError: false,
      finished: false,
      pageNum: 0,
      poetryList: []
    };
  },
  props: ["keyword"],
  filters: {
    getAvatarUrl(authorId) {
      return [imageHost, authorId, ".jpg"].join("");
    }
  },
  methods: {
    async query() {
      const param = { pageNum: this.pageNum, pageSize: 20 };
      if (
        this.keyword ||
        this.poetryList == null ||
        this.poetryList.length === 0
      ) {
        param.keyword = this.keyword;
        this.$toast.loading({
          mask: true,
          message: "加载中...",
          duration: 0
        });
      }
      this.$get("/api/poetry", param)
        .then(response => {
          const result = response.result;
          if (result.list && result.list.length > 0) {
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
          this.$toast.clear();
        })
        .catch(e => {
          console.log(e);
          this.isError = true;
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
    toDetail(id, location) {
      this.$router.push(["/detail/", id, "/", location].join(""));
    },
    praise(id, index) {
      const poetry = this.poetryList[index];
      if (poetry.praise) {
        return;
      }
      this.$post("/api/praise/1/" + id)
        .then(response => {
          if (response.success) {
            poetry.praiseCount++;
            poetry.praise = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    favorite(id, index) {
      const poetry = this.poetryList[index];
      if (poetry.favorite) {
        return;
      }
      const param = {
        poetryTitle: poetry.title,
        authorId: poetry.authorId,
        authorName: poetry.authorName
      };
      this.$post("/api/favorite/poetry/" + id, param)
        .then(response => {
          if (response.success) {
            poetry.favoriteCount++;
            poetry.favorite = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    share(id, index) {
      console.log(id, index);
      this.$toast("分享");
    }
  },
  mounted() {
    this.query();
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
        /deep/ .van-image__error {
          background-color: transparent;

          img {
            width: 100%;
            height: 100%;
          }
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

  .empty {
    position: fixed;
    top: 46px;
    bottom: 46px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
  }
}
</style>
