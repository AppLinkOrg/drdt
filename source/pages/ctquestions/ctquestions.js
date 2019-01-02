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
  }
  onUnload(){

    var api = new DisciplineApi();
    api.delctquestionjl({member_id:this.Base.getMyData().memberinfo.id},()=>{



    })
  }
  onMyShow() {
    var that = this;
    var api = new DisciplineApi();
    api.disciplinetm1({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

      this.Base.setMyData({ disciplinetm, tmid: this.Base.options.id - 1 });

    })

    var api = new DisciplineApi();
    // api.delwrongquestion({

    //   member_id: that.Base.getMyData().memberinfo.id,
    //   coursesct_id: that.Base.options.coursesct_id, question_id: e.currentTarget.dataset.id
    // }, (del) => {
    // })
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
      api.addctquestionjl({
        question_id: e.currentTarget.dataset.id, coursesct_id: this.Base.getMyData().disciplinetm[0].coursesct_id,
        member_id: this.Base.getMyData().memberinfo.id, anwser: xz
      }, (hd) => {
        if (xz != e.currentTarget.dataset.daan) {

          // api.addwrongquestion({
          //   member_id: this.Base.getMyData().memberinfo.id, question_id: e.currentTarget.dataset.id,
          //   coursesct_id: this.Base.getMyData().disciplinetm[0].coursesct_id
          // }, () => {



          // })
        }


        api.disciplinetm1({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

          this.Base.setMyData({ disciplinetm });

        })



      })

    }

  }
  xuanti() {

    wx.navigateBack({

    })
  }
  shouye() {

    wx.navigateTo({
      url: '/pages/home/home',
    })

  }
  huadon() {

    this.Base.setMyData({ xz: null });

    var api = new DisciplineApi();
    api.delctquestionjl({ member_id: this.Base.getMyData().memberinfo.id }, () => {



    })
    api.disciplinetm1({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

      this.Base.setMyData({ disciplinetm });

    })



  }

  zhangjie() {

    wx.navigateBack({
      delta: 2
    })
  }
  scbt(e){
    
      var that = this;
      wx.showModal({

        content: '是否确定把本题从错题库中删除',

        success: function (res) {
          if (res.confirm) {
            var api = new DisciplineApi();
            api.delwrongquestion({
              
               member_id: that.Base.getMyData().memberinfo.id, 
              coursesct_id: that.Base.options.coursesct_id, question_id: e.currentTarget.dataset.id }, (del) => {
              
                if (that.Base.getMyData().disciplinetm.length==1){

                  wx.navigateBack({
delta:2
                  })
                      

                }
                else{
                  wx.navigateBack({

                  })

                }



            })
            

          } else {

          }
        }
      })

    

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
body.scbt = content.scbt;
body.zhangjie = content.zhangjie;
Page(body)