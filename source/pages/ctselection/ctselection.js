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
  onMyShow() {
    var that = this;
    var api = new DisciplineApi();
    api.disciplinetm1({ coursesct_id: this.Base.options.id, }, (disciplinetm) => {
      this.Base.setMyData({ disciplinetm });

    })


  }
  chonzuo() {
    var that = this;
    wx.showModal({

      content: '是否确定重做章节下所有题',

      success: function (res) {
        if (res.confirm) {
          var api = new DisciplineApi();
          api.delquestionjl({ member_id: that.Base.getMyData().memberinfo.id, coursesct_id: that.Base.options.id }, (del) => {
            that.onMyShow();


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
body.chonzuo = content.chonzuo;
Page(body)