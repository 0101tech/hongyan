<template>
  <div class="detail">
    <div class="main">
      <van-nav-bar
        :title="poetry.title"
        left-text="返回"
        left-arrow
        @click-left="back"
        @click-right="more"
      >
        <van-icon name="ellipsis" slot="right" />
      </van-nav-bar>
      <van-action-sheet
        v-model="showMore"
        :actions="moreActions"
        close-on-click-action
        @select="onSelect"
      />
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
      :like-count="poetry.likeCount"
      :comment-count="poetry.commentCount"
      :favorite-count="poetry.favoriteCount"
      :read-count="poetry.readCount"
      :poetry-id="poetry.id"
    />
  </div>
</template>

<script>
import marked from "marked";
import Comment from "@/components/Comment";

export default {
  data() {
    return {
      poetry: {
        id: 1,
        authorId: 1,
        authorName: "李白",
        title: "将进酒",
        content:
          "君不见，黄河之水天上来，奔流到海不复回。\r\n君不见，高堂明镜悲白发，朝如青丝暮成雪！\r\n人生得意须尽欢，莫使金樽空对月。\r\n天生我材必有用，千金散尽还复来。\r\n烹羊宰牛且为乐，会须一饮三百杯。\r\n岑夫子，丹丘生，将进酒，杯莫停。\r\n与君歌一曲，请君为我倾耳听。\r\n钟鼓馔玉不足贵，但愿长醉不复醒。\r\n古来圣贤皆寂寞，惟有饮者留其名。\r\n陈王昔时宴平乐，斗酒十千恣欢谑。\r\n主人何为言少钱，径须沽取对君酌。\r\n五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！",
        dynasty: "唐",
        readCount: 100,
        likeCount: 100,
        commentCount: 60000,
        favoriteCount: 100
      },
      showMore: false,
      moreActions: [{ name: "分享" }, { name: "收藏" }]
    };
  },
  components: {
    Comment
  },
  methods: {
    back() {
      this.$toast("返回");
      this.$router.go(-1);
    },
    more() {
      this.$toast("更多");
      this.showMore = true;
    },
    onSelect() {
      this.$toast("选择");
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      breaks: true
    });
    this.poetry.content = marked(this.poetry.content);
  }
};
</script>

<style lang="less" scoped>
.detail {
  .main {
    min-height: 100vh;
    background-image: url("http://www.chinapoesy.com/UploadFiles/Poesy/20181120_f6cb74f8-1218-4a73-9427-5b369c2dd5f0.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;

    .cover {
      position: absolute;
      z-index: 2;
      top: 46px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #000;
      opacity: 0.6;
    }

    .poetry {
      position: absolute;
      z-index: 3;
      top: 46px;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      color: #fff;
      padding: 24px 12px 12px;

      .title {
        font-size: 16px;
        line-height: 32px;
        font-weight: 500;
      }
      .author {
        font-size: 12px;
        line-height: 24px;
        color: #fafafa;
      }
      .content {
        font-size: 14px;
        line-height: 28px;
        font-weight: 500;
      }
    }
  }
}
</style>
