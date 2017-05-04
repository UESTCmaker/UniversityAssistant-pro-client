var app = getApp();

function getuniversity(that) {
  wx.request({
    url: app.globalData.url_base + '/searchuniversity.php?mode=1&l=' + that.data.location_array[that.data.location_index],
    data: {},
    method: 'GET',
    success: function (res) {
      var university = [];
      var map = [];
      for (var i = 0; i < res.data.total; i++) {
        university.push(res.data.result[i].University);
        map.push(res.data.result[i]);
      }
      that.setData({
        university_array: university,
        university_map: map
      })
    },
    fail: function (res) {
      // fail
    }
  });
}

function getschool(that) {
  wx.request({
    url: app.globalData.url_base + '/searchschool.php?mode=1&l=' + that.data.location_array[that.data.location_index] + '&u=' + that.data.university_array[that.data.university_index],
    data: {},
    method: 'GET',
    success: function (res) {
      var school = [];
      var map = [];
      for (var i = 0; i < res.data.total; i++) {
        school.push(res.data.result[i].School);
        map.push(res.data.result[i]);
      }
      that.setData({
        school_array: school,
        school_map: map
      })
    },
    fail: function (res) {
      // fail
    }
  });
}

function getteacher(that) {
  wx.request({
    url: app.globalData.url_base + '/searchteacher.php?mode=1&l=' + that.data.location_array[that.data.location_index] + '&u=' + that.data.university_array[that.data.university_index] + "&s=" + that.data.school_array[that.data.school_index],
    data: {},
    method: 'GET',
    success: function (res) {
      var teacher = [];
      var map = [];
      for (var i = 0; i < res.data.total; i++) {
        teacher.push(res.data.result[i].Name);
        map.push(res.data.result[i]);
      }
      that.setData({
        teacher_array: teacher,
        teacher_map: map
      })
    },
    fail: function (res) {
      // fail
    }
  });
}

function getmajor(that) {
  wx.request({
    url: app.globalData.url_base + '/searchmajor.php?mode=1&l=' + that.data.location_array[that.data.location_index] + '&u=' + that.data.university_array[that.data.university_index] + "&s=" + that.data.school_array[that.data.school_index] + "&coin=" + (parseInt(that.data.education_index) + 1).toString(),
    data: {},
    method: 'GET',
    success: function (res) {
      var major = [];
      var map = []
      for (var i = 0; i < res.data.total; i++) {
        major.push(res.data.result[i].Major);
        map.push(res.data.result[i]);
      }
      that.setData({
        major_array: major,
        major_map: map
      })
    },
    fail: function (res) {
      // fail
    }
  });
}

Page({
  data: {
    nav_items: [["学校", 1], ["学院", 0], ["老师", 0], ["专业", 0]],
    show_sec: { "l": 0, "u": 0, "s": 0, "n": 0, "ed": 0, "j": 0 },
    location_array: [],
    location_index: 0,
    university_array: [],
    university_map: [],
    university_index: 0,
    school_array: [],
    school_map: [],
    school_index: 0,
    teacher_array: [],
    teacher_map: [],
    teacher_index: 0,
    major_array: [],
    major_map: [],
    major_index: 0,
    education_array: ["硕士", "博士"],
    education_index: 0
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    wx.request({
      url: app.globalData.url_base + '/searchlocation.php',
      data: {},
      method: 'GET',
      success: function (res) {
        var location = [];
        for (var i = 0; i < res.data.total; i++) {
          location.push(res.data.result[i].Location);
        }
        that.setData({
          location_array: location
        })
      },
      fail: function (res) {
        // fail
      }
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  onNavClick: function (event) {
    var id = event.target.dataset.id;
    var new_items = this.data.nav_items;
    for (var idx in new_items) {
      if (idx == id) {
        new_items[idx][1] = 1;
      } else {
        new_items[idx][1] = 0;
      }
    }
    this.setData({ nav_items: new_items });
  },
  onSearchClick: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
      success: function (res) {
        // success
      }
    })
  },
  bindPickerChange: function (e) {
    var sec = e.currentTarget.dataset.sec;
    var that = this;
    if (e.detail.value != "") {
      if (sec == "l") {
        that.setData({
          location_index: e.detail.value
        })
        var show = that.data.show_sec;
        if (show.l == 0) {
          show.l = 1;
          that.setData({
            show_sec: show
          });
        }
        else {
          if (show.u == 1) {
            that.setData({
              university_index: 0
            })
          }
          if (show.s == 1) {
            that.setData({
              university_index: 0,
              school_index: 0
            })
          }
          if (show.n == 1) {
            that.setData({
              university_index: 0,
              school_index: 0,
              teacher_index: 0
            })
          }
        }
        getuniversity(that);
        getschool(that);
        getteacher(that);
        getmajor(that);
      }
      else if (sec == "u") {
        that.setData({
          university_index: e.detail.value
        })
        var show = that.data.show_sec;
        if (show.u == 0) {
          show.u = 1;
          that.setData({
            show_sec: show
          });
        }
        else {
          if (show.s == 1) {
            that.setData({
              school_index: 0
            })
          }
          if (show.n == 1) {
            that.setData({
              school_index: 0,
              teacher_index: 0
            })
          }
          if (show.ed == 1) {
            that.setData({
              school_index: 0,
              education_index: 0,
              major_index: 0
            })
          }
        }
        getschool(that);
        getteacher(that);
        getmajor(that);
      }
      else if (sec == "s") {
        that.setData({
          school_index: e.detail.value,
        });
        var show = that.data.show_sec;
        if (show.s == 0) {
          show.s = 1;
          that.setData({
            show_sec: show
          });
        }
        else {
          if (show.n == 1) {
            that.setData({
              teacher_index: 0
            });
          }
          if (show.ed == 1) {
            that.setData({
              education_index: 0,
              major_index: 0
            });
          }
        }
        getteacher(that);
        getmajor(that);
      }
      else if (sec == "n") {
        var show = that.data.show_sec;
        show.n = 1;
        that.setData({
          teacher_index: e.detail.value,
          show_sec: show
        });
      }
      else if (sec == "ed") {
        that.setData({
          education_index: e.detail.value,
        });
        var show = that.data.show_sec;
        if (show.ed == 0) {
          show.ed = 1;
          that.setData({
            show_sec: show
          });
        }
        else {
          that.setData({
            major_index: 0
          });
        }
        getmajor(that);
      }
      else if (sec == "j") {
        var show = that.data.show_sec;
        show.j = 1;
        that.setData({
          major_index: e.detail.value,
          show_sec: show
        });
      }
    }
  },
  onsubmit: function (e) {
    var that = this;
    if (that.data.nav_items[0][1] == 1) {
      if ((that.data.show_sec.l && that.data.show_sec.u) != 1) {
        wx.showModal({
          title: '提示',
          content: '请先完善查询内容再进行查询哦~',
          showCancel: false,
          confirmColor: "#0062cc"
        })
      }
      else {
        //跳转学校查询详情
        var Id = that.data.university_map[that.data.university_index].Id;
        wx.navigateTo({
          url: '/pages/detail/university-detail/university-detail?code=' + Id,
          success: function (res) {
            // success
          },
          fail: function (res) {
            // fail
          }
        })
      }
    }
    else if (that.data.nav_items[1][1] == 1) {
      if ((that.data.show_sec.l && that.data.show_sec.u && that.data.show_sec.s) != 1) {
        wx.showModal({
          title: '提示',
          content: '请先完善查询内容再进行查询哦~',
          showCancel: false,
          confirmColor: "#0062cc"
        })
      }
      else {
        //跳转学院查询详情
        var Id = that.data.school_map[that.data.school_index].Id;
        wx.navigateTo({
          url: '/pages/detail/school-detail/school-detail?code=' + Id,
          success: function (res) {
            // success
          },
          fail: function (res) {
            // fail
          }
        })
      }
    }
    else if (that.data.nav_items[2][1] == 1) {
      if ((that.data.show_sec.l && that.data.show_sec.u && that.data.show_sec.s && that.data.show_sec.n) != 1) {
        wx.showModal({
          title: '提示',
          content: '请先完善查询内容再进行查询哦~',
          showCancel: false,
          confirmColor: "#0062cc"
        })
      }
      else {
        //跳转教师查询详情
        var Id = that.data.teacher_map[that.data.teacher_index].Id;
        wx.navigateTo({
          url: '/pages/detail/teacher-detail/teacher-detail?code=' + Id,
          success: function (res) {
            // success
          },
          fail: function (res) {
            // fail
          }
        })
      }
    }
    else if (that.data.nav_items[3][1] == 1) {
      if ((that.data.show_sec.l && that.data.show_sec.u && that.data.show_sec.s && that.data.show_sec.ed && that.data.show_sec.j) != 1) {
        wx.showModal({
          title: '提示',
          content: '请先完善查询内容再进行查询哦~',
          showCancel: false,
          confirmColor: "#0062cc"
        })
      }
      else {
        //跳转专业查询详情
        var Id = that.data.major_map[that.data.major_index].Id;
        var coin = (parseInt(that.data.education_index) + 1);
        var cate = '';
        switch (coin) {
          case 1: cate = 'm'; break;
          case 2: cate = 'p'; break;
        }
        var url = '/pages/detail/major-detail/major-detail?code=' + Id + '&sc=' + that.data.school_map[that.data.school_index].Id + '&cate=' + cate;
        console.log(url);
        wx.navigateTo({
          url: url,
          success: function (res) {
            // success
          },
          fail: function (res) {
            // fail
          }
        })
      }
    }
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