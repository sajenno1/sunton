<template>
  <div>
    <el-dialog title="产品属性值" :visible.sync="show" width="40%">
      <div>
        <el-button style="margin-bottom: 10px;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>

        <el-button style="margin-left: 0px;" size="small" type="primary" @click="saveSort">保存排序</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%"
          class="drag-table">

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="别名"
            prop="nameAlias">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="拖拽" width="80">
            <template slot-scope="scope">
              <i class="el-icon-rank"></i>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
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
      </div>
    </el-dialog>

    <div>
      <add-mall-product-property-value
        ref="add"
        @getList="getList"/>

      <edit-mall-product-property-value
        ref="edit"
        @getList="getList"/>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import Sortable from 'sortablejs'
import addMallProductPropertyValue from './add'
import editMallProductPropertyValue from './edit'
export default {
  name: 'mall-mallProductPropertyValue-list',
  components: { addMallProductPropertyValue, editMallProductPropertyValue },
  data () {
    return {
      show: false,
      list: [],
      olderList: [],
      newList: [],
      sortable: null,
      row: {}
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
      this.$http.post(api.mallProductPropertyValueList, { propertyId: this.row.id }).then(res => {
        this.list = res.data.rows
        this.olderList = this.list.map(v => v.id)
        this.newList = this.olderList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    setSort () {
      const el = document.querySelectorAll('.drag-table > .el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        onEnd: evt => {
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    saveSort () {
      if (this.list.length === 0) {
        return
      }
      let sortList = []
      for (var i = 0; i < this.newList.length; i++) {
        sortList.push({
          id: this.newList[i],
          sort: i
        })
      }
      this.$http.post(api.setMallProductPropertyValueSort, { sort: sortList }).then(res => {
        this.$notify({ title: '成功', message: '设置成功', type: 'success' })
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品属性值吗？')
        .then(() => {
          this.$http.post(api.delMallProductPropertyValue, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功!', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open(this.row)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    }
  }
}
</script>

<style>

</style>
