/**
 * Created by Administrator on 2019/4/1.
 *
 * issues:
 * 1. 链接多次hover时有延迟，
 * 2. 链接多次hover时，.carousel('pause')会失效，轮播图会继续 自动播放！
 */

// common function
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}


function getImages() {
    $.ajax({
        url: 'http://localhost:8081/getmdimages/',
        success: function (result) {
            // console.log(result);
            initLinks(result);
            initImgs(result);
        }
    });
}

function initLinks(data) {
    var path = "../image/md/";
    var imgs = $('#ulImgs');
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', path + data[i]);
        a.setAttribute('data-index', i);
        a.setAttribute('target', '_blank');
        a.onclick = function () {
            // setImgs(this);
            return false;
        };
        a.onmouseover = function () {
            setImgs(this);
        };
        a.onmouseout = function () {
            reStart(this);
        };
        var ac = document.createTextNode(data[i]);
        a.appendChild(ac);
        li.append(a);
        imgs.append(li);
    }
}

function initImgs(data) {
    if (!data) return;
    var path = "../image/md/";
    var imgCarousel = $('#imgCarousel');
    var ol = document.createElement('ol');
    var carInner = document.createElement('div');
    var left = document.createElement('a');
    var right = document.createElement('a');
    var leftValue = document.createTextNode('〈');
    var rightValue = document.createTextNode('〉');
    addClass(ol, 'carousel-indicators');
    addClass(carInner, 'carousel-inner');
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-target', '#imgCarousel');
        li.setAttribute('data-slide-to', i);
        var div = document.createElement('div');
        addClass(div, 'item');
        var img = document.createElement('img');
        img.setAttribute('src', path + data[i]);
        img.setAttribute('alt', data[i]);
        addClass(img, 'img-rounded');
        div.append(img);
        if (i === 0) {
            addClass(li, 'active');
            addClass(div, 'active');
        }
        ol.append(li);
        carInner.append(div);
    }
    addClass(left, 'carousel-control left');
    left.setAttribute('data-slide', 'prev');
    left.setAttribute('href', '#imgCarousel');
    left.appendChild(leftValue);
    addClass(right, 'carousel-control right');
    right.setAttribute('data-slide', 'next');
    right.setAttribute('href', '#imgCarousel');
    right.appendChild(rightValue);
    imgCarousel.append(ol, carInner, left, right);
    //初始化更新name
    setImgName();
}

function setImgs(target) {
    var index = target.getAttribute('data-index');
    var num = parseInt(index);
    // var reg = /\d+/g;
    // name = reg.exec(name);
    // var num = parseInt(name);
    var carousel = $('#imgCarousel');

    carousel.carousel(num);
    carousel.carousel('pause');

}

function reStart() {
    var carousel = $('#imgCarousel');
    carousel.carousel('cycle');
}

function imgChange() {
    $("#imgCarousel").on('slid.bs.carousel', function () {
        setImgName();
    })
}

addLoadEvent(imgChange);

function setImgName() {
    var name = $('#imgCarousel').children('div').children('.active').children('img')[0].src;
    name = name.substring(name.lastIndexOf('/') + 1, name.length);
    var p = document.getElementById('imgName');
    p.lastChild.nodeValue = name;
}

addLoadEvent(getImages);