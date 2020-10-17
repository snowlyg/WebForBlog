<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddPerm">添加权限</el-button>

    <el-table :data="configList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>      <el-table-column align="center" label="Value" width="220">
        <template slot-scope="scope">
          {{ scope.row.value }}
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
      <el-form :model="config" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="config.name" placeholder="Name" />
        </el-form-item>
        <el-form-item label="Value">
          <el-input v-model="config.value" placeholder="Value" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmPerm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { deepClone } from '@/utils'
import { getConfigs, addConfig, deleteConfig, updateConfig } from '@/api/config'

const defaultPerm = {
  ID: 0,
  name: '',
  value: ''
}

export default {
  data() {
    return {
      config: Object.assign({}, defaultPerm),
      configList: [],
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
    this.getPerms()
  },
  methods: {
    async getPerms() {
      const res = await getConfigs()
      this.configList = res.data
    },
    handleAddPerm() {
      this.config = Object.assign({}, defaultPerm)
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
      this.config = deepClone(scope.row)
      this.$nextTick(() => {
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认移除这个权限吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteConfig(row.ID)
          this.configList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmPerm() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        const { code } = await updateConfig(this.config.ID, this.config)
        // eslint-disable-next-line eqeqeq
        if (code === 200) {
          for (let index = 0; index < this.configList.length; index++) {
            if (this.configList[index].ID === this.config.ID) {
              this.configList.splice(index, 1, Object.assign({}, this.config))
              break
            }
          }
        }
      } else {
        const { code, data } = await addConfig(this.config)
        if (code === 200) {
          this.config = data
          this.configList.push(this.config)
        }
      }

      const { value, name } = this.config
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>NAME: ${name}</div>
            <div>VAlUE: ${value}</div>
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
