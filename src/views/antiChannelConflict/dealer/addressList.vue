<template>
  <div>
    <el-dialog title="经销商收货地址列表" :visible.sync="show" width="60%">

      <div>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="收货人"
            prop="contacter">
          </el-table-column>

          <el-table-column
            label="联系电话"
            prop="mobile">
          </el-table-column>

          <el-table-column
            label="详细地址"
            prop="address">
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
      <anti-channel-conflict-dealer-add-address
        ref="addAddress"
        @getList="getList"/>

      <anti-channel-conflict-dealer-edit-address
        ref="editAddress"
        @getList="getList"
        @close="close"/>          
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerAddAddress from './addAddress'
// import antiChannelConflictDealerEditAddress from './editAddress'
import antiChannelConflictDealerEditAddress from '../../mall/userAddress/edit'
export default {
  name: 'antiChannelConflict-dealer-account',
  components: { antiChannelConflictDealerAddAddress, antiChannelConflictDealerEditAddress },
  data () {
    return {
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
      this.$http.post(api.UserAddressListByDealer, {
        dealerId: this.row.id
      }).then(res => {
        this.list = res.data.rows
      })
    },
    openAddDialog () {
      this.$refs.addAddress.open(this.row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该收货地址吗？')
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
    },
    handleEdit (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.editAddress.open(row.id)
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
