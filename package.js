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
    'html-minifier': '0.7.2',
    'jade': '1.9.2'
  }
});
