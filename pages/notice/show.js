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
    contextData:[
      {titleText:'班级',value:'软件一班'},
      { titleText: '职位', value: '班长' },
      { titleText: '类型', value: '通知' },
      { titleText: '状态', value: '待审批' },
      { titleText: '紧急程度', value: '紧急' },
      { titleText: '学生', value: '张三' },
      { titleText: '上报人', value: '李四' },
      { titleText: '上报时间', value: '2019-12-03' }
    ],
    active:2,
    steps: [
      {
        text: '步骤一',
        desc: '描述信息',
        active:true
      },
      {
        text: '步骤二',
        desc: '描述信息',
        active: true
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
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
    console.log(options);
    param.id = options.itemId;
    wx.request({
      url: 'http://localhost:8080/api/',
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