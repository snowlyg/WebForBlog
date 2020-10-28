<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.is_original" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow=true"
        >
          上传封面
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          url="url"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
        <el-button v-loading="loading" type="success" style="margin-left: 10px;" @click="submitForm">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          草稿
        </el-button>
        <el-button v-loading="loading" type="danger" @click="deleteForm">
          删除
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
              <div class="postInfo-container">
                <el-row style="margin: 40px 0;">
                  <el-col :span="12">
                    <el-form-item label-width="60px" label="分类:" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.type.id"
                        filterable
                        required
                        placeholder="搜索分类"
                      >
                        <el-option
                          v-for="(item) in typeListOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="60px" label="标签:" class="postInfo-container-item">
                      <el-tag
                        v-for="tag in postForm.tag_names"
                        :key="tag"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-input
                        v-if="inputVisible"
                        ref="saveTagInput"
                        v-model="inputValue"
                        class="input-new-tag"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                      />
                      <el-button v-else class="button-new-tag" style="margin: 0" size="small" @click="showInput">+
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.author"
                        :remote-method="getRemoteUserList"
                        filterable
                        remote
                        required
                        placeholder="搜索用户"
                      >
                        <el-option
                          v-for="(item,index) in userListOptions"
                          :key="item+index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10">
                    <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item">
                      <el-date-picker
                        v-model="displayTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                      <el-rate
                        v-model="postForm.importance"
                        :max="3"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                        :low-threshold="1"
                        :high-threshold="3"
                        style="display:inline-block"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="摘要:">
          <el-input
            v-model="postForm.content_short"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="请输入内容"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <markdown-editor
            ref="markdownEditor"
            v-model="content"
            :options="{hideModeSwitch:true,previewStyle:'vertical'}"
            height="400px"
          />
        </el-form-item>

        <div class="image-preview image-app-preview">
          <div v-show="postForm.image_uri.length>1" class="image-preview-wrapper">
            <img :src="postForm.image_uri">
            <div class="image-preview-action">
              <i class="el-icon-delete" @click="rmImage" />
            </div>
          </div>
        </div>
        <div class="image-preview">
          <div v-show="postForm.image_uri.length>1" class="image-preview-wrapper">
            <img :src="postForm.image_uri">
            <div class="image-preview-action">
              <i class="el-icon-delete" @click="rmImage" />
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import ImageCropper from '@/components/ImageCropper'
import MarkdownEditor from '@/components/MarkdownEditor'
import { validURL } from '@/utils/validate'
import { createArticle, deleteArticle, fetchArticle, updateArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import { getTypes } from '@/api/type'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
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
  importanc: 0,
  tag_names: [],
  type: {
    id: 0,
    name: '请选择分类'
  }
}
const content = ''

export default {
  name: 'ArticleDetail',
  components: {
    ImageCropper,
    MarkdownEditor,
    MDinput,
    Sticky,
    Warning,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      inputVisible: false,
      inputValue: '',

      imagecropperShow: false,
      imagecropperKey: 0,

      content: content,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      typeListOptions: [{ id: 0, name: '请选择分类' }],
      rules:
        {
          image_uri: [{ validator: validateRequire }],
          title:
            [{ validator: validateRequire }],
          content:
            [{ validator: validateRequire }],
          source_uri:
            [{ validator: validateSourceUri, trigger: 'blur' }]
        },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },

  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    this.getRemoteTypeList()

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    handleClose(tag) {
      this.postForm.tag_names.splice(this.postForm.tag_names.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        if (this.postForm.tag_names) {
          this.postForm.tag_names.push(inputValue)
        } else {
          this.postForm.tag_names = [inputValue]
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    rmImage() {
      this.postForm.image_uri = ''
    },
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        this.content = this.postForm.content
        if (this.isEdit) {
          this.setPageTitle()
        } else {
          this.setTagsViewTitle()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '预览文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑文章'
      document.title = `${title}`
    },
    createOrUpdateArticle() {
      if (this.postForm.display_time === '') {
        this.$notify({
          message: '发布时间不能为空',
          type: 'error'
        })
        return
      }
      if (this.isEdit) {
        // eslint-disable-next-line no-undef
        updateArticle(this.postForm, this.postForm.id).then(response => {
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: response.message,
              type: 'success',
              duration: 2000
            })
            this.$router.push('/admin/article/index')
          } else {
            this.$notify({
              message: response.message,
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        createArticle(this.postForm).then(response => {
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: response.message,
              type: 'success',
              duration: 2000
            })
            this.$router.push('/admin/article/index')
          } else {
            this.$notify({
              message: response.message,
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    submitForm() {
      this.getHtml()
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 'published'
          // eslint-disable-next-line no-undef
          this.createOrUpdateArticle()
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      this.getHtml()
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.loading = true
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.postForm.status = 'draft'
      this.createOrUpdateArticle()
      this.loading = false
    },
    deleteForm() {
      this.loading = true
      // eslint-disable-next-line no-undef
      deleteArticle(this.postForm.id).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: response.message,
            type: 'success',
            duration: 2000
          })
          this.$router.push('/admin/article/index')
        } else {
          this.$notify({
            message: response.message,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
      this.loading = false
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data) return
        this.userListOptions = response.data.map(v => v.name)
      })
    },
    getRemoteTypeList() {
      getTypes().then(response => {
        if (!response.data) return
        this.typeListOptions = this.typeListOptions.concat(response.data)
      })
    },
    getHtml() {
      this.postForm.content = this.$refs.markdownEditor.getValue()
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.postForm.image_uri = resData
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;

      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;

        .el-icon-delete {
          font-size: 36px;
        }
      }

      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }

    .image-app-preview {
      width: 320px;
      height: 180px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;

      .app-fake-conver {
        height: 44px;
        position: absolute;
        width: 100%; // background: rgba(0, 0, 0, .1);
        text-align: center;
        line-height: 64px;
        color: #fff;
      }
    }

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
