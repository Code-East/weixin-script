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
        <el-button type="primary" size="small" @click="handleAdd"
          >增加</el-button
        >
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
      <!-- <el-table-column
        align="center"
        label="用户名"
        prop="username"
      ></el-table-column> -->
      <el-table-column
        align="center"
        label="用户名"
        prop="username"
      ></el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="name"
      ></el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender == 0 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="手机号"
        prop="mobile"
      ></el-table-column>
      <el-table-column
        align="center"
        label="余额"
        prop="money"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.employee">
            <el-link type="primary" @click="hanleEditPWD(scope.row)"
              >修改密码</el-link
            >
            <el-link
              style="margin-left: 10px"
              type="primary"
              @click="hanleDelete(scope.row)"
              >删除账号</el-link
            >
          </div>
          <el-link v-else type="primary" @click="hanleEdit(scope.row)"
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
    <el-dialog title="增加用户" :visible.sync="addVisible" width="30%">
      <el-form
        ref="userform"
        :model="userform"
        :rules="userRules"
        label-width="50px"
      >
        <el-form-item prop="name" label="姓名">
          <el-input
            v-model.number="userform.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username" label="账号">
          <el-input
            v-model.number="userform.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model.number="userform.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="employee" label="员工">
          <el-switch
            v-model="userform.employee"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddSubmit">确 定 </el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="updatePWDVisible" width="30%">
      <el-input v-model="password" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePWDVisible = false">取 消</el-button>
        <el-button type="primary" @click="onPWDSubmit">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, setUserMoney, addUser, setPassword,delUserApi } from "@/api/user";
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
      addVisible: false,
      updatePWDVisible: false,
      form: {},
      userform: {
        employee: true,
      },
      rules: {
        money: [{ required: true, message: "请输入修改余额", trigger: "blur" }],
      },
      userRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      password: "",
      nowUserId: "",
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
    hanleEditPWD(row) {
      this.nowUserId = row.id;
      this.password = row.password
      this.updatePWDVisible = true;
    },
    hanleDelete(row) {
      this.nowUserId = row.id;
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUserApi(this.nowUserId).then(res=>{
            this.$message.success('删除成功')
            this.getList()
          })
        })
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
              this.dialogVisible = false;
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
    handleAdd() {
      this.addVisible = true;
    },
    onAddSubmit() {
      this.$refs.userform.validate((valid) => {
        if (valid) {
          this.userform.employee = this.userform.employee ? 1 : 0;
          addUser(this.userform).then((res) => {
            this.$message.success("新增成功");
            this.getList();
            this.addVisible = false;
            this.$refs.userform.resetFields();
          });
        }
      });
    },
    onPWDSubmit() {
      if (!this.password) return this.$message.warning("请输入密码");
      setPassword(this.nowUserId, this.password).then((res) => {
        this.$message.success("修改成功");
        this.password = "";
        this.updatePWDVisible = false;
        this.getList();
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
