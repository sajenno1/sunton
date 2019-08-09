<template>
  <div>
    <el-dialog title="选择产品" :visible.sync="show" append-to-body width="70%">
      <div>
        <el-input v-model="name" style="width: 200px;" placeholder="请输入名称"></el-input>

        <el-input v-model="no" style="width: 200px;" placeholder="请输入编号"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.photo" style="max-width: 64px; max-height: 64px;"/>
            </template>
          </el-table-column>

          <el-table-column
            label="品牌"
            prop="brandName">
          </el-table-column>

          <el-table-column
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="单位"
            prop="unit">
          </el-table-column>

          <el-table-column
            label="规格"
            prop="specification">
          </el-table-column>

          <!-- <el-table-column
            label="价格"
            prop="price">
          </el-table-column>

          <el-table-column
            label="消费的积分"
            prop="customeIntegral">
          </el-table-column>

          <el-table-column
            label="会员获得积分"
            prop="rewardIntegral">
          </el-table-column>

          <el-table-column
            label="销售员获得积分"
            prop="sellRewardIntegral">
          </el-table-column> -->

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
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

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'replenishment-replenishProduct-selectedProduct',
  data () {
    return {
      show: false,
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: '',
      no: ''
    }
  },
  methods: {
    open () {
      this.show = true
      this.getList()
    },
    getList () {
      this.$http.post(api.replenishProductList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
        no: this.no
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
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
.table-container {
  margin-top: 10px;
}
</style>
