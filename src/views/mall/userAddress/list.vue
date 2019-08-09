<template>
  <div>
    <el-card>
      <div slot="header">
        <span>收货地址</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="searchData.address" placeholder="请输入地址"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" v-on:click="doSearch">搜索</el-button>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" v-on:click="openCreate">添加</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="地区"
            prop="areaName">
          </el-table-column>

          <el-table-column
            label="地址" prop="fullAreaName">
          </el-table-column>

          <el-table-column
            label="联系人" prop="contacter">
          </el-table-column>

          <el-table-column
            label="手机" prop="mobile">
          </el-table-column>

          <el-table-column
            label="默认">
            <template slot-scope="scope">
              <el-tag v-bind:type="scope.row.isDefault ? 'success' : 'warning'" v-on:click.native="if(!scope.row.isDefault)handleSetDefault(scope.row)">
                {{ scope.row.isDefault ? '默认' : '设为默认'}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-on:click="openEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                v-on:click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container" v-if="searchData.total > searchData.pageSize">
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="searchData.total">
        </el-pagination>
      </div>

      <div>
        <userAddress-add ref="add" v-on:getList="getList"></userAddress-add>
        <userAddress-edit ref="edit" v-on:getList="getList"></userAddress-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import userAddressAdd from './add'
import userAddressEdit from './edit'
export default {
  name: 'mall-userAddress-list',
  components: { userAddressAdd, userAddressEdit },
  data () {
    return {
      searchData: {
        address: '',
        page: 1,
        pageSize: 10,
        total: 0
      },
      list: []
      // name: '',
      // no: '',
      // uploadUrl: this.$http.defaults.baseURL + api.importMallProducts,
      // headers: {}
    }
  },
  methods: {
    getList () {
      this.$http.post(api.userAddressList, {
        page: this.searchData.page,
        pageSize: this.searchData.pageSize,
        keyword: this.searchData.address
      }).then(res => {
        this.list = res.data.rows
        this.searchData.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.searchData.pageSize = val
      this.searchData.page = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.searchData.page = val
      this.getList()
    },
    handleDelete (index, row) {
      this.$confirm('确定删除吗？')
        .then(() => {
          this.$http.post(api.delUserAddress, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openCreate () {
      this.$refs.add.open()
    },
    openEdit (index, row) {
      this.$refs.edit.open(row.id)
    },
    handleSetDefault (row) {
      this.$http.post(api.setDefaultUserAddress, {
        id: row.id
      }).then(res => {
        this.getList()
        this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
      })
    },
    // handleUploadError (err, file) {
    //   this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    // },
    // handleUploadSuccess (res, file) {
    //   this.$notify.success({ title: '成功', message: '导入成功' })
    //   this.getList()
    // }, a
    doSearch () {
      this.searchData.page = 1
      this.searchData.total = 0
      this.getList()
    }
  },
  mounted () {
    this.getList()
    // this.headers['access-token'] = this.$store.state.account.access_token
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
