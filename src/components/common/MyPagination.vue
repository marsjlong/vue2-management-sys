<template lang='html'>
    <div class='pages'>
        <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange'
                       :current-page='currentPage' :page-size='pageSize' :page-sizes='pageSizes'
                       layout='total, sizes, prev, pager, next, jumper'
                       background :total='totalPage'></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    name: 'pagination',
    props: {
        'pageSizes': {
            type: Array,
            default() {
                return [10, 20, 50, 100];
            }
        },
        'pageSize': {
            type: Number,
            default: 10
        },
        'totalPage': Number,
        'currentPage': Number
    },
    methods: {
        handleSizeChange(e) {
            this.$emit('handleSizeChange', e);
        },
        handleCurrentChange(e) {
            this.$emit('handleCurrentChange', e);
        }
    }
};
</script>

<style lang='less' scoped>
.pages {
    padding: 20px 0;
    //text-align: center;
}
</style>