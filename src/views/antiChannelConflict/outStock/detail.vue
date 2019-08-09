<template>
  <div>
    <el-dialog title="详情" :visible.sync="show" width="80%">

      <table style="width:100%;padding:0;margin:0;background-color:#ebeef5;margin-bottom:20px;" border="0" cellpadding="0" cellspacing="2">
      	<tr>
      		<td class="defTabCell defTabField" style="width:100px;">单号:</td>
      		<td class="defTabCell" style="width:320px;"><span>{{data.no}}</span></td>
      		<td class="defTabCell defTabField" style="width:100px;">经销商:</td>
      		<td class="defTabCell" style="width:320px;"><span>{{data.dealerName}}</span></td>
      		<td class="defTabCell defTabField" style="width:100px;">状态:</td>
      		<td class="defTabCell"><span>{{getStatutText(data.status)}}</span></td>
      	</tr>
      	<tr>
      		<td class="defTabCell defTabField">pda:</td>
      		<td class="defTabCell"><span>{{data.pdaAccountName}}</span></td>
      		<td class="defTabCell defTabField">发货经销商:</td>
      		<td class="defTabCell"><span>{{data.outOperatorDealerName}}</span></td>
      		<td class="defTabCell defTabField">发货微信号:</td>
      		<td class="defTabCell"><span>{{data.createWinXinUserNickName}}</span></td>
      	</tr>
      	<tr>
      		<td class="defTabCell defTabField">导入时间:</td>
      		<td class="defTabCell"><span>{{data.importDate}}</span></td>
      		<td class="defTabCell defTabField">发货时间</td>
      		<td class="defTabCell"><span>{{data.shippingDateTime}}</span></td>
      		<td class="defTabCell defTabField">&nbsp;</td>
      		<td class="defTabCell"><span>&nbsp;</span></td>
      	</tr>
      </table>
      <!-- <br/>
      <b style="color:#777777">( 订单明细 )</b>
      <br/>
      <div style="display:;">
        <el-table
          :data="data.outerOutStockItems"
          border
          style="width: 100%">

          <el-table-column
            label="代码"
            prop="productNo">
          </el-table-column>

          <el-table-column
            label="产品"
            prop="productName">
          </el-table-column>

          <el-table-column
            label="sku"
            prop="productSkuName">
          </el-table-column>

          <el-table-column
            label="单位"
            prop="unit">
          </el-table-column>

          <el-table-column
            label="数量"
            prop="count">
          </el-table-column>

        </el-table>
      </div> -->
      <br/>
      <b style="color:#777777">( 发货明细 )</b>
      <br/>

      <el-table
        :data="data.items"
        border
        style="width: 100%">

        <el-table-column
          label="代码"
          prop="productNo">
        </el-table-column>

        <el-table-column
          label="产品"
          prop="productName">
        </el-table-column>

        <el-table-column
          label="sku"
          prop="productSkuName">
        </el-table-column>

        <el-table-column
          label="发行码"
          prop="code">
        </el-table-column>

        <el-table-column
          label="单位"
          prop="unit">
        </el-table-column>

        <el-table-column
          label="数量"
          prop="count">
        </el-table-column>

        <el-table-column
          label="入库时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate | FormattersDateTime }}</span>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-outStock-detail',
  data () {
    return {
      data: {},
      show: false
    }
  },
  methods: {
    getStatutText (status) {
      switch (status) {
        case 'Pendding':
          return '待发货'
        case 'Finished':
          return '已发货'
      }
      return ''
    },
    showDialog (id) {
      this.$http.post(api.outStockInfo, { id: id }).then(res => {
        this.data = res.data
        this.show = true
      })
    }
  }
}
</script>

<style>
  .defTabCell { background-color: #ffffff; padding: 5px 2px; color: #909399; }
  .defTabField { font-weight: bold; text-align: right; }


  /* .el-table td, .el-table th.is-leaf {
  	border-bottom: 1px solid #909399;
  }

  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #909399;
  }

  .el-table--border th, .el-table__fixed-right-patch {
    border-bottom: 1px solid #ebeef5;
  } */
	    
</style>
