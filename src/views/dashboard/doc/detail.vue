<template>
  <div class="components-container">
    <div class="dashboard-editor-container">
      <el-row>
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="content_title">{{ detail.title }}</div>
            <div class="auth_content">
              <el-tooltip content="文档名称" placement="top"><svg-icon icon-class="folder" class="svg-icon" /></el-tooltip><span> {{ detail.doc.name }} </span> /
              <el-tooltip content="文章作者" placement="top"><svg-icon icon-class="author" class="svg-icon" /></el-tooltip> <span>{{ detail.author }} </span> /
              <el-tooltip content="阅读量" placement="top">
                <svg-icon icon-class="eye-filer" class="svg-icon eye-filer" />
              </el-tooltip><span>{{ detail.read }} </span> /
              <el-tooltip content="点赞文章" placement="top">
                <transition name="fade">
                  <svg-icon v-if="show" icon-class="like" class="svg-icon" @click="likeChapter(detail.id)" />
                </transition> </el-tooltip><span>{{ detail.like }} </span> /
              <el-tooltip content="发布时间" placement="top"><svg-icon icon-class="time" class="svg-icon" /></el-tooltip> <time class="time">{{ detail.display_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</time>
            </div>
            <hr>
            <div>
              <div id="viewer" />
            </div>
            <hr>
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
import { fetchPublishedChapter, like } from '@/api/chapter'
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
  like: 0,
  read: 0,
  doc: {
    name: ''
  }
}

export default {
  metaInfo() {
    return {
      title: `${this.detail.title} -${this.detail.doc.name}`,
      bodyAttrs: {
        class: 'child-component'
      }
    }
  },
  name: 'DashboardEditor',
  components: { BackToTop },
  data() {
    return {
      show: true,
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
    likeChapter(id) {
      like(id).then(response => {
        this.detail.like = response.data.like
        this.show = !this.show
        setTimeout(() => {
          this.show = !this.show
        }, 1)
      })
    },
    getDetail(id) {
      fetchPublishedChapter(id).then(response => {
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
    margin: 56px 0 0 0;
    position: relative;

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
      text-align: center;
      font-size: 0.65em;
      color: #aaa;
      line-height: normal;

      span{
        margin-right: 8px;
      }
      time {
        margin-left: 0;
      }

      .svg-icon{
        margin: 0 3px 0 10px;
      }
      .eye-filer{
        font-size: 14px;
        padding-top: 4px;
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
    margin: 56px 0 0 0;
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
      line-height: normal;

      span{
        margin-right: 8px;
      }
      time {
        margin-left: 0;
      }

      .svg-icon{
        margin: 0 3px 0 10px;
      }

      .eye-filer{
        font-size: 14px;
        padding-top: 4px;
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
