import CryptoJS from "crypto-js"
import store from '@/store'
import areaList from '@/config/area'
import Encrypt from 'jsencrypt'

export const loginAesKey ='jdgJzLhTAnnNl0v0TIBiH9dvj8m6Waav'//登录加密key

// RSA公钥
const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtR0zxZyfmjCnGadLqVNKUDzUHOcetRdKZTwQztavgpww83n3FsXXXFTSHPalOwx2y/dhyey5Z8d6UVuW+4FTRFmjfS4v33dcPdFUdvxSxPHNSBCRmySEXRvONPTtVZ2ty/p5mNujzIwNtO4FTwqua7RlgJh4A4bBXhKRG/QsqTwIDAQAB"

export const weeks = ['日', '一', '二', '三', '四', '五', '六']

const screenWidth = 1920;
const screenHeight = 1080;

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength (str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}
/**
 * @param {Object} object
 * @returns {Array}
 * @description 过滤空值
 */
export function filterEmpty (data) {
  if (!data) return ''
  const obj = {}
  Object.keys(data).forEach(key=>{
    if(data[key] !==""){
      obj[key] = data[key]
    }
  })
  return obj
}
// 获取屏幕缩放
export function getScale() {
  var { innerWidth, innerHeight } = window;
  var scaleX = innerWidth / screenWidth;
  var scaleY = innerHeight / screenHeight;
  return Math.min(scaleX, scaleY);
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/** 
 * json格式转树状结构 
 * @param   {json}      json数据 
 * @param   {String}    id的字符串 
 * @param   {String}    父id的字符串 
 * @param   {String}    children的字符串 
 * @return  {Array}     数组 
 * @example transData(jsonData); 
 */
export function transData (data, idStr = "id", pidStr = "pid", labStr = "name",) {
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  data = deepClone(data)
  data.forEach(item => {
    delete item.children;
  });
  let map = {};
  data.forEach(item => {
    item.value = item[idStr];
    item.label = item[labStr];
    map[item[idStr]] = item;
  });
  data.forEach(item => {
    let parent = map[item[pidStr]];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

// 根据区县获取省市区code [111,111,111]
export function getAreaCode (code, level = 1) {
  if (!code) return '';
  const area = areaList.find(item => item.value == code)
  const city = areaList.find(item => item.value == area.parent)
  const province = areaList.find(item => item.value == city.parent)
  let Acodes = [province.value, city.value, area.value]
  return Acodes.splice(level - 1, 3)
}

// 根据code和等级查找省市区
export function codeToParent (code, level) {
  if (!code) return '';
  const flatAreaList = store.getters.flatAreaList
  const { organLevel } = store.getters.userOrgan;
  let tempCode = code;
  let Acodes = []
  for (let i = 0; i < level; i++) {
    Acodes.unshift(tempCode)
    tempCode = flatAreaList.find(item => item.value == tempCode)?.parent
  }
  return Acodes.splice(organLevel - 1, 3)
}

// 获取部门
export function getOrganCode (code) {
  let ACodes = [];
  store.getters.departments.forEach(organ => {
    if (organ.code == code) {
      ACodes.push(code)
    } else {
      organ?.children.forEach(item => {
        if (item.code === code) {
          ACodes = [organ.code, item.code]
        }
      })
    }
  })
  return ACodes
}

// 根据code获取省市区name
export function getAreaName (code) {
  if (!code) return;
  return store.getters.flatAreaList.find(item => item.value == code)?.label ?? ''
}

// 隔离点根据账号筛选数据
export function transQuarantData (list) {
  const flatAreaList = store.getters.flatAreaList
  const { organLevel, regionCode } = store.getters.userOrgan;
  list.forEach(item => {
    item.label = item.gldmc
    item.value = item.gldbh
    item.parent = item.ggdssxq
  })
  const citys = flatAreaList.filter(item => item.level >= organLevel)
  const tempArr = transData([...list, ...citys], 'value', 'parent', 'label')
  return [tempArr.find(item => item.value == regionCode)]
}

// 新开窗口
export function openWindow (target) {
  window.open(target, '_blank')
}

/**
 * @name: 加密
 * @param {*} data
 * @param {*} keyM
 * @return {*}
 */
export function encrypt (data, keyM) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }

  let key = CryptoJS.enc.Latin1.parse(keyM.slice(0,16));
  let iv = CryptoJS.enc.Latin1.parse(keyM.slice(16,32));
  let srcs = CryptoJS.enc.Utf8.parse(data);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv ,mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}


/**
 * @name: 解密
 * @param {*} str
 * @param {*} keyM
 * @return {*}
 */
export function decrypt (str, keyM) {

  let key = CryptoJS.enc.Latin1.parse(keyM.slice(0,16));
  let iv = CryptoJS.enc.Latin1.parse(keyM.slice(16,32));

  let decrypt = CryptoJS.AES.decrypt(str, key, { iv,mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt));
}

/**
 * @name: RSA解密
 * @param {*} str
 * @param {*} keyM
 * @return {*}
 */
 export function RSAEncrypt (data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  const encrypt = new Encrypt()
  encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');

  return encrypt.encrypt(data);
}
