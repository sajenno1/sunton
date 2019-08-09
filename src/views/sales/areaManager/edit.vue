<template>
  <div>
    <el-dialog title="编辑区域负责人" :visible.sync="show" width="40%" :before-close="close">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" auto-complete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="OpenId" :label-width="formLabelWidth">
        <el-input v-model="form.openId" readonly></el-input>
        </el-form-item>

        <el-form-item label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="userNickName" readonly></el-input>
        </el-form-item>

        <el-form-item label="用户头像" :label-width="formLabelWidth">
         <template slot-scope="scope">
            <img :src="avatar.replace('/0', '/64')" style="max-width: 64px; max-height: 64px;" />
          </template>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="sex" readonly></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="update" size="medium">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'sales-areaManager-edit',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      show: false,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      nickName: '',
      mobile: '',
      genderEnum: {
        Unknown: '未知',
        Male: '男',
        Female: '女'
      },
      userNickName: '',
      avatar: '',
      sex: ''
    }
  },
  methods: {
    open (id) {
      this.form = {}
      this.getInfo(id)
    },
    close (done) {
      this.show = false
      this.$emit('close')
    },
    getInfo (id) {
      this.$http.post(api.areaManagerInfo, { id: id }).then(res => {
        this.form = res.data
        this.userNickName = res.data.nickName
        this.avatar = res.data.avatar
        this.sex = this.genderEnum[res.data.sex]
        this.show = true
      })
    },
    update () {
      this.$http.post(api.editAreaManager, this.form).then(res => {
        this.$notify({ title: '成功', message: '编辑成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    }
  }
}
</script>

<style>

</style>
