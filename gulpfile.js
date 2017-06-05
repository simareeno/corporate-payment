let autoPrefixer = require("autoprefixer"),
	browserSync = require("browser-sync").create(),
	concat = require("gulp-concat"),
	del = require("del"),
	path = require("path"),
	join = path.join,
	gulp = require("gulp"),
	minify = require("cssnano"),
	notify = require("gulp-notify"),
	babel = require("gulp-babel"),
	plumber = require("gulp-plumber"),
	pug = require("gulp-pug"),
	postCss = require("gulp-postcss"),
	preCss = require("precss"),
	colorFunction = require("postcss-color-function"),
	sourceMaps = require("gulp-sourcemaps"),
	runSequence = require("run-sequence"),
	webpack = require("webpack-stream");

const DEST = "out",
	SRC = "src",
	TEMPLATES = join(SRC, "templates"),
	STYLES = join(SRC, "styles"),
	SCRIPTS = join(SRC, "scripts"),
	IMAGES = join(SRC, "images");

gulp.task("styles", function() {

	let processors = [
		colorFunction(),
		preCss(),
		autoPrefixer({browsers: ["last 2 versions"]}),
		minify(),
	];

	return gulp.src(join(STYLES, "main.css"))
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: "STYLES",
					message: err.message
				};
			})
		}))
		.pipe(sourceMaps.init())
		.pipe(postCss(processors))
		.pipe(concat("styles.css"))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest(join(DEST, "styles")));
});


gulp.task("images", function(){
	return gulp.src(join(IMAGES, "**/*.+(png|jpg|jpeg|gif|svg)"))
	.pipe(gulp.dest(join(DEST, "images")));
});


gulp.task("pug-index", function() {
	return gulp.src([join(TEMPLATES, "*.pug")])
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: "pug-index",
					message: err.message
				};
			})
		}))
		.pipe(pug({
			compileDebug: false,
			pretty: true
		}))
		.pipe(gulp.dest(DEST));
});


gulp.task("js", function() {

	return gulp.src(join(SCRIPTS, "app.js"))
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: "JS",
					message: err.message
				};
			})
		}))
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(webpack({
			output: {
				filename: "bundle.js",
			},
		}))
		.pipe(gulp.dest(join(DEST, "scripts")));
});


gulp.task("clean:dist", function() {
	return del.sync(DEST);
});


gulp.task("pug-index:sync", ["pug-index"], function(done) {
	browserSync.reload();
	done();
});


gulp.task("styles:sync", ["styles"], function(done) {
	browserSync.reload();
	done();
});


gulp.task("js:sync", ["js"], function(done) {
	browserSync.reload();
	done();
});


gulp.task("browserSync", function() {
	browserSync.init({
		server: {
			baseDir: "./out"
		},
	});
	gulp.watch(join(TEMPLATES, "**/*.pug"), ["pug-index:sync"]);
	gulp.watch(join(STYLES, "**/*.css"), ["styles:sync"]);
	gulp.watch(join(SCRIPTS, "**/*.js"), ["js:sync"]);
	gulp.watch(join(IMAGES, "**/*"), ["images"]);
});


gulp.task("watch", ["browserSync"], function() {
	gulp.watch(join(TEMPLATES, "**/*.pug"), ["pug-index"]);
	gulp.watch(join(STYLES, "**/*.css"), ["styles"]);
	gulp.watch(join(SCRIPTS, "**/*.js"), ["js"]);
	gulp.watch(join(IMAGES, "**/*"), ["images"]);
});


gulp.task("build", function (callback) {
	runSequence("clean:dist",
		["pug-index", "styles", "js", "images"],
		callback
	);
});
