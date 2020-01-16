Page({
  data: {
    active: 0,
    tabs: {
      currentIndex: 0,
      list: [{
        text: '安全',
        type: '1'
      }, {
        text: '有情况反馈',
        type: '2'
      }]
    },
    notice:{}
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  changeTab: function (e) {
    console.log(e);
    /*
    wx.navigateBack({
      url:''
      });
      */
    
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },
  onLoad:function(){

   // this.showContent(param);
    var param = {};
    param.type = 'news';
    this.showNotice(param);
    
  },
  showNotice:function(param){
    var param = {};
    var param = ['notice','news'];
    //param.types = types;
    var that = this;
    wx.request({
      method: 'post',
      data: JSON.stringify(param),
      url: 'http://localhost:8080/api/getContentbyType',
      success:function(res){
        if(res.statusCode==200){
          var resultObj = res.data;
          if (resultObj.success){
            var resObjs = resultObj.rows;
            var obj = resObjs[0];
            that.setData({
              notice :{
                title: obj.title,
                context: obj.context,
                createUser: obj.createUser,
                createDate: that.formatDate(obj.cteateDate),
                type: that.formatType(obj.type)
              }
            })
          }
        }
      }
    })
  },
  formatStatus: function (status) {
    if (status == 0) {
      return "保存";
    } else if (status = 1) {
      return "正在审批";
    } else {
      return "办结";
    }
  },
  formatUrgent: function (urgent) {
    if (urgent == "no") {
      return "一般";
    } else if (urgent == "imp") {
      return "紧急";
    } else {
      return "非常紧急";
    }
  },
  formatDate: function (timeStart) {
    var Stamp = new Date(timeStart);
    var Month = (Stamp.getMonth() + 1);
    var _Month = Month >= 10 ? Month : "0" + Month;
    var Day = Stamp.getDate();
    var _Day = Day >= 10 ? Day : "0" + Day;
    var result = Stamp.getFullYear() + ":" + _Month + ":" + _Day;
    return result;
  },
  formatType:function(type){
    if(type==null&&type==undefined){
      return "未知类型";
    }else if(type=='notice'){
      return "通知";
    }else if(type=='news'){
      return "新闻";
    }else{
      return "其他";
    }
  }
 
});