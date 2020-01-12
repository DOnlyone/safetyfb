// pages/work/show.js
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentType: [{
        name: 'notice',
        value: '通知',
        checked: 'true'
      },
      {
        name: 'news',
        value: '安全新闻'
      },
      {
        name: 'report',
        value: '报告'
      },
      {
        name: 'approval',
        value: '呈批件'
      }
    ],
    urgencys:[
      {name:'no',value:'一般',check:'true'},
      {name:'imp',value:'紧急'},
      {name:'immd',value:'非常紧急'}
      ],
    selectData: [{
        value: 1,
        text: "city"
      },
      {
        value: 1,
        text: "city"
      }
    ],
    city: "city",
    cities: "cities",
    text:''
   
  },
  textareFun:function(e){
    console.log(e);
    this.setData({
      text: e.detail.value
    })
  },

  saveForm:function(e){
    var pageData = this.data;
    var param ={};
    param.context = pageData.text;
    param.type = pageData.type;
    param.urgent = pageData.urgent;
    param.status = 0;//保存时设置状态为0
      wx.request({
        data: param,
        url: 'http://localhost:8080/api/saveContent',
        method:post,
        success:function(res){
          if (res.statusCode=200){
            var resData = res.data;
            if (resData.success){
              wx.showToast({
                title: '保存成功'
              })
            }
          }else{
            wx.showToast({
              title: '保存失败，请检查网络状况'
            })
          }

        }
      })
  },

  parameterTap: function (e) {
    var that = this;
    var this_checked = e.currentTarget.dataset.id;
    var parameterList = this.data.contentType;//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].name == this_checked) {
        parameterList[i].checked = true;//当前点击的位置为true即选中
        this.setData({ checkboxgroupList: this_checked })
      }else {
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      contentType: parameterList,
      type: this_checked
    })

  },
  urgencysTap:function(e){
    var that = this;
    var urgency_checked = e.currentTarget.dataset.id;
    var urgencyList = this.data.urgencys;//获取Json数组
    for (var i = 0; i < urgencyList.length; i++) {
      if (urgencyList[i].name == urgency_checked) {
        urgencyList[i].checked = true;//当前点击的位置为true即选中
        this.setData({ checkboxgroupList2: urgency_checked })
      } else {
        urgencyList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      urgencys: urgencyList,
      urgent: urgency_checked
    })
  },
  cityChanged({
    detail
  }) {
    console.log(detail);
  },
  onClickLeft() {
    wx.showToast({
      title: '点击返回',
      icon: 'none'
    });
  },
  onClickRight() {
    wx.showToast({
      title: '点击按钮',
      icon: 'none'
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
   // appInstance.onShow();
   // appInstance.onLaunch();
    //var obj = JSON.parse(obj);
    console.log(options.itemId);
    var param = {};
    param.id = options.itemId;
    wx.request({
      url: 'http://localhost:8080/api/listContent',
      data: param,
      success:function(msg){
        if (msg.statusCode=200){
          var resultData = msg.data;
          if (resultData){
            that.setData({
              
            })
          }
        }
        console.log(msg);
      }
    })
    this.setData({
      option1: [{
          text: '全部商品1',
          value: 0
        },
        {
          text: '新款商品1',
          value: 1
        },
        {
          text: '活动商品1',
          value: 2
        }
      ]
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})