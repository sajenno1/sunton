<template>
  <div>
    <div>
      <el-button type="primary" @click="showRecharge">充值</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="ID" width="180">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="dates"
        label="时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="" :visible.sync="dialogVisible" width="30%">
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span>{{'名称:' + rechargeDetail.Name}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="商户充值" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="选择商户" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择商户">
              <el-option v-for="item in tableData" :key="item.id" :label="item.account" :value="item.date"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值金额" :label-width="formLabelWidth">
            <el-input v-model="form.amount" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="page-container" v-if="total > pageSize">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, sizes, total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      dialogFormVisible: false,
      rechargeDetail: {},
      formLabelWidth: '80px',
      form: {
        amount: ''
      },
      merchantList: []
    }
  },
  methods: {
    getlist () {
      this.$http.get('/dsfsdf').then(res => {
        this.tableData = res.data
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    getMerchantList () {
      return this.$http.post('/dsfdsf').then(res => {
        this.merchantList = res.data.rows
      })
    },
    detail (row) {
      this.$http.get('/sdfds' + row.Id).then(res => {
        this.rechargeDetail = res.data
        this.dialogVisible = true
      })
    },
    showRecharge () {
      this.getMerchantList().then(() => {
        this.dialogFormVisible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 10px;
}
.table-container {
  margin-top: 10px;
}
</style>
