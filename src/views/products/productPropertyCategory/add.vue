<template>
  <div>
    <el-dialog title="添加产品属性分类" :visible.sync="show" :before-close="cancle" width="50%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="销售属性" name="sale">
          <div>
            <div class="clearfix">
              <el-button style="float: right;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-collapse v-model="collapseActive">
                <el-collapse-item v-for="item in list" :key="item.name" :title="item.name" :name="item.name">
                  <el-table
                  :data="item.items">

                    <el-table-column
                      label="名称"
                      prop="name">
                    </el-table-column>

                    <el-table-column
                      label="别名"
                      prop="nameAlias">
                    </el-table-column>

                    <el-table-column
                      label="属性值编码"
                      prop="propertyValueCode">
                    </el-table-column>
                    
                    <el-table-column
                      label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>

                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancle">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>
       <div>
        <add-values
          ref="add"
          @getList="getList"/>

        <edit-values
         ref="edit"
         @getList="getList"/>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import addValues from './addValues'
import editValues from './editValues'
export default {
  name: 'products-productPropertyCategory-add',
  components: { addValues, editValues },
  data () {
    return {
      show: false,
      form: {},
      formLabelWidth: '70px',
      list: [],
      isSaleProp: true,
      activeName: 'sale',
      collapseActive: [],
      productPropertyCategoryId: '',
      flag: ''
    }
  },
  methods: {
    open (flag) {
      this.flag = flag
      this.form = {
        id: ''
      }
      this.productPropertyCategoryId = ''
      this.list = []
      this.show = true
    },
    create () {
      this.$http.post(api.editProductPropertyCategory, this.form).then(res => {
        alert(this.form.id)
        if (this.flag === 'product') {
          this.$emit('createPropertyCategory', this.form)
        } else {
          this.$emit('getList')
        }
        this.show = false
        this.$notify({ title: '成功', message: '添加成功', type: 'success' })
      })
    },
    getList () {
      this.$http.post(api.getProductPropertyCategoryPropertyVaules, { id: this.form.id, isSaleProp: this.isSaleProp }).then(res => {
        this.list = res.data
        this.collapseActive = res.data.map(x => {
          return x.name
        })
      })
    },
    openAddDialog () {
      if (this.form.id === '') {
        this.$http.post(api.addProductPropertyCategory, this.form).then(res => {
          this.form = res.data
          this.$refs.add.open(res.data, this.isSaleProp)
        })
      } else {
        this.$refs.add.open(this.form, this.isSaleProp)
      }
    },
    handleClick (tab, event) {
      this.isSaleProp = tab.name === 'sale'
      this.getList()
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$http.post(api.delRelationPropertyValue, { id: row.id }).then(res => {
        this.getList()
        this.$notify({ title: '成功', message: '删除成功', type: 'success' })
      })
    },
    cancle () {
      if (this.form.id !== '') {
        this.$http.post(api.cancleCreatePropertyCategory, this.form).then(res => {
          this.show = false
        })
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style>

</style>
