<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddTag">添加标签</el-button>

    <el-table v-loading="listLoading" :data="tagsList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑标签':'添加标签'">
      <el-form :model="tag" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="tag.name" placeholder="标签名称" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmTag">确认</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getTags"
    />
  </div>
</template>

<script>

import { deepClone } from '@/utils'
import { getTags, addTag, deleteTag, updateTag } from '@/api/tag'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const defaultTag = {
  id: 0,
  name: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      tag: Object.assign({}, defaultTag),
      tagsList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
  },
  created() {
    this.getTags()
  },
  methods: {
    async getTags() {
      this.listLoading = true
      const res = await getTags(this.listQuery)
      this.tagsList = res.data.items
      this.total = res.data.total
      this.listLoading = false
    },
    handleAddTag() {
      this.tag = Object.assign({}, defaultTag)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.tag = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认移除这个标签吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteTag(row.id)
          this.tagsList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmTag() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        const { code, data } = await updateTag(this.tag.id, this.tag)
        // eslint-disable-next-line eqeqeq
        if (code === 200) {
          this.tag = data
          for (let index = 0; index < this.tagsList.length; index++) {
            if (this.tagsList[index].id === this.tag.id) {
              this.tagsList.splice(index, 1, Object.assign({}, this.tag))
              break
            }
          }
        }
      } else {
        const { code, data } = await addTag(this.tag)
        if (code === 200) {
          this.tag = data
          if (this.tagsList) {
            this.tagsList.push(this.tag)
          } else {
            this.tagsList = [this.tag]
          }
        }
      }

      const { name } = this.tag
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>标签名称: ${name}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .tags-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
