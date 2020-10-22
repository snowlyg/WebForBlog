<template>
  <div class="components-container">
    <div class="dashboard-editor-container">
      <el-row>
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="content_title">{{ detail.title }}</div>
            <div class="auth_content">
              <svg-icon icon-class="folder" class="svg-icon" />  <span> {{ detail.type.name }} </span> /
              <svg-icon icon-class="author" class="svg-icon" /> <span>{{ detail.author }} </span> /
              <svg-icon icon-class="time" class="svg-icon" /> <time class="time">{{ detail.display_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</time>

            </div>
            <hr>
            <div>
              <div id="viewer" />
            </div>
            <hr>
            <div>
              <svg-icon icon-class="tag" class="tag" />
              <el-tag v-for="(tag_name) in detail.tag_names" :span="4" class="text-center tag_btn">
                {{ tag_name }}
              </el-tag>
            </div>
            <div class="bottom clearfix" />
          </div>
        </el-card>
      </el-row>
      <!-- you can add element-ui's tooltip -->
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top
          :custom-style="myBackToTopStyle"
          :visibility-height="300"
          :back-position="50"
          transition-name="fade"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { indexDetail } from '@/api/article'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import BackToTop from '@/components/BackToTop'

const defaultDetail = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  display_at: undefined, // 前台展示时间
  id: undefined,
  is_original: true,
  comment_disabled: false,
  importance: 0,
  type: {
    name: ''
  }
}

export default {
  name: 'DashboardEditor',
  components: { BackToTop },
  data() {
    return {
      detail: Object.assign({}, defaultDetail),
      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: '30px',
        bottom: '70px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
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

        new Viewer({
          el: document.querySelector('#viewer'),
          height: '600px',
          initialValue: this.detail.content,
          plugins: [[codeSyntaxHighlight, { hljs }]]
        })
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

@media (min-width: 501px) {
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

  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 60px 80px;

    .tag {
      font-size: 14px;
      margin-right:3px;
    }

    .tag_btn{
      padding: 2px;
      margin: 0 3px;
      font-size: 9px;
      line-height: 22px;
    }

    .content_title {
      font-size: 2.0em;
      text-align: center;
      margin: 30px 0;
    }

    .auth_content {
      text-align: center;
      font-size: 0.65em;
      color: #aaa;
      margin-left: 30px;

      span{
        margin-right: 5px;
      }
      time {
        margin-left: 0;
      }

      .svg-icon{
        margin: 0 5px 0 10px;
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
}

@media (max-width: 500px) {
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

  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 0;

    .content_title {
      font-size: 2.0em;
      text-align: center;
      margin: 30px 0;
    }

    .auth_content {
      text-align: center;
      font-size: 0.65em;
      color: #aaa;
      margin-left: 30px;

      span{
        margin-right: 5px;
      }
      time {
        margin-left: 0;
      }

      .svg-icon{
        margin: 0 5px 0 10px;
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
}
</style>
