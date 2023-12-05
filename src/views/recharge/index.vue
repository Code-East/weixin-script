<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item>
        <el-date-picker
          v-model="queryForm.startTime"
          type="datetime"
          size="small"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择开始日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="queryForm.endTime"
          type="datetime"
          size="small"
          value-format="yyyy-MM-dd hh:mm:ss"
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
        label="赠送金额"
        prop="moneyType.giftAmount"
        align="center"
      ></el-table-column>
      <el-table-column
        label="充值时间"
        prop="createDate"
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
        startTime: "",
        endTime: "",
      },
      total: 0,
      dataList: [],
      loading: false,
    };
  },
  created() {
    this.getList();
    this.setDefaultDate();
  },
  methods: {
    getList() {
      this.loading = true;
      getRechargeApi(this.queryForm)
        .then((res) => {
          console.log("充值记录", res);
          const { records, total } = res.data;
          this.dataList = records;
          this.total = total;
          this.loading = false;
        })
        .catch((err) => {
          console.log("err", err);
          this.loading = false;
        });
    },
    setDefaultDate() {
      const today = new Date();
      var yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      today.setHours(0);
      yesterday.setHours(0);
      today.setMinutes(0);
      yesterday.setMinutes(0);
      today.setSeconds(0);
      yesterday.setSeconds(0);
      console.log(yesterday, today);
      this.queryForm.startTime = yesterday;
      this.queryForm.endTime = today;
    },
  },
};
</script>

<style lang="scss" scoped></style>
