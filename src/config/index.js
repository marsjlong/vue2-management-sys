/*
 * @Author: your name
 * @Date: 2021-10-10 16:49:44
 * @LastEditTime: 2021-10-22 17:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /防疫项目/src/config/index.js
 */
export default {
  // 层级
  areaCj: [{
    label: '省级',
    value: "0"
  }, {
    label: '市级',
    value: "1"
  }, {
    label: '县级',
    value: "2"
  }, {
    label: '街道',
    value: "3"
  }, {
    label: "社区",
    value: "4"
  }],
  roleCode: [{
    label: "管理员",
    value: "sys"
  }, {
    label: "区域协查",
    value: "qyxc"
  }, {
    label: "跨省区域协查",
    value: "ksxcqy"
  }, {
    label: "跨省密接协查",
    value: "ksxcmj"
  }],
  sysName: [
    {
      label: '跨省协查管理',
      value: 'crossArea'
    },
    {
      label: '隔离点管理',
      value: 'quarantine'
    },
    {
      label: '密接次密接管理',
      value: 'closecontact'
    },
    {
      label: '风险人员排查',
      value: 'regional'
    },
    {
      label: '用户中台',
      value: 'userManagement'
    },

  ],
  // 是否
  sf: [{
    label: '是',
    value: 0
  }, {
    label: '否',
    value: 1
  }],
  // 是否
  qyty: [{
    label: '启动',
    value: "1"
  }, {
    label: '禁用',
    value: "0"
  }],
  // 隔离状态
  glzt: [{
    label: '隔离中',
    value: "1"
  }, {
    label: '解除隔离',
    value: "2"
  }],
  // 接触者类别
  jczlb: [{
    label: '密接人员',
    value: "01"
  }, {
    label: '次密接人员',
    value: "02"
  }],
  /* 接触者类型 */
  jczlx: [{
    label: '区域协查',
    value: "1"
  }, {
    label: '接收跨省协查工单',
    value: "2"
  }, {
    label: '发起跨省协查工单',
    value: "3"
  }
  ],
  qyzt: [{
    label: '启用',
    value: true
  }, {
    label: '禁用',
    value: false
  }],
  // 证件类型
  zjlx: [{ 'label': '公民身份证号码', 'value': "111" }, { 'label': '中国人民解放军军官证编号', 'value': "114" }, { 'label': '中国人民武装警察部队警官证编号', 'value': "115" }, { 'label': '中国人民解放军士兵证编号', 'value': "118" }, { 'label': '中国人民武装警察部队士兵证编号', 'value': "119" }, { 'label': '中国人民解放军文职人员证编号', 'value': "120" }, { 'label': '中国人民武装警察部队文职人员证编号', 'value': "122" }, { 'label': '护照号', 'value': "400" }, { 'label': '台湾居民来往内地通行证号码', 'value': "511" }, { 'label': '台湾居民居住证', 'value': "552" }, { 'label': '港澳居民来往内地通行证', 'value': "516" }, { 'label': '港澳居民居住证', 'value': "551" }, { 'label': '其他自然人有效证件代码', 'value': "999" }],
  // 区域协查状态
  xczt: [{
    label: '未下发',
    value: '1'
  }, {
    label: '已下发',
    value: '2'
  }, {
    label: '已上报',
    value: '3'
  }, {
    label: '已完成',
    value: '4'
  }],
  // 跨省协查工单状态
  ksxczt: [{
    label: '未下发',
    value: '1'
  }, {
    label: '已下发',
    value: '2'
  }, {
    label: '已上报',
    value: '3'
  }, {
    label: '已完成',
    value: '4'
  }],
  lylb: [{
    label: '时空伴随人员',
    value: '01',
  }, {
    label: '重点疫情发生场所驻留人员',
    value: '02',
  }, {
    label: '中风险区驻留人员',
    value: '03',
  }, {
    label: '高风险区驻留人员',
    value: '04',
  }],
  //---------------- 大屏字典--------------
  // 疑似病例
  ysbl: [{
    label: '确诊病例',
    value: 1
  }, {
    label: '疑似病例',
    value: 2
  }]
}