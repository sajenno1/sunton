<template>
  <div>
    <el-dialog title="编辑仓库" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:20%;">
        
        <el-form-item label="编号" :label-width="formLabelWidth">
          <div>{{form.no}}</div>
        </el-form-item>

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-input v-model="form.warehouseType" auto-complete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.linkMan" auto-complete="off"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="地区" :label-width="formLabelWidth">
          <el-cascader
            :options="areas"
            :props="props"
            v-model="form.areaId"
            ></el-cascader>
        </el-form-item> -->

        <!-- <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item> -->

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
  name: 'antiChannelConflict-warehouse-edit',
  data () {
    return {
      show: false,
      form: {},
      areas: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      list: [],
      formLabelWidth: '120px'
    }
  },
  methods: {
    getArea () {
      return this.$http.post(api.loadAreas).then(res => {
        this.list = res.data
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
    open (data) {
      if (!this.areas.length) {
        this.getArea().then(res => {
          this.getInfo(data.id)
        })
        return
      }
      this.getInfo(data.id)
    },
    getInfo (id) {
      this.$http.post(api.warehouseInfo, { id: id }).then(res => {
        this.form = res.data
        let third = this.form.areaId
        let second
        let first
        this.list.forEach(x => {
          if (x.id === third) {
            second = x.parentId
            this.list.forEach(v => {
              if (second === v.id) {
                first = v.parentId
              }
            })
          }
        })
        this.show = true
        this.form.areaId = [first, second, third]
      })
    },
    update () {
      this.$http.post(api.editWarehouse, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
