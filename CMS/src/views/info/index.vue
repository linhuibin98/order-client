<template>
  <div class="info_container">
    <div class="update_btn">
      <el-button @click="handleEidt">{{ editable ? '编辑' : '取消' }}</el-button>
    </div>
    <el-form
      :model="formData"
      label-position="left"
      label-width="80px"
      style="width: 60%; margin: 0 auto;"
    >
      <div class="form_title">
        <h1>店铺信息</h1>
      </div>
      <el-form-item label="店铺名">
        <el-input v-model="formData.name" type="text" :disabled="editable" />
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input v-model="formData.notice" type="textarea" :disabled="editable" />
      </el-form-item>
      <el-form-item label="起送金额">
        <el-input v-model="formData.startupCost" type="text" :disabled="editable" />
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="formData.distributionCode" type="text" :disabled="editable" />
      </el-form-item>
      <el-form-item v-show="!editable" class="form_btn">
        <el-button @click="handleCancel">取消修改</el-button>
        <el-button @click="handleConfirm">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getBaseInfo, updateBaseInfo } from '@/api/user';

export default {
  data: () => {
    return {
      formData: {
        name: '',
        notice: '',
        distributionCode: 0,
        startupCost: 0
      },
      oldData: {},
      editable: true
    }
  },
  computed: {
    ...mapGetters(['id', 'name'])
  },
  created() {
    (async() => {
      const res = await getBaseInfo(this.id)
      const { name, notice, distributionCode, startupCost } = res.data

      const data = {
        name,
        notice,
        distributionCode,
        startupCost
      }

      this.formData = data
      this.oldData = JSON.parse(JSON.stringify(data))
    })()
  },
  methods: {
    handleEidt() {
      this.editable = !this.editable

      if (this.editable) {
        this.formData = JSON.parse(JSON.stringify(this.oldData))
      }
    },

    handleCancel() {
      this.editable = true
      this.formData = JSON.parse(JSON.stringify(this.oldData))
    },

    async handleConfirm() {
      const res = await updateBaseInfo({ id: this.id, data: this.formData })
      if (res.errorCode === 0) {
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.editable = true
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.info_container {
  margin: 50px;

  .update_btn {
    text-align: right;
  }

  .form_title {
    text-align: center;
  }

  .form_btn {
    text-align: right;
  }

  .el-input.is-disabled.is-disabled {
    .el-input__inner {
      background-color: #fff;
      border: none;
      color: #333;
      cursor: pointer;
    }
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border: none;
    color: #666;
    cursor: pointer;
  }
}
</style>
