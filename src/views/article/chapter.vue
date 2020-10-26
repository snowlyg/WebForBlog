<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddChapter">添加章节</el-button>

    <el-table :data="chaptersList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="章节名称" width="220">
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogChapter==='edit'?'编辑章节':'添加章节'">
      <el-form :model="chapter" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="chapter.name" placeholder="章节名称" />
        </el-form-item>
        <el-form-item label="文档">
          <el-select v-model="chapter.doc.id" filterable placeholder="请选择文档">
            <el-option
              v-for="item in docs"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmChapter">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { deepClone } from '@/utils'
import { addChapter, deleteChapter, getChapters, updateChapter } from '@/api/chapter'
import { getDocs } from '@/api/doc'

const defaultChapter = {
  id: 0,
  doc: {
    id: 0,
    name: ''
  },
  name: ''
}

export default {
  data() {
    return {
      chapter: Object.assign({}, defaultChapter),
      chaptersList: [],
      docs: [],
      dialogVisible: false,
      dialogChapter: 'new',
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
    this.getChapters()
    this.getDocs()
  },
  methods: {
    async getChapters() {
      const res = await getChapters()
      this.chaptersList = res.data
    },
    async getDocs() {
      const res = await getDocs()
      this.docs = res.data
    },
    handleAddChapter() {
      this.chapter = Object.assign({}, defaultChapter)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogChapter = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogChapter = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.chapter = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认移除这个章节吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteChapter(row.id)
        this.chaptersList.splice($index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(err => { console.error(err) })
    },
    async confirmChapter() {
      const isEdit = this.dialogChapter === 'edit'

      if (isEdit) {
        const { code, data } = await updateChapter(this.chapter.id, this.chapter)
        // eslint-disable-next-line eqeqeq
        if (code === 200) {
          this.chapter = data
          for (let index = 0; index < this.chaptersList.length; index++) {
            if (this.chaptersList[ index ].id === this.chapter.id) {
              this.chaptersList.splice(index, 1, Object.assign({}, this.chapter))
              break
            }
          }
        }
      } else {
        const { code, data } = await addChapter(this.chapter)
        if (code === 200) {
          this.chapter = data
          if (this.chaptersList) {
            this.chaptersList.push(this.chapter)
          } else {
            this.chaptersList = [this.chapter]
          }
        }
      }

      const { name } = this.chapter
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>章节名称: ${name}</div>
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
