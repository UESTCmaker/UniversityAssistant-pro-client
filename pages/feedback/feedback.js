// pages/feedback/feedback.js
var app = getApp();
Page({
  data: {
    problem: [1, 0, 0],
    pro: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onclick: function (e) {
    var pro = e.currentTarget.dataset.id - 1;
    var problem = this.data.problem;
    for (var i = 0; i < problem.length; i++) {
      if (i == pro) {
        problem[i] = 1;
      }
      else {
        problem[i] = 0;
      }
    }
    problem
    this.setData({
      problem: problem,
      pro: pro
    })
  },
  onsubmit: function (e) {
    var contact = e.detail.value.contact;
    var detail = e.detail.value.detail;
    var that = this;
    if (detail == "") {
      wx.showModal({
        title: '提示',
        content: '请先输入问题详情再进行提交哦~',
        showCancel: false,
        confirmColor: "#0062cc"
      })
    }
    else {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: app.globalData.url_base + '/feedback.php',
        data: {
          "pro": that.data.pro + 1,
          "det": detail,
          "con": contact
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'

        },
        success: function (res) {
          // success
          wx.hideLoading();
          if (res.data.result == "Success") {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '提交失败，请稍后重试',
              showCancel: false,
              confirmColor: "#0062cc"
            })
          }
        },
        fail: function (res) {
          // fail
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '提交失败，请稍后重试',
            showCancel: false,
            confirmColor: "#0062cc"
          })
        }
      })
    }
  }
})

