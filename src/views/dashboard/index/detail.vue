<template>
  <div class="components-container">
    <div class="dashboard-editor-container">
      <el-row>
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="content_title">{{ detail.title }} </div>
            <div class="auth_content">
              <span>作者：{{ detail.author }} </span>
              <time class="time">发布时间：{{ detail.display_time }}</time>
            </div>

            <hr>

            <div class="left_content">
              <div class="content_short"> {{ detail.content }}</div>
            </div>
            <div class="bottom clearfix" />
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { indexDetail } from '@/api/article'

const defaultDetail = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  is_original: true,
  comment_disabled: false,
  importance: 0
}

export default {

  name: 'DashboardEditor',
  components: {},
  data() {
    return {
      detail: Object.assign({}, defaultDetail)
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getDetail(id)
  },
  methods: {
    getDetail(id) {
      this.listLoading = true
      indexDetail(id).then(response => {
        this.detail = response.data
        console.log(this.detail)
      })
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters([])
  }
}
</script>

<style lang="scss" scoped>

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.components-container {
  margin: 0;
  position: relative;
  height: 100vh;

}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 60px 80px;

  .content_title {
    font-size: 2.0em;
    text-align: center;
    margin: 30px 0;
  }

  .auth_content {
    font-size: 0.65em;
    color: #aaa;
    margin-left: 30px;

    time {
      margin-left: 15px;
    }
  }

  .left_content {
    .content_short {
      text-align: center;
      font-size: 1.0em;
      padding: 5px 0;
    }

  }
}

.pan-info-roles {
  font-size: 12px;
  font-weight: 700;
  color: #333;
  display: block;
}

.info-container {
  position: relative;
  margin-left: 190px;
  height: 150px;
  line-height: 200px;

  .display_name {
    font-size: 48px;
    line-height: 48px;
    color: #212121;
    position: absolute;
    top: 25px;
  }
}
</style>
