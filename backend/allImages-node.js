/**
 * Created by Administrator on 2019/4/1.
 */

'use strict'

//获取项目工程里的图片
var fs = require('fs');//引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块
var express = require("express"); //引用express模块
var app = express();

function readFileList(path, filesList, onlySon) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            if (!onlySon) {
                //递归读取文件
                readFileList(path + itm + "/", filesList, onlySon);
            }
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }
    });
}

var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList, false);
        // console.log(filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];
        this.getFileList(path).forEach(function (item) {
            var ms = image(fs.readFileSync(item.path + item.filename));
            ms.mimeType && (imageList.push(item.filename));
        });
        console.log(imageList);
        return imageList;
    },
    //获取文件夹下的所有 子集文件(不包括孙级)
    getFileListOnlySon: function (path) {
        var filesList = [];
        readFileList(path, filesList, true);
        // console.log(filesList);
        return filesList;
    },
    //获取文件夹下的所有 子集图片(不包括孙级)
    getImageFilesOnlySon: function (path) {
        var imageList = [];
        this.getFileListOnlySon(path).forEach(function (item) {
            var ms = image(fs.readFileSync(item.path + item.filename));
            ms.mimeType && (imageList.push(item.filename));
        });
        console.log(imageList);
        return imageList;
    }
};


//创建server
app.get('/getmdimages', function (req, res) {
    var images = getFiles.getImageFilesOnlySon("../image/md/");
    // 设置头，允许跨域
    res.set("Access-Control-Allow-Origin", "*");
    res.send(images);
});

//server启动时
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("实例启动：访问地址为 http://%s:%s", host, port);
});


//获取文件夹下的所有文件
// getFiles.getFileList("../image/md/");
//获取文件夹下的所有图片
// getFiles.getImageFiles("../image/md/");

//获取文件夹下的所有子集图片(不包括孙级)
// getFiles.getFileListOnlySon("../image/md/");
//获取文件夹下的所有子集图片(不包括孙级)
// getFiles.getImageFilesOnlySon("../image/md/");