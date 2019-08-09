<template>
  <div>
    <el-dialog title="选择图片" :visible.sync="show" width="50%" append-to-body>
      <div>
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="MediaId"
            width="100">
            <template slot-scope="scope">
              <span style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{ scope.row.media_id }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.url" style="max-width: 64px; max-height: 64px;"/>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleSelected(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'officialAccounts-menu-selectedNews',
  data () {
    return {
      show: false,
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    open () {
      this.init()
      this.getList()
    },
    init () {
      this.show = true
      this.list = []
      this.pageSize = 10
      this.currentPage = 1
      this.total = 0
    },
    getList () {
      this.$http.post(api.othersMediaLis, {
        page: this.currentPage,
        pageSize: this.pageSize,
        type: 'image'
      }).then(res => {
        this.list = res.data.item
        this.total = res.data.total_count
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleSelected (index, row) {
      this.$emit('selected', row)
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 10px;
}
</style>
