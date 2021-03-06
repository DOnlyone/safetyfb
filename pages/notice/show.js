// pages/notice/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    oneButton: [{ text: '确定' }],
    id: '0',
    detail: '三年级某班张三最近情绪低落，请辅导员关注',
    cteateDate: '2019-12-10',
    title: '测试标题',
    type: '通知',
    urgent: '紧急',
    status: '待审批',
    classStr: '软件一班',
    userTitle: '班长',
    contextData: [
      { titleText: '班级', value: '软件一班' },
      { titleText: '职位', value: '班长' },
      { titleText: '类型', value: '通知' },
      { titleText: '状态', value: '待审批' },
      { titleText: '紧急程度', value: '紧急' },
      { titleText: '学生', value: '张三' },
      { titleText: '上报人', value: '李四' },
      { titleText: '上报时间', value: '2019-12-03' }
    ],
    active: 1,
    steps: [
      {
        text: '班长上报',
        desc: '2019-12-10',
        active: true
      },
      {
        text: '班主任审批',
        desc: '2019-12-14',
        active: true
      },
      {
        text: '部长审批',
        desc: '2019-12-17'
      },
      {
        text: '系主任审批',
        desc: ''
      }
    ]
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    var buttonIndex = e.detail.index;
    if (buttonIndex==1){//确定按钮
      var pageData = this.data;
      var param = {};
      param.itemId = pageData.id;
      var userInfo = wx.getStorageSync('userInfo');
      var userObj = JSON.parse(userInfo);
      param.userId = userObj.userId;
      param.currentNode = userObj.currentNode;
      param.endFlag = '0';
      wx.request({
        data: param,
        url: 'http://localhost:8080/api/goNextNode',
        success: function (res) {
          if (res.statusCode = 200) {
            var resData = res.data;
            if (resData.success) {
              wx.showToast({
                title: resData.resultMsg,
              });
              //返回上一页
              wx.navigateBack();
            }
          }
        }
      })

    }
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton(e) {
    console.log("qqq");;
    this.setData({
      showOneButtonDialog: true
    })
  },
  submitOpion:function(e){
    this.setData({
      opinion:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var param = new Object();
    param.id = options.itemId;
    console.log(param);
    wx.request({
      data: param,
      url: 'http://localhost:8080/api/getContentDetail',
      success: function (res) {
        if (res.statusCode == 200) {
          var resData = res.data;
          if (resData.success) {
            var resObjs = resData.rows;
            var obj = resObjs[0];
            var createDate = that.formatDate(obj.cteateDate);
            that.setData({
              id: obj.id,
              detail: obj.context,
              cteateDate: createDate,
              title: obj.title,
              type: obj.type,
              currentNode: obj.currentNode,
              urgent: that.formatUrgent(obj.urgent),
              status: that.formatStatus(obj.status)
            })

          }
        }
        console.log(res);
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
  goNextNode:function(e){
   // console.log(e.currentTarget.dataset.submitType);
    //var submitType = e.currentTarget.dataset.submitType;
    var pageData = this.data;
    var param = {};
    param.itemId = pageData.id;
    var userInfo = wx.getStorageSync('userInfo');
    var userObj = JSON.parse(userInfo);
    param.userId = userObj.userId;
    param.currentNode = userObj.currentNode;
    param.endFlag = '1';
    wx.request({
      data: param,
      url: 'http://localhost:8080/api/goNextNode',
      success: function (res) {
        if(res.statusCode=200){
          var resData = res.data;
          if(resData.success){
            wx.showToast({
              title: resData.resultMsg,
            });
            //返回上一页
            wx.navigateBack();
          }
        }
      }
    })
    
    

  }
})