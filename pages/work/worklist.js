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
    urgencys: [{
        name: 'no',
        value: '一般',
        check: 'true'
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
    if (curType == "0") {
      this.setData({
        currentIndex: 0
      })
    } else {
      this.setData({
        currentIndex: 1
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

  saveForm: function(e) {
    console.log(e);
    var pageData = this.data;
    console.log(this.data);
    var param = {};
    param.context = pageData.text;
    param.type = pageData.type;
    param.urgent = pageData.urgent;
    param.status = 0;
    console.log(param);
    /*
    wx.request({
      data: param,
      url: 'http://localhost:8080/api/saveContent',
      method: post,
      success: function(res) {
        console.log(res);
      }
    })
    */
  },

  submitDoc:function(e){
    var pageData = this.data;
    console.log(this.data);
    var param = {};
    param.context = pageData.text;
    param.type = pageData.type;
    param.urgent = pageData.urgent;
    param.status = 1;
    wx.request({
      data:param,
      url: 'http://localhost:8080/api/saveContent',
      success:function(res){
        console.log(res);
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
  onLoad: function(options) {
    var that = this;
    var param = {};
    param.status = 1;
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
  }
});