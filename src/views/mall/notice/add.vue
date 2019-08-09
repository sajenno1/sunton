<template>
  <div>
    <el-dialog title="添加消息" :visible.sync="show" width="60%">
      <el-form :model="form" style="padding-right:5%;">

      <el-form-item label="消息类型" :label-width="formLabelWidth">
          <el-select v-model="form.noticeTypeId" placeholder="请选择消息类型">
            <el-option
              v-for="item in noticeTypeList"
              :key="item.id"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="消息标题" :label-width="formLabelWidth">
          <el-input placeholder="请输入标题" v-model="form.noticeTitle" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="消息摘要" :label-width="formLabelWidth">
          <el-input type="textarea" placeholder="请输入摘要" :maxlength="100"  v-model="form.abstract" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="消息内容" :label-width="formLabelWidth">
          <div>
            <div id="editor1" type="text/plain"></div>
          </div>
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
import '../../../../static/utf8-net/ueditor.config'
import '../../../../static/utf8-net/ueditor.all'
import '../../../../static/utf8-net/lang/zh-cn/zh-cn'
export default {
  name: 'mall-notice-add',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {},
      ue: '',
      pageParams: {
        page: 1,
        pageSize: 1000
      },
      noticeTypeList: []
    }
  },
  methods: {
    open () {
      this.form = {}
      this.getTypeList()
      this.show = true
      // setTimeout(() => {
      //   this.ue = window.UE.getEditor('editor1', {
      //     BaseUrl: '',
      //     UEDITOR_HOME_URL: 'static/utf8-net/'
      //   })
      // }, 100)
      setTimeout(() => {
        this.ue = window.UE.getEditor('editor1', {
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/utf8-net/',
          zIndex: 9999
        })
        setTimeout(() => {
          window.UE.getEditor('editor1').setContent('')
        }, 200)
      }, 100)
    },
    create () {
      this.form.content = window.UE.getEditor('editor1').getContent()
      this.$http.post(api.addNotice, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    getTypeList () {
      this.$http.post(api.noticeTypeList, {
        page: this.pageParams.page,
        pageSize: this.pageParams.pageSize,
        type: ''
      }).then(res => {
        this.noticeTypeList = res.data.rows
        // this.total = res.data.total
      })
    }
  },
  mounted () {
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
