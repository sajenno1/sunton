<style>
/* 报表 */
.baobiao{
  padding: 1%
}
.baobiao .el-tabs__nav-wrap{
  padding: 0 3%;
}
.baobiao .date-group{
  display: flex;
  align-items: center
}
.baobiao .date-group>span{
  display: inline-block;
  width: 60px
}
.baobiao .el-tabs__item{
  font-size: 16px;
  height: 50px;
  line-height: 50px
}
.pad3{
    padding: 0 3%;
}
.baobiao .choose-btn{
  display: flex;
  justify-content: space-between;
  align-items: center
}
.baobiao .date-group{
  position: absolute;
  right: 0;
  top: 19%;
  height: 50px;
  line-height: 50px;
  margin: 1% 4% 0 0;
  z-index: 99
}
.baobiao .el-table th {
  background-color: #fafafa;
  color: #333
}
.baobiao .el-table__footer-wrapper tbody td{
  background-color: #fff
}
.baobiao .el-table__footer .el-table_1_column_1>div{
   font-weight: bold
}
.baobiao .el-pagination.is-background .btn-next,.baobiao .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background-color: #fff;
  border: 1px solid #dcdfe6;
  font-weight: 400;
  border-radius: 5px;
}
.baobiao .el-pagination{
  display: flex;
  width: 100%;
}
.baobiao .el-pagination>span:first-child{
  flex: 1;
}
.baobiao .el-pagination__jump{
  margin-left: 0;
}
.baobiao .el-button-group .el-button:not(:last-child){
  margin-right: 0;
  border-right: 1px solid transparent
}
.baobiao .el-button-group .active{
  border: 1px solid #1890FF;
  border-right: 1px solid #1890FF!important;
  color: #1890FF
}
</style>

<template>
  <div>
    <el-card>
      <div slot="header">
        <span v-on:click="reRreshData">销售统计报表</span>
      </div>

      <div class="baobiao">
        <!-- <div class="date-group">
            <span>今日</span>
            <span>本周</span>
            <span>本月</span>
            <span>全年</span>
            <el-date-picker v-model="value6" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" size='small'>
            </el-date-picker>
          </div> -->
        <div style="position:relative;z-index:99">
          <!-- <div class="date-group" style="position:absolute;top:-12px;right:25%;">
            <span v-on:click="setSearchDateType(0)">今日</span>
            <span v-on:click="setSearchDateType(1)">本周</span>
            <span v-on:click="setSearchDateType(2)">本月</span>
            <span v-on:click="setSearchDateType(3)">全年</span>
          </div> -->
            <!-- <span v-on:click="setSearchDateType(4)">三个月</span> -->
          <!-- <el-date-picker style="position:absolute;top:12px;right:1%;" v-model="timeSolt" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" size='small'>
          </el-date-picker> -->
          
          <el-date-picker style="position:absolute;top:12px;right:1%;"
            v-model="timeSolt"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            v-on:change="pickerSearch"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>

        <el-tabs v-model="degreeActiveName" v-on:tab-click="degreeTabClick">
          <el-tab-pane label="订货金额" name="amountSum" class="pad3"></el-tab-pane>
          <el-tab-pane label="订货数量" name="quantitySum"></el-tab-pane>
          <el-tab-pane label="订货单数" name="orderCount"></el-tab-pane>
          <el-tab-pane label="经销商数" name="dealerCount"></el-tab-pane>
        </el-tabs>
        
        <div class="choose-btn">
          <div>
            <el-button-group>
              <el-button size='small' v-on:click="changeStatType(0)" v-bind:class="{active:statType==0}">按天</el-button>
              <el-button size='small' v-on:click="changeStatType(1)" v-bind:class="{active:statType==1}">按月</el-button>
            </el-button-group>
          </div>
          <div>
            <el-button-group>
              <el-button size='small' v-on:click='changeImageType(0)' v-bind:class="{active:imageType==0}">柱状</el-button>
              <el-button size='small' v-on:click='changeImageType(1)' v-bind:class="{active:imageType==1}">线状</el-button>
            </el-button-group>
          </div>
        </div>
        <div>
          <div class="box-body"  style="margin-left:-3%">
            <div id="order-chart-bar" style="width: 70vw;height:400px;" v-show="imageType == 0"></div>
            <div id="order-chart-line" style="width: 70vw;height:400px;" v-show="imageType == 1"></div>
          </div>
        </div>
        <el-table :data="reportDataRows" style="width: 100%;text-align:center;margin-top:1%" show-summary >
          <el-table-column prop="date" label="日期" align='center' width='180'>
          </el-table-column>
          <el-table-column prop="orderCount" label="订货单数" align='center'>
          </el-table-column>
          <el-table-column prop="dealerCount" label="订货客户" align='center'>
          </el-table-column>
          <el-table-column prop="quantitySum" label="订货数量" align='center'>
          </el-table-column>
          <el-table-column prop="amountSum" label="订货金额" align='center'>
          </el-table-column>
        </el-table>
        <!-- <div style="display: flex;justify-content: space-between;width: 100%;padding:2% 0">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[100, 200, 300, 400]"
            :page-size="100" layout=" total,prev, pager, next, sizes, jumper" :total="400" >
          </el-pagination>
        </div> -->

        <el-button v-show="false" type="primary" style="margin-left: 5px;" size="small" icon="el-icon-edit" v-on:click="openProfitStatistics">分润统计</el-button>
      </div>
    </el-card>
    <el-dialog v-bind:visible.sync="bShowProfitStatistics">
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
              [$$]&nbsp;&nbsp;产品：{{item2.productNo}} {{item2.productName}} <br/>
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
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import echarts from 'echarts'
import commonJs from '../../../filter/common'
// import 'echarts/map/js/china.js'
export default {
  name: 'sellOrderReport-sellStatistics-reports',
  data () {
    return {
      timeSolt: ['', ''],
      degreeActiveName: 'amountSum',
      imageType: 0,
      bShowProfitStatistics: false,
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick (picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: '本周',
          onClick (picker) {
            picker.$emit('pick', commonJs.getWeekStartAndEnd(0))
          }
        }, {
          text: '本月',
          onClick (picker) {
            picker.$emit('pick', commonJs.getMonthStartAndEnd(0))
          }
        }, {
          text: '今年',
          onClick (picker) {
            picker.$emit('pick', commonJs.getYearStartAndEnd(0))
          }
        }]
      },
      formLabelWidth: '120px',
      report1Data1: ['dd', 'tt', 'vv', 'jj', '5', '6'],
      report1Data2: 2030,
      report1Data3: [],
      pieData: {
        Data1: [],
        Data2: 0,
        Data3: []
      },
      statType: 0,
      barData: {
        Data1: [],
        Data2: [],
        Data3: [],
        Data4: [],
        Data5: []
      },
      reportDataSet: {},
      reportDataRows: [],
      profitStatisticsList: []
    }
  },
  methods: {
    handleSizeChange () {
    },
    handleCurrentChange () {
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
    // setSearchDateType (t) {
    //   this.timeSolt = this.getSearchDateType(t)
    // },
    // getSearchDateType (t) {
    //   switch (t) {
    //     case 0:
    //       return [new Date(), new Date()]
    //     case 1:
    //       return this.$common.getWeekStartAndEnd(0)
    //     case 2:
    //       return this.$common.getMonthStartAndEnd(0)
    //     case 3:
    //       var cd1 = new Date().getFullYear()
    //       return [cd1 + '-01-01', cd1 + '-12-31 23:59:59']
    //     case 4:
    //       return [this.$common.getMonthStartAndEnd(-2)[0], new Date()]
    //   }
    //   return ['', '']
    // },
    degreeTabClick (tab, event) {
      this.getOrderCharts()
    },
    pickerSearch () {
      this.searchReports()
    },
    changeImageType (i) {
      this.imageType = i
    },
    changeStatType (ty) {
      this.statType = ty
      this.buildReport()
    },
    init () {
      this.timeSolt = commonJs.getMonthStartAndEnd(0)
      this.reportDataSet = {'0': [], '1': []}
      this.searchReports()
    },
    searchReports () {
      if (this.timeSolt.length < 2) {
        this.$notify.info({ title: `提示`, message: '数据有误！' })
        return
      }
      if (this.timeSolt[0] === '') {
        this.$notify.info({ title: `提示`, message: '开始日期为空！' })
        return
      }
      if (this.timeSolt[1] === '') {
        this.$notify.info({ title: `提示`, message: '结束日期为空！' })
        return
      }
      var createDate1 = this.$common.timeChange(this.timeSolt[0], 'yyyy-mm-dd')
      var createDate2 = this.$common.timeChange(this.timeSolt[1], 'yyyy-mm-dd') + ' 23:59:59'
      if (new Date(createDate2) < new Date(createDate1)) {
        alert('错误的时间间隔')
        return
      }
      this.imageType = 0
      this.degreeActiveName = 'amountSum'
      this.statType = 0
      var _this = this

      // var url = ''
      // if (this.statType === 0) {
      //   url = api.SellOrderReportByDay
      // } else if (this.statType === 1) {
      //   url = api.SellOrderReportByMonth
      // }
      // reportDataSet

      _this.$http.post(api.SellOrderReportByDay, {
        createDate1: createDate1,
        createDate2: createDate2
      }).then(res => {
        // this.reportDataRows = res.data.rows
        _this.reportDataSet['0'] = res.data.rows
        _this.buildReport()
      })
      setTimeout(function () {
        _this.$http.post(api.SellOrderReportByMonth, {
          createDate1: createDate1,
          createDate2: createDate2
        }).then(res => {
          // this.reportDataRows = res.data.rows
          _this.reportDataSet['1'] = res.data.rows
          // this.buildReport()
        })
      }, 1000)
    },
    buildReport () {
      // var createDate1 = this.$common.timeChange(this.timeSolt[0], 'yyyy-mm-dd')
      // var createDate2 = this.$common.timeChange(this.timeSolt[1], 'yyyy-mm-dd') + ' 23:59:59'
      // var _this = this
      // var monthSp = this.$common.subtractDateTime(createDate1, createDate2, 'm')
      var data1Arr = []
      var data2Arr = []
      var data3Arr = []
      var data4Arr = []
      var data5Arr = []
      // for (var i = 0; i <= monthSp; i++) {
      // var ddateP1 = _this.$common.timeYearMonthGypkpChange(createDate1, i)
      // var spP1 = ddateP1.split('-')
      // data1Arr.push(ddateP1)
      var reportDataRows = this.reportDataSet[this.statType.toString()]
      this.reportDataRows = reportDataRows
      reportDataRows.forEach(function (item) {
        data1Arr.push(item.date)
        // if (_this.$common.timeGetValue(item.date, 'y') === parseInt(spP1[0]) && _this.$common.timeGetValue(item.date, 'M') === parseInt(spP1[1])) {
        data2Arr.push(item.quantitySum)
        data3Arr.push(item.amountSum)
        data4Arr.push(item.orderCount)
        data5Arr.push(item.dealerCount)
        // } else {
        //   data2Arr.push(0)
        //   data3Arr.push(0)
        //   data4Arr.push(0)
        //   data5Arr.push(0)
        // }
      })
      // }
      this.barData.Data1 = data1Arr
      this.barData.Data2 = data2Arr
      this.barData.Data3 = data3Arr
      this.barData.Data4 = data4Arr
      this.barData.Data5 = data5Arr

      this.getOrderCharts()
    },
    getOrderCharts () {
      var _this = this
      var orderChartBar = echarts.init(document.getElementById('order-chart-bar'))
      var orderChartLine = echarts.init(document.getElementById('order-chart-line'))
      console.log(orderChartLine)
      console.log(_this.barData)
      var Data2 = []
      // if (this.statType === 0) {
      //   Data2 = this.barData.Data2
      // } else if (this.statType === 1) {
      //   Data2 = this.barData.Data3
      // } else if (this.statType === 2) {
      //   Data2 = this.barData.Data4
      // }
      if (this.degreeActiveName === 'amountSum') {
        Data2 = this.barData.Data3
      } else if (this.degreeActiveName === 'quantitySum') {
        Data2 = this.barData.Data2
      } else if (this.degreeActiveName === 'orderCount') {
        Data2 = this.barData.Data4
      } else if (this.degreeActiveName === 'dealerCount') {
        Data2 = this.barData.Data5
      }

      var barOption = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.barData.Data1
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Data2,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#1890FF'
            }
          }
        }]
      }

      var lineOption = {
        xAxis: {
          type: 'category',
          data: _this.barData.Data1
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [{
          data: Data2,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#1890FF',
              lineStyle: {
                color: '#1890FF'
              }
            }
          }
        }]
      }

      orderChartBar.setOption(barOption, true)
      orderChartLine.setOption(lineOption, true)
    },
    reRreshData () {
      this.$http.post(api.mallMineProfitRebuild, {}).then((res) => {
        if (res.status === 200) {
          this.$notify({ title: '提示', message: '更新成功！', type: 'success' })
        } else {
          this.$notify.info({ title: `提示`, message: '失败' })
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>