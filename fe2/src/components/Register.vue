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
          <el-form-item label="确认密码" prop="checkpsd">
            <el-input type="password" v-model="ruleForm.checkpsd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input type="number" v-model.number="ruleForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
</template>
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
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[A-Za-z0-9]{2,5}/).test(value)) { // 密码8位到12位  必须包含数字 字母
          callback(new Error('密码为2, 5位的包含数字和字母'));
        }else {
           if (this.ruleForm.checkpsd !== '') { //如果确认密码框中有内容，此时进行验证 确认密码框中内容是否正确
             this.$refs.ruleForm.validateField('checkpsd');// DOM的验证封装
           }
           callback();
         }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value !== this.ruleForm.psd) {
          callback(new Error('请确保两次密码输入一致'));
        } else {
          callback()
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if(!(/^1[34578]\d{9}$/.test(value))){
          callback(new Error('请确保手机号码格式输入正确'));
        } else {
          callback()
        }
      };
      return {
        ruleForm: {
          // pass: '', //必须保证 ruleFrom2、rules2、HTML代码中的prop中都有pass
          username: '',
          psd: '',
          checkpsd: '',
          phone: ''
        },
        rules: {  // 定义规则
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          psd: [  // pass必须与 prop属性一致
            {validator: validatePass, trigger: 'blur'}
          ],
          checkpsd: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur'}
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
            this.$http.post("/api/register", {
              'username': this.ruleForm.username,
              'psd': this.ruleForm.psd,
              'phone': this.ruleForm.phone
            },{emulateJSON:true}).then(function (res) {
              res = res.body
              if (res.code != ERR_OK) {
                alert(res.msg)
              } else {
                this.$router.push({path: 'login'})
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
