var minify = Npm.require('html-minifier').minify;
var jade = Npm.require('jade');
var jadeOpts = {pretty:true, compileDebug:false};

Plugin.registerSourceHandler('ng.jade', {
  isTemplate: true,
  archMatching: 'web'
}, function(compileStep) {
  var contents = compileStep.read().toString('utf8');
  jadeOpts.filename = compileStep.inputPath;
  contents = jade.compile(contents, jadeOpts)();

  var newPath = compileStep.inputPath;
  newPath = newPath.replace(/\\/g, "/");
  newPath = newPath.replace(".ng.jade", ".ng.html");

  var results = 'angular.module(\'angular-meteor\').run([\'$templateCache\', function($templateCache) {' +
    '$templateCache.put(\'' + newPath + '\', \'' +
      minify(contents.replace(/'/g, "\\'"), {
        collapseWhitespace : true,
        conservativeCollapse : true,
        removeComments : true,
        minifyJS : true,
        minifyCSS: true,
        processScripts : ['text/ng-template']
      }) + '\');' +
    '}]);';

  compileStep.addJavaScript({
    path : newPath,
    data : results.replace(/\n/g, '\\n'),
    sourcePath : compileStep.inputPath
  });
});
