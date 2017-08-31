<template>
  <div>
    <div style="width: 500px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input type="password" v-model="ruleForm.psd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">

</style>
<script type="text/ecmascript-6">
  const ERR_OK = 200
  export default {
    data() {
      var checkUsername = (rule, value, callback) => { // callback实现的就是在输入框下面加入提示
        if (!value) {
          callback(new Error('用户名不能为空'));
        }else if(!(/[A-Za-z0-9]{2,5}/).test(value)) {
          callback(new Error('用户名为2到5位的包含数字和字母'))
        }else{
          callback();
        }
        /*setTimeout(() => {
          if (!Number.isInteger(value)) {   // Number.isInteger() 用来判断一个值是否为整数，不过3和3.0视为同一个值
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);*/


      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[A-Za-z0-9]{2,5}/).test(value)) { // 密码8位到12位  必须包含数字 字母
          callback(new Error('密码为2到5位的包含数字和字母'));
        }else {
          callback();
        }/*else {
          if (this.ruleForm2.checkPass !== '') { //如果确认密码框中有内容，此时进行验证 确认密码框中内容是否正确
            console.log(4);
            this.$refs.ruleForm2.validateField('checkPass');// DOM的验证封装
          }
          callback();
        }*/
      };
      return {
        ruleForm: {
          // pass: '', //必须保证 ruleFrom2、rules2、HTML代码中的prop中都有pass
          username: '',
          psd: ''
        },
        rules: {  // 定义规则
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          psd: [  // pass必须与 prop属性一致
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(12);
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          console.log(465);
          if (valid) {
            this.$http.post("/api/login", {
              'username': this.ruleForm.username,
              'psd': this.ruleForm.psd
            },{emulateJSON:true}).then(function (res) {
              res = res.body
              if (res.code != ERR_OK) {
                alert(res.msg)
              } else {
                this.$router.push({path: 'overview'})
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
