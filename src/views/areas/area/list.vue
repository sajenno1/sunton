<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>地区管理</span>
          </div>
          <div>
            <el-tree
              :props="defaultProps"
              node-key="id"
              highlight-current
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              :load="loadNode"
              lazy></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card v-if="selectedArea.label">
          <div slot="header">
            <span>{{ selectedArea.label }}</span>
          </div>

          <div>
            <el-button type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
          </div>

          <div class="table-container">
            <el-table
              :data="list"
              border
              style="width: 100%">

              <el-table-column
                type="selection"
                width="55"
                align="center">
              </el-table-column>

              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>

              <el-table-column
                label="Code"
                prop="code">
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.createDate | FormattersDateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="180">
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
        </el-card>
      </el-col>
    </el-row>
    <div>
      <add-area
        ref="add"
        @getList="getList"/>

      <edit-area
        ref="edit"
        @getList="getList"/>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addArea from './add'
import editArea from './edit'
export default {
  name: 'areas-area-list',
  components: { addArea, editArea },
  data () {
    return {
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      selectedArea: {},
      list: []
    }
  },
  methods: {
    async getList (data, level) {
      let tree = []
      await this.$http.post(api.getAreasByParent, { id: data.id }).then(res => {
        tree = res.data.map(x => {
          return {
            label: x.name,
            id: x.id,
            children: []
          }
        })
        // level大于0的才加载右边的列表
        if (level > 0) {
          this.list = res.data
        }
      })
      this.selectedArea = data // 选中的地区
      return tree
    },
    handleNodeClick (data) {

    },
    async loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(await this.getList({ id: null }, node.level))
      }
      return resolve(await this.getList(node.data, node.level))
    },
    openAddDialog () {
      this.$refs.add.open(this.selectedArea)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(this.selectedArea, row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该地区吗？')
        .then(() => {
          this.$http.post(api.delArea, { id: row.id }).then(res => {
            this.$notify.success({ title: '成功', message: '删除成功' })
            this.getList(this.selectedArea, 1)
          })
        })
        .catch(() => {})
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
