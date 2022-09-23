<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <span>角色名：</span>
                <el-input v-model="query.roleName" placeholder="请输入角色名" class="handle-input mr10"></el-input>
                <span>层级：</span>
                <el-select v-model="query.type" placeholder="请选择层级" class="handle-select mr10">
                    <el-option :key="option.value" :label="option.label" :value="option.value" v-for='option in dicts.areaCj'></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="primary" icon="" @click="reset">重置</el-button>
            </div>
            <MyTable :data="tableInfo.tableData" @handleSelectionChange='handleSelectionChange' :canCheck='tableInfo.canCheck' :rowHeader="tableInfo.rowHeader" />
            <div class="pagination">
                <MyPagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handlePageChange"
                              :current-page="query.pageIndex" :totalPage="pageTotal" :page-sizes='pageSizes' :pageSize="query.pageSize"/>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData, getRoles } from '../api/index';
import MyTable from '../components/common/MyTable.vue'
import MyPagination from '../components/common/MyPagination.vue'
import dicts from '../config/index'
export default {
    name: 'roleManagement',
    components: {
        MyTable,
        MyPagination,
    },
    data() {
        return {
            dicts:{},
            query: {
                roleName: "",
                type: "",
                pageIndex: 1,
                pageSize: 10
            },
            pageSizes:[5,10,20,50],
            // tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            tableInfo:{
                canCheck: false,
                loading: false,
                tableData:[],
                rowHeader:[
                    // 未做任何格式化处理的数据
                    {
                        label: '角色名',
                        prop: 'roleName',
                    },
                    {
                        label: '层级',
                        prop: 'type',
                        render: (h, params) => {
                            let aa = '';
                            dicts.areaCj.map((item)=>{
                                aa = item.value == params.row.type?item.label:aa;
                            });
                            // const result = <span>{dicts.areaCj.find(item => item.value == params.row.type)?.label}</span>;
                            const result = <span>{aa}</span>;
                            return (result);
                        }
                    },
                    {
                        label:"权限字符",
                        prop:"roleCode",
                    },
                    {
                        label:"系统名称",
                        prop:"sysName",
                    },
                    {
                        label: '创建人',
                        prop: 'createName',
                    },
                    {
                        label: '创建时间',
                        prop: 'createTime',
                    },
                    // 添加操作按钮
                    {
                        prop: '',
                        label: '操作',
                        render: (h, params) => {
                            let that = this;
                            function click1(){
                                that.handleEdit(params.$index, params.row);
                            }
                            function click2(){
                                that.handleDelete(params.$index, params.row);
                            }
                            const btn1 = <el-button type="text" icon="el-icon-delete" onClick={click1}>编辑</el-button>;
                            const btn2 = <el-button type="text" icon="el-icon-delete" class="red" onClick={click2}>删除</el-button>;
                            return [btn1,btn2];
                            /*return h('el-button', {
                                prop:{
                                    type:"text",
                                    icon:"el-icon-delete",
                                    class:"red"
                                },
                                domProps:{
                                    innerText:'删除',
                                },
                                on:{
                                    click: () => {
                                        this.handleDelete(params.$index, params.row)
                                    }
                                }
                            })*/
                        }
                    }
                ]
            },
        };
    },
    mounted() {
        this.dicts = dicts;
        // this.getData();
        this.getList();
    },
    created() {
        // this.getData();
    },
    methods: {
        // 重置
        reset(){
            this.query = {
                roleName: "",
                type: "",
                pageIndex: 1,
                pageSize: 10
            };
        },
        getList () {
            this.tableInfo.loading = true
            getRoles({
                roleName:this.query.roleName,
                type:this.query.type+'',
                pageSize:this.query.pageSize,
                pageNum:this.query.pageIndex
            }).then(({ data }) => {
                this.tableInfo.tableData = data.list;
                this.pageTotal = data.totalCount;
                /*this.query = {
                    total: data.totalCount, // 总条数
                    pageSize: data.pageSize, // 每页数量
                    pageNum: data.currPage, // 页码
                }*/
            }).finally(_ => {
                this.tableInfo.loading = false
            })
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                this.tableInfo.tableData = this.query.pageSize == 2?res.list.slice(0,2):res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getList();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableInfo.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableInfo.tableData, this.idx, this.form);
        },
        handleSizeChange(val) {
            this.query.pageSize = val;
            this.tableInfo.tableData = [];
            this.handlePageChange(1)
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getList();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 200px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
::v-deep .red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
::v-deep .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
