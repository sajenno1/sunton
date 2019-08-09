
  <template>
  <div>
    <el-dialog title="充值详情" :visible.sync="showCurrentDialog" width="70%">
      <div class="dialog-box clearfix">
        <div class="order-info clearfix">
         <table style="width:100%;padding:0;margin:0;line-height:35px" border="0" cellpadding="0" cellspacing="2">
      	<tr>
      		<td class="defTabCell defTabField" style="width:70px;">流水号:</td>
      		<td class="defTabCell" style="width:300px;"><span>{{data.no}}</span></td>
      		<td class="defTabCell defTabField" style="width:70px;">金额:</td>
      		<td class="defTabCell" style="width:200px;color:#00b700;font-size:16px"><span>￥{{data.amount}}</span></td>
      		<td class="defTabCell defTabField" style="width:70px;">状态:</td>
      		<td class="defTabCell">
            <span v-show="getStatusText(data.status)=='待审核'">
            <el-button size="medium" type='text'>审核</el-button><el-button size="medium"  type='text'>驳回</el-button>
            </span>
            <!-- {{getStatusText(data.status)}} -->
            <span v-show="getStatusText(data.status)!='待审核'">{{getStatusText(data.status)}}</span></td>
      	</tr>
        <tr>
      		<td class="defTabCell defTabField" style="width:70px;">转账类型:</td>
      		<td class="defTabCell" style="width:300px;"><span>{{getTypeText(data.rechargeType)}}</span></td>
      		<td class="defTabCell defTabField" style="width:70px;" v-if="data.rechargeType === 'BankCard'">银行名称:</td>
      		<td class="defTabCell" style="width:200px;" v-if="data.rechargeType === 'BankCard'"><span>{{data.bank}}</span></td>
      		<td class="defTabCell defTabField" style="width:70px;">转账账号:</td>
      		<td class="defTabCell"><span>{{data.accountNumber}}</span></td>
      	</tr>
      	<tr>
      		<td class="defTabCell defTabField" style="width:70px;">充值日期:</td>
      		<td class="defTabCell" style="width:300px;"><span>{{formatTime(data.rechargeDate)}}</span></td>
            <td class="defTabCell defTabField" style="width:70px;">操作人员:</td>
      		<td class="defTabCell" style="width:200px;"><span>{{data.managerUserName}}</span></td>
            <td class="defTabCell defTabField" style="width:70px;">审核时间:</td>
      		<td class="defTabCell"><span>{{formatTime(data.checkedDateTime)}}</span></td>
      	</tr>
      	<tr>
      		<td class="defTabCell defTabField">备注说明:</td>
      		<td class="defTabCell" colspan="5"><span>{{data.description}}</span></td>
      	</tr>
       </table>
        </div>
        <div class="order-form" style="margin-top:3%">
          <span>凭证:</span><br/>
          <img style="width:auto;height:auto;max-width:95%;" v-bind:src="data.photo"/>
        </div>

      </div>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-recharge-detail',
  components: { },
  data () {
    return {
      showCurrentDialog: false,
      data: {},
      id: ''
    }
  },
  methods: {
    open (row) {
      this.showCurrentDialog = true
      this.id = row.id
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.mallRechargeRecordOuterInfo, { id: id }).then(res => {
        this.data = res.data
      })
    },
    getStatusText (status) {
      switch (status) {
        case 'Unchecked': return '待审核'
        case 'Checked': return '已审核'
        case 'Reject': return '已驳回'
      }
      return ''
    },
    getTypeText (type) {
      switch (type) {
        case 'BankCard': return '银行卡'
        case 'Alipay': return '支付宝'
        case 'WeChat': return '微信'
      }
      return ''
    },
    formatDate (date1) {
      return this.$common.formatDate(date1)
    },
    formatTime (date1) {
      return this.$common.formatTime(date1)
    },
    closeDialog () {
      this.$emit('getList')
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container
{
   text-align: right;
   margin-bottom: 10px;
}
.express-container {
  margin-top: 10px;
}
.items-container {
  margin-top: 10px;
}
.express-container {
  float: left;
  width: 49.5%;
}
.express-container2 {
  float: right;
  width: 49.5%;
  margin-top: 10px;
}
.items-container {
  float: right;
  width: 100%;
  margin-top: 10px;
}
.express-container .el-card,
.express-container2 .el-card {
  float: left;
  width: 100%;
  height: 460px;
}
.items-container .el-card {
  float: right;
  width: 100%;
}
.el-col-8 {
  width: 100%;
}
.clearfix {*zoom:1;}
.clearfix:after {content:'\200B';clear:both;display:block;height:0px}
.table-money {
color: #ef4f4f;
}
</style>

