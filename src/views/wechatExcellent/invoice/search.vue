<template>
  <div>
    <el-dialog title="发货单查询" :visible.sync="show" width="720PX">
      <el-form :model="form" style="padding-right:5%;" label-width="120px">
          <el-form-item label="发货单编号">
             <el-input v-model="form.no"></el-input>
          </el-form-item>
          <el-form-item label="发货单状态">
            <el-checkbox-group v-model="form.statuslist">
              <el-checkbox key="Shipped" label="Shipped" name="statuslist">已发货</el-checkbox>
              <el-checkbox key="Finished" label="Finished" name="statuslist">已完成</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期"  value-format="yyyy-MM-dd" v-model="form.createDate1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;" >至</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期"  value-format="yyyy-MM-dd" v-model="form.createDate2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitInvoiceSearch" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>   
<script>
export default {
  name: 'wechatExcellent-invoice-Search',
  props: ['searchdata'],
  data () {
    return {
      show: false,
      form: {
        no: '',
        statuslist: [],
        createDate1: '',
        createDate2: ''
      }
    }
  },
  methods: {
    open () {
      this.show = true
      this.form = JSON.parse(JSON.stringify(this.searchdata))
    },
    submitInvoiceSearch () {
      this.show = false
      this.$emit('searchInvoice', this.form)
    }
  }
}
</script>