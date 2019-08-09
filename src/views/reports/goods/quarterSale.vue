<template>
<div>
    <el-card>
      <div slot="header">
        <span>商品季度销售汇总</span>
      </div>
      <div class="searchCon clearfix">
        <span> 查询年份:    &nbsp;&nbsp; </span>
            <el-date-picker
             v-model="saleYear"
             type="year"
             placeholder="选择年">
            </el-date-picker>
      </div>
      <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <div class="map-container" style="width:1000px;height:1000px;">
        <div id="barContainer" style="width:1000px;height:1000px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: 'goodsSale-report-map',
  data () {
    return {
      formLabelWidth: '120px',
      xData: [],
      saleYear: this.$common.timeChange(new Date()),
      seriesData: [],
      seacherDates: ['', '']
    }
  },
  methods: {
    init () {
      var option = {
        title: {
          text: '商品季度销售汇总'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '商品季度销售汇总',
            type: 'bar',
            data: []
          }
        ]
      }
      var myChart = echarts.init(document.getElementById('barContainer'))
      myChart.setOption(option)
    },
    search () {
      this.xData = []
      this.seriesData = []
      if (!this.saleYear === '') {
        this.$notify({ title: '查询失败', message: '清选择年份', type: 'error' })
        return
      }
      // this.searchData.createDate1 = this.$common.timeChange(this.searchData.createDate1)
      var converYeaStr = this.$common.timeChange(this.saleYear)
      this.$http.post(api.quarterSaleReport, {
        yearStr: converYeaStr
      }).then(res => {
        // var max = 1
        res.data.forEach(item => {
          this.xData.push(item.quarter + '季度')
          this.seriesData.push(item.sumAmount)
        })
        var option = {
          title: {
            text: '商品季度销售汇总图表'
          },
          xAxis: {
            data: this.xData
          },
          series: [
            {
              data: this.seriesData
            }
          ]
        }
        var myChart = echarts.getInstanceByDom(document.getElementById('barContainer'))
        myChart.setOption(option)
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>