<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <!-- <el-input
          v-model="queryForm.startTime"
          placeholder="开始时间"
          size="small"
        ></el-input> -->
    <el-form inline>
      <el-form-item>
        <el-date-picker
          v-model="queryForm.startTime"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择开始日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="queryForm.endTime"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.name"
          placeholder="用户名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.nickName"
          placeholder="用户小程序昵称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain @click="getList">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <el-table
      v-loading="loading"
      :data="dataList"
      element-loading-text="Loading"
    >
      <el-table-column
        label="姓名"
        prop="user.name"
        align="center"
      ></el-table-column>
      <el-table-column
        label="小程序昵称"
        prop="user.nickname"
        align="center"
      ></el-table-column>
      <el-table-column
        label="充值金额"
        prop="moneyType.rechargeAmount"
        align="center"
      ></el-table-column>
      <el-table-column
        label="充值时间"
        prop="moneyType.createDate"
        align="center"
      ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      :limit.sync="queryForm.pageSize"
      :page.sync="queryForm.currPage"
      :total="total"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getRechargeApi } from "@/api/record.js";
import pagination from "@/components/Pagination/index";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      queryForm: {
        currPage: 1,
        pageSize: 10,
      },
      total: 0,
      dataList: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getRechargeApi(this.queryForm)
        .then((res) => {
          console.log("充值记录", res);
          const { records,total } = res.data
          this.dataList = records
          this.total = total
          this.loading = false;
        })
        .catch((err) => {
          console.log("err", err);
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
