<template>
  <div>
    <el-dialog title="编辑发行记录" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.count" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="发行到哪个地区" :label-width="formLabelWidth">
          <el-cascader
            :options="areas"
            :props="props"
            v-model="areaIds"></el-cascader>
        </el-form-item>

        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input v-model="form.captcha" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="QR码的URL格式串" :label-width="formLabelWidth">
          <el-input v-model="form.qrCodeUrlFormat" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="代码位置索引" :label-width="formLabelWidth">
          <el-input v-model="form.codesIndex" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="忽略的文本内容" :label-width="formLabelWidth">
          <el-input v-model="form.ignoreText" auto-complete="off" placeholder="多项则以,号隔开"></el-input>
        </el-form-item>

        <el-form-item label="激活日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.activeDateTime"
            type="datetime"
            placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="发行描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" auto-complete="off"></el-input>
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
  name: 'issuerCodes-record-edit',
  data () {
    return {
      show: false,
      form: {},
      formLabelWidth: '130px',
      areas: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      areaIds: [],
      areaList: []
    }
  },
  methods: {
    async open (row) {
      this.form = {}
      this.show = true
      await this.getArea()
      this.getData(row.id)
    },
    update () {
      this.form.areaId = this.areaIds[this.areaIds.length - 1]
      this.$http.post(api.editIssuerRecord, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    },
    async getArea () {
      await this.$http.post(api.loadAreas).then(res => {
        this.areaList = res.data
        res.data.forEach(x => {
          if (x.depth === 1) {
            let first = {}
            first.label = x.name
            first.value = x.id
            first.children = []
            res.data.forEach(v => {
              if (x.id === v.parentId && v.depth === 2) {
                let second = {}
                second.label = v.name
                second.value = v.id
                second.children = []
                res.data.forEach(c => {
                  if (v.id === c.parentId && c.depth === 3) {
                    let third = {}
                    third.label = c.name
                    third.value = c.id
                    second.children.push(third)
                  }
                })
                first.children.push(second)
              }
            })
            this.areas.push(first)
          }
        })
      })
    },
    getData (id) {
      this.$http.post(api.issuerRecordInfo, { id: id }).then(res => {
        this.form = res.data
        let third = this.form.areaId
        let second
        let first
        this.areaList.forEach(x => {
          if (x.id === third) {
            second = x.parentId
            this.areaList.forEach(v => {
              if (second === v.id) {
                first = v.parentId
              }
            })
          }
        })
        this.areaIds = [first, second, third]
      })
    }
  }
}
</script>

<style>

</style>
