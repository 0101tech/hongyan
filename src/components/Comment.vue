<template>
  <van-tabs value="0" sticky animated swipeable class="comments">
    <van-tab>
      <div slot="title">
        评论 <span class="count">{{ commentCount | formatCount }}</span>
      </div>
      <div
        v-for="item in comments"
        class="comment-item van-hairline--bottom"
        :key="item.id"
      >
        <div class="user-info">
          <div class="avatar">
            <van-image :src="item.userAvatar">
              <template v-slot:error>
                加载失败
              </template>
            </van-image>
          </div>
          <div class="user-name-time">
            <div class="user-name">
              {{ item.userName }}
            </div>
            <div class="time">
              {{ item.time | timestampFormat }}
            </div>
          </div>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </van-tab>
    <van-tab>
      <div slot="title">
        点赞 <span class="count">{{ likeCount | formatCount }}</span>
      </div>
      <div
        v-for="item in likes"
        class="like-item van-hairline--bottom"
        :key="item.id"
      >
        <div class="avatar">
          <van-image :src="item.userAvatar">
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
        </div>
        <div class="user-name">
          {{ item.userName }}
        </div>
      </div>
    </van-tab>
    <van-tab>
      <div slot="title">
        收藏 <span class="count">{{ favoriteCount | formatCount }}</span>
      </div>
      <div
        v-for="item in favorites"
        class="favorite-item van-hairline--bottom"
        :key="item.id"
      >
        <div class="avatar">
          <van-image :src="item.userAvatar">
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
        </div>
        <div class="user-name">
          {{ item.userName }}
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      likes: [],
      comments: [],
      favorites: []
    };
  },
  props: ["likeCount", "commentCount", "favoriteCount", "readCount"],
  methods: {},
  mounted() {
    for (var i = 0; i < 20; i++) {
      this.likes.push({
        id: i + 1,
        userId: i + 1,
        userName: "点赞的人" + i,
        userAvatar:
          "http://www.gravatar.com/avatar/aae1e25f99469f5c616f7e9d?d=identicon&s=100"
      });
      this.comments.push({
        id: i + 1,
        parentId: null,
        userId: i + 1,
        userName: "评论的人" + i,
        userAvatar:
          "http://www.gravatar.com/avatar/aae1e25f99469f5c616f7e9d?d=identicon&s=100",
        content: "第" + (i + 1) + "条评论",
        time: 1561104313454
      });
      this.favorites.push({
        id: i + 1,
        userId: i + 1,
        userName: "收藏的人" + i,
        userAvatar:
          "http://www.gravatar.com/avatar/aae1e25f99469f5c616f7e9d?d=identicon&s=100"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.comments {
  min-height: 100vh;
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
      }
      .user-name-time {
        margin-left: 6px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .user-name {
          font-size: 14px;
          color: #333;
          line-height: 14px;
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
  .like-item,
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
    }
    .user-name {
      margin-left: 6px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
