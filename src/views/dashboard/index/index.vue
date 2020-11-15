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
    <div class="header-search text-center">
      <el-button
        v-for="(tag) in tags"
        :span="4"
        class="text-center tag_btn"
        style="margin: 5px 5px"
        @click="handleTagSearch(tag.id)"
      >
        {{ tag.name }}
      </el-button>
    </div>

    <div class="dashboard-editor-container">
      <el-row>
        <el-col v-for="(item) in articles" :key="item.id" class="el-card-div" :span="24">
          <el-card :body-style="{ padding: '10px' }">
            <div class="article_data">
              <img :src="item.image_uri" alt="" class="image">
              <div class="left_content">
                <router-link target="_blank" :to="'/detail/'+item.id" class="link-type">
                  <div class="content_title"> {{ item.title }}</div>
                </router-link>
                <div class="content_short"> {{ item.content_short }}</div>
                <div class="auth_content">
                  <svg-icon icon-class="folder" style="margin-left: 0" />
                  <span> {{ item.type.name }} </span> /
                  <svg-icon icon-class="author" />
                  <span>{{ item.author }} </span> /
                  <svg-icon icon-class="time" />
                  <time class="time">{{ item.display_at | parseTime('{y}-{m}-{d}') }}</time>
                </div>
              </div>
              <div class=" clearfix" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <simple-pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getData"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { indexList } from '@/api/article'
import { getArticleTags } from '@/api/tag'
import { getArticleTypes } from '@/api/type'
import SimplePagination from '@/components/SimplePagination'

export default {

  metaInfo() {
    return {
      title: `生活中的难过`,
      bodyAttrs: {
        class: 'child-component'
      }
    }
  },
  name: 'DashboardEditor',
  components: { SimplePagination },
  data() {
    return {
      tags: [],
      articles: [],
      total: 0,
      title: '',
      listQuery: {
        tagId: 0,
        typeId: 0,
        relation: 'Type',
        title: '',
        orderBy: 'display_time',
        page: 1,
        limit: 10
      }
    }
  },
  // eslint-disable-next-line no-sequences
  created() {
    this.getData()
    this.getTag()
  },
  methods: {
    getData() {
      this.listLoading = true
      this.listQuery.page = this.page
      this.listQuery.limit = this.pageSize
      indexList(this.listQuery).then(response => {
        this.articles = response.data.items
        this.total = response.data.total
        this.listQuery.limit = response.data.limit
      })
    },
    getTag() {
      getArticleTags({ page: -1, limit: -1 }).then(response => {
        this.tags = response.data.items
      })
    },
    handleSearch() {
      this.listQuery.title = this.title + ':like'
      this.getData()
    },
    handleTagSearch(tagId) {
      this.listQuery.tagId = tagId
      this.getData()
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters([
      'page',
      'pageSize'
    ]),
    typeId() {
      return this.$store.getters.type_id
    }
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    typeId(val, oldVal) {
      this.listQuery.typeId = val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>

@media (max-width: 500px) {
  .header-search {
    margin: 20px 40px;

    .tag_btn {
      margin: 5px;
      padding: 5px;
      font-size: 12px;
      border-radius: 2px;
    }
  }
  .el-card-div {
    margin: 5px 0;
  }

  .image {
    width: 70px;
    height: 70px;
    border: 1px solid #eeeeee;
    float: left;
    margin-right: 5px;
    padding: 5px;
  }

  .left_content {
    height: 70px;

    .content_title {
      font-size: 0.85em;
      margin: 0;
      padding: 4px 0;
      height: 50px;
    }

    .content_short {
      display: none;
      font-size: 0.5em;
      color: #666;
      min-height: 40px;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .auth_content {
      font-size: 0.45em;
      color: #aaa;

      span {
        margin-right: 5px;
      }

      time {
        margin-left: 0;
      }

      .svg-icon {
        margin: 0 5px 0 5px;
        font-size: 10px;
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
    margin: 56px 0 0 0;
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

    .tag_btn {
      margin: 5px;
      padding: 5px;
      font-size: 12px;
      border-radius: 2px;
    }
  }

  .el-card-div {
    margin: 10px 0;
  }

  .image {
    width: 150px;
    border: 1px solid #eeeeee;
    height: 150px;
    float: left;
    margin-right: 10px;
    padding: 10px;
  }

  .left_content {
    height: 150px;

    .content_title {
      font-size: 1.5em;
      margin: 0;
      padding: 10px;
    }

    .content_short {
      font-size: 1.0em;
      color: #666;
      min-height: 75px;
      padding: 5px 0;
    }

    .auth_content {
      font-size: 0.85em;
      color: #aaa;

      span {
        margin-right: 5px;
      }

      time {
        margin-left: 0px;
      }

      .svg-icon {
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
    margin: 46px 0 0 0;
    position: relative;
    //height: 100vh;

  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 35px;

    .article_data {
      margin: 15px;
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
