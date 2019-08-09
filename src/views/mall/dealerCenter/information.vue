<template>
  <div>
      <el-form v-bind:model="dealerData" style="padding-right:5%;">
        <el-form-item label="经销商编号" v-bind:label-width="formLabelWidth">
          <div>{{dealerData.no}}</div>
        </el-form-item>
        <el-form-item label="经销商名称" v-bind:label-width="formLabelWidth">
          <div>{{dealerData.name}}</div>
        </el-form-item>
        <el-form-item label="联系人" v-bind:label-width="formLabelWidth">
          <el-input v-model="dealerData.linkMan" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机" v-bind:label-width="formLabelWidth">
          <!-- <el-input v-model="dealerData.mobile" auto-complete="off" size="small"></el-input> -->
          <div>{{dealerData.mobile}}</div>
        </el-form-item>
        <el-form-item label="备注" v-bind:label-width="formLabelWidth">
          <el-input v-model="dealerData.remark" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话" v-bind:label-width="formLabelWidth">
          <el-input v-model="dealerData.tel" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="地区" v-bind:label-width="formLabelWidth">
          <div>{{dealerData.areaId}}</div>
        </el-form-item> -->
        <el-form-item label="地址" v-bind:label-width="formLabelWidth">
          <el-input v-model="dealerData.address" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="授信额度" v-bind:label-width="formLabelWidth">
          <div>{{dealerData.creditLimit}}</div>
        </el-form-item>
        <el-form-item label="余额" v-bind:label-width="formLabelWidth">
          <div>{{dealerData.accountBalance}}</div>
        </el-form-item>
        <el-form-item label="越级发货" v-bind:label-width="formLabelWidth">
          <div>{{dealerData.isOutStockSpecif}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-left:30px;">
        <el-button type="primary" v-on:click="doUpdate" size="medium">确 定</el-button>
      </div>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-dealerCenter-information',
  data () {
    return {
      dealerData: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    doUpdate () {
      // mallUpdateDealerInformation
      this.$http.post(api.mallUpdateDealerInformation, this.dealerData).then(res => {
        this.$notify({ title: '成功', message: '编辑成功！', type: 'success' })
      })
    },
    getInfo (id) {
      this.$http.post(api.mallAsAdminGetDealerInfo, { id: id }).then(res => {
        this.dealerData = res.data
        // this.form = res.data
        // if (res.data.parentDealer) {
        //   this.optionsParentDealer = [ res.data.parentDealer ]
        // }
        // let third = this.form.areaId
        // let second
        // let first
        // this.list.forEach(x => {
        //   if (x.id === third) {
        //     second = x.parentId
        //     this.list.forEach(v => {
        //       if (second === v.id) {
        //         first = v.parentId
        //       }
        //     })
        //   }
        // })
        // this.show = true
        // this.form.areaId = [first, second, third]
        // this.$http.post(api.lodaSelectedAreas, { areaIds: this.form.sellAreas }).then(res1 => {
        //   this.areaOptions = res1.data.map(x => {
        //     return {
        //       label: x.fullName,
        //       value: x.id
        //     }
        //   })
        //   this.form.sellAreaIds = this.form.sellAreas
        // })
      })
    }
  },
  mounted () {
    // console.log(this.$store.state.account.adminInfo)
    // console.log(this.$store.state.account)
    // AsAdminGetDealerInfo
    // console.log(this.$store.state.account.adminInfo)
    // console.log(this.$store.state.account)
    var _this = this
    setTimeout(() => {
      _this.getInfo(_this.$store.state.account.adminInfo.id)
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.select-parentdealer li {
  line-height: normal;
  padding: 7px;
  height: 60px;
  border-bottom: 1px solid #eeeeee
}
.select-parentdealer .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.select-parentdealer   .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.select-parentdealer .highlighted .addr {
  color: #ddd;
}

</style>