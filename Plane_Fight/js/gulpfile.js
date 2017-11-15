


//var gulp = requile("gulp");
//gulp.src("js/*.js");//获取文件
//.pipe(gulp.dest("dest/js"));//生成的目录

//使用插件
//压缩html : gulp-uglify
var gulp = require("gulp"); //导入gulp
var uglify = require("gulp-uglify"); //导入js压缩插件
var babel = require('gulp-babel'); //es6转es5
var rename = require('gulp-rename'); //重命名插件


//gulp-uglify插件的参数对象
var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}

//gulp-uglify
//任务
gulp.task("jsTask", function(){
	
	gulp.src("*.js")
		.pipe( babel({"presets": ["es2015"]}) ) //es6转es5
		.pipe( uglify() )		
		.pipe( gulp.dest("../dest/js") );
	
})


//默认任务
gulp.task("default", ["jsTask"]);