<template>
  <div>
    <el-card>
      <div slot="header">
        <span>我的订单列表</span>
      </div>
      <div class="searchCon clearfix">         
        <!-- <el-button class="right" size="small" type="primary" icon="el-icon-seach" v-on:click="openSearchDialog">查询</el-button> -->
        <!-- <div>
          <el-button >日期，单号，状态，经销商,</el-button>
        </div> -->
        <div class="left">
          <el-input v-model="searchData.no" size="small" placeholder="请输入编号"></el-input>
          <!-- <el-select v-model="status" clearable placeholder="状态" size="small">
            <el-option label="已审核" value="Approved"></el-option>
            <el-option label="已冻结" value="Freeze"></el-option>
            <el-option label="未审核" value="Pending"></el-option>
          </el-select> -->
          <el-date-picker v-model="searchData.createDate1"
            type="date"
            placeholder="选择开始日期"></el-date-picker>
          <el-date-picker v-model="searchData.createDate2"
            type="date"
            placeholder="选择结束日期"></el-date-picker>
          <el-button type="primary" size="small" v-on:click="doSearch" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <span style="display: inline-block;">
            <!-- <el-upload
              size="small"
              v-bind:action="uploadUrl"
              v-bind:show-file-list="false"
              v-bind:on-success="handleUploadSuccess"
              v-bind:headers="headers"
              v-bind:on-error="handleUploadError">
              <el-button type="primary" size="small" plain><i class="el-icon-news"></i> 导入</el-button>
            </el-upload> -->
          </span>
          <el-button type="primary" style="margin-left: 5px;" size="small" icon="el-icon-plus" v-on:click="openAddDialog">添加</el-button>
          <!-- <el-button class="right" size="small" type="danger" icon="el-icon-delete" v-on:click="batchDeleteItems">批量删除</el-button> -->
        </div>
      </div>

      <el-tabs v-model="currentTabName" v-on:tab-click="tabsClick">
        <el-tab-pane label="全部" name="All"></el-tab-pane>
        <el-tab-pane label="待付款" name="Paying"></el-tab-pane>
        <el-tab-pane label="待发货" name="Shiping"></el-tab-pane>
        <el-tab-pane label="待完成" name="Finishing"></el-tab-pane>
        <el-tab-pane label="已完成" name="Finished"></el-tab-pane>
        <el-tab-pane label="已关闭" name="Closed"></el-tab-pane>
      </el-tabs>
      <div class="table-container">
        <el-table v-bind:data="list" style="width: 100%;">

          <el-table-column label="订单号" width="190px" prop="no">
          </el-table-column>

          <el-table-column label="经销商" width="190px" prop="dealerName">
          </el-table-column>

          <el-table-column label="商品总数" align="center" width="90px" prop="productCount">
          </el-table-column>

          <el-table-column label="订单总额" width="90px" align="right">
            <template slot-scope="scope">
              <span class="table-money">{{ scope.row.orderAmount | Currency }}</span>
            </template>
          </el-table-column>

          <el-table-column label="订单状态" align="center" width="90px">
            <template slot-scope="scope">
              <div>{{getStatusText(scope.row.status)}}</div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="审核时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.checkedDatetime | FormattersDate }}</span>
            </template>
          </el-table-column> -->

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-on:click="showDetail(scope.$index, scope.row)">详情</el-button>
              <!-- <el-button v-if="scope.row.status !== '已支付'" size="mini" type="warning">发货</el-button> -->
              <el-button size="mini" type="primary" v-show="getStatusText(scope.row.status)=='待付款'" v-on:click="unknown()">付款</el-button>
              <el-button size="mini" type="primary" v-show="getStatusText(scope.row.status)=='待完成'" v-on:click="setStatusToFinished(scope.$index, scope.row)">确认收货</el-button>
              <el-button size="mini" type="danger" v-show="getStatusText(scope.row.status)!='已完成'&&getStatusText(scope.row.status)!='已关闭'" v-on:click="setStatusToClosed(scope.$index, scope.row)">关闭</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page-container" v-if="searchData.total > searchData.pageSize">
        <el-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total" v-bind:total="searchData.total">
        </el-pagination>
      </div>

      <div>
        <order-detail ref="detail" v-on:getList="getList"/>
        <order-addMineChannelOrder ref="addMineChannelOrder" v-on:getList="getList"/>
        <order-setStatusToClosed ref="setStatusToClosed" v-on:getList="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import orderDetail from './detail'
import orderAddMineChannelOrder from './addMineChannelOrder'
import orderSetStatusToClosed from './setStatusToClosed'
export default {
  name: 'mall-channelOrder-outerChannelOrderList',
  components: { orderDetail, orderAddMineChannelOrder, orderSetStatusToClosed }, // , orderAddEditing
  data () {
    return {
      list: [],
      currentTabName: 'All',
      searchData: {
        pageSize: 10,
        page: 1,
        total: 0,
        no: '',
        status: '',
        createDate1: '',
        createDate2: ''
      }
    }
  },
  methods: {
    getList () {
      this.searchData.createDate1 = this.$common.timeChange(this.searchData.createDate1)
      this.searchData.createDate2 = this.$common.timeChange(this.searchData.createDate2)
      this.$http.post(api.mallMineChannelOrderList, this.searchData).then(res => {
        this.list = res.data.rows
        this.searchData.total = res.data.total
      })
    },
    tabsClick (tab, event) {
      var tabkey = tab.name
      this.searchData.status = tabkey === 'All' ? '' : tabkey
      // console.log(tab, event)
      // tabActiveName
      this.doSearch()
    },
    showDetail (index, row) {
      this.$refs.detail.open(row)
    },
    unknown () {
      alert('unknown')
    },
    getStatusText (status) {
      switch (status) {
        // case 'Checking': return '待审核'
        case 'Paying': return '待付款'
        case 'Shiping': return '待发货'
        case 'Finishing': return '待完成'
        case 'Finished': return '已完成'
        case 'Closed': return '已关闭'
      }
      return ''
    },
    openAddDialog () {
      this.$refs.addMineChannelOrder.open()
    },
    doSearch () {
      this.searchData.page = 1
      this.searchData.total = 0
      this.getList()
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
    setStatusToFinished (index, row) {
      if (!confirm('要确认收货吗?')) {
        return
      }
      //
      this.$http.post(api.mallChannelOrderSetStatusToFinished, {id: row.id}).then(response => {
        if (response.status === 200) {
          this.$notify({ title: '成功', message: '订单确认收货成功！', type: 'success' })
          this.getList()
        } else {
          this.$notify({ title: '失败', message: response.message, type: 'error' })
        }
      })
    },
    setStatusToClosed (index, row) {
      this.$refs.setStatusToClosed.open(row)
    },
    noneFunction () {
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
.table-money {
color: #ef4f4f;

}
</style>
