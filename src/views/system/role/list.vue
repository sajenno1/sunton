<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>角色管理</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="dialogCreatedFormVisible = !dialogCreatedFormVisible">添加</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              <el-button
                size="mini"
                type="success"
                @click="handleAuthorize(scope.$index, scope.row)">权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <div>
      <el-dialog title="添加角色" :visible.sync="dialogCreatedFormVisible">
        <el-form :model="createdForm">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="createdForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogCreatedFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="createdRole">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑角色" :visible.sync="dialogUpdatedFormVisible">
        <el-form :model="updatedForm">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="updatedForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogUpdatedFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="updatedRole">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="授权" :visible.sync="dialogSetPermissionVisible">

        <el-tree
          :data="moduleList"
          show-checkbox
          check-strictly='true'
          node-key="id"
          :default-checked-keys="defaultChecked"
          :props="defaultProps"
          ref="tree">
        </el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogSetPermissionVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="setPermission">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-role-list',
  data () {
    return {
      list: [],
      dialogCreatedFormVisible: false,
      dialogUpdatedFormVisible: false,
      formLabelWidth: '120px',
      createdForm: {},
      updatedForm: {},
      moduleList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultChecked: [],
      dialogSetPermissionVisible: false,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      roleId: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.roleList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    getmoduleList () {
      return this.$http.post(api.subSystemTree).then(res => {
        this.moduleList = res.data
      })
    },
    createdRole () {
      this.$http.post(api.addRole, this.createdForm).then(res => {
        this.getList()
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
        this.dialogCreatedFormVisible = false
      })
    },
    updatedRole () {
      this.$http.post(api.editRole, this.updatedForm).then(res => {
        this.getList()
        this.$notify({ title: '成功', message: '更新成功！', type: 'success' })
        this.dialogUpdatedFormVisible = false
      })
    },
    handleEdit (index, row) {
      this.$http.post(api.roleInfo, {
        id: row.id
      }).then(res => {
        this.updatedForm = res.data
        this.dialogUpdatedFormVisible = true
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该角色吗？')
        .then(() => {
          this.$http.post(api.delRole, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleAuthorize (index, row) {
      this.$http.post(api.moduleTree, { roleId: row.id }).then(res => {
        this.defaultChecked = res.data
        this.getmoduleList().then(() => {
          this.roleId = row.id
          this.dialogSetPermissionVisible = true
        })
        this.dialogSetPermissionVisible = true
        this.roleId = row.id
      })
    },
    setPermission () {
      let ids = []
      for (var i = 0; i < this.$refs.tree.getCheckedKeys().length; i++) {
        if (this.$refs.tree.getCheckedKeys()[i] === '0' || this.$refs.tree.getCheckedKeys()[i] === '-1') {
          continue
        }
        ids.push(this.$refs.tree.getCheckedKeys()[i])
      }
      this.$http.post(api.savePermissions, {
        roleId: this.roleId,
        ids: ids.join()
      }).then(res => {
        this.getList()
        this.dialogSetPermissionVisible = false
        this.$notify({ title: '成功', message: '设置成功！', type: 'success' })
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 10px;
}
.table-container {
  margin-top: 10px;
}
</style>
