<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>团队管理</span>
          </div>
          <div>
            <el-input
              v-if="false"
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            
            <el-tree
              :props="defaultProps"
              node-key="id"
              ref="tree"
              highlight-current
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode"
              :load="loadNode"
              lazy></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <span>下级经销商</span>
          </div>

          <div class="searchCon clearfix">
            <div class="left">
              <el-input v-model="no" size="small" placeholder="请输入编号"></el-input>

              <el-input v-model="name" size="small" placeholder="请输入名称"></el-input>

              <el-input v-model="mobile" size="small" placeholder="请输入手机号码"></el-input>

              <el-select v-model="status" clearable placeholder="状态" size="small">
                <el-option label="已启用" value="Approved"></el-option>
                <el-option label="已冻结" value="Freeze"></el-option>
              </el-select>

              <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
            </div>
            <div class="right">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
            </div>
          </div>

          <div class="table-container">
            <el-table
              :data="list"
              border
              style="width: 100%">

              <el-table-column
                type="selection"
                width="48"
                align="center"
                >
              </el-table-column>

              <el-table-column
                label="编号"
                prop="no">
              </el-table-column>

              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>

              <el-table-column
                label="联系人"
                prop="linkMan">
              </el-table-column>

              <el-table-column
                label="所在地区"
                prop="areaName">
              </el-table-column>

              <el-table-column
                label="手机"
                prop="mobile">
              </el-table-column>

              <el-table-column
                label="状态"
                prop="statusName">
              </el-table-column>

              <el-table-column
                label="级别"
                prop="titleLevel">
              </el-table-column>

              <el-table-column label="操作" width="230" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button
                    size="mini"
                    :type="scope.row.status === 'Approved' ? 'info' : 'success'"
                    @click="handleUpdateStatus(scope.$index, scope.row)">{{ scope.row.status === 'Approved' ? '冻结' : '启用' }}</el-button>
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

          <div>
            <antiChannelConflict-dealer-add
              ref="add"
              v-if="show"
              @getList="getList">
            </antiChannelConflict-dealer-add>

            <anti-channel-conflict-dealer-edit
              ref="edit"
              v-if="show"
              @getList="getList">
            </anti-channel-conflict-dealer-edit>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerAdd from './add'
import antiChannelConflictDealerEdit from './edit'
export default {
  name: 'antiChannelConflict-dealer-treelist',
  components: { antiChannelConflictDealerAdd, antiChannelConflictDealerEdit },
  data () {
    return {
      headers: {},
      filterText: '',
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      selectedNode: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      no: '',
      name: '',
      mobile: '',
      status: '',
      show: true
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    async getTreeList (data) {
      let tree = []
      await this.$http.post(api.getDealerByParent, { id: data.id }).then(res => {
        tree = res.data.map(x => {
          return {
            label: x.name + (!x.dealerLevel ? '' : '(' + x.dealerLevel.title + ')'),
            id: x.id,
            children: []
          }
        })
      })
      return tree
    },
    async loadNode (node, resolve) {
      if (node.level === 0) {
        let root = [{
          label: '经销商团队',
          id: null,
          children: []
        }]
        return resolve(root)
      }
      return resolve(await this.getTreeList(node.data))
    },
    handleNodeClick (data, node) {
      this.selectedNode = node
      this.currentPage = 1
      this.total = 0
      this.no = ''
      this.name = ''
      this.mobile = ''
      this.status = ''
      this.getList()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getList () {
      this.$http.post(api.dealerList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.no,
        name: this.name,
        mobile: this.mobile,
        status: this.status,
        parentId: this.selectedNode.data.id
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
    handleEdit (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.edit.open(row)
      }, 500)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该经销商吗？')
        .then(() => {
          this.$http.post(api.delDealer, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.show = true
      let parent = this.selectedNode.data
      setTimeout(() => {
        this.$refs.add.open(parent)
      }, 500)
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
    }
  },
  mounted () {
    this.headers['access-token'] = this.$store.state.account.access_token
  },
  created () {
    this.getTreeList({ id: null })
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
