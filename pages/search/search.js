// pages/search/search.js
var app = getApp();

Page({
  data: {
    holder_text: "搜索教师信息",
    search_cate: "n",
    content: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onclick: function (e) {
    var cate = e.currentTarget.dataset.sec;
    switch (cate) {
      case "u": this.setData({ holder_text: "搜索学校信息" }); break;
      case "s": this.setData({ holder_text: "搜索学院信息" }); break;
      case "n": this.setData({ holder_text: "搜索教师信息" }); break;
      case "m": this.setData({ holder_text: "搜索硕士专业" }); break;
      case "p": this.setData({ holder_text: "搜索博士专业" }); break;
      case "f": this.setData({ holder_text: "搜索研究方向" }); break;
    }
    this.setData({
      search_cate: cate
    })
  },
  onSearch: function (e) {
    var content = e.detail.value;
    if (content != "") {
      app.globalData.content = content;
      wx.navigateTo({
        url: '/pages/list/list?cate=' + this.data.search_cate,
        success: function (res) {
          // success
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请先输入查询内容再进行查询哦~',
        showCancel: false,
        confirmColor: "#0062cc"
      })
    }
  },
  onChange: function (e) {
    var content = e.detail.value;
      app.globalData.content = content;
  },
  onShow: function (e) {
    this.setData({
      content: app.globalData.content
    })
  },
  onfeedback: function (e) {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})