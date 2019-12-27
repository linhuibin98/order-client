<template>
  <div class="orders_container">
    <div class="title">
      <h1>订单管理</h1>
    </div>
    <el-table
      :data="tableData"
      border
      :cell-style="{textAlign: 'center'}"
      :header-cell-style="{textAlign: 'center'}"
    >
      <el-table-column type="index" :index="computeIndex" />
      <el-table-column prop="num" label="订单编号" />
      <el-table-column prop="userName" label="买家姓名" />
      <el-table-column prop="userPhone" label="买家手机号" />
      <el-table-column prop="time" label="下单时间" />
      <el-table-column prop="price" label="订单总价" />
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleLook(scope)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page.sync="page"
      :page-size="limit"
      background
      layout="total, prev, pager, next"
      @next-click="handleNext"
      @prev-click="handlePrev"
      @current-change="changePageEvent"
    />
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
      <el-table :data="currentLook" border>
        <el-table-column prop="id" label="商品编号" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="num" label="数量" />
        <el-table-column prop="price" label="单价" />
        <el-table-column label="总价">
          <template slot-scope="scope">
            <span>{{ scope.row.num * scope.row.price }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getOrders } from '@/api/user'
import { mapGetters } from 'vuex'
import formatDate from '@/utils/formatDate'

export default {
  data() {
    return {
      tableData: [],
      currentLook: [], // 当前查看订单详情数据
      dialogTableVisible: false,
      total: 0, // 总数据数量
      page: 1, // 当前所在页数
      limit: 6 // 每页显示多少条数据
    }
  },
  computed: {
    ...mapGetters(['id']),
    computeIndex() {
      return (this.page - 1) * this.limit + 1
    }
  },
  created() {
    this.reqOrders()
  },
  methods: {
    reqOrders() {
      (async() => {
        const { id, page, limit } = this
        const res = await getOrders({
          id,
          page,
          limit
        })
        if (res.errorCode === 0) {
          const {
            data,
            pagination: { page, total }
          } = res
          data.forEach(item => {
            item.time = formatDate(item.time)
          })
          this.tableData = data
          this.page = page
          this.total = total
        }
      })()
    },
    handleLook(scope) {
      this.currentLook = scope.row.foods
      this.dialogTableVisible = true
    },
    changePageEvent() {
      console.log(this.page)
      this.reqOrders()
    },
    handleNext() {
      this.page += 1
    },
    handlePrev() {
      this.page -= 1
    }
  }
}
</script>

<style lang="scss">
.orders_container {
  margin: 15px 30px;
  .title {
    h1 {
      text-align: center;
    }
  }
  .el-pagination {
    display: flex;
    justify-content: center;
    margin: 50px 0;
  }
}
</style>
