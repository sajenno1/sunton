<template>
  <div>
    <el-dialog title="收货地址列表" :visible.sync="show" width="60%">
      <div>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-edit" @click="openAddDialog">新增地址</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            type="selection"
            width="50"
            align="center">
          </el-table-column>

          <el-table-column
            label="地区"
            width="150"
            prop="areaName">
          </el-table-column>

          <el-table-column
            label="地址"
            width="200"
            prop="fullAreaName">
          </el-table-column>

          <el-table-column
            label="联系人"
            width="200"
            prop="contacter">
          </el-table-column>          

          <el-table-column
            label="手机"
            width="200"
            prop="mobile">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>           

          <el-table-column align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" v-on:click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import * as api from '../../../api'
import addUserAddress from '../../mall/userAddress/add'
import editUserAddress from '../../mall/userAddress/edit'

export default {
  name: 'antiChannelConflict-dealer-adminAddresstList',
  components: {addUserAddress, editUserAddress},
  data () {
    return {
      pageSize: 100,
      currentPage: 1,
      show: false,
      list: [],
      row: {},
      columns: [],
      data: []
    }
  },
  methods: {
    open (row) {
      this.show = true
      this.row = row
      this.getList()
    },
    getList () {
      this.$http.post(api.dealerAddressList, {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        dealerId: this.row.id
      }).then(res => {
        this.list = res.data.rows
      })
    },
    openAddDialog () {
      // this.$refs.addUserAddress.open(this.row)
    },
    handleEdit (index, row) {
      // this.$refs.editUserAddress.open(this.row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该地址吗？')
        .then(() => {
          this.$http.post(api.delUserAddress, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
