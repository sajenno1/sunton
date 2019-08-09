<template>
  <div>
    <el-dialog title="经销商账户列表" :visible.sync="show" width="60%">

      <div>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="微信昵称"
            prop="nickName">
          </el-table-column>

          <!-- <el-table-column
            label="密码"
            prop="password">
          </el-table-column> -->

          <el-table-column
            label="显示名称"
            prop="displayName">
          </el-table-column>

          <el-table-column
            label="登陆的次数"
            prop="loginCount">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
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
    </el-dialog>
    <div>
      <anti-channel-conflict-dealer-addAccount
        ref="addAccount"
        @getList="getList"/>
      <anti-channel-conflict-dealer-editAccount
        ref="editAccount"
        @getList="getList"
        @close="close"/>          
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerAddAccount from './addAccount'
import antiChannelConflictDealerEditAccount from './editAccount'
export default {
  name: 'antiChannelConflict-dealer-account',
  components: { antiChannelConflictDealerAddAccount, antiChannelConflictDealerEditAccount },
  data () {
    return {
      pageSize: 10,
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
      console.log(1)
      this.getList()
    },
    getList () {
      this.$http.post(api.dealerAccountList, {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        dealerId: this.row.id
      }).then(res => {
        this.list = res.data.rows
      })
    },
    openAddDialog () {
      this.$refs.addAccount.open(this.row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该经销商账户吗？')
        .then(() => {
          this.$http.post(api.delDealerAccount, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    close () {
      this.show = false
    },
    handleEdit (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.editAccount.open(row)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
