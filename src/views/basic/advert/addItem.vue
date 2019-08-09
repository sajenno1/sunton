<template>
  <div>
    <el-dialog title="添加图片" :visible.sync="show" width="40%" append-to-body>
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="链接">
          <el-input v-model="form.link"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>

        <el-form-item label="图片">
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

        <el-form-item label="remark" v-if="row.advertKey=='Mall.Used.Specified.Icons.Advert'">
          <div style="color:#aaa">(NewProduct) (SalePromotion) (SaleRankings) (MyPurchase)</div>
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
  name: 'basic-advert-addItem',
  data () {
    return {
      show: false,
      form: {},
      row: {},
      imgUpload: this.$http.defaults.baseURL + api.uploadAdvertItemPhoto,
      headers: {}
    }
  },
  methods: {
    open (row) {
      this.row = row
      this.form = {
        advertId: row.id,
        photo: null
      }
      this.show = true
    },
    create () {
      this.$http.post(api.addAdvertItem, this.form).then(res => {
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
