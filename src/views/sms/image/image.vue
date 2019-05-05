<template> 
  <el-card class="form-container" shadow="never" style="width:80%">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">

      <el-form-item label="图文类别：" prop="picType">
        <el-cascader
          v-model="selectMold"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item>

      <el-form-item label="图文图片：">
        <single-upload v-model="homeAdvertise.url"></single-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import Tinymce from '@/components/Tinymce'
  import {createKnowSlider, getHomeAdvertise, updateHomeAdvertise,createImage} from '@/api/homeAdvertise'
  const defaultTypeOptions = [
    {
      label: 'PC首页轮播',
      value: 0
    },
    {
      label: 'APP首页轮播',
      value: 1
    }
  ];
  const defaultHomeAdvertise = {
    picType:null,
    url: null
  };
  export default {
    name: 'HomeAdvertiseDetail',
    components:{SingleUpload,Tinymce},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        homeAdvertise: null,
        selectMold:[],
        productCateOptions: [{
          label:"维修海报",
          value:"0"
        },{
          label:"回收海报",
          value:"1"
        },{
          label:"商家报价单",
          value:"2"
        }],
        rules: {
          // name: [
          //   {required: true, message: '请输入图文标题', trigger: 'blur'},
          //   {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          // ],
          // subName: [
          //   {required: true, message: '请输入图文标题', trigger: 'blur'},
          //   {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          // ],
          // url: [
          //   {required: true, message: '请输入广告链接', trigger: 'blur'}
          // ],
          // pic: [
          //   {required: true, message: '请选择图文图片', trigger: 'blur'}
          // ]
        },
        typeOptions: Object.assign({}, defaultTypeOptions)
      }
    },
    created(){
      if (this.isEdit) {
        getHomeAdvertise(this.$route.query.id).then(response => {
          this.homeAdvertise = response.data;
        });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    },
    watch:{
        selectMold:function(val){
          this.homeAdvertise.picType = val[0];
        }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateHomeAdvertise(this.$route.query.id, this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createImage(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                   this.$router.replace('/image/imageList');
                }).catch(function (error) {
                    console.log(error);
                  });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 100%;
  }
</style>


