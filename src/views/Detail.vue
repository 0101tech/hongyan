<template>
  <div class="detail">
    <van-nav-bar
      :title="poetry.title"
      left-text="返回"
      left-arrow
      fixed
      :z-index="4"
      @click-left="back"
      @click-right="share"
    >
      <van-icon name="share" slot="right" />
    </van-nav-bar>

    <div class="main">
      <div class="poetry">
        <div class="title">
          {{ poetry.title }}
        </div>
        <div class="author">{{ poetry.dynasty }} · {{ poetry.authorName }}</div>
        <div class="content" v-html="poetry.content"></div>
      </div>
      <div class="cover"></div>
    </div>
    <comment
      v-if="poetry.id"
      :praise-count="poetry.praiseCount"
      :comment-count="poetry.commentCount"
      :favorite-count="poetry.favoriteCount"
      :read-count="poetry.readCount"
      :poetry-id="poetry.id"
      id="comment"
    />
  </div>
</template>

<script>
import marked from "marked";
import Comment from "@/components/Comment";

export default {
  data() {
    return {
      poetry: {}
    };
  },
  components: {
    Comment
  },
  methods: {
    getDetail() {
      this.$toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      this.$get("/api/poetry/" + this.$route.params.id)
        .then(response => {
          this.poetry = response.result;
          this.poetry.content = marked(this.poetry.content);
          this.$toast.clear();

          setTimeout(() => {
            const location = this.$route.params.location;
            if (this.poetry.commentCount > 0 && location === "comment") {
              document
                .getElementById("comment")
                .scrollIntoView({ behavior: "smooth" });
            } else {
              document.documentElement.scrollTop = 0;
            }
          }, 100);
        })
        .catch(e => {
          console.log(e);
          this.$toast.clear();
        });
    },
    back() {
      this.$toast("返回");
      this.$router.go(-1);
    },
    share() {
      this.$toast("分享");
    }
  },
  created() {
    const location = this.$route.params.location;
    if (location === "top") {
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      breaks: true
    });
    this.getDetail();
  }
};
</script>

<style lang="less" scoped>
.detail {
  .main {
    height: calc(100vh - 91px);
    display: flex;
    align-items: center;
    margin-top: 46px;
    position: relative;
    z-index: 3;
    background: #fff;

    .poetry {
      width: 100%;
      text-align: center;
      color: #333;
      padding: 24px 12px 12px;
      max-height: calc(100vh - 92px);
      overflow-y: auto;

      .title {
        font-size: 16px;
        line-height: 32px;
        font-weight: 500;
        letter-spacing: 4px;
      }
      .author {
        font-size: 14px;
        line-height: 24px;
        color: #888;
      }
      .content {
        font-size: 16px;
        line-height: 28px;
        font-weight: 600;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
