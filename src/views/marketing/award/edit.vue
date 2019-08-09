<template>
  <div>
    <el-dialog title="编辑奖品" :visible.sync="show" width="40%" append-to-body>
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="奖品类型">
          <el-select v-model="form.awardType" placeholder="请选择">
            <el-option
              v-for="item in awardTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

        <el-form-item label="数量">
          <el-input-number v-model="form.count" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="价格" v-if="form.awardType === 'RedPacket'">
          <el-input-number v-model="form.price" :min="0.01"></el-input-number>
        </el-form-item>

        <el-form-item label="积分" v-if="form.awardType === 'Integral'">
          <el-input-number v-model="form.integral" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="处理类型">
          <el-input v-model="form.processType"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'marketing-award-add',
  data () {
    return {
      show: false,
      form: {},
      awardTypeList: [],
      imgUpload: this.$http.defaults.baseURL + api.uploadAwardPhoto,
      headers: {}
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getAwardTypeList()
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.awardInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editAward, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    },
    getAwardTypeList () {
      this.$http.post(api.awardTypeList).then(res => {
        this.awardTypeList = res.data
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
