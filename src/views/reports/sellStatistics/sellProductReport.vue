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
        <span v-on:click="reRreshData">产品统计报表</span>
      </div>

    <div class="baobiao">
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
        <el-tab-pane label="商品" name="product" class="pad3"></el-tab-pane>
        <el-tab-pane label="序列" name="series"></el-tab-pane>
        <el-tab-pane label="品牌" name="brand"></el-tab-pane>
        <el-tab-pane label="性别" name="sex"></el-tab-pane>
      </el-tabs>

      <div class="choose-btn">
        <div>
          <el-button-group>
            <el-button size='small' v-on:click="changeStatType(0)" v-bind:class="{active:statType==0}">数量</el-button>
            <el-button size='small' v-on:click="changeStatType(1)" v-bind:class="{active:statType==1}">金额</el-button>
            <el-button size='small' v-on:click="changeStatType(2)" v-bind:class="{active:statType==2}">客户</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button size='small' v-on:click='changeImageType(0)' v-bind:class="{active:imageType==0}">饼状</el-button>
            <el-button size='small' v-on:click='changeImageType(1)' v-bind:class="{active:imageType==1}">柱状</el-button>
            <el-button size='small' v-on:click='changeImageType(2)' v-bind:class="{active:imageType==2}">线状</el-button>
          </el-button-group>
        </div>
      </div>
      <div>
        <div class="box-body" style="margin-left:-3%">
          <div id="order-chart-pie" style="width: 70vw;height:450px;" v-show="imageType == 0"></div>
          <div id="order-chart-bar" style="width: 70vw;height:450px;" v-show="imageType == 1"></div>
          <div id="order-chart-line" style="width: 70vw;height:450px;" v-show="imageType == 2"></div>
          <!-- <div id="order-chart-pie" style="width: 70vw;height:400px;" v-show="type == 'pie'"></div> -->
          <!-- <div id="order-chart-bar" style="width: 70vw;height:400px;" v-show="type == 'bar'"></div> -->
          <!-- <div id="order-chart-line" style="width: 70vw;height:400px;" v-show="type == 'line'"></div> -->
        </div>
      </div>
      <el-table v-bind:data="reportDataRows" style="width: 100%;text-align:center;margin-top:1%" show-summary>
        <el-table-column v-bind:label="degreeActiveName=='product'?'商品':degreeActiveName=='series'?'系列':degreeActiveName=='brand'?'品牌':'性别'" align='center' width='180'>
        <!-- <el-table-column v-bind:label="formLabelWidth" align='center' width='180'> -->
          <template slot-scope="scope">
            {{degreeActiveName=='product'?scope.row.productName:''}}
            {{degreeActiveName=='series'?scope.row.seriesName:''}}
            {{degreeActiveName=='brand'?scope.row.brandName:''}}
            {{degreeActiveName=='sex'?scope.row.sex:''}}
          </template>
        </el-table-column>
        <el-table-column prop="orderCount" label="订货单数" align='center'>
        </el-table-column>
        <el-table-column prop="dealerCount" label="订货客户" align='center'>
        </el-table-column>
        <el-table-column prop="quantitySum" label="订货数量" align='center'>
        </el-table-column>
        <el-table-column prop="amountSum" label="订货金额" align='center'>
          <!-- <template slot-scope="scope">
            <div>{{scope.row.amountSum | Currency }}</div>
          </template> -->
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: space-between;width: 100%;padding:2% 0">
        <!--<el-pagination background v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange" v-bind:current-page="pageNo" v-bind:page-sizes="[100, 200, 300, 400]"
          v-bind:page-size="100" layout=" total,prev, pager, next, sizes, jumper" v-bind:total="400">
        </el-pagination>-->
      </div>


    </div>

      <!-- <div id="order-chart-pie" style="width: 70vw;height:400px;"></div> -->
    </el-card>
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
      degreeActiveName: 'product',
      imageType: 0,
      statType: 0,
      // pieSearchData: {
      //   createDate1: '',
      //   createDate2: ''
      // },
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
      pieData: {
        Data1: [],
        Data2: [],
        Data3: [],
        Data4: []
      },
      reportDataRows: [],
      reportDataSet: {}
    }
  },
  methods: {
    handleSizeChange () {
    },
    handleCurrentChange () {
    },
    // currentPage () {
// },
    degreeTabClick (tab, event) {
      this.buildReport()
    },
    pickerSearch () {
      this.searchReports()
    },
    changeImageType (i) {
      this.imageType = i
    },
    changeStatType (i) {
      this.statType = i
      this.getOrderCharts()
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
    init () {
      this.timeSolt = commonJs.getMonthStartAndEnd(0)
      this.reportDataSet = {'poduct': [], 'series': [], 'brand': [], 'sex': []}
      this.searchReports()
    },
    searchReports () {
      // if (this.this.$common.timeChange(new Date(), 'yyyy-mm-dd'))
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

      // if (this.type) //SellProductReportBySeries
      // var url = ''
      // if (this.degreeActiveName === 'product') {
      //   url = api.SellProductReportByQuantity
      // } else if (this.degreeActiveName === 'series') {
      //   url = api.SellProductReportBySeries
      // } else if (this.degreeActiveName === 'brand') {
      //   url = api.SellProductReportByBrand
      // } else if (this.degreeActiveName === 'sex') {
      //   url = api.SellProductReportBySex
      // }
      this.imageType = 0
      this.degreeActiveName = 'product'
      this.statType = 0
      var _this = this

      _this.$http.post(api.SellProductReportByQuantity, {
        createDate1: createDate1,
        createDate2: createDate2
      }).then(res => {
        _this.reportDataSet['product'] = res.data.rows
        _this.buildReport()
      })
      setTimeout(function () {
        _this.$http.post(api.SellProductReportBySeries, {
          createDate1: createDate1,
          createDate2: createDate2
        }).then(res => {
          _this.reportDataSet['series'] = res.data.rows
          _this.buildReport()
        })
      }, 500)
      setTimeout(function () {
        _this.$http.post(api.SellProductReportByBrand, {
          createDate1: createDate1,
          createDate2: createDate2
        }).then(res => {
          _this.reportDataSet['brand'] = res.data.rows
          _this.buildReport()
        })
      }, 800)
      setTimeout(function () {
        _this.$http.post(api.SellProductReportBySex, {
          createDate1: createDate1,
          createDate2: createDate2
        }).then(res => {
          _this.reportDataSet['sex'] = res.data.rows
          _this.buildReport()
        })
      }, 1000)
    },
    buildReport () {
      var d2Arr = [0, 0, 0]
      var nArr = []
      var qArr = []
      var amArr = []
      var orArr = []
      var deArr = []
      var _this = this
      var reportDataRows = this.reportDataSet[this.degreeActiveName]
      this.reportDataRows = reportDataRows
      reportDataRows.forEach(function (item) {
        d2Arr[0] += item.quantitySum
        d2Arr[1] += item.amountSum
        d2Arr[2] += item.dealerCount

        if (_this.degreeActiveName === 'product') {
          nArr.push(item.productName)
          amArr.push({value: item.amountSum, name: item.productName})
          qArr.push({value: item.quantitySum, name: item.productName})
          orArr.push({value: item.orderCount, name: item.productName})
          deArr.push({value: item.dealerCount, name: item.productName})
        } else if (_this.degreeActiveName === 'series') {
          nArr.push(item.seriesName)
          amArr.push({value: item.amountSum, name: item.seriesName})
          qArr.push({value: item.quantitySum, name: item.seriesName})
          orArr.push({value: item.orderCount, name: item.seriesName})
          deArr.push({value: item.dealerCount, name: item.seriesName})
        } else if (_this.degreeActiveName === 'brand') {
          nArr.push(item.brandName)
          amArr.push({value: item.amountSum, name: item.brandName})
          qArr.push({value: item.quantitySum, name: item.brandName})
          orArr.push({value: item.orderCount, name: item.brandName})
          deArr.push({value: item.dealerCount, name: item.brandName})
        } else if (_this.degreeActiveName === 'sex') {
          nArr.push(item.sex)
          amArr.push({value: item.amountSum, name: item.sex})
          qArr.push({value: item.quantitySum, name: item.sex})
          orArr.push({value: item.orderCount, name: item.sex})
          deArr.push({value: item.dealerCount, name: item.sex})
        }
      })
      this.pieData.Data1 = nArr
      this.pieData.Data2 = d2Arr
      this.pieData.Data3 = [qArr, amArr, deArr]
      this.pieData.Data4 = ['数量', '金额', '客户']

      this.getOrderCharts()
    },
    getOrderCharts () {
      var orderChartPie = echarts.init(document.getElementById('order-chart-pie'))
      var orderChartBar = echarts.init(document.getElementById('order-chart-bar'))
      var orderChartLine = echarts.init(document.getElementById('order-chart-line'))
      // var percent = []
      // var xName = []
      var formatterArr = []
      var formatter = []
      var report1Data1 = this.pieData.Data1
      var report1Data2 = (this.statType === 1 ? '￥' : '') + this.pieData.Data2[this.statType]
      var report1Data3 = this.pieData.Data3[this.statType]
      var report1Data4 = this.pieData.Data4[this.statType] + '\n\n\n\n' // this.statType === 1 ? '销售额\n\n\n\n' : '数量\n\n\n\n'
      var report1Data5 = this.statType === 0 ? '数量' : this.statType === 1 ? '金额' : '客户'
      console.log('report1Data1')
      console.log(report1Data1)
      console.log(report1Data2)
      console.log(report1Data3)

      function getFormatter (params) {
        formatterArr.push(params)
      }

      var pieOption = {
        graphic: [
          {
            type: 'text',
            top: 'center',
            left: '28%',
            style: {
              text: report1Data4,
              fill: 'gray',
              fontSize: 15,
              fontWeight: 'normal'
            }
          },
          {
            type: 'text',
            top: 'center',
            left: '28%',
            style: {
              text: report1Data2,
              fill: '#333',
              fontSize: 26,
              fontWeight: 'normal'
            }
          }],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'center',
          left: '55%',
          icon: 'circle',
          itemGap: 25,
          itemWidth: 8,
          itemHeight: 8,
          data: report1Data1,
          textStyle: {
            rich: {
              a: {
                width: 360,
                fontSize: 15
              },
              b: {
                width: 60,
                color: 'gray',
                fontSize: 14
              }
            }
          },
          formatter: function (name) {
            for (var i1 in formatterArr) {
              formatter[i1] = formatterArr[i1]
            }
            // for (var i2 in formatter) {
            //   percent[i2] = formatter[i2].percent
            //   xName[i2] = formatter[i2].value
            // }

            var index = 0
            // var data = ['dd', 'tt', 'vv', 'jj', '5', '6']
            report1Data1.forEach(function (value, i) {
              if (value === name) {
                index = i
              }
            })
            name = name.length > 20 ? name.substring(0, 20) + '..' : name
            return '{a|' + name + '}' + '{b|' + formatter[index].percent + '' + '% }' +
             '{a|' + // + (index === 1 ? '￥' : '') +
             formatter[index].value + '}'
          }
        },
        color: ['#3AA0FF', '#36CBCB', '#4DCB73', '#FAD337', '#F2637B', '#975FE4'],
        itemStyle: {
          shadowColor: '#fff'
        },
        series: [
          {
            name: report1Data5,
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['32%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'outside',
                formatter: function (params) {
                  return getFormatter(params)
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: report1Data3
          }
        ]
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
          data: report1Data1
        },
        yAxis: {
          type: 'value'
        },
        textStyle: {
          fontSize: 15
        },
        series: [{
          data: report1Data3,
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
          data: report1Data1
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          type: 'value'
        },
        textStyle: {
          fontSize: 15
        },
        series: [{
          data: report1Data3,
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

      orderChartPie.setOption(pieOption, true)
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