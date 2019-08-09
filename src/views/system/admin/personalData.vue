<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>个人资料</span>
      </div>

      <div>
        <el-form label-width="120px" style="width:400px;">

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :headers="headers"
              :on-error="handleUploadError">
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="form.displayName"></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-admin-personalData',
  data () {
    return {
      form: {},
      headers: {},
      imgUpload: this.$http.defaults.baseURL + api.uploadAdminAvatar
    }
  },
  methods: {
    getData () {
      this.$http.post(api.currentAdminInfo).then(res => {
        this.form = res.data
      })
    },
    handleUploadSuccess (res, file) {
      this.form.avatar = res.fileName
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    },
    save () {
      this.$http.post(api.editCurrentAdmin, this.form).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
        this.$store.dispatch('account/getAdminInfo')
      })
    }
  },
  mounted () {
    this.getData()
    this.headers['access-token'] = this.$store.state.account.access_token
  }
}
</script>

<style lang="scss">
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
