<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item>
        <el-input
          v-model="queryForm.name"
          placeholder="名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.number"
          placeholder="人数"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryForm.type"
          size="small"
          placeholder="类型"
          clearable
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryForm.scriptType"
          size="small"
          placeholder="类别"
          clearable
        >
          <el-option
            v-for="item in scriptTypeOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain @click="getList">
          搜索
        </el-button>
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
      <el-table-column
        label="名称"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column
        label="人数"
        prop="number"
        align="center"
      ></el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.type | typeFilter }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        prop="price"
        align="center"
      ></el-table-column>
      <el-table-column label="是否适合新手" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.newPlayer ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否反串" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.fanchuan ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建时间" prop="createDate"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </div>
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
    <!-- 弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      top="2vh"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="剧本名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人数" prop="number">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="form.type"
                placeholder="请选择剧本类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="price">
              <el-input
                v-model="form.price"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="是否适合新手" prop="newPlayer">
              <el-switch
                v-model="form.newPlayer"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否反串" prop="fanchuan">
              <el-switch
                v-model="form.fanchuan"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="类别" prop="scriptType">
          <el-select
            v-model="form.scriptType"
            placeholder="请选择剧本类别"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="item in scriptTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面" prop="image">
          <image-upload v-model="form.image" ref="imageUpload"></image-upload>
        </el-form-item>
        <el-form-item label="人物介绍" prop="peopleDescribe">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.peopleDescribe"
          ></el-input>
        </el-form-item>
        <el-form-item label="剧情描述" prop="scriptDescribe">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.scriptDescribe"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload/index";
import {
  addScriptApi,
  getScriptApi,
  updateScriptApi,
  delScriptApi,
} from "@/api/script";
import pagination from "@/components/Pagination/index";
export default {
  components: {
    ImageUpload,
    pagination,
  },
  data() {
    return {
      queryForm: {
        currPage: 1,
        pageSize: 10,
      },
      dataList: [],
      total: 0,
      dialogVisible: false,
      title: "",
      loading: false,
      form: {
        newPlayer: false,
        fanchuan: false,
      },
      typeOptions: [
        {
          key: 0,
          value: "盒装",
        },
        {
          key: 1,
          value: "城限",
        },
        {
          key: 2,
          value: "独家",
        },
      ],
      scriptTypeOptions: [
        "情感",
        "硬核",
        "机制",
        "恐怖",
        "欢乐",
        "阵营",
        "还原",
        "推理",
        "立意",
        "现代",
        "古代",
        "日式",
        "沉浸",
      ],
      rules: {
        name: [{ required: true, message: "请输入剧本名称", trigger: "blur" }],
        number: [{ required: true, message: "请输入人数", trigger: "blur" }],
        type: [
          { required: true, message: "请选择剧本类型", trigger: "change" },
        ],
        scriptType: [
          { required: true, message: "请选择剧本类别", trigger: "change" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blue" }],
        peopleDescribe: [
          { required: true, message: "请输入人物介绍", trigger: "blue" },
        ],
        scriptDescribe: [{ required: true, message: "描述", trigger: "blue" }],
        image:[{ required: true, message: "请上传剧本封面", trigger: "blue" }],
      },
    };
  },
  created() {
    this.getList();
  },
  filters: {
    typeFilter(value) {
      switch (value) {
        case 0:
          return "盒装";
        case 1:
          return "城限";
        case 2:
          return "独家";
      }
    },
  },
  methods: {
    getList() {
      getScriptApi(this.queryForm)
        .then((res) => {
          console.log("剧本数据", res);
          // this.$message.success("增加成功");
          // this.dialogVisible = false;
          const { records, total } = res.data;
          this.dataList = records;
          this.total = total;
        })
        .catch((err) => {
          console.log("增加失败:", err);
        });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.$refs.imageUpload.imageURL = "";
      this.form = {};
      this.dialogVisible = false;
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.form = { ...row };
      this.form.scriptType = row.scriptType.split(",");
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该剧本, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("当前删除", row);
          delScriptApi(row.id)
            .then((res) => {
              this.$message.success("删除成功");
              this.getList();
            })
            .catch((err) => {
              console.log("删除失败:", err);
            });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.scriptType = this.form.scriptType.join(",");
          if (this.form.id) {
            updateScriptApi(this.form)
              .then((res) => {
                this.$message.success("编辑成功");
                this.handleClose();
                this.getList();
              })
              .catch((err) => {
                console.log("增加失败:", err);
              });
          } else {
            addScriptApi(this.form)
              .then((res) => {
                this.$message.success("增加成功");
                this.handleClose();
                this.getList();
              })
              .catch((err) => {
                console.log("增加失败:", err);
                this.$message.error("增加失败");
              });
          }
        } else {
          return false;
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
