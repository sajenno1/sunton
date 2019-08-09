<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>公众号配置</span>
      </div>

      <div>
        <el-form label-width="180px">

          <el-form-item label="公众号平台名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="公众号平台图片">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="handleUploadPhotoSuccess"
              :headers="headers"
              :on-error="handleUploadError">
              <img v-if="form.photo" :src="form.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="公众号平台原始ID">
            <el-input v-model="form.originId"></el-input>
          </el-form-item>

          <el-form-item label="AppId">
            <el-input v-model="form.appId"></el-input>
          </el-form-item>

          <el-form-item label="AppSecret">
            <el-input v-model="form.appSecret"></el-input>
          </el-form-item>

          <el-form-item label="商户ID">
            <el-input v-model="form.mchId"></el-input>
          </el-form-item>

          <el-form-item label="支付KEY">
            <el-input v-model="form.tenPayKey"></el-input>
          </el-form-item>

          <el-form-item label="支付证书">
            <el-input v-model="form.tenPayCertPath" style="width: 800px;"></el-input>
            <el-upload
              :action="certUpload"
              :show-file-list="false"
              :on-success="handleUploadCertSuccess"
              :headers="headers"
              :on-error="handleUploadError" style="display: inline-block;">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="ApiKey">
            <el-input v-model="form.apiKey" style="width: 800px;"></el-input>
          </el-form-item>

          <el-form-item label="消息加密密钥">
            <el-input v-model="form.encodingAESKey"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="save">保存</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-officialAccount-edit',
  data () {
    return {
      form: {},
      imgUpload: this.$http.defaults.baseURL + api.uploadOfficialAccountPhoto,
      certUpload: this.$http.defaults.baseURL + api.uploadOfficialAccountTenPayCert,
      headers: {}
    }
  },
  methods: {
    getData () {
      this.$http.post(api.officialAccountInfo).then(res => {
        this.form = res.data
      })
    },
    save () {
      this.$http.post(api.editOfficialAccount, this.form).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
      })
    },
    handleUploadPhotoSuccess (res, file) {
      this.form.photo = res.fileName
    },
    handleUploadCertSuccess (res, file) {
      this.form.tenPayCertPath = res.fileName
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    }
  },
  mounted () {
    this.getData()
    this.headers['access-token'] = this.$store.state.account.access_token
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
