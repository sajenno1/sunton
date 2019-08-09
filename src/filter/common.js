
export default {
  removeSkuData (sku) {
    var str
    if (sku != null) {
      if (sku.indexOf('无规则') !== -1) {
        str = ''
      } else {
        str = sku
      }
    }
    return str
  },
  timeChange (dateString, formdate) {
    dateString = dateString || ''
    if (dateString === '') return ''
    // new Date('');传入毫秒数,也可以得到普通的时间,再对date处理
    // var date = new Date(parseInt(dateString))
    var date = new Date(dateString)
    formdate = formdate || 'yyyy-mm-dd HH:mm'
    // 获取年份,月份,天数,小时数,分钟数,小于10的显示01-09
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var secords = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    switch (formdate) {
      case 'yyyy-mm-dd HH:mm': return year + '-' + month + '-' + currentDate + ' ' + hours + ':' + minutes
      case 'yyyy-mm-dd HH:mm:ss': return year + '-' + month + '-' + currentDate + ' ' + hours + ':' + minutes + ':' + secords
      case 'yyyy-mm-dd': return year + '-' + month + '-' + currentDate
      case 'mm-dd': return month + '-' + currentDate
      case 'HH:mm': return hours + ':' + minutes
      case 'yyyy-mm': return year + '-' + month
    }
    return ''
  },
  formatDate (theDate) {
    return this.timeChange(theDate, 'yyyy-mm-dd')
  },
  formatTime (theDate) {
    return this.timeChange(theDate, 'yyyy-mm-dd HH:mm:ss')
  },
  getWeekStartAndEnd (AddWeekCount) {
    // 起止日期数组
    var startStop = []
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 获取当前时间
    var currentDate = new Date()
    // 相对于当前日期AddWeekCount个周的日期
    currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount))
    // 返回date是一周中的某一天
    var week = currentDate.getDay()
    // 返回date是一个月中的某一天
    // var month = currentDate.getDate()
    // 减去的天数
    var minusDay = week !== 0 ? week - 1 : 6
    // 获得当前周的第一天
    var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay))
    // 获得当前周的最后一天
    var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6))
    // 添加至数组
    startStop.push(this.timeChange(currentWeekFirstDay, 'yyyy-mm-dd'))
    startStop.push(this.timeChange(currentWeekLastDay, 'yyyy-mm-dd'))
    return startStop
  },
  getMonthStartAndEnd (AddMonthCount) {
    // 起止日期数组
    var startStop = []
    // 获取当前时间
    var currentDate = new Date()
    var month = currentDate.getMonth() + AddMonthCount
    if (month < 0) {
      var n = parseInt((-month) / 12)
      month += n * 12
      currentDate.setFullYear(currentDate.getFullYear() - n)
    }
    currentDate = new Date(currentDate.setMonth(month))
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 获得上一个月的第一天
    var currentMonthFirstDay = new Date(currentYear, currentMonth, 1)
    // 获得上一月的最后一天
    var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0)
    // 添加至数组
    startStop.push(this.timeChange(currentMonthFirstDay, 'yyyy-mm-dd'))
    startStop.push(this.timeChange(currentMonthLastDay, 'yyyy-mm-dd'))
    // 返回
    return startStop
  },
  getYearStartAndEnd (AddYearCount) {
    var currentDate = new Date()
    var year = currentDate.getFullYear() + AddYearCount
    return [year + '-01-01', year + '-12-31']
  },
  subtractDateTime (date1, date2, ty) {
    date1 = date1.replace('-', '/') // js不认2011-11-10,只认2011/11/10
    date2 = date2.replace('-', '/') // js不认2011-11-10,只认2011/11/10
    var t1Date = new Date(date1)
    var t2Date = new Date(date2)
    var s1 = t1Date.getTime()
    var s2 = t2Date.getTime()
    var total = (s2 - s1) / 1000
    if (ty === 'd') {
      var day = parseInt(total / (24 * 60 * 60))
      return day
    } else if (ty === 'm') {
      var year1 = t1Date.getFullYear()
      var year2 = t2Date.getFullYear()
      var month1 = t1Date.getMonth()
      var month2 = t2Date.getMonth()
      if (year1 < 1000 || year1 > 10000) {
        return NaN
      }
      if (year2 < 1000 || year2 > 10000) {
        return NaN
      }
      if (month1 < 0 || month1 > 11) {
        return NaN
      }
      if (month2 < 0 || month2 > 11) {
        return NaN
      }
      var yearSp = year2 - year1
      var monthSp = month2 - month1
      return yearSp * 12 + monthSp
    }
  },
  addMouth (date, num) {
    // date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
    var mouthnum = parseInt(num)
    var year = parseInt(date.substring(0, 4))
    var mouth = parseInt(date.substring(5, 7))
    var day = parseInt(date.substring(8, 10))
    var newyear = 0
    var newmouth = 0
    var newday = 0
    if (mouth + mouthnum > 12) {
      newyear = year + 1
      newmouth = mouth + mouthnum - 12
      newday = day
    } else {
      newyear = year
      newmouth = mouth + mouthnum
      newday = day
    }
    var newdate = newyear + '-' + newmouth + '-' + newday
    return newdate
  },
  addday (date1, days) {
    // var dt="2011-01-30";
    date1 = date1.replace('-', '/') // js不认2011-11-10,只认2011/11/10
    var t1 = new Date(new Date(date1).valueOf() + days * 24 * 60 * 60 * 1000) // 日期加上指定的天数
    var month
    var day
    if ((t1.getMonth() + 1) < 10) {
      // alert("0"+(t1.getMonth() + 1));
      month = '0' + (t1.getMonth() + 1)
    } else {
      month = t1.getMonth() + 1
    }
    if (t1.getDate() < 10) {
      day = '0' + t1.getDate()
    } else {
      day = t1.getDate()
    }
    // var ttt= t1.getFullYear() + "-" + (t1.getMonth() + 1) + "-" + t1.getDate();
    var ttt = t1.getFullYear() + '-' + month + '-' + day
    // alert(ttt)
    return ttt
  },
  timeYearMonthGypkpChange (date1, m) {
    return this.timeChange(this.addMouth(date1, m), 'yyyy-mm')
  },
  timeGetValue (date1, ty) {
    date1 = date1.replace('-', '/') // js不认2011-11-10,只认2011/11/10
    var date = new Date(date1)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var secords = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    if (ty === 'y') {
      return parseInt(year)
    } else if (ty === 'M') {
      return parseInt(month)
    } else if (ty === 'd') {
      return parseInt(currentDate)
    } else if (ty === 'h') {
      return parseInt(hours)
    } else if (ty === 'm') {
      return parseInt(minutes)
    } else if (ty === 's') {
      return parseInt(secords)
    }
    return NaN
  }
}
