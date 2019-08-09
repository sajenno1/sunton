<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>仓库列表</span>
      </div>

      <div style="padding-bottom:10px;">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
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
            label="编号"
            width="120"
            prop="no">
          </el-table-column>

          <el-table-column
            label="名称"
            width="155"
            prop="name">
          </el-table-column>

          <el-table-column
            label="类别"
            width="120"
            prop="warehouseType">
          </el-table-column>

          <!-- <el-table-column
            label="地区"
            prop="areaName">
          </el-table-column> -->

          <!-- <el-table-column
            label="地址"
            prop="address">
          </el-table-column> -->

          <!-- <el-table-column
            label="手机"
            prop="mobile" align="center">
          </el-table-column> -->

          <!-- <el-table-column
            label="电话"
            prop="tel" align="center">
          </el-table-column> -->

          <!-- <el-table-column
            label="联系人"
            prop="linkMan">
          </el-table-column> -->

          <el-table-column
            label="创建时间"
            width="240"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" >
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
      <anti-channel-conflict-warehouse-add
        ref="add"
        @getList="getList">
      </anti-channel-conflict-warehouse-add>

      <anti-channel-conflict-warehouse-edit
        ref="edit"
        @getList="getList">
      </anti-channel-conflict-warehouse-edit>
    </div>

  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictWarehouseAdd from './add'
import antiChannelConflictWarehouseEdit from './edit'
export default {
  name: 'antiChannelConflict-warehouse-list',
  components: { antiChannelConflictWarehouseAdd, antiChannelConflictWarehouseEdit },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getList () {
      this.$http.post(api.warehouseList, {
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
    openAddDialog () {
      this.$refs.add.open()
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除数据？')
        .then(() => {
          this.$http.post(api.delWarehouse, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
          })
        })
        .catch(() => {})
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
.el-card__body .searchCon{
  height:65px;
}
</style>
