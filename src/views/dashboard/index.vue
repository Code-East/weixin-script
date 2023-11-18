<template>
  <div class="app-container">
    <div class="dashboard-text">
      <el-button type="primary" size="small" @click="handleAdd">增加</el-button>
      <!-- 表单 -->
      <el-table
        v-loading="loading"
        :data="dataList"
        element-loading-text="Loading"
      >
        <el-table-column
          label="充值金额"
          prop="rechargeAmount"
          align="center"
        ></el-table-column>
        <el-table-column
          label="赠送金额"
          prop="giftAmount"
          align="center"
        ></el-table-column>
        <el-table-column
          label="描述"
          prop="moneyDesc"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗 -->
      <el-dialog
        title="增加"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
        top="5vh"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="充值金额" prop="rechargeAmount">
            <el-input v-model="form.rechargeAmount"></el-input>
          </el-form-item>
          <el-form-item label="赠送金额" prop="giftAmount">
            <el-input v-model="form.giftAmount"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="moneyDesc">
            <el-input v-model="form.moneyDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定 </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addMoneyApi, getMoneyType, delMoneyType } from "@/api/money";
export default {
  name: "Dashboard",
  data() {
    return {
      form: {},
      rules: {
        rechargeAmount: [
          { required: true, message: "请输入充值金额", trigger: "blur" },
        ],
        giftAmount: [
          { required: true, message: "请输入赠送金额", trigger: "blur" },
        ],
        moneyDesc: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
      dialogVisible: false,
      dataList: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const sendData = {
        current: 1,
        pageSize: 50,
      };
      this.loading = true;
      getMoneyType(sendData).then((res) => {
        this.dataList = res.data.records;
        this.loading = false;
      });
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = {};
      this.dialogVisible = false;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addMoneyApi(this.form)
            .then((res) => {
              this.handleClose();
              this.$message.success("增加成功");
              this.getList();
            })
            .catch((err) => {
              console.log("增加失败", err);
            });
        }
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该套餐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delMoneyType(row.id).then((res) => {
          this.$message.success('删除成功');
          this.getList()
        }).catch(err=>{
          this.$message.error('删除失败');
        })
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
