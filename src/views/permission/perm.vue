<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddPerm">添加权限</el-button>

    <el-table v-loading="listLoading" :data="permsList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限标识" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.display_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="请求方法" width="220">
        <template slot-scope="scope">
          {{ scope.row.act }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑权限':'添加权限'">
      <el-form :model="perm" label-width="80px" label-position="left">
        <el-form-item label="标识">
          <el-input v-model="perm.name" placeholder="权限标识" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="perm.display_name" placeholder="权限名称" />
        </el-form-item>
        <el-form-item label="请求方法">
          <el-input v-model="perm.act" placeholder="请求方法" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="perm.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="权限描述"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmPerm">确认</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getPerms"
    />
  </div>
</template>

<script>

import { deepClone } from '@/utils'
import { addPerm, deletePerm, getPerms, updatePerm } from '@/api/perm'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const defaultPerm = {
  id: 0,
  name: '',
  display_name: '',
  description: '',
  act: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      perm: Object.assign({}, defaultPerm),
      permsList: [],
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
  computed: {},
  created() {
    this.getPerms()
  },
  methods: {
    async getPerms() {
      this.listLoading = true
      const res = await getPerms(this.listQuery)
      this.permsList = res.data.items
      this.total = res.data.total
      this.listLoading = false
    },
    handleAddPerm() {
      this.perm = Object.assign({}, defaultPerm)
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
      this.perm = deepClone(scope.row)
      this.$nextTick(() => {
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认移除这个权限吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deletePerm(row.id)
        this.permsList.splice($index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(err => { console.error(err) })
    },
    async confirmPerm() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        const { code } = await updatePerm(this.perm.id, this.perm)
        // eslint-disable-next-line eqeqeq
        if (code === 200) {
          for (let index = 0; index < this.permsList.length; index++) {
            if (this.permsList[ index ].id === this.perm.id) {
              this.permsList.splice(index, 1, Object.assign({}, this.perm))
              break
            }
          }
        }
      } else {
        const { code, data } = await addPerm(this.perm)
        if (code === 200) {
          this.perm = data
          this.permsList.push(this.perm)
        }
      }

      const { description, name, display_name, act } = this.perm
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>权限标识: ${name}</div>
            <div>权限名称: ${display_name}</div>
            <div>描述: ${description}</div>
            <div>请求方法: ${act}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .perms-table {
    margin-top: 30px;
  }
}
</style>
