import { getLodop } from '@/assets/js/LodopFuncs'
import moment from 'moment'
import Accounting from 'accounting'
// import moment from 'moment'
// const defaultData = {
//   title: '', // 打印标题
//   no: '', // 单据编号
//   summary: [], // 单据摘要信息
//   columns: [{
//     name: '',
//     prop: '',
//     Width: '',
//     colspan: '',
//     height: ''
//   }], // 列表标题,宽度百分比
//   data: [],
//   lastRowContent: '',
//   footer: []
// }

var print = {}

print.config = {
  intOrient: 1, // 打印方向: 1 纵,2:横
  summaryColumn: 3, // 摘要信息分列数量 默认3列
  footerColumn: 2, // 底部信息分列数量,默认2列
  rowHeight: '36px' // 行高度
}

print.check = function check () {
  try {
    let LODOP = getLodop()
    if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
      alert('当前未安装打印可用!')
      return false
    }
    if (LODOP.VERSION) {
      if (LODOP.CVERSION) {
        // alert('当前有C-Lodop云打印可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')')
        console.log('当前有C-Lodop云打印可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')')
        return true
      } else {
        // alert('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
        console.log('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
      }
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

print.preView = function preView (data, config) {
  let LODOP = getLodop()
  if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
    alert('当前未安装打印可用!')
    return
  }
  const _config = Object.assign({}, this.config, config)
  // SET_PRINT_PAGESIZE(intOrient, PageWidth,PageHeight,strPageName)
  // ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)
  // LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
  // LODOP.PRINT_INITA('0mm', '0mm', '210mm', '2970mm', '单据名称')
  //   ADD_PRINT_BARCODE(Top,Left,Width,Height,BarCodeType,BarCodeValue);
  // Width 条码的总宽度，计量单位px（1px=1/96英寸）
  // Height 条码的总高度（一维条码时包括文字高度）
  // BarCodeType 条码的类型（规制）名称
  // BarCodeValue 条码值

  LODOP.PRINT_INIT(data.title) // 打印初始化
  LODOP.SET_PRINT_PAGESIZE(_config.intOrient, '210mm', '297mm', 'A4')
  const html = this.createPrintHtml(data, _config)
  // let codeLeft = '145mm'
  if (_config.intOrient === 2) {
    // codeLeft = '220mm'
    LODOP.ADD_PRINT_HTM('10mm', '10mm', '277mm', '190mm', html)
  } else {
    LODOP.ADD_PRINT_HTM('10mm', '10mm', '190mm', '277mm', html)
  }
  // LODOP.ADD_PRINT_BARCODE('10mm', codeLeft, '55mm', '15mm', 'Code39', data.no)
  LODOP.PREVIEW()
  // LODOP.PRINT_DESIGN()
}

print.createPrintHtml = function createPrintHtml (data, _config) {
  let mainWidth = 190 // 内容显示区域宽度
  if (_config.intOrient === 2) {
    mainWidth = 277
  }
  let html = `<div style="width:${mainWidth}mm;">` // A4固定宽度210mm

  if (data.title) {
    // 打印标题
    html += '<div style="text-align: center;font-size: 8mm;height:15mm;line-height:15mm;">'
    html += '' + data.title
    html += '</div>'
  }

  if (data.summary && data.summary.length > 0) {
    // 打印摘要信息
    // let summaryWidth = 100 / (_config.summaryColumn || 3)
    // html += `<div style="width:${mainWidth}mm;line-height:${(_config.rowHeight || '36px')}">`
    // for (let index = 0; index < data.summary.length; index++) {
    //   html += `<span style="display: inline-block;width:${summaryWidth}%;">${data.summary[index]}</span>`
    // }
    // html += '</div>'
    html += `<ul style="width:100%;line-height:15px;list-style:none;margin-left:-30px;display:flex;font-style:inherit">`
    html += `<li style='list-style:none;width:33%;font-style:inherit'>`
    html += `<span style='font-style:inherit'>发货单号:</span>`
    html += `<span style='font-style:inherit'>${data.summary[0]}</span>`
    html += `</li>`
    html += `<li style='list-style:none;flex:1;font-style:inherit'>`
    html += `<span style='font-style:inherit'>客户地址:</span>`
    html += `<span style='font-style:inherit'>${data.summary[1] || ''}</span>`
    html += `</li>`
    html += `</ul>`

    html += `<ul style="width:100%;line-height:15px;list-style:none;margin-left:-30px;display:flex;font-style:inherit">`
    html += `<li style='list-style:none;width:33%;font-style:inherit'>`
    html += `<span style='font-style:inherit'>客户名称:</span>`
    html += `<span  style='font-style:inherit'>${data.summary[2]}</span>`
    html += `</li>`
    html += `<li style='list-style:none;width:33%;font-style:inherit'>`
    html += `<span  style='font-style:inherit'>客户电话:</span>`
    html += `<span  style='font-style:inherit'>${data.summary[3] || ''}</span>`
    html += `</li>`
    html += `<li style='list-style:none;width:33%;font-style:inherit'>`
    html += `<span  style='font-style:inherit'>开单日期:</span>`
    html += `<span  style='font-style:inherit'>${moment(data.summary[4]).format('YYYY-MM-DD')}</span>`
    html += `</li>`
    html += `</ul>`
  }
  // 打印数据列表---表头
  html += `<table border="1" style="width:190mm;border-collapse:collapse;border:solid 1px" bordercolor="#000000">`
  html += `<tr>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">货号</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">名称</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">颜色</th>`
  html += `<th colspan=${data.sizeData.length} style="width:20%;height:36px;line-height:36px;text-align: center;">规格</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">单位</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">数量</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">单价</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">金额</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">备注</th>`
  html += `</tr>`
  html += `<tr>`
  for (let sizeIndex = 0; sizeIndex < data.sizeData.length; sizeIndex++) {
    html += `<th>${this.replaceNoSize(data.sizeData[sizeIndex].prop)}</th>`
  }
  html += `</tr>`
  // 打印数据列表-- 数据
  html += `<tr>`
  for (let index = 0; index < data.data.length; index++) {
    let rowItems = data.data[index]
    html += `<tr>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${rowItems.code}</td>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${rowItems.name}</td>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${this.replaceNoSize(rowItems.color)}</td>`
    for (let index = 0; index < data.sizeData.length; index++) {
      html += `<td style="text-align: center;height:36px;line-height:36px;">${this.returnQTY(rowItems, data.sizeData[index])}</td>`
    }
    html += `<td style="text-align: center;height:36px;line-height:36px;">${rowItems.unit}</td>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${rowItems.quantity}</td>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${Accounting.formatMoney(rowItems.unitPrice, '', 2)}</td>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${Accounting.formatMoney(rowItems.price, '', 2)}</td>`
    html += `<td style="text-align: center;height:36px;line-height:36px;">${rowItems.remark || ''}</td>`
    html += `</tr>`
  }
  // 打印数据--表尾合计
  html += `<tr>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">合计</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;"></th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;"></th>`
  html += `<th colspan=${data.sizeData.length} style="width:20%;height:36px;line-height:36px;text-align: center;"></th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;"></th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">${this.sumQTY(data.data)}</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;"></th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;">${this.sumPrice(data.data)}</th>`
  html += `<th rowspan="2" style="width:10%;height:36px;line-height:36px;text-align: center;"></th>`
  html += `</tr>`
  html += '</table>'
  // 底部单据信息
  html += `<ul style="margin-bottom: 20px;border: 1px solid #ccc;padding: 10px;list-style:none;">`
  html += `<li>备注：如有质量问题7日内调换（不调款），过期恕不处理。联系电话：15805987510</li>`
  html += `<li>账号：${data.billInfo.banckAcount}，户名：${data.billInfo.acountName}，支付宝：${data.billInfo.apliPay}</li>`
  html += `</ul>`

  if (data.footer && data.footer.length > 0) {
    let footerWidth = 100 / (_config.footerColumn || 2) - 1
    let isTwo = (_config.footerColumn || 2) === 2 // 两格则左右对齐
    html += `<div style="width:${mainWidth}mm;height:${(_config.rowHeight || '36px')};line-height:${(_config.rowHeight || '36px')}">`
    for (let index = 0; index < data.footer.length; index++) {
      let style = 'width:' + footerWidth + '%;'
      if (isTwo && index % 2 === 1) {
        style += 'text-align: right;'
      }
      html += '  <span style="display: inline-block;' + style + '">' + data.footer[index] + '</span>'
    }
    html += '</div>'
  }
  html += '</div>'
  console.log(html)
  return html
}

print.returnQTY = function returnQTY (row, col) {
  var count = ''
  for (var i = 0; i < row.sizeItems.length; i++) {
    if (row.sizeItems[i].size === col.prop) {
      count = row.sizeItems[i].count
      break
    }
  }
  return count
}

print.sumQTY = function sumQTY (data) {
  var qty = 0
  for (let i = 0; i < data.length; i++) {
    qty += parseInt(data[i].quantity)
  }
  return qty
}

print.sumPrice = function sumPrice (data) {
  var qty = 0
  for (let i = 0; i < data.length; i++) {
    qty += parseFloat(data[i].price)
  }
  return qty.toFixed(2)
}

print.replaceNoSize = function replaceNoSize (str) {
  var retStr = str
  if (str === '无规则') {
    retStr = '&nbsp'
  }
  return retStr
}

print.formatDateTime = function formatDateTime (value, format) {
  return value ? moment(value).format(format) : ''
}

export default print
