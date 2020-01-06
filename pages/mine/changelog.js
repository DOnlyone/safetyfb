Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    navTitle: "更新日志",
    logList: [
      {
        title: "小程序持续更新中",
        content: ""
      },
      {
        title: "2018-11-11 新版本(V3.3.0)",
        content: [
          "社团招新的船新版本",
          "新增了问卷功能",
          "新增了失物认领添加匿名的功能",
          "优化了图书馆功能",
          "资讯页面的重新启动以及添加提示小红点"
        ]
      },
      {
        title: "2018-8-13 新版本(V3.2.0)",
        content: [
          "修改注册登录的逻辑",
          "增加了修改绑定手机功能",
          "更新了一卡通的页面风格",
          "增加了电费充值绑定宿舍的功能",
          "增加了学费查询功能",
          "添加跳转到校谈的入口",
          "微调了一些ui，修复了一些bug",
          "运营在痛骂程序员不给力"
        ]
      }
    ]

  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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