<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 30px">
      <router-link :to="'/admin/doc/create'">
        添加章节
      </router-link>
    </el-button>
    <el-table ref="dragTable" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="60px" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/admin/doc/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
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
          <el-button type="primary" size="small" icon="el-icon-edit">
            <router-link :to="'/admin/doc/edit/'+scope.row.id">
              编辑
            </router-link>
          </el-button>
          <el-button type="primary" size="small" @click="handleSort(scope)">设置排序</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="设置排序">
      <el-form :model="chapter" label-width="80px" label-position="left">
        <el-form-item label="排序">
          <el-input-number v-model="chapter.sort" type="number" placeholder="排序" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmSort">确认</el-button>
      </div>
    </el-dialog>
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
import { getChapters, setChapterSort, sortChapter } from '@/api/chapter'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Sortable from 'sortablejs'

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
      chapter: {
        id: 0,
        sort: 0
      },
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        sort: 'asc',
        orderBy: 'sort',
        docId: 0,
        page: 1,
        limit: 20
      },
      sortable: null
    }
  },
  created() {
    this.listQuery.docId = this.$route.params && this.$route.params.id
    this.getList()
  },
  methods: {
    handleSort(scope) {
      this.dialogVisible = true
      this.chapter.id = scope.row.id
      this.chapter.sort = scope.row.sort
    },
    getList() {
      this.listLoading = true
      getChapters(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    async confirmSort() {
      const { code, data } = await setChapterSort(this.chapter, this.chapter.id)
      // eslint-disable-next-line eqeqeq
      if (code === 200) {
        this.getList()
      }
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `设置成功`,
        type: 'success'
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[ 0 ]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const old = this.list[ evt.oldIndex ]
          const ne = this.list[ evt.newIndex ]
          sortChapter({ old_id: old.id, old_sort: ne.sort, new_id: ne.id, new_sort: old.sort }).then(response => {
            if (response.code === 200) {
              this.getList()
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.sortable-ghost {
  opacity: .8;
  color: #fff !important;
  background: #42b983 !important;
}

</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}

.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}

</style>
