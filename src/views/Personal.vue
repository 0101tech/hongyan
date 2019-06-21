<template>
  <div class="personal">
    <van-nav-bar title="我的" />
    <div class="card van-hairline--bottom">
      <div class="avatar">
        <van-image :src="userAvatar">
          <template v-slot:error>
            加载失败
          </template>
        </van-image>
      </div>
      <div class="user-name">
        {{ userName }}
      </div>
    </div>
    <van-cell title="消息" icon="envelop-o" is-link value="666" />
    <van-cell title="收藏" icon="star-o" is-link />
    <van-cell title="反馈" icon="smile-comment-o" is-link />
    <van-cell title="退出" icon="close" is-link />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAvatar:
        "http://www.gravatar.com/avatar/aae1e25f99469f5c616f7e9d?d=identicon&s=100",
      userName: "乖，摸摸头"
    };
  }
};
</script>

<style lang="less" scoped>
.personal {
  .card {
    padding: 36px 12px;
    display: flex;
    align-items: center;

    .avatar {
      width: 48px;
      height: 48px;

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
      margin-left: 12px;
      font-size: 18px;
      font-weight: 600;
      color: #333;
      line-height: 48px;
    }
  }
}
</style>
