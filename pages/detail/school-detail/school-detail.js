var app = getApp();
Page({
  data: {
    detailData: {},
    Cintro: "学院简介",
    Cmajor: "开设专业",
    Cteach: "师资力量",
    count: 0,
    total: 0,
    code: 0
  },
  onLoad: function (options) {
    var code = options.code;
    var that = this;
    that.setData({
      code: code
    })
    wx.request({
      url: app.globalData.url_base + '/searchschool.php?mode=3&sc=' + code,
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
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.url_base + '/searchteacher.php?mode=2&sc=' + code + '&start=' + that.data.count + '&count=10',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        for (var i = 0; i < res.data.result.length; i++) {
          var iconpath = res.data.result[i]["Icon"];
          res.data.result[i]["Icon"] = app.globalData.url_base + iconpath;
          res.data.result[i]["show_cate"] = "teacher";
        }
        var result = that.data.detailData;
        result["Teachers"] = res.data.result;
        that.setData({
          total: res.data.total,
          count: that.data.count + 10,
          detailData: result
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        wx.hideNavigationBarLoading();
      }
    })
  },
  onReachBottom: function (e) {
    var that = this;
    if (that.data.count < that.data.total) {
      wx.showNavigationBarLoading();
      wx.request({
        url: app.globalData.url_base + '/searchteacher.php?mode=2&sc=' + that.data.code + '&start=' + that.data.count + '&count=10',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          for (var i = 0; i < res.data.result.length; i++) {
            var iconpath = res.data.result[i]["Icon"];
            res.data.result[i]["Icon"] = app.globalData.url_base + iconpath;
            res.data.result[i]["show_cate"] = "teacher";
          }
          var detail = that.data.detailData;
          var result = detail["Teachers"];
          var newresult = result.concat(res.data.result);
          detail["Teachers"] = newresult;
          that.setData({
            total: res.data.total,
            count: that.data.count + 10,
            detailData: detail
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
          wx.hideNavigationBarLoading();
        }
      })
    }
  },
  onDetail: function (e) {
    var Id = e.currentTarget.dataset.id;
    var cate = e.currentTarget.dataset.cate;
    wx.navigateTo({
      url: '/pages/detail/' + cate + '-detail/' + cate + '-detail?' + 'code=' + Id,
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      }
    })
  }
})