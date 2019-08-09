<template>
<div>
    <el-card>
      <div slot="header">
        <span>商品货号销售汇总</span>
      </div>
      <div class="searchCon clearfix">
        <span> 查询时间:&nbsp;&nbsp; </span>
        <el-date-picker
          v-model="seacherDates"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          :picker-options="pickerOptionsSearch">
        </el-date-picker>
      
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
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
      xData: [],
      seriesData: [],
      seacherDates: ['', ''],
      pickerOptionsSearch: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    init () {
      var option = {
        title: {
          text: '商品汇总统计'
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
            name: '商品销售汇总',
            type: 'bar',
            data: []
          }
        ]
      }
      var myChart = echarts.init(document.getElementById('barContainer'))
      myChart.setOption(option)
    },
    search () {
      if (!this.seacherDates || !this.seacherDates[0] || !this.seacherDates[1]) {
        this.$notify({ title: '查询失败', message: '时间范围不能为空', type: 'error' })
        return
      }
      this.$http.post(api.goodsSaleReport, {
        startDate: !this.seacherDates ? '' : this.seacherDates[0],
        endDate: !this.seacherDates ? '' : this.seacherDates[1]
      }).then(res => {
        // var max = 1
        res.data.forEach(item => {
          this.xData.push(item.name)
          this.seriesData.push(item.sumAmount)
        })
        var option = {
          title: {
            text: '商品销售汇总图表'
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