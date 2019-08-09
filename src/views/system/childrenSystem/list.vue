<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>子系统</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-edit" @click="saveSort">保存排序</el-button>
        <el-button class="right" style="margin-right: 5px;" size="small" type="primary" icon="el-icon-plus" @click="dialogCreatedFormVisible = !dialogCreatedFormVisible">添加</el-button>
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
            label="状态" align="center"
            width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isEnabled ? 'success' : 'danger'" @click.native="toggleStatus(scope.row)">
                {{ scope.row.isEnabled ? '启用' : '禁用'}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog title="添加子系统" :visible.sync="dialogCreatedFormVisible" width="40%">
        <el-form :model="createdForm" style="padding-right:5%;">
          <el-form-item label="名称" :label-width="'80px'">
            <el-input v-model="createdForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogCreatedFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="createdSystem">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑子系统" :visible.sync="dialogUpdatedFormVisible" width="40%">
        <el-form :model="updatedForm" style="padding-right:5%;">
          <el-form-item label="名称" :label-width="'80px'">
            <el-input v-model="updatedForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogUpdatedFormVisible = false">取 消</el-button>
          <el-button size="small"type="primary" @click="updatedSystem">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import Sortable from 'sortablejs'
export default {
  name: 'system-childrenSystem-list',
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogCreatedFormVisible: false,
      dialogUpdatedFormVisible: false,
      createdForm: {},
      updatedForm: {},
      formLabelWidth: '120px',
      olderList: [],
      newList: [],
      sortable: null
    }
  },
  methods: {
    getList () {
      this.$http.post(api.subSystemList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
        this.olderList = this.list.map(v => v.id)
        this.newList = this.olderList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
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
    createdSystem () {
      this.$http.post(api.addSubSystem, this.createdForm).then(res => {
        this.getList()
        this.dialogCreatedFormVisible = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    updatedSystem () {
      this.$http.post(api.editSubSystem, this.updatedForm).then(res => {
        this.getList()
        this.dialogUpdatedFormVisible = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    },
    setSort () {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        onEnd: evt => {
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    handleEdit (index, row) {
      this.$http.post(api.subSystemInfo, { id: row.id }).then(res => {
        this.updatedForm = res.data
        this.dialogUpdatedFormVisible = true
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该子系统吗？')
        .then(() => {
          this.$http.post(api.delSubSystem, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    saveSort () {
      if (this.list.length === 0) {
        return
      }
      let sortList = []
      for (var i = 0; i < this.newList.length; i++) {
        sortList.push({
          id: this.newList[i],
          sort: i
        })
      }
      this.$http.post(api.editSubSystemSort, { sortSubSystem: sortList }).then(res => {
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    },
    toggleStatus (row) {
      this.$confirm(row.isEnabled ? '确定禁用该系统吗？' : '确定启用该系统吗？')
        .then(_ => {
          var form = row
          form.isEnabled = !form.isEnabled
          this.$http.post(api.editSubSystem, form).then(res => {
            row.isEnabled = !row.isEnabled
            this.getList()
          })
        })
        .catch(_ => {})
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
