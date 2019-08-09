<template>
  <div>
    <el-card>
      <div slot="header">
        <span>广告列表</span>
      </div>

      <div>

      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="位置代码"
            prop="advertKey">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="广告类型"
            prop="advertType"
            align="center"
            width="100">
          </el-table-column>

          <el-table-column
            label="高"
            prop="height"
            align="center"
            width="100">
          </el-table-column>

          <el-table-column
            label="宽"
            prop="width"
            align="center"
            width="100">
          </el-table-column>

          <el-table-column
            label="轮播时隔"
            prop="interval"
            align="center"
            width="100">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleItem(scope.$index, scope.row)">广告图片</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <div>

      <edit-advert
        ref="edit"
        @getList="getList"/>

      <advert-item
        ref="item"/>

    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import editAdvert from './edit'
import advertItem from './item'
export default {
  name: 'basic-advert-list',
  components: { editAdvert, advertItem },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getList () {
      this.$http.post(api.advertList).then(res => {
        this.list = res.data
      })
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleItem (index, row) {
      this.$refs.item.open(row)
      console.log(row.id)
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
