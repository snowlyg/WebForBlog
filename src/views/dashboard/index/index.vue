<template>
  <div class="components-container">
    <div class="dashboard-editor-container">
      <el-row>
        <el-col v-for="(item) in aritcles" :key="item.id" :span="24">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <img :src="item.image_uri" alt="" class="image">
              <div class="left_content">
                <router-link target="_blank" :to="'/detail/'+item.id" class="link-type">
                  <div class="content_title"> {{ item.title }}</div>
                </router-link>
                <div class="content_short"> {{ item.content_short }}</div>
                <div class="auth_content">
                  <span>作者：{{ item.author }} </span>
                  <time class="time">发布时间：{{ item.display_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</time>
                </div>
              </div>
              <div class="bottom clearfix" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { indexList } from '@/api/article'

export default {
  name: 'DashboardEditor',
  components: {},
  data() {
    return {
      aritcles: []
    }
  },
  created() { this.getData() },
  methods: {
    getData() {
      this.listLoading = true
      indexList().then(response => {
        this.aritcles = response.data.items
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

.image {
  width: 150px;
  border-style: none;
  height: 150px;
  float: left;
  margin-right: 10px;
}

.left_content {
  .content_title {
    font-size: 1.5em;
    margin-top:5px;
  }

  .content_short {
    font-size: 1.0em;
    color: #666;
    height: 64px;
    padding: 5px 0;
  }

  .auth_content {
    font-size: 0.85em;
    color: #aaa;
    time{
      margin-left: 30px;
    }
  }

}

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
  padding: 60px 350px;
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
