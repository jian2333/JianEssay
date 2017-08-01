/**
 * totop.js
 * @authors Your Name (you@example.org)
 * @date    2017-08-01 10:57:03
 * @version $Id$
 */

// 自写版
window.onload = function() {
    var btnTop = document.getElementById('btnTop');
    var timer = null;

    window.onscroll = function() {
        var backTop = getScrollTop();

        if (backTop > 20) { //当前视口顶端大于等于20时，显示返回顶部的按钮。
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    }

    btnTop.onclick = function() {
        //定时执行
        timer = setInterval(function() {
            var backTop = getScrollTop();
            var speedTop = backTop / 10;
            //修改当前视口的数值，产生向上活动的效果
            setScrollTop(backTop - speedTop);

            if (backTop == 0) {
                //结束执行函数
                console.log('backTop==0:' + backTop);
                clearInterval(timer);
            }
        }, 30);
    }


    // 获取当前视口的顶端数值
    var getScrollTop = function() {
        var sTop;
        if (document.compatMode == "BackCompat") {
            sTop = document.body.scrollTop;
        } else {
            // document.compatMode == \"CSS1Compat\"		
            sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        }
        return sTop;
    }

    //设置当前视口的顶端数值
    var setScrollTop = function(top) {
        if (document.compatMode == "BackCompat") {
            document.body.scrolltop = top;
        } else {
            if (document.documentElement.scrollTop == 0) {
                document.body.scrollTop = top;
            } else {
                document.doucmentElement.scrolltop = top;
            }
        }
    }
}


//复制版
/*window.onload = function(){
    var btnTop = document.getElementById("btnTop");
    var timer = null;

    window.onscroll = function(){
        var backTop = getScrollTop();
        if(backTop >= 20){ //当前视口顶端大于等于20时，显示返回顶部的按钮
            btnTop.style.display = "block";
        }else {
            btnTop.style.display = "none";
        }
    };

    btnTop.onclick = function(){
        //定时执行
        timer = setInterval(function(){
            var backTop = getScrollTop();
            var speedTop = backTop / 10;
            //修改当前视口的数值，产生向上活动的效果
            setScrollTop(backTop - speedTop);
            if(backTop == 0){
                //结束函数执行
                clearInterval(timer);
            }
        },30);
    };
    //获取当前视口的顶端数值
    var getScrollTop = function(){
        var sTop ;
        if (document.compatMode == "BackCompat")
        {
            sTop = document.body.scrollTop;
        }
        else
        {
            //document.compatMode == \"CSS1Compat\"
            sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        }
        return sTop;
    };
    //设置当前视口的顶端数值
    var setScrollTop = function(top){

        if (document.compatMode == "BackCompat")
        {
            document.body.scrollTop = top;
        }
        else
        {
            if(document.documentElement.scrollTop == 0){
                document.body.scrollTop = top;
            }else{
                document.documentElement.scrollTop = top;
            }
        }
    }
};*/
