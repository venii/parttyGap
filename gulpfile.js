var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var sh = require('shelljs');
var shell = require('gulp-shell');

var fs = require('fs');
 

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});





gulp.task('watch', function() {
  
  var watcher = gulp.watch('www/**');
  watcher.on('change', function(event) {
      
      
    if(event.type == "changed"){
      
        gulp.start('gitADD',function(done){
          
          gulp.start('gitCommit',function(done){

            gulp.start('gitPush',function(done){
  
              gulp.start('updatePhoneGap',function(done){
  
                gulp.start('buildAndDownloadAPK',function(done){
                    
                });
  
              });
  
            });
  
          });
     
        });
    }
  });
});


/*AUTOMATIZAÇÃOO*/

gulp.task('gitADD',shell.task([
    'git add www/* config.xml '
]));

gulp.task('gitRM',shell.task([
    'git rm --ignore-unmatch app-debug.zip','git rm --ignore-unmatch app-debug.apk'
]));


gulp.task('gitCommit',shell.task([
    'git commit -am "enviado pelo gulp" '
]));

gulp.task('gitPush',shell.task([
    'git push origin'
]));

gulp.task('updatePhoneGap',shell.task([
    'chrome https://build.phonegap.com/apps/1936762/push'
]));


gulp.task('installAPK',shell.task([
    'adb install -r app-debug.apk','adb shell monkey -p com.ionicframework.partty754126 -c android.intent.category.LAUNCHER 1'
]));

gulp.task('buildAndDownloadAPK',function(done){
   var client = require('phonegap-build-api');
   
   client.auth({ username: 'parttyapp@gmail.com', password: '210289aA' }, function(e, api) {
        
        console.log("login into phonegap api success.");
        
        console.log("baixando apk.");
         
         var download = api.get('/apps/1936762/android').pipe(fs.createWriteStream('app-debug.apk')) .on('error', function(e) { console.log(e); });

         download.on('data', function(chunk){
            console.log('Baixando %d bytes of data', chunk.length);
         });

         download.on("finish",function(){
              gulp.start('installAPK',function(done){
                console.log("Instalado");

              });
         });
       
    });
});
