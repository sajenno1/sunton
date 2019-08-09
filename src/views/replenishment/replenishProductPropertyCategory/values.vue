<template>
  <div>
    <el-dialog title="关联产品属性值" :visible.sync="show" width="60%">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
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
                      label="名称"
                      prop="nameAlias">
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

        <el-tab-pane label="普通属性" name="ordinary">
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
                      label="名称"
                      prop="nameAlias">
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
  name: 'replenishment-replenishProductPropertyCategory-values',
  components: { addValues, editValues },
  data () {
    return {
      show: false,
      list: [],
      row: {},
      isSaleProp: true,
      activeName: 'sale',
      collapseActive: []
    }
  },
  methods: {
    open (row) {
      this.list = []
      this.row = row
      this.show = true
      this.getList()
    },
    getList () {
      this.$http.post(api.getReplenishProductPropertyCategoryPropertyVaules, { id: this.row.id, isSaleProp: this.isSaleProp }).then(res => {
        this.list = res.data
        this.collapseActive = res.data.map(x => {
          return x.name
        })
      })
    },
    openAddDialog () {
      this.$refs.add.open(this.row, this.isSaleProp)
    },
    handleClick (tab, event) {
      this.isSaleProp = tab.name === 'sale'
      this.getList()
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品属性值吗？')
        .then(() => {
          this.$http.post(api.delReplenishRelationPropertyValue, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style>

</style>
