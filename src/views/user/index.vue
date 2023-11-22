<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.username"
          placeholder="用户名"
          size="small"
          style="width: 240px"
          @keyup.enter="getList"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <el-table
      v-loading="loading"
      :data="dataList"
      element-loading-text="Loading"
    >
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.avatarUrl"
            :preview-src-list="[scope.row.avatarUrl]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户名"
        prop="username"
      ></el-table-column>
      <el-table-column
        align="center"
        label="昵称"
        prop="name"
      ></el-table-column>
      <el-table-column
        align="center"
        label="余额"
        prop="money"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="hanleEdit(scope.row)"
            >修改余额</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      :limit.sync="queryForm.pageSize"
      :page.sync="queryForm.currPage"
      :total="total"
      @pagination="getList"
    />
    <el-dialog title="修改余额" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="50px">
        <el-form-item prop="money" label="余额">
          <el-input
            v-model.number="form.money"
            placeholder="请输入余额"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, setUserMoney } from "@/api/user";
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
        username: "",
      },
      dataList: null,
      loading: false,
      total: 0,
      dialogVisible: false,
      form: {},
      rules: {
        money: [{ required: true, message: "请输入修改余额", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getUserList(this.queryForm)
        .then((res) => {
          console.log("获取成功", res);
          const { total, records } = res.data;
          this.dataList = records;
          this.total = total;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    hanleEdit(row) {
      this.form = { ...row };
      this.dialogVisible = true;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const sendData = {
            id: this.form.id,
            money: this.form.money,
          };
          setUserMoney(sendData)
            .then((res) => {
              this.$message.success("修改成功");
              this.getList();
              this.dialogVisible = false
            })
            .catch((err) => {
              console.log("修改失败", err);
            });
          this.$refs.form.resetFields();
        }
      });
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
