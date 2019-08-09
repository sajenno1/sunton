<template>
  <div>
    <el-dialog title="添加快递" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="快递图片">
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

        <el-form-item label="快递编号">
          <el-input v-model="form.no"></el-input>
        </el-form-item>

        <el-form-item label="快递名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        
        <el-form-item label="物流查询编码">
          <el-input v-model="form.logisticsQueryCode"></el-input>
        </el-form-item>
        
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'products-brand-add',
  data () {
    return {
      show: false,
      form: {},
      imgUpload: this.$http.defaults.baseURL + api.uploadExpressPhoto,
      headers: {}
    }
  },
  methods: {
    open () {
      this.form = {
        photo: ''
      }
      this.show = true
    },
    create () {
      this.$http.post(api.addExpress, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    handleUploadPhotoSuccess (res, file) {
      this.form.photo = res.fileName
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    }
  },
  mounted () {
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
