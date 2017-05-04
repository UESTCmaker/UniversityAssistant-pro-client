var app = getApp();
Page({
  data: {
    detailData: {},
    Cbasic:"基本信息",
    Cintro: "个人简介",
    Cexp: "学术经历",
    Csci: "科研项目",
    Cpa: "发表文章",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var code = options.code;
    var that = this;
    wx.request({
      url: app.globalData.url_base + '/searchteacher.php?mode=3&nc=' + code,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        var iconpath = res.data.result[0]["Icon"];
        var imagepath = res.data.result[0]["Image"];
        res.data.result[0]["Icon"] = app.globalData.url_base + iconpath;
        res.data.result[0]["Image"] = app.globalData.url_base + imagepath;
        that.setData({ detailData: res.data.result[0] });
      },
      fail: function (res) {
        // fail
      }
    })
  }
})