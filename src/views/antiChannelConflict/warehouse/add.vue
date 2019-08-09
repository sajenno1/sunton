<template>
  <div>
    <el-dialog title="添加仓库" :visible.sync="show" width="45%">
      <el-form :model="form" style="padding-right:20%;">

        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off"></el-input>
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
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-warehouse-add',
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
      formLabelWidth: '120px'
    }
  },
  methods: {
    open () {
      if (!this.areas.length) {
        this.getArea()
      }
      this.form = {}
      this.show = true
    },
    getArea () {
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
    },
    create () {
      this.$http.post(api.addWarehouse, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
