<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddType">添加分类</el-button>

    <el-table :data="typesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分类名称" width="220">
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑分类':'添加分类'">
      <el-form :model="type" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="type.name" placeholder="分类名称" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmType">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { deepClone } from '@/utils'
import { getTypes, addType, deleteType, updateType } from '@/api/type'

const defaultType = {
  id: 0,
  name: ''
}

export default {
  data() {
    return {
      type: Object.assign({}, defaultType),
      typesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
  },
  created() {
    this.getTypes()
  },
  methods: {
    async getTypes() {
      const res = await getTypes()
      this.typesList = res.data
    },
    handleAddType() {
      this.type = Object.assign({}, defaultType)
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
      this.type = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认移除这个分类吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteType(row.id)
          this.typesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmType() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        const { code, data } = await updateType(this.type.id, this.type)
        // eslint-disable-next-line eqeqeq
        if (code === 200) {
          this.type = data
          for (let index = 0; index < this.typesList.length; index++) {
            if (this.typesList[index].id === this.type.id) {
              this.typesList.splice(index, 1, Object.assign({}, this.type))
              break
            }
          }
        }
      } else {
        const { code, data } = await addType(this.type)
        if (code === 200) {
          this.type = data
          if (this.typesList) {
            this.typesList.push(this.type)
          } else {
            this.typesList = [this.type]
          }
        }
      }

      const { name } = this.type
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>分类名称: ${name}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .types-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
