Page({
  data: {
    inputShowed: false,
    inputVal: "",
    active: 0,
    tabs: {
      currentIndex: 0,
      list: [{
        text: '待办',
        type: '1'
      }, {
        text: '已办',
        type: '2'
      }]
    },
    contentList:[]
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  changeTab: function (e) {
    var that = this;
    console.log(e);
    var param = {};
    param.status = 0;
    wx.request({
      url: 'http://localhost:8080/api/listContent',
      success(msg) {
        console.log(msg);
        if (msg.statusCode==200){
          var resultObj = msg.data;
          if(resultObj.success){
            that.setData({
               contentList: resultObj.rows
              })
          }
        }
      }
    })
    /*
    wx.navigateBack({
      url:''
      });
      */

  },
  onLoad: function (options) {
    var that = this;
    var param ={};
    param.status = 1;
    wx.request({
      url: 'http://localhost:8080/api/listContent',
      success(msg){
        console.log(msg);
        if (msg.statusCode == 200) {
          var resultObj = msg.data;
          if (resultObj.success) {
            that.setData({
              contentList: resultObj.rows
            })
          }
        }
      }
    })
  }
});