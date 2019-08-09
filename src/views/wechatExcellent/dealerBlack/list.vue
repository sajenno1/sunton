<template>
  <div>
    <el-card>
      <div slot="header">
        <span>经销商黑名单</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="no" size="small" placeholder="请输入编号"></el-input>

          <el-input v-model="name" size="small" placeholder="请输入名称"></el-input>

          <el-input v-model="mobile" size="small" placeholder="请输入手机号码"></el-input>

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
          stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="dealerblack-table-expand">
                <el-form-item label="原因:">
                  <span>{{ props.row.reason }}</span>
                </el-form-item>
                <el-form-item label="所在区:">
                  <span>{{ props.row.dealer.areaName }}</span>
                </el-form-item>
                <el-form-item label="地址:">
                  <span>{{ props.row.dealer.address }}</span>
                </el-form-item>
                <el-form-item label="电话:">
                  <span>{{ props.row.dealer.tel }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="48"
            align="center"
            v-if="false"
            >
          </el-table-column>

          <el-table-column
            label="编号"
            prop="dealer.no">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="dealer.name">
          </el-table-column>

          <el-table-column
            label="联系人"
            prop="dealer.linkMan">
          </el-table-column>

          <el-table-column
            label="手机"
            prop="dealer.mobile">
          </el-table-column>

          <el-table-column
            label="状态"
            prop="dealer.status">
          </el-table-column>

          <el-table-column
            label="级别"
            prop="dealer.titleLevel">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="230" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">移出</el-button>
              <el-button
                size="mini"
                type="info"
                @click="handleApproved(scope.$index, scope.row)" v-if="scope.row.status === 'Approved'">冻结</el-button>
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
        <dealerblack-add
          ref="add"
          @getList="getList">
        </dealerblack-add>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import dealerblackAdd from './add'

export default {
  name: 'wechatexcellent-dealerblack-list',
  components: {dealerblackAdd},
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      show: true,
      no: '',
      name: '',
      mobile: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.weChatExcellentDealerBlackList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.no,
        name: this.name,
        mobile: this.mobile
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
      this.$confirm('确定要移出该黑名单吗？')
        .then(() => {
          this.$http.post(api.weChatExcellentDeleteDealerBlack, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '恢复成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleApproved (index, row) {
      this.$http.post(api.updateDealerStatus, {
        id: row.dealer.id,
        dealerStatus: 'Freeze'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '冻结成功' })
        row.dealer.status = 'Freeze'
      })
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
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
.dealerblack-table-expand {
  font-size: 0;
}
.dealerblack-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
  color: #99a9bf;
}
</style>
