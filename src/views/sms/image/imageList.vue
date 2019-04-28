<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加图片</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="图片类型" align="center">
          <template slot-scope="scope">{{scope.row.picType}}</template>
        </el-table-column>
        <el-table-column label="图片详情" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.url"></template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button> -->
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,updateStatus,deleteHomeAdvertise,deleteImage,deleteNews} from '@/api/homeAdvertise';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
    type: null,
    endTime:null
  };
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
  export default {
    name: 'homeAdvertiseList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions: Object.assign({}, defaultTypeOptions),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        pageSize:10,
        pageNum:1,
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList(this.pageSize,this.pageNum);
    },
    filters:{
      formatType(type){
        if(type===1){
          return 'APP首页轮播';
        }else{
          return 'PC首页轮播';
        }
      },
      formatTime(time){
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList(val,1);
      },
      handleCurrentChange(val) {
        this.getList(this.pageSize,val);
      },

      handleDelete(index,row){
        this.deleteHomeAdvertise(row.id);
      },

      handleAdd(){
        this.$router.push({path: '/image/image'})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/image/imageUpdate', query: {data: row}})
      },
      getList(pageSize,pageNum) {
        this.listLoading = true;
        this.$axios.get('http://www.hystkj.com:8080/picture/list?pageSize='+pageSize+'&pageNum='+pageNum).then(res => {
          this.listLoading = false;
          for(let i of res.data.list){
            if(i.picType == 0){
              i.picType = "维修海报"
            }else if(i.picType == 1){
              i.picType = "回收海报"
            }else{
              i.picType = "商家报价单"
            }
          }
          this.list = res.data.list;
          this.total = res.data.total;
        });
      },
      deleteHomeAdvertise(ids){
        this.$confirm('是否要删除该广告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteImage(params).then(response=>{
            this.getList(this.pageSize,this.pageNum);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


