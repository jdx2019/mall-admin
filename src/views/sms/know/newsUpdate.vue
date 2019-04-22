<template> 
  <el-card class="form-container" shadow="never" style="width:80%">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="新闻标题：" prop="name">
        <el-input v-model="homeAdvertise.title" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="新闻副标题：" prop="subName">
        <el-input v-model="homeAdvertise.subTitle" class="input-width"></el-input>
      </el-form-item>

      <!-- <el-form-item label="新闻类别：" prop="mold">
        <el-cascader
          v-model="selectMold"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item> -->

      <el-form-item label="新闻图片：">
        <single-upload v-model="homeAdvertise.pic"></single-upload>
      </el-form-item>
<!-- 
      <el-form-item label="新闻链接：" prop="url">
        <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
      </el-form-item> -->
      <el-form-item label="新闻详情：">
         <tinymce :width="595" :height="300" v-model="homeAdvertise.content"></tinymce>
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
  import {createKnowSlider, getHomeAdvertise, updateHomeAdvertise,createKnowNews} from '@/api/homeAdvertise'
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
    title: null,
    subTitle:null,
    pic: null,
    status: true,
    mold:0,
    url: null,
    content: null
  };
  export default {
    name: 'HomeAdvertiseDetail',
    components:{SingleUpload,Tinymce},
    props: {
      isEdit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        homeAdvertise: null,
        selectMold:[],
        productCateOptions: [{
          label:"新闻",
          value:"0"
        },{
          label:"活动",
          value:"1"
        },{
          label:"测评",
          value:"2"
        }],
        rules: {},
        typeOptions: Object.assign({}, defaultTypeOptions)
      }
    },
    created(){
      if (this.isEdit) {
          this.homeAdvertise = this.$route.query.data;
          this.homeAdvertise._method = 'PUT';
          this.homeAdvertise.status = true;
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
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
                 this.$axios.post('http://www.hystkj.com:8080/information/update',{
                   content:this.homeAdvertise.content,
                   title:this.homeAdvertise.title,
                   subTitle:this.homeAdvertise.subTitle,
                   pic:this.homeAdvertise.pic,
                   mold:this.homeAdvertise.mold,
                   id:this.homeAdvertise.id,
                   status:true
                 }).then(res => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                  }).catch(function (error) {
                    console.log(error);
                  });
              } else {
                createKnowNews(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
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


