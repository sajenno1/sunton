<template>
  <div>
    <el-dialog title="订单查询" :visible.sync="show" width="720PX">
      <el-form :model="form" style="padding-right:5%;" label-width="80px">
          <el-form-item label="订单编号">
             <el-input v-model="form.no"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-checkbox-group v-model="form.statuslist">
              <el-checkbox key="WaittingForPay" label="WaittingForPay" name="statuslist">待支付</el-checkbox>
              <el-checkbox key="Paid" label="Paid" name="statuslist">已支付</el-checkbox>
              <el-checkbox key="Shipped" label="Shipped" name="statuslist">已发货</el-checkbox>
              <el-checkbox key="Finished" label="Finished" name="statuslist">已完成</el-checkbox>
              <el-checkbox key="Closed" label="Closed" name="statuslist">已关闭</el-checkbox>
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
        <el-form-item label="付款时间">
          <el-date-picker
            v-model="form.payDates"
            type="daterange"
            placeholder="选择日期范围"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsSearch">
          </el-date-picker>
        </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitOrderSearch" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>   
<script>
export default {
  name: 'replenishment-replenishOrder-orderSearch',
  props: ['searchdata'],
  data () {
    return {
      show: false,
      form: {
        no: '',
        statuslist: [],
        payDates: ['', ''],
        createDate1: '',
        createDate2: ''
      },
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
    open () {
      this.show = true
      this.form = JSON.parse(JSON.stringify(this.searchdata))
    },
    submitOrderSearch () {
      this.show = false
      this.$emit('searchOrder', this.form)
    }
  }
}
</script>