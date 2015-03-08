Package.describe({
  name: "civilframe:angular-jade",
  summary: "Jade templating for Meteor-Angular",
  version: "0.0.1",
  git: "https://github.com/civilframe/meteor-angular-jade.git"
});

Package.registerBuildPlugin({
  name: "compileJadeAngular",
  sources: [
    'plugin.js'
  ],
  npmDependencies : {
    'html-minifier': '0.6.9',
    'jade': '1.7.0'
  }
});