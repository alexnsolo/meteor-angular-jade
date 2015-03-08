var minify = Npm.require('html-minifier').minify;
var jade = Npm.require('jade');
var jadeOpts = {pretty:true, compileDebug:false};

Plugin.registerSourceHandler('ng.jade', {
  isTemplate: true, 
  archMatching: 'web'
}, function(compileStep) {
  var contents = compileStep.read().toString('utf8');
  contents = jade.compile(contents, jadeOpts)();

  var newPath = compileStep.inputPath;
  newPath = newPath.replace(/\\/g, "/");
  newPath = newPath.replace(".ng.jade", ".html");

  var results = 'angular.module(\'angular-meteor\').run([\'$templateCache\', function($templateCache) {' +
    '$templateCache.put(\'' + newPath + '\', \'' +
      minify(contents.replace(/'/g, "\\'"), {
        collapseWhitespace : true,
        removeComments : true,
        minifyJS : true,
        minifyCSS: true,
        processScripts : ['text/ng-template']
      }) + '\');' +
    '}]);';

  compileStep.addJavaScript({
    path : newPath,
    data : results,
    sourcePath : compileStep.inputPath
  });
});