<template>
  <div>
    <el-card>
      <div slot="header">
        <span>上传充值记录</span>
      </div>
      <div>
        <el-form v-bind:model="upForm" style="padding-right:5%;">

          <el-form-item label="充值日期" v-bind:label-width="formLabelWidth">
            <el-date-picker
              type="date" v-model="upForm.rechargeDate"
              placeholder="选择日期时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="充值金额" v-bind:label-width="formLabelWidth">
            <el-input v-model="upForm.amount" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="充值类型" v-bind:label-width="formLabelWidth">
            <el-select v-model="upForm.rechargeType" placeholder="请选择充值类型">
              <el-option
                v-for="item in rechargeType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="upForm.rechargeType ==='BankCard'" label="所属银行" v-bind:label-width="formLabelWidth">
            <el-input v-model="upForm.bank" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="充值账号" v-bind:label-width="formLabelWidth">
            <el-input v-model="upForm.accountNumber" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="图片" v-bind:label-width="formLabelWidth" v-show="imgUploadShow">
            <el-upload
              class="avatar-uploader"
              v-bind:action="imgUpload"
              v-bind:show-file-list="false"
              v-bind:on-success="handleUploadSuccess"
              v-bind:before-upload="beforeUpload"
              v-bind:headers="headers"
              >
              <img v-if="upForm.tmpPhoto" v-bind:src="upForm.tmpPhoto" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="备注" v-bind:label-width="formLabelWidth">
            <el-input v-model="upForm.description" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" v-on:click="doCancel">取　消</el-button>
          <el-button size="small" type="primary" v-on:click="doCreate" v-show="imgUploadShow">提　交</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-recharge-add',
  data () {
    return {
      formLabelWidth: '120px',
      upForm: {
        rechargeDate: '',
        rechargeType: '',
        bank: '',
        accountNumber: ''
      },
      imgUpload: this.$http.defaults.baseURL + api.mallUploadRechargeRecordPhoto,
      headers: {},
      imgUploadShow: true,
      showCurrentDialog: false,
      rechargeType: [{
        value: 'BankCard',
        label: '银行卡'
      }, {
        value: 'Alipay',
        label: '支付宝'
      }, {
        value: 'WeChat',
        label: '微信'
      }]
    }
  },
  methods: {
    // open () {
    //   this.upForm = {}
    //   this.$http.post(api.mallAddRechargeRecordBegin).then(res => {
    //     console.log(res.data)
    //   })
    // },
    dateChange (val) {
      this.upForm.rechargeDate = val
    },
    handleUploadSuccess (res, file) {
      this.upForm.photo = res.fileName
      this.upForm.tmpPhoto = res.tmpFileName
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1.2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('图片大小不能超过 1.2MB!')
      }

      return isJPG && isLt2M
    },
    doCreate () {
      this.upForm.rechargeDate = this.$common.timeChange(this.upForm.rechargeDate)
      this.$confirm('确定要提交吗').then(() => {
        this.$http.post(api.mallAddRechargeRecord, this.upForm).then(res => {
          this.$notify({ title: '成功', message: '提交成功！', type: 'success' })
          // location = './minelist'
          this.$router.push('./minelist')
        })
      }).catch(() => {})
      // this.$http.post(api.mallAddRechargeRecord, this.upForm).then(res => {
      //   this.$notify({ title: '成功', message: '提交成功！', type: 'success' })
      //   // location = './minelist'
      //   this.$router.push('./minelist')
      // })
    },
    doCancel () {
      this.$router.push('./minelist')
    }
  },
  mounted () {
    this.headers['access-token'] = this.$store.state.account.access_token
    //
    // this.upForm = {}
    this.$http.post(api.mallAddRechargeRecordBegin).then(res => {
      this.imgUploadShow = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
