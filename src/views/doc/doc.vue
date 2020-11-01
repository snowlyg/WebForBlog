<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddDoc">添加文档</el-button>

    <el-table :data="docsList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文档名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small">
            <router-link :to="'/admin/doc/index/'+scope.row.id">
              章节管理
            </router-link>
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogDoc==='edit'?'编辑文档':'添加文档'">
      <el-form :model="doc" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="doc.name" placeholder="文档名称" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmDoc">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { deepClone } from '@/utils'
import { addDoc, deleteDoc, getDocs, updateDoc } from '@/api/doc'

const defaultDoc = {
  id: 0,
  name: ''
}

export default {
  data() {
    return {
      doc: Object.assign({}, defaultDoc),
      docsList: [],
      dialogVisible: false,
      dialogDoc: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {},
  created() {
    this.getDocs()
  },
  methods: {
    async getDocs() {
      const res = await getDocs()
      this.docsList = res.data.items
    },
    handleAddDoc() {
      this.doc = Object.assign({}, defaultDoc)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogDoc = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogDoc = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.doc = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认移除这个文档吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteDoc(row.id)
        this.docsList.splice($index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(err => { console.error(err) })
    },
    async confirmDoc() {
      const isEdit = this.dialogDoc === 'edit'

      if (isEdit) {
        const { code, data } = await updateDoc(this.doc.id, this.doc)
        // eslint-disable-next-line eqeqeq
        if (code === 200) {
          this.doc = data
          for (let index = 0; index < this.docsList.length; index++) {
            if (this.docsList[ index ].id === this.doc.id) {
              this.docsList.splice(index, 1, Object.assign({}, this.doc))
              break
            }
          }
        }
      } else {
        const { code, data } = await addDoc(this.doc)
        if (code === 200) {
          this.doc = data
          if (this.docsList) {
            this.docsList.push(this.doc)
          } else {
            this.docsList = [this.doc]
          }
        }
      }

      const { name } = this.doc
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>文档名称: ${name}</div>
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
