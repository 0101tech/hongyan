<template>
  <div class="tab-content">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list
        v-model="loading"
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
      loading: true,
      finished: false,
      poetryList: []
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.poetryList = [];
        for (var i = 0; i < 20; i++) {
          this.poetryList.push({
            id: i + 1,
            authorId: i + 1,
            authorName: "李白",
            title: "将进酒",
            content:
              "君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪！人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！",
            dynasty: "唐",
            readCount: 100,
            likeCount: 100,
            commentCount: 100,
            favoriteCount: 100
          });
        }
        this.loading = false;
      }, 1000);
    },
    onRefresh() {
      this.onLoad();
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    }
  },
  mounted() {
    this.onLoad();
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
