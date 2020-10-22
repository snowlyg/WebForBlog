<template>
  <div class="components-container">
    <div class="header-search text-center">
      <el-input
        v-model="title"
        class="search"
        placeholder="请输入内容"
        @input="handleSearch"
      />
    </div>

    <div class="dashboard-editor-container">
      <el-row>
        <el-col v-for="(item) in aritcles" :key="item.id" class="el-card-div" :span="24">
          <el-card>
            <div>
              <img :src="item.image_uri" alt="" class="image">
              <div class="left_content">
                <router-link target="_blank" :to="'/detail/'+item.id" class="link-type">
                  <div class="content_title"> {{ item.title }}</div>
                </router-link>
                <div class="content_short"> {{ item.content_short }}</div>
                <div class="auth_content">
                  <svg-icon icon-class="folder" class="svg-icon" />  <span> {{ item.type.name }} </span> /
                  <svg-icon icon-class="author" class="svg-icon" /> <span>{{ item.author }} </span> /
                  <svg-icon icon-class="time" class="svg-icon" /> <time class="time">{{ item.display_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</time>
                </div>
              </div>
              <div class=" clearfix" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <simple-pagination
        :total="total"
        :page.sync="listQuery.offset"
        :limit.sync="listQuery.limit"
        @pagination="getData"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { indexList } from '@/api/article'
import SimplePagination from '@/components/SimplePagination'

export default {
  name: 'DashboardEditor',
  components: { SimplePagination },
  data() {
    return {
      aritcles: [],
      total: 0,
      title: '',
      listQuery: {
        searchStr: '',
        orderBy: 'display_time',
        offset: 1,
        limit: 10
      }
    }
  },
  created() { this.getData() },
  methods: {
    getData() {
      this.listLoading = true
      indexList(this.listQuery).then(response => {
        this.aritcles = response.data.items
        this.total = response.data.total
        this.listQuery.limit = response.data.limit
      })
    },
    handleSearch() {
      this.listQuery.searchStr = 'title:' + this.title
      this.getData()
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters([])
  }
}
</script>

<style lang="scss" scoped>

@media (max-width: 500px) {
  .header-search {
    margin: 20px 40px;
  }
  .el-card-div {
    margin: 5px 0;
  }

  .image {
    width: 90px;
    height: 90px;
    border-style: none;
    float: left;
    margin-right: 5px;
    padding: 0px;
  }

  .left_content {
    min-height: 95px;

    .content_title {
      font-size: 0.85em;
      margin: 5px 0;
    }

    .content_short {
      font-size: 0.5em;
      color: #666;
      min-height: 40px;
      padding: 0px 0;
    }

    .auth_content {
      font-size: 0.45em;
      color: #aaa;
      span{
        margin-right: 5px;
      }
      time {
        margin-left: 0px;
      }
      .svg-icon{
        margin: 0 5px 0 10px;
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
    margin: 10px 0;
    position: relative;
    //height: 100vh;

  }

  .dashboard-editor-container {
    width: 100%;
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 10px;
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

@media (min-width: 501px) {
  .header-search {
    margin: 20px 40px;
  }

  .el-card-div {
    margin: 10px 0;
  }

  .image {
    width: 150px;
    border-style: none;
    height: 150px;
    float: left;
    margin-right: 30px;
    padding: 5px;
  }

  .left_content {
    height: 150px;

    .content_title {
      font-size: 1.5em;
      margin: 15px;
    }

    .content_short {
      font-size: 1.0em;
      color: #666;
      min-height: 70px;
      padding: 5px 0;
    }

    .auth_content {
      font-size: 0.85em;
      color: #aaa;
      span{
        margin-right: 5px;
      }
      time {
        margin-left: 0px;
      }

      .svg-icon{
        margin: 0 5px 0 10px;
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
    //height: 100vh;

  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 35px;
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
