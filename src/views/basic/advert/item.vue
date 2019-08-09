<template>
  <div>
    <el-dialog title="图片列表" :visible.sync="show" width="60%">
      <div>
        <el-button style="margin-bottom: 10px; float: right;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.photo" style="max-width: 64px; max-height: 64px;"/>
            </template>
          </el-table-column>

          <el-table-column
            label="标题"
            prop="title">
          </el-table-column>

          <el-table-column
            label="链接"
            prop="link">
          </el-table-column>

          <el-table-column
            label="排序"
            prop="sort">
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                v-if="showDelete"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div>
        <add-item
          ref="add"
          @getList="getList"/>

        <edit-item
          ref="edit"
          @getList="getList"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import addItem from './addItem'
import editItem from './editItem'
export default {
  name: 'basic-advert-item',
  components: { addItem, editItem },
  data () {
    return {
      list: [],
      show: false,
      row: {},
      showDelete: true
    }
  },
  methods: {
    open (row) {
      this.show = true
      this.row = row
      // if (this.row.advertKey === 'Mall.Used.Specified.Icons.Advert') {
      //   this.showDelete = false
      // } else {
      //   this.showDelete = true
      // }
      this.getList()
    },
    getList () {
      this.$http.post(api.advertItemList, { advertId: this.row.id }).then(res => {
        this.list = res.data
      })
    },
    openAddDialog () {
      this.$refs.add.open(this.row)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该图片吗？')
        .then(() => {
          this.$http.post(api.delAdvertInfo, { id: row.id }).then(res => {
            this.getList()
            this.$notify.success({ title: '成功', message: '删除成功' })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.table-container {
  margin-top: 10px;
}
</style>
