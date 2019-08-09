<template>
  <div>
    <el-card>
      <div slot="header">
        <span>渠道订单列表</span>
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
          <!-- <el-button type="primary" style="margin-left: 5px;" size="small" icon="el-icon-edit" v-on:click="openProfitStatistics">分润统计</el-button> -->
          
          <!-- <el-button type="primary" style="margin-left: 5px;" size="small" icon="el-icon-edit" v-on:click="seeQrcodeProductTemp">qr</el-button> -->
          <!-- <el-button type="primary" style="margin-left: 5px;" size="small" icon="el-icon-edit" v-on:click="openAddDialog">添加</el-button> -->
          <!-- <el-button class="right" size="small" type="danger" icon="el-icon-delete" v-on:click="batchDeleteItems">批量删除</el-button> -->
        </div>
      </div>

      <!--<el-tabs v-model="currentTabName" v-on:tab-click="tabsClick">-->
      <el-tabs v-model="currentTabName" v-on:tab-click="tabsClick" type='card'>
        <el-tab-pane label="全部" name="All"></el-tab-pane>
        <!-- <el-tab-pane label="未发货" name="Paying"></el-tab-pane> -->
        <el-tab-pane label="待发货" name="Shiping"></el-tab-pane>
        <el-tab-pane label="待完成" name="Finishing"></el-tab-pane>
        <el-tab-pane label="已完成" name="Finished"></el-tab-pane>
        <el-tab-pane label="已关闭" name="Closed"></el-tab-pane>
      </el-tabs>
      <div class="table-container">
        <el-table v-bind:data="list" style="width: 100%;">

          <el-table-column label="订单号" width="170px" prop="no">
          </el-table-column> 
          <el-table-column label="经销商" width="150" prop="dealerName">
          </el-table-column>

          <el-table-column label="商品总数" align="center" width="120px" prop="productCount">
          </el-table-column>

          <el-table-column label="订单总额" width="120px" align="right">
            <template slot-scope="scope">
              <span class="table-money">{{ scope.row.orderAmount | Currency }}</span>
            </template>
          </el-table-column>

          <el-table-column label="订单状态" align="center" width="120px">
            <template slot-scope="scope">
              <div>{{getStatusText(scope.row.status)}}</div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" align="center" width="130">
          <!--<el-table-column label="创建时间" align="center" width="180">-->
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="审核时间" align="center" width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.checkedDatetime | FormattersDate }}</span>
            </template>
          </el-table-column> -->

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--<el-button size="mini" type="primary" v-on:click="showDetail(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="primary" v-on:click="showPrint(scope.$index, scope.row)">打印</el-button>-->
              <!-- <el-button size="mini" type="primary" v-on:click="showDetail(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="primary" v-on:click="showPrint(scope.$index, scope.row)">打印</el-button> -->
              <!-- <el-button v-show="getStatusText(scope.row.status)=='待审核'" size="mini" type="primary" v-on:click="setStatusToChecked(scope.$index, scope.row)">审核</el-button> -->
              <!-- <el-button v-show="scope.row.boolShip && getStatusText(scope.row.status)=='待发货'" size="mini" type="primary" v-on:click="setStatusToShiped(scope.$index, scope.row)">发货</el-button> -->
              <!-- <el-button v-if="scope.row.status !== '已支付'" size="mini" type="warning">发货</el-button> -->
              <!-- <el-button size="mini" type="danger" v-show="getStatusText(scope.row.status)!='已完成'&&getStatusText(scope.row.status)!='已关闭'" v-on:click="setStatusToClosed(scope.$index, scope.row)">关闭</el-button> -->
              <el-button  type="text" v-on:click="showDetail(scope.$index, scope.row)">详情</el-button>
              <el-button  type="text" v-on:click="showPrint(scope.$index, scope.row)">打印</el-button>
              <!-- <el-button  type="text" v-show="scope.row.boolShip && getStatusText(scope.row.status)=='待发货'"  v-on:click="setStatusToShiped(scope.$index, scope.row)">发货</el-button>
              <el-button  type="text" v-show="getStatusText(scope.row.status)!='已完成'&&getStatusText(scope.row.status)!='已关闭'" v-on:click="setStatusToClosed(scope.$index, scope.row)">关闭</el-button> -->
              <el-dropdown>
                <el-button type="text" class="more" v-show="getStatusText(scope.row.status)!='已完成' && getStatusText(scope.row.status)!='已关闭'">...</el-button>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-show="scope.row.boolShip && getStatusText(scope.row.status)=='待发货'" v-on:click.native="setStatusToShiped(scope.$index, scope.row)">发货</el-dropdown-item>
                  <el-dropdown-item v-show="getStatusText(scope.row.status)!='已完成'&&getStatusText(scope.row.status)!='已关闭'" v-on:click.native="setStatusToClosed(scope.$index, scope.row)">关闭</el-dropdown-item>
                  <el-dropdown-item v-show="false">退款</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
        <order-printReport ref="printReport" />
        <!-- <order-addEditing ref="addEditing" v-on:getList="getList"/> -->
        <!-- <order-checked ref="orderChecked" v-on:getList="getList" /> -->
      </div>
    </el-card>
    <order-setStatusToClosed ref="setStatusToClosed" v-on:getList="getList" />
    <order-qrcodeProductTemp ref="qrcodeProductTemp" v-on:getList="getList" />
    <order-setStatusToShiped ref="setStatusToShiped" v-on:getList="getList" />
    <!-- <el-dialog v-bind:visible.sync="bShowProfitStatistics">
      <div>
        <ul>
          <li v-for="item in profitStatisticsList">
            <div>
              单号：{{item.orderNo}}　羊：{{item.orderAmount}}
            </div>
            <div>
              经销商：{{item.dealerNo}}　{{item.dealerName}}
            </div>
            <div v-for="item2 in item.items">
              &nbsp;&nbsp;产品：{{item2.productNo}} {{item2.productName}} <br/>
              &nbsp;&nbsp;产品价：{{item2.price}} <br/>
              &nbsp;&nbsp;购价：{{item2.levelPrice}} <br/>
              &nbsp;&nbsp;数量：{{item2.quantity}} <br/>
              &nbsp;&nbsp;金额：{{item2.productAmount}} <br/>
              &nbsp;&nbsp;商级：{{item2.descIndex}} <br/>
              &nbsp;&nbsp;经销商：{{item2.dealerNo}} {{item2.dealerName}} <br/>
              &nbsp;&nbsp;地区：{{item2.areaProvince}} <br/>
            </div>
          </li>
        </ul>
      </div>
    </el-dialog> -->
  </div>
</template>


<script>
import * as api from '../../../api'
import orderDetail from './detail'
// import orderPrintReport from './printReport'
import orderSetStatusToClosed from './setStatusToClosed'
import orderQrcodeProductTemp from './qrcodeProductTemp'
import orderSetStatusToShiped from './setStatusToShiped'
// import orderChecked from './orderChecked'
// import orderAddEditing from './addEditing'
export default {
  name: 'mall-channelOrder-outerChannelOrderList',
  // components: { orderDetail, orderSetStatusToClosed, orderQrcodeProductTemp, orderPrintReport }, //, orderAddEditing, orderChecked
  components: { orderDetail, orderSetStatusToClosed, orderQrcodeProductTemp, orderSetStatusToShiped }, //, orderAddEditing, orderChecked
  data () {
    return {
      steel: {no: '123123', items: [{name: '产品1测试', specifications: '12*123'}, {name: '产品2', specifications: '无规格'}]},
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
      },
      bShowProfitStatistics: false,
      // profitStatisticsList: []
      profitStatisticsList: [],
      colorItems: [],
      showSizeList: [],
      billInfo: {}
    }
  },
  methods: {
    getList () {
      this.searchData.createDate1 = this.$common.timeChange(this.searchData.createDate1)
      this.searchData.createDate2 = this.$common.timeChange(this.searchData.createDate2)

      var _this = this
      this.$http.post(api.mallOuterChannelOrderList, this.searchData).then(res => {
        res.data.rows.forEach((item) => {
          item.boolShip = false
        })
        this.list = res.data.rows
        this.searchData.total = res.data.total
        //
        setTimeout(() => {
          // console.log('adminInfo_')
          // console.log(_this.$store.state.account.adminInfo) // roleName
          _this.list.forEach((item) => {
            if (_this.$store.state.account.adminInfo.roleName === '总部管理员' || _this.$store.state.account.adminInfo.roleName === '超级管理员') item.boolShip = true
          })
        }, 500)
      })
    },
    setStatusToShiped (index, row) {
      this.$refs.setStatusToShiped.open(row)
    },
    seeQrcodeProductTemp () {
      this.$refs.qrcodeProductTemp.show()
    },
    tabsClick (tab, event) {
      var tabkey = tab.name
      this.searchData.status = tabkey === 'All' ? '' : tabkey
      // console.log(tab, event)
      // tabActiveName
      // searchData.status
      this.doSearch()
    },
    showDetail (index, row) {
      this.$refs.detail.open(row)
    },
    showPrint (index, row) {
      // this.$refs.printReport.open(row)
      var _this = this
      // _this.colorItems = []
      // _this.showSizeList = []
      // console.log('开始打印....')
      // console.log(row)
      this.$http.post(api.mallOrderPrintInfo, { id: row.id }).then(res => {
        console.log(res)
        _this.colorItems = res.data.colorItems
        _this.showSizeList = res.data.showSizeList
        _this.billInfo.acountName = res.data.acountName
        _this.billInfo.apliPay = res.data.apliPay
        _this.billInfo.banckAcount = res.data.banckAcount
        _this.billInfo.createDate = res.data.createDate
        _this.billInfo.customerAddress = res.data.customerAddress
        _this.billInfo.customerName = res.data.customerName
        _this.billInfo.phone = res.data.phone
        _this.billInfo.no = res.data.bill
        _this.printAction(row)
      })
    },
    printAction (row) {
      // todo: 暂时屏蔽
      // this.$refs.printReport.open(row)
      var _this = this
      var summary = []
      summary.push(row.no)
      summary.push(_this.billInfo.customerAddress)
      summary.push(_this.billInfo.customerName)
      summary.push(_this.billInfo.phone)
      summary.push(_this.billInfo.createDate)
      var printData = {
        title: '发货单',
        no: row.no,
        summary: summary,
        columns: [{
          name: '货号',
          prop: 'code',
          width: '10%'
        }, {
          name: '名称',
          prop: 'name',
          width: '10%'
        }, {
          name: '颜色',
          prop: 'color',
          width: '9%'
        }, {
          name: '规格',
          prop: 'size',
          width: '9%'
        }, {
          name: '单位',
          prop: 'unit',
          width: '9%'
        }, {
          name: '数量',
          prop: 'quantity',
          width: '9%'
        }, {
          name: '单价',
          prop: 'unitPrice',
          width: '9%'
        }, {
          name: '金额',
          prop: 'price',
          width: '9%'
        }, {
          name: '备注',
          prop: 'remark',
          width: '20%'
        }],
        data: _this.colorItems,
        sizeData: _this.showSizeList,
        billInfo: _this.billInfo,
        footer: ['发货方：   ',
          '客户签收：']
      }
      this.$print.preView(printData, {footerColumn: 3})
    },
    setStatusToChecked (index, row) {
      // this.$refs.orderChecked.open()
      this.$http.post(api.mallChannelOrderSetStatusToChecked, {id: row.id}).then(res => {
        this.$notify({ title: '成功', message: '订单审核成功！', type: 'success' })
        this.getList()
      })
    },
    setStatusToClosed (index, row) {
      this.$refs.setStatusToClosed.open(row)
    },
    getStatusText (status) {
      switch (status) {
        // case 'Paying': return '待付款'
        case 'Shiping': return '待发货'
        case 'Finishing': return '待完成'
        case 'Finished': return '已完成'
        case 'Closed': return '已关闭'
        case 'BackFunding': return '退款中'
      }
      return ''
    },
    // openAddDialog () {
    //   this.$refs.addEditing.open()
    // },
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
    openProfitStatistics () {
      this.bShowProfitStatistics = true
      this.profitStatisticsGetList()
    },
    profitStatisticsGetList () {
      this.$http.post(api.mallMineProfitList, {}).then((res) => {
        this.profitStatisticsList = res.data.rows
      })
    },
    // handleDelivery (index, row) {
    //   this.$refs.delivery.open(row.id)
    // },
    // openSearchDialog () {
    //   this.$refs.search.open()
    // },
    // searchOrder (searchdata) {
    //   this.searchdata = searchdata
    //   this.currentPage = 1
    //   this.total = 0
    //   this.getList()
    // },
    // handleClose (index, row) {
    //   this.$confirm('确认要关闭订单,此操作无法撤销, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$http.post(api.closeMallOrder, {
    //       id: row.id
    //     }).then(res => {
    //       row.orderStatus = this.orderStatusText[res.data.orderStatus]
    //       this.$notify({ title: '成功', message: '订单关闭成功！', type: 'success' })
    //       this.getList()
    //     })
    //   }).catch(() => {})
    // },
    noneFunction () {
    }
  },
  mounted () {
    this.doSearch()
    // console.log(orderDetail)
    // console.log(orderAddEditing)
    // orderAddEditing.orderDetail()
    // orderAddEditing.open()
    // orderDetail.$emit('open')
    // orderAddEditing.$emit('open')
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
.more{
  position: relative;
  margin-left: 5px
}
.more>span{
  position: absolute!important;
  top: -4px!important
}
</style>
