<template>
  <div class="goods_container">
    <div class="add">
      <el-button type="primary" @click="handleAdd">添加商品</el-button>
    </div>
    <div class="title">
      <h1>商品管理</h1>
    </div>
    <el-table :data="tableData" border style="width: 100%" max-height="500">
      <el-table-column type="index" />
      <el-table-column prop="food_name" label="名称" />
      <el-table-column prop="food_price" label="价格" />
      <el-table-column prop="food_ingredient" label="原料" />
      <el-table-column prop="food_cat_name" label="分类" />
      <el-table-column prop="food_commend" label="推荐" />
      <el-table-column prop="food_sales" label="销量" />
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
      <span>确认删除该商品</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confimDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" width="50%" @closed="dialogCloseEvent">
      <div slot="title" class="dialog-title">
        <h2 style="text-align: center;">{{ dialogTitle }}</h2>
      </div>
      <el-form :model="currentGoods" label-position="left" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="currentGoods.food_name" width="200px" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="currentGoods.food_price" />
        </el-form-item>
        <el-form-item label="原料">
          <el-input v-model="currentGoods.food_ingredient" type="textarea" />
        </el-form-item>
        <el-form-item label="分类" class="classify">
          <el-select v-model="currentGoods.food_cat_name" placeholder="选择分类">
            <el-option v-for="(item, index) in cates" :key="index" :label="item" :value="item" />
          </el-select>
          <el-input
            v-show="iptVisible"
            v-model="newClassifyName"
            class="classify_ipt"
            placeholder="分类名称"
          />
          <el-button type="primary" class="add_btn" @click="handleAddClassify">{{ btnText }}</el-button>
        </el-form-item>
        <el-form-item label="推荐">
          <el-switch v-model="currentGoods.food_commend" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmChange">{{ dialogBtnText }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoods, updateGoodsInfo, deleteGoods, addGoods } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogFormVisible: false,
      currentGoods: {}, // 当前操作所在行的信息
      dialogTitle: '',
      dialogBtnText: '',
      iptVisible: false, // 添加分类输入框显示、隐藏
      btnText: '添加分类',
      newClassifyName: '',
      cates: [] // 商品分类集合
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  created() {
    (async() => {
      // 获取商品数据
      const res = await getGoods(this.id)
      const { goods, cates } = res.data
      goods.forEach(item => {
        item.food_commend = item.food_commend ? '是' : '否'
      })
      this.tableData = goods
      this.cates = cates
    })()
  },
  methods: {
    // 确认删除
    async confimDelete() {
      const { food_id, food_cat_name } = this.currentGoods
      const res = await deleteGoods({
        id: this.id,
        data: { food_id, food_cat_name }
      })

      const type = res.errorCode === 0 ? 'success' : 'error'
      this.$message({
        message: res.message,
        type
      })

      if (res.errorCode === 0) {
        const index = this.tableData.findIndex(item => item.food_id == food_id)
        this.tableData.splice(index, 1)
      }

      this.dialogVisible = false
    },

    handleDelete(scope) {
      this.currentGoods = scope.row
      this.dialogVisible = true
    },

    handleEdit(scope) {
      this.dialogTitle = '商品信息修改'
      this.dialogBtnText = '修改'
      this.currentGoods = JSON.parse(JSON.stringify(scope.row))
      this.currentGoods.food_commend = this.currentGoods.food_commend === '是'
      this.dialogFormVisible = true
    },

    // 点击编辑并确认修改、添加商品
    async confirmChange() {
      this.dialogFormVisible = false
      this.currentGoods.food_commend = this.currentGoods.food_commend ? 1 : 0

      let res

      if (this.dialogTitle === '商品添加') {
        // 处理商品添加
        res = await addGoods({ id: this.id, data: this.currentGoods })

        if (res.errorCode === 0) {
          this.tableData = res.data
        }
      } else {
        // 处理修改商品信息
        res = await updateGoodsInfo({
          id: this.id,
          data: this.currentGoods
        })

        if (res.errorCode === 0) {
          const cloneGoods = JSON.parse(JSON.stringify(this.currentGoods))
          cloneGoods.food_commend =
          this.currentGoods.food_commend === 1 ? '是' : '否'
          const index = this.tableData.findIndex(
            item => item.food_id == cloneGoods.food_id
          )
          this.tableData[index] = cloneGoods
        }
      }

      this.$message({
        message: res.message,
        type: 'success'
      })
    },
    // 添加商品
    handleAdd() {
      this.currentGoods = {}
      this.dialogTitle = '商品添加'
      this.dialogBtnText = '添加'
      this.dialogFormVisible = true
    },
    // 点击dialaog里的添加分类
    handleAddClassify() {
      if (this.iptVisible) {
        // 输入内容不为空
        if (this.newClassifyName !== '') {
          this.cates.unshift(this.newClassifyName)
          this.currentGoods['food_cat_name'] = this.newClassifyName
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.btnText = '添加分类'
          this.iptVisible = false
        } else {
          this.$message({
            message: '请输入分类名称',
            type: 'warning'
          })
        }
      } else {
        this.btnText = '确认'
        this.iptVisible = true
      }
    },
    // 关闭dialog, 重置状态
    dialogCloseEvent() {
      this.btnText = '添加分类'
      this.iptVisible = false
    }
  }
}
</script>

<style lang="scss">
.goods_container {
  margin: 15px 30px;

  .add {
    text-align: right;
  }

  .title {
    text-align: center;
    h1 {
      margin-top: 10px;
    }
  }

  .cell {
    text-align: center;
  }

  .classify {
    .el-form-item__content {
      display: flex;

      .classify_ipt {
        width: 30%;
        margin-left: 30px;
      }

      .add_btn {
        margin-left: 15px;
      }
    }
  }
}
</style>
