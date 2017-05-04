// pages/list/list.js
var app = getApp();

function getinfolist(that, cate, callback) {
  if (that.data.isGetting == false) {
    that.setData({
      isGetting: true
    });
    var show_cate = "";
    switch (cate) {
      case "u": show_cate = "university"; break;
      case "s": show_cate = "school"; break;
      case "n": show_cate = "teacher"; break;
      case "m": show_cate = "major"; break;
      case "p": show_cate = "major"; break;
      case "f": show_cate = "field"; break;
    }
    var url = app.globalData.url_base + '/search' + show_cate + '.php?mode=2&' + cate + '=' + that.data.content + '&start=' + that.data.count + '&count=10';
    if (cate == "m") {
      url += "&coin=1";
    }
    else if (cate == "p") {
      url += "&coin=2";
    }
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        callback(that, res, show_cate);
      },
      fail: function (res) {
        // fail
      }
    })
    that.setData({
      isGetting: false
    });
  }
}

function callback(that, res, show_cate) {
  for (var i = 0; i < res.data.count; i++) {
    res.data.result[i]["show_cate"] = show_cate;
    var iconpath = res.data.result[i]["Icon"];
    res.data.result[i]["Icon"] = app.globalData.url_base + iconpath;
  }
  var newresult = that.data.boxs.concat(res.data.result);
  that.setData({
    boxs: newresult,
    total: res.data.total,
    count: that.data.count + 10
  })
  wx.hideNavigationBarLoading();
}

Page({
  data: {
    holder_text: "查询",
    cate: "all",
    content: "",
    count: 0,
    total: 0,
    boxs: [],
    isGetting: false
  },
  onLoad: function (options) {
    var cate = options.cate;
    var content = app.globalData.content;
    var that = this;
    that.setData({
      cate: cate,
      content: content
    })
    if (cate != "all") {
      wx.showNavigationBarLoading();
      getinfolist(that, cate, callback);
    }
  },
  onReachBottom: function (e) {
    var that = this;
    if (that.data.boxs.length < that.data.total && that.data.count != 0) {
      wx.showNavigationBarLoading();
      getinfolist(that, that.data.cate, callback);
    }
  },
  onSearch: function (e) {
    var that = this;
    if (e.detail.value != "") {
      that.setData({
        content: e.detail.value,
        count: 0,
        total: 0,
        boxs: []
      });
      app.globalData.content = that.data.content;
      wx.showNavigationBarLoading();
      getinfolist(that, that.data.cate, callback);
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
  onDetail: function (e) {
    var Id = e.currentTarget.dataset.id;
    var cate = e.currentTarget.dataset.cate;
    if (cate == "field") {
      cate = "teacher";
    }
    var url = '/pages/detail/' + cate + '-detail/' + cate + '-detail?' + 'code=' + Id;
    if (cate == "major") {
      url += "&sc=" + e.currentTarget.dataset.sc + "&cate=" + this.data.cate;
    }
    wx.navigateTo({
      url: url,
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      }
    })
  },
  onNavback: function (e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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