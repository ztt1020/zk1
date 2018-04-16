//引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var minHtml = require('gulp-htmlmin');
var minJs = require('gulp-uglify');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
//var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var data = require('./src/data/data.json');


//建任务
gulp.task("clean",function(){
	return gulp.src('dist')
		.pipe(clean())
})

//gulp.task("minCss",function(){
//	return gulp.src('src/css/*.scss')
//		//.pipe(sass())
//		.pipe(autoprefixer({
//			browsers:['last 2 versions','Android >= 4.0']
//		}))
//		.pipe(minCss())
//		.pipe(gulp.dest("dist/css"))
//})

gulp.task("copyJs",function(){
	return gulp.src('src/js/lib/jquery-1.8.3.min.js')
		.pipe(gulp.dest("dist/js/lib"))
})

gulp.task("minJs",function(){
	return gulp.src('src/js/*.js')
		.pipe(minJs())
		.pipe(gulp.dest("dist/js"))
})

var options = {
         removeComments: true,//清除HTML注释
         collapseWhitespace: true,//压缩HTML
         collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
         removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
         minifyJS: true,//压缩页面JS
         minifyCSS: true//压缩页面CSS
 	}

gulp.task("minHtml",function(){
	return gulp.src('src/*.html')
		.pipe(minHtml(options))
		.pipe(gulp.dest("dist"))
})

gulp.task("server",function(){
	gulp.src('.')
		.pipe(server({
			port:8008,
			livereload:true,
			host:"localhost",
			middleware:function(req,res,next){
				if(/\/list/g.test(req.url)){
					res.end(JSON.stringify(data))
				}
				next()
			}
		}))
})

gulp.task("default",function(cb){
	sequence("clean",["minJs","minHtml","copyJs"],"server",cb)
})
