var app = getApp();
Page({
  data: {
    detailData: {},
    Cteach: "导师信息",
    count: 0,
    total: 0,
    code: 0,
    SchoolCode: 0,
    coin: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var code = options.code;
    var sc = options.sc;
    var cate = options.cate;
    var coin = 0;
    switch (cate) {
      case 'm': coin = 1; break;
      case 'p': coin = 2; break;
    }
    var that = this;
    that.setData({
      code: code,
      SchoolCode: sc,
      coin: coin
    })
    wx.request({
      url: app.globalData.url_base + '/searchmajor.php?mode=2&sc=' + sc + '&' + cate + 'c=' + code + '&coin=' + coin,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        var imagepath = res.data.result[0]["Image"];
        res.data.result[0]["Image"] = app.globalData.url_base + imagepath;
        that.setData({ detailData: res.data.result[0] });
      },
      fail: function (res) {
        // fail
      }
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.url_base + '/searchmajor.php?mode=3&sc=' + sc + '&' + cate + 'c=' + code +'&coin=' + coin + '&start=' + that.data.count + '&count=10',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        for (var i = 0; i < res.data.result.length; i++) {
          var iconpath = res.data.result[i]["Icon"];
          res.data.result[i]["Icon"] = app.globalData.url_base + iconpath;
          res.data.result[i]["show_cate"] = "study";
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
    var cate = '';
    switch (that.data.coin) {
      case 1: cate = 'm'; break;
      case 2: cate = 'p'; break;
    }
    if (that.data.count < that.data.total) {
      wx.showNavigationBarLoading();
      wx.request({
        url: app.globalData.url_base + '/searchmajor.php?mode=3&sc=' + that.data.SchoolCode + '&' + cate + 'c=' + that.data.code +'&coin=' + that.data.coin + '&start=' + that.data.count + '&count=10',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          for (var i = 0; i < res.data.result.length; i++) {
            var iconpath = res.data.result[i]["Icon"];
            res.data.result[i]["Icon"] = app.globalData.url_base + iconpath;
            res.data.result[i]["show_cate"] = "study";
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
    var cate = "teacher";
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