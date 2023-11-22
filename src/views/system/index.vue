<template>
  <div class="system-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item prop="shopName" label="店铺名称">
        <el-input
          v-model.number="form.shopName"
          placeholder="请输入店铺名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="background" label="背景图片">
        <imageUpload v-model="form.background"></imageUpload>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号码">
        <el-input
          v-model.number="form.mobile"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="background" label="公告">
        <el-input
          v-model.number="form.notice"
          placeholder="请输入公告"
        ></el-input>
      </el-form-item>
      <el-form-item prop="qrCode" label="店铺二维码图片">
        <imageUpload v-model="form.qrCode"></imageUpload>
      </el-form-item>
      <el-form-item prop="shopImage" label="店铺logo">
        <imageUpload v-model="form.shopImage"></imageUpload>
      </el-form-item>
      <el-form-item prop="wifiAccount" label="wifi名称">
        <el-input
          v-model="form.wifiAccount"
          placeholder="请输入wifi名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="wifiPassword" label="wifi密码">
        <el-input
          v-model="form.wifiPassword"
          placeholder="请输入wifi密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSumbit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import imageUpload from "@/components/ImageUpload/index.vue";
import { getSettingApi, setSettingApi } from "@/api/system";
export default {
  components: {
    imageUpload,
  },
  data() {
    return {
      form: {},
      rules: {
        shopName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        wifiPassword: [
          { required: true, message: "请输入wifi密码", trigger: "blur" },
        ],
        wifiAccount: [
          { required: true, message: "请输入wifi名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getSetting();
  },
  methods: {
    getSetting() {
      getSettingApi()
        .then((res) => {
          console.log("获取成功", res);
          this.form = { ...res.data };
        })
        .catch((err) => console.log(err));
    },
    handleSumbit() {
      const sendData = {
        id: this.form.id,
        shopName: this.form.shopName,
        background: this.form.background,
        mobile: this.form.mobile,
        notice: this.form.notice,
        qrCode: this.form.qrCode,
        shopImage: this.form.shopImage,
        wifiAccount: this.form.wifiAccount,
        wifiPassword: this.form.wifiPassword,
      };
      setSettingApi(sendData)
        .then((res) => {
          this.$message.success("保存成功");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.system-container {
  padding: 20px;
  width: 50%;
}
</style>
