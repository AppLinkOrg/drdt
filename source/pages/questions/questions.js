// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { DisciplineApi } from "../../apis/discipline.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    var api = new DisciplineApi();
    api.disciplinetm({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

      this.Base.setMyData({ disciplinetm, tmid: this.Base.options.id - 1 });

    })
  }

  //  onReady1(){
  //    var that = this;
  //    wx.getSystemInfo({
  //      success: function (qwe) {
  //        let clientHeight = qwe.windowHeight;

  //        let clientWidth = qwe.windowWidth;
  //        let ratio = 750 / clientWidth;
  //        // 算出高度(单位rpx)
  //        let height = clientHeight * ratio;
  //        console.log(height);

  //        var query = wx.createSelectorQuery();
  //        //选择id
  //        setTimeout(function () {
  //          query.select('#mjltest').boundingClientRect()
  //          query.exec(function (res) {
  //            //res就是 所有标签为mjltest的元素的信息 的数组
  //            console.log(res);

  //           if(res==""){
  //             that.Base.setMyData({ gaodu:height  });

  //           }
  //           else{

  //             console.log(that.Base.getMyData().tmid);
  //             console.log(res);
  //             that.Base.setMyData({ gaodu: res[0].height + height }); 
  //           }
  //          })
  //        }, 200)

  //      },
  //    })



  //  }
  onMyShow() {
    // this.onReady1();

  }
  radioChange(e) {
    console.log(e);
    this.Base.setMyData({ xz: e.currentTarget.id });
  }
  tjdn(e) {
    let xz = this.Base.getMyData().xz;
    if (xz == undefined || xz == "") {
      this.Base.info("请选择一个选项");
    }
    else {
      this.Base.setMyData({
        yc: false
      })
      var api = new DisciplineApi();
      api.addquestionjl({
        question_id: e.currentTarget.dataset.id, coursesct_id: this.Base.getMyData().disciplinetm[0].coursesct_id,
        member_id: this.Base.getMyData().memberinfo.id, anwser: xz
      }, (hd) => {

        if (xz != e.currentTarget.dataset.daan) {

          api.wrongquestion({
            member_id: this.Base.getMyData().memberinfo.id, question_id: e.currentTarget.dataset.id,
            coursesct_id: this.Base.getMyData().disciplinetm[0].coursesct_id
          }, (cx) => {
            console.log(this.Base.getMyData().memberinfo.id, e.currentTarget.dataset.id, this.Base.getMyData().disciplinetm[0].coursesct_id);
            if (cx.length == 0) {
              api.addwrongquestion({
                member_id: this.Base.getMyData().memberinfo.id, question_id: e.currentTarget.dataset.id,
                coursesct_id: this.Base.getMyData().disciplinetm[0].coursesct_id
              }, () => {



              })


            }

          })



        }


        api.disciplinetm({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

          this.Base.setMyData({ disciplinetm, xz: null, yc: null });

        })



      })

    }
    this.onReady1();

  }
  xuanti() {

    wx.navigateBack({

    })
  }
  zhangjie() {

    wx.navigateBack({
      delta: 2
    })
  }
  shouye() {

    wx.navigateTo({
      url: '/pages/home/home',
    })

  }
  huadon(e) {
    this.Base.setMyData({ xz: null });
    this.Base.setMyData({ tmid: e.detail.current });
    this.onReady1();
  }
  syt() {
    var id = this.Base.getMyData().tmid;
    if (id == 0) {
      this.Base.toast("已经是第一题了");
    } else {
      this.Base.setMyData({ tmid: id - 1 });
    }
  }
  xyt() {
    var id = this.Base.getMyData().tmid;
    if (id == this.Base.getMyData().disciplinetm.length - 1) {
      this.Base.toast("已经是最后一题了");
    } else {
      this.Base.setMyData({ tmid: id + 1 });
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.radioChange = content.radioChange;
body.tjdn = content.tjdn;
body.xuanti = content.xuanti;
body.shouye = content.shouye;
body.huadon = content.huadon;
body.zhangjie = content.zhangjie;
body.syt = content.syt;
body.xyt = content.xyt;
body.onReady1 = content.onReady1;
Page(body)