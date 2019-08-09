<template>
  <div>
    <el-dialog title="添加资源升级" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="版本号">
          <el-input v-model="form.version"></el-input>
        </el-form-item>

        <el-form-item label="完整更新">
          <el-radio v-model="form.fullUpdate" :label="true">是</el-radio>
          <el-radio v-model="form.fullUpdate" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="安卓更新地址">
          <el-row :gutter="10">
            <el-col :span="16" style="padding-left: 0;">
              <el-input v-model="form.androidUrl"></el-input>
            </el-col>
            <el-col :span="6">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleUploadAndroidUrlSuccess"
                :headers="headers"
                :on-error="handleUploadError"
                :before-upload="beforeUpload">
                <el-button slot="trigger" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="IOS更新地址">
          <el-row :gutter="10">
            <el-col :span="16" style="padding-left: 0;">
              <el-input v-model="form.iosUrl"></el-input>
            </el-col>
            <el-col :span="6">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleUploadIosUrlSuccess"
                :headers="headers"
                :on-error="handleUploadError"
                :before-upload="beforeUpload">
                <el-button slot="trigger" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="更新地址">
          <el-row :gutter="10">
            <el-col :span="16" style="padding-left: 0;">
              <el-input v-model="form.url"></el-input>
            </el-col>
            <el-col :span="6">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleUploadUrlSuccess"
                :headers="headers"
                :on-error="handleUploadError"
                :before-upload="beforeUpload">
                <el-button slot="trigger" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="说明">
          <el-input type="textarea" :rows="5" v-model="form.updateDescription"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'updater-resource-addUpdate',
  data () {
    return {
      show: false,
      form: {},
      row: {},
      uploadUrl: this.$http.defaults.baseURL + api.uploadResourceUpdate,
      headers: {}
    }
  },
  methods: {
    open (row) {
      this.row = row
      this.form = {}
      this.show = true
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.resourceUpdateInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editResourceUpdate, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
      this.$store.dispatch('toggleLoading')
    },
    handleUploadAndroidUrlSuccess (res, file) {
      this.form.androidUrl = res.fileName
      this.$store.dispatch('toggleLoading')
    },
    handleUploadIosUrlSuccess (res, file) {
      this.form.iosUrl = res.fileName
      this.$store.dispatch('toggleLoading')
    },
    handleUploadUrlSuccess (res, file) {
      this.form.url = res.fileName
      this.$store.dispatch('toggleLoading')
    },
    beforeUpload (file) {
      this.$store.dispatch('toggleLoading')
    }
  },
  mounted () {
    this.headers['access-token'] = this.$store.state.account.access_token
  }
}
</script>

<style>

</style>
