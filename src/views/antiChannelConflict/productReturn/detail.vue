<template>
  <div>
    <el-dialog title="详情" :visible.sync="show">
      <el-table
        :data="data.items"
        border
        style="width: 100%">

        <el-table-column
          label="产品"
          prop="productName">
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
          label="退货时间"
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
  name: 'antiChannelConflict-productReturn-detail',
  data () {
    return {
      show: false,
      data: {}
    }
  },
  methods: {
    open (data) {
      this.$http.post(api.productReturnInfo, { id: data.id }).then(res => {
        this.data = res.data
        this.show = true
      })
    }
  }
}
</script>

<style>

</style>
