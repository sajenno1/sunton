<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>资源列表</span>
          </div>

          <div>
            <el-menu>
              <el-menu-item
                v-for="item in resourceList"
                :key="item.id"
                :index="item.id"
                @click="handleSelected(item)">
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card>
          <div slot="header">
            <span>资源升级列表</span>
          </div>

          <div>
            <el-button size="small"  style="margin: 0 20px 10px; float: right;" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
          </div>

          <div class="table-container">
            <el-table
              :data="list"
              border
              style="width: 100%">

              <el-table-column
                label="资源代码"
                prop="resourceKey">
              </el-table-column>

              <el-table-column
                label="版本号"
                prop="version">
              </el-table-column>

              <el-table-column
                label="整型版本号"
                prop="intVersion">
              </el-table-column>

              <el-table-column
                label="更新说明"
                prop="updateDescription">
              </el-table-column>

              <el-table-column
                label="完整更新">
                <template slot-scope="scope">
                  <span>{{ scope.row.fullUpdate ? '是' : '否' }}</span>
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

          <div>
            <add-update ref="add" @getList="getList"/>
            <edit-update ref="edit" @getList="getList"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from '../../../api'
import addUpdate from './add'
import editUpdate from './edit'
export default {
  name: 'updater-resourceUpdate-list',
  components: { addUpdate, editUpdate },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      resourceList: [],
      row: {}
    }
  },
  methods: {
    getResourceList () {
      this.$http.post(api.resourceList, {
        page: 1,
        pageSize: 100
      }).then(res => {
        this.resourceList = res.data.rows
      })
    },
    getList () {
      this.$http.post(api.resourceUpdateList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        resourceId: this.row.id
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
    openAddDialog () {
      this.$refs.add.open(this.row)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该数据？').then(() => {
        this.$http.post(api.delResourceUpdate, { id: row.id }).then(res => {
          this.getList()
          this.$notify.success({ title: '成功', message: '删除成功' })
        })
      })
    },
    handleSelected (row) {
      this.row = row
      this.init()
      this.getList()
    },
    init () {
      this.pageSize = 10
      this.currentPage = 0
      this.total = 0
      this.list = []
    }
  },
  mounted () {
    this.getResourceList()
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
