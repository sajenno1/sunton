<template>
  <div>
    <el-card>
      <div slot="header">
        <span>申请加盟列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="linkManName" placeholder="请输入名称"></el-input>

        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
 
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
            label="联系人"
            prop="linkManName">
          </el-table-column>

          <el-table-column
            label="联系电话"
            prop="mobile">
          </el-table-column>

          <el-table-column
            label="所在地区"
            prop="areaName">
          </el-table-column>

          <el-table-column
            label="申请时间"
            prop="createDate">
             <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>
 

           <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.row)">详情</el-button>
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
      <div>
        <joininapply-detail
          ref="joininapplyDetail"
          @getList="getList">
        </joininapply-detail>
      </div>


    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import joininapplyDetail from './detail'
export default {
  name: 'wechatexcellent-joininapply-list',
  components: { joininapplyDetail },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      linkManName: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.weChatExcellentJoinInApplyList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        linkManName: this.linkManName
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
    search () {
      this.list.length = 0
      this.currentPage = 1
      this.getList()
    },
    handleDetail (row) {
      this.$refs.joininapplyDetail.open(row.id)
    }
  },
  mounted () {
    this.getList()
  }

}
</script>

