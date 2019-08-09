<template>
  <div>
    <el-dialog title="期初库存详情" :visible.sync="show">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
        style="width: 100%">

        <el-table-column
          label="产品"
          prop="productName">
        </el-table-column>

        <el-table-column
          label="货号"
          prop="no">
        </el-table-column>

        <el-table-column
          label="SKU"
          prop="sku">
        </el-table-column>

        <el-table-column
          label="单位"
          prop="unit">
        </el-table-column>

        <el-table-column
          label="库存数量"
          prop="qty">
        </el-table-column>

        <el-table-column
          label="成本价"
          prop="price">
        </el-table-column>

        <el-table-column
          label="时间"
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
export default {
  name: 'antiChannelConflict-beginningStock-detail',
  data () {
    return {
      show: false,
      list: {}
    }
  },
  methods: {
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
