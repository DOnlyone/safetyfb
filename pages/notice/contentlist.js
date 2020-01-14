// pages/notice/contentlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    contentList: []
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
     var title = e.detail.value;
     var param = {};
     var that = this;
    param.title = title;
    console.log(title);
    wx.request({
      data: param,
      url: 'http://localhost:8080/api/listContent',
      success:function(res){
        if (res.statusCode){
          var resData = res.data;
          if (resData.success){
            that.setData({
              contentList: resData.rows
            })
            
          }
        }
        console.log(res);
      }
    })
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var param = {};
    param.status = 1;
    var userInfo = wx.getStorageSync('userInfo')
    var userObj = JSON.parse(userInfo);
    param.createUser = {};
    param.createUser.userId = userObj.userId;
    wx.request({
      data:param,
      method:'post',
      url: 'http://localhost:8080/api/listContent',
      success(msg) {
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})