/**
 * 首页样式
 * @authors Your Name (you@example.org)
 * @date    2017-07-27 10:55:32
 * @version $Id$
 */
function setBodyHeight() {
    var mybodyHeight;
    if (window.innerHeight) {
        mybodyHeight = window.innerHeight;
    } else {
        mybodyHeight = document.body.clientHeight;
    }
    console.log(mybodyHeight);
    var myheadHeight = document.getElementById('myhead').offsetHeight; //获取顶部div的高度
    var needHeight = mybodyHeight - myheadHeight;
    console.log(needHeight);
    document.getElementById('mybody').style.height = needHeight + 'px';
}

function setBodyWidth() {
    var mybodyWidth;
    if (window.innerWidth) {
        mybodyWidth = window.innerWidth;
    } else {
        mybodyWidth = document.body.clientWidth;
    }
    console.log('mybodywidth:' + mybodyWidth);
    var needWidth = mybodyWidth - 20; //padding 两侧边距各为10
    document.getElementById('mybody').style.width = needWidth + 'px';
}
