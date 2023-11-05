<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item>
        <el-input
          v-model="queryForm.phone"
          placeholder="手机号码"
          size="small"
          style="width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.name"
          placeholder="用户名"
          size="small"
          style="width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查看</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <el-table
      v-loading="listLoading"
      :data="dataList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="手机号" prop="money"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {},
      dataList: null,
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
