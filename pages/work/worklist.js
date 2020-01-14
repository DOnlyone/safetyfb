Page({
  data: {
    inputShowed: false,
    inputVal: "",
    active: 0,
    currentIndex: 0,
    tabs: {
      list: [{
        text: '待提交',
        type: '0'
      }, {
        text: '创建新文档',
        type: '1'
      }]
    },
    contentList: [],
    content:'',
    type:'notice',
    contentType: [{
        name: 'notice',
        value: '通知',
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
    urgent:'no',
    urgencys: [{
        name: 'no',
        value: '一般',
        checked: true
      },
      {
        name: 'imp',
        value: '紧急'
      },
      {
        name: 'immd',
        value: '非常紧急'
      }
    ]
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
  },
  changeTab: function(e) {
    var that = this;
    console.log(e);
    var curType = e.target.dataset.type;
    if (curType == "1") {
      this.setData({
        currentIndex: 1
      })
    } else {
      this.setData({
        title:'',
        text: '',
        type: '',
        status: '',
        urgent: '',
        currentIndex: 0
      })
    }
    /*
    var param = {};
    param.status = 0;
    wx.request({
      url: 'http://localhost:8080/api/listContent',
      success(msg) {
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
    */
    /*
    wx.navigateBack({
      url:''
      });
      */

  },
  textareFun: function(e) {
    console.log(e);
    this.setData({
      text: e.detail.value
    })
  },
  inputTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },

  saveForm: function(e) {
    var that = this;
    var pageData = this.data;
    var param = {};
    param.context = pageData.text;
    param.type = pageData.type;
    param.urgent = pageData.urgent;
    param.status = 0;
    param.title = pageData.title;
    var userInfo = wx.getStorageSync('userInfo')
    var userObj = JSON.parse(userInfo);
    param.createUser = {};
    param.createUser.userId = userObj.userId;
    wx.request({
      data: param,
      method: 'post',
      url: 'http://localhost:8080/api/saveContent',
      success: function(res) {
        if (res.statusCode = 200) {
          var resData = res.data;
          if (resData.success) {
            wx.showToast({
              title: '保存成功'
            });
            that.setData({
              title: '',
              text: '',
              type: '',
              status: '',
              urgent: '',
              currentIndex: 0
            });
            that.onLoad();
          }
        } else {
          wx.showToast({
            title: '保存失败，请检查网络状况'
          })
        }
      }
    }) 
  },

  submitDoc:function(e){
    var that = this;
    var pageData = this.data;
    var param = {};
    param.id = pageData.itemId;
    param.context = pageData.text;
    param.type = pageData.type;
    param.urgent = pageData.urgent;
    param.status = 1;
    var userInfo = wx.getStorageSync('userInfo')
    var userObj  = JSON.parse(userInfo);
    param.createUser = {};
    param.createUser.userId = userObj.userId;


/*
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  */
    wx.request({
      data:param,
      method:'post',
      url: 'http://localhost:8080/api/submitDoc',
      success:function(res){
        if(res.statusCode==200){
          var resData = res.data;
          if (resData.success){
            wx.showToast({
              title:'已提交给下一个节点！'
            });
            that.setData({
              title: '',
              text: '',
              type: '',
              status: '',
              urgent: '',
              currentIndex: 0
            });
            that.onLoad();
          }
        }else{
          wx.showToast({
            title: '网络出错，请检查网络后重试！'
          })
        }
      }
    })
    
  },

  parameterTap: function(e) {
    var that = this;
    var this_checked = e.currentTarget.dataset.id;
    var parameterList = this.data.contentType; //获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].name == this_checked) {
        parameterList[i].checked = true; //当前点击的位置为true即选中
        this.setData({
          checkboxgroupList: this_checked
        })
      } else {
        parameterList[i].checked = false; //其他的位置为false
      }
    }
    that.setData({
      contentType: parameterList,
      type: this_checked
    })

  },
  urgencysTap: function(e) {
    var that = this;
    var urgency_checked = e.currentTarget.dataset.id;
    var urgencyList = this.data.urgencys; //获取Json数组
    for (var i = 0; i < urgencyList.length; i++) {
      if (urgencyList[i].name == urgency_checked) {
        urgencyList[i].checked = true; //当前点击的位置为true即选中
        this.setData({
          checkboxgroupList2: urgency_checked
        })
      } else {
        urgencyList[i].checked = false; //其他的位置为false
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
  showDetail:function(e){
    var that = this;
    console.log(e);
    var itemId = e.currentTarget.dataset.itemid;
    var param = {};
    param.id = itemId;
    wx.request({
      data:param,
      method:'post',
      url: 'http://localhost:8080/api/listContent',
      success:function(res){
        if (res.statusCode=200){
          if (res.data.success){
            var resObj = res.data.rows;
            var obj = resObj[0];
            var urgent = obj.urgent;
            //this.onShow();
            that.setData({
              itemId: obj.id,
              urgent: obj.urgent,
              title: obj.title,
              type : obj.type,
              text : obj.context
            })
          
          }
          
        }
      }
    })
    this.setData({
      currentIndex: 1
    });
  },
  onLoad: function(options) {
    var that = this;
    var param = {};
    param.status = 0;
    var userInfo = wx.getStorageSync('userInfo')
    var userObj = JSON.parse(userInfo);
    param.createUser = {};
    param.createUser.userId = userObj.userId;
    //查询当前用户保存的文档
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
  }
});