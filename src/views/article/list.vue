<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 30px">
      <router-link :to="'/admin/article/create'">
        添加文章
      </router-link>
    </el-button>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/admin/article/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="分类">
        <template slot-scope="scope">
          <span>{{ scope.row.type.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="70px" align="center" label="阅读量">
        <template slot-scope="scope">
          <span>{{ scope.row.read }}</span>
        </template>
      </el-table-column>
      <el-table-column width="70px" align="center" label="点赞量">
        <template slot-scope="scope">
          <span>{{ scope.row.like }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否原创" width="110">
        <template slot-scope="{row}">
          {{ row.is_original| statusFilter }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否发布" width="110">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.display_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <router-link :to="'/admin/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      if (status) {
        return '原创'
      } else {
        return '转载'
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        tagId: 0,
        typeId: 0,
        title: '',
        orderBy: 'display_time',
        relation: 'Type',
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
