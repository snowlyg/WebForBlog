<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于站长</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>你好</div>
          <div v-for="(role) in user.roles" :key="role.id" class="user-role text-center text-muted">{{
            role.name
          }}
          </div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div v-for="(role) in user.roles" :key="role.id" class="user-role text-center text-muted">{{ role.name }}</div>
      </div>
    </div>

    <el-button
      type="primary"
      icon="el-icon-upload"
      style="bottom: 15px;margin: 40px 60px;"
      @click="imagecropperShow=true"
    >
      上传头像
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

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" />
          <span>个人简介</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            一个纯粹的变成爱好者。
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" />
          <span>技术栈</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>PHP</span>
            <el-progress :percentage="80" />
          </div>
          <div class="progress-item">
            <span>Go</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="40" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import ImageCropper from '@/components/ImageCropper'

export default {
  components: { PanThumb, ImageCropper },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },
  methods: {
    async cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.$store.dispatch('user/setAvatar', resData).then(() => {
        this.$store.dispatch('user/getInfo')
      }).catch(() => {

      })
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
