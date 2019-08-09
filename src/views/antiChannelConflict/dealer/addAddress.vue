<template>
  <div>
    <el-dialog title="添加收货地址" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.contacter" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.Mobile" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="选择地区" :label-width="formLabelWidth">
          <el-cascader
            :options="areas"
            :props="props"
            v-model="form.areaId"
             size="small"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="设置为默认" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isDefault">是</el-checkbox>
        </el-form-item>        

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="create()" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-dealer-addAdminAccount',
  data () {
    return {
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      areas: [],
      show: false,
      list: [],
      row: {},
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (row) {
      this.show = true
      if (!this.areas.length) {
        this.getArea()
      }
      this.row = row
      this.form = {}
      this.form.dealerId = row.id
    },
    create () {
      this.$http.post(api.AddUserAddressByDealer, this.form).then(res => {
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    },
    async getArea () {
      this.$http.post(api.loadAreas).then(res => {
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
    }

  }
}
</script>


