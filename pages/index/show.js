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
    var types = new Array();
    types.push('notice');
    param.types = types;
    var that = this;
    wx.request({
      data: param,
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
                createDate: obj.cteateDate,
                type: obj.type
              }
            })
          }
        }
      }
    })
  }
 
});