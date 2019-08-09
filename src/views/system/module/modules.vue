<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">

        <el-card>
          <div slot="header">
            <span>系统树</span>
          </div>

          <div>
            <el-tree
              :data="modules"
              :props="defaultProps"
              node-key="id"
              accordion
              :default-expanded-keys="expandedKeys"
              @node-click="handleNodeClick"
              highlight-current>
            </el-tree>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card>
          <div class="headerCon clearfix" slot="header">
            <span>模块</span>
            <el-button class="right" style="margin-left: 5px;" type="primary" @click="saveSort" size="small" plain>保存排序</el-button>
            <el-button class="right" style="margin-left: 5px;" type="primary" @click="showAddParentModule" size="small" plain icon="el-icon-circle-plus-outline">添加父模块</el-button>
            <el-button class="right" style="margin-left: 5px;" type="primary" @click="showMountModule" size="small" icon="el-icon-circle-plus-outline">挂载模块</el-button>
          </div>
          <div class="table-container">
            <el-table
              :data="selectModules"
              style="width: 100%">

              <el-table-column
                prop="name"
                label="名称">
              </el-table-column>

              <el-table-column
                prop="sort"
                label="排序">
              </el-table-column>

              <el-table-column
                prop="webUrl"
                label="前端地址" width="300">
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.createDate | FormattersDateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" width="150">
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

              <el-table-column align="center" label="拖拽" width="80">
                <template slot-scope="scope">
                  <i class="el-icon-rank"></i>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div>
      <el-dialog title="添加父模块" :visible.sync="dialogAddParentVisible" width="40%">
        <el-form :model="mountFrom" style="padding-right:5%;">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="mountFrom.name" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="图标样式" :label-width="formLabelWidth">
            <el-input v-model="mountFrom.iconClass" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddParentVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="saveParentModule" size="medium" icon="el-icon-success">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑父模块" :visible.sync="dialogUpdateParentVisible" width="40%">
        <el-form :model="mountFrom" style="padding-right:5%;">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="mountFrom.name" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="图标样式" :label-width="formLabelWidth">
            <el-input v-model="mountFrom.iconClass" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogMountVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="mountModule" size="small" icon="el-icon-success">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="挂载模块" :visible.sync="dialogMountVisible" width="40%">
        <el-form :model="mountFrom" style="padding-right:5%;">

          <el-form-item label="模块" :label-width="formLabelWidth">
            <el-select v-model="mountFrom.uniqueId" placeholder="请选择模块" size="small">
              <el-option
                v-for="item in mountModuleList"
                :key="item.uniqueId"
                :label="item.caption"
                :value="item.uniqueId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="前端URL" :label-width="formLabelWidth">
            <el-input v-model="mountFrom.webUrl" auto-complete="off" size="small"></el-input>
          </el-form-item>

          <el-form-item label="图标样式" :label-width="formLabelWidth">
            <el-input v-model="mountFrom.iconClass" auto-complete="off" size="small"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogMountVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="mountModule" size="medium" icon="el-icon-success">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑模块" :visible.sync="dialogUpdatedVisible" width="40%">
        <el-form :model="updatedFrom" style="padding-right:5%;">

          <!-- <el-form-item label="模块" :label-width="formLabelWidth">
            <el-select v-model="updatedFrom.uniqueId" placeholder="请选择模块">
              <el-option
                v-for="item in mountModuleList"
                :key="item.uniqueId"
                :label="item.caption"
                :value="item.uniqueId"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="前端URL" :label-width="formLabelWidth">
            <el-input v-model="updatedFrom.webUrl" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="图标样式" :label-width="formLabelWidth">
            <el-input v-model="updatedFrom.iconClass" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogUpdatedVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="updatedModule">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import * as api from '../../../api'
export default {
  name: 'system-module-modules',
  data () {
    return {
      modules: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectModules: [],
      sortable: null,
      olderList: [],
      newList: [],
      dialogAddParentVisible: false,
      dialogUpdateParentVisible: false,
      dialogMountVisible: false,
      dialogUpdatedVisible: false,
      formLabelWidth: '120px',
      mountFrom: {
        parentId: '-1'
      },
      updatedFrom: {},
      mountModuleList: [],
      expandedKeys: [],
      params: {}
    }
  },
  methods: {
    getList () {
      this.$http.post(api.subSystemTree).then(res => {
        this.modules = res.data
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
    getAllUnmountModules () {
      return this.$http.post(api.allUnmountModules).then(res => {
        this.mountModuleList = res.data
      })
    },
    getSelectModules () {
      this.$http.post(api.moduleList, this.params).then(res => {
        this.selectModules = res.data.rows
        this.olderList = this.selectModules.map(v => v.id)
        this.newList = this.olderList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    handleNodeClick (data) {
      this.params = {}
      if (!data.subSystemId) {
        return
      }
      this.mountFrom.parentId = ''
      if (data.id !== '0') {
        this.params.parentId = data.id
        this.mountFrom.parentId = data.id
      }
      this.params.subSystemId = data.subSystemId
      this.mountFrom.subSystemId = data.subSystemId
      this.getSelectModules()
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
    saveSort () {
      if (this.selectModules.length > 0) {
        let sortList = []
        for (var i = 0; i < this.newList.length; i++) {
          sortList.push({
            id: this.newList[i],
            sort: i
          })
        }
        this.$http.post(api.editModuleSort, { sortModules: sortList }).then(res => {
          this.$notify({
            title: '成功',
            message: '保存成功!',
            type: 'success'
          })
        })
      }
    },
    getMountModuleList () {
      this.$http.get('/Module/GetMountModuleList').then(res => {
        this.mountModuleList = res.data
      })
    },
    showMountModule () {
      if (this.mountFrom.parentId === '-1') {
        this.$notify.error('请先选择父模块，再添加子模块')
        return
      }
      this.getAllUnmountModules().then(() => {
        this.dialogMountVisible = true
      })
    },
    showAddParentModule () {
      if (!this.mountFrom.subSystemId || this.mountFrom.parentId !== '') {
        this.$notify.error('请先选择子系统，再添加父模块')
        return
      }

      this.mountFrom.name = ''
      this.mountFrom.iconClass = ''

      this.dialogAddParentVisible = true
    },
    mountModule () {
      this.$http.post(api.mountModule, this.mountFrom).then(res => {
        this.getList()
        this.getSelectModules()
        this.expandedKeys = [this.mountFrom.subSystemId, this.mountFrom.parentId]
        this.dialogMountVisible = false
        this.$notify({
          title: '成功',
          message: '挂载成功！',
          type: 'success'
        })
      })
    },
    saveParentModule () {
      this.$http.post(api.addModule, this.mountFrom).then(res => {
        this.getList()
        this.getSelectModules()
        this.expandedKeys = [this.mountFrom.subSystemId, this.mountFrom.parentId]
        this.dialogAddParentVisible = false
        this.$notify({
          title: '成功',
          message: '保存父模块成功！',
          type: 'success'
        })
      })
    },
    handleEdit (index, row) {
      this.$http.post(api.moduleInfo, { id: row.id }).then(res => {
        this.updatedFrom = res.data
        this.dialogUpdatedVisible = true
      })
    },
    updatedModule () {
      this.$http.post(api.editModule, this.updatedFrom).then(res => {
        this.expandedKeys = [this.updatedFrom.id]
        this.getAllUnmountModules()
        this.dialogUpdatedVisible = false
        this.$notify({ title: '成功', message: '更新成功！', type: 'success' })
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该模块吗？')
        .then(() => {
          this.$http.post(api.delModule, { id: row.id }).then(res => {
            // this.getList()
            this.selectModules.splice(index, 1)
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>

</style>
