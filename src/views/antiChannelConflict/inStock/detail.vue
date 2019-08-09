<template>
  <div>
    <el-dialog title="详情" :visible.sync="show" width="70%">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="单号">
          <el-input v-model="list.no" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="仓库">
          <el-input v-model="list.warehouseName" disabled="false"></el-input>
        </el-form-item>

      </el-form>

      <el-table
        :data="list.items"
        border
        show-summary="true"
        style="width: 100%">

        <el-table-column
          label="产品"
          prop="productName">
        </el-table-column>

        <el-table-column
          label="编码"
          prop="no">
        </el-table-column>        

        <el-table-column
          label="SKU">
          <template slot-scope="scope">
            <span>{{ removeSkuData(scope.row.skuPropertyNames) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="单位"
          prop="unit">
        </el-table-column>

        <el-table-column
          label="单价"
          prop="price">
        </el-table-column>

        <el-table-column
          label="数量"
          prop="count">
        </el-table-column>

        <el-table-column
          label="金额"
          prop="amount">
        </el-table-column>        

        <el-table-column
          label="备注"
          prop="remarks">
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
import common from '../../../filter/common'
export default {
  name: 'antiChannelConflict-dealer-detail',
  data () {
    return {
      show: false,
      list: {}
    }
  },
  methods: {
    removeSkuData (sku) {
      return common.removeSkuData(sku)
    },
    toggleDialog () {
      this.show = !this.show
    },
    showDialog (data) {
      this.list = data
      this.show = true
    }
  }
}
</script>

<style>

</style>
