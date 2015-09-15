'require strict';

var generators = require('yeoman-generator')
    _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: {
    applicationName: function() {
      var done = this.async();

      var prompts = [{
        type: 'input',
        name: 'applicationName',
        message: 'Application Name',
        default: this.appname
      }, {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '1.0.0'
      }, {
        type: 'input',
        name: 'authors',
        message: 'Authors (comma separated)',
        store: true
      },
      {
        type:    'input',
        name:    'screenHeight',
        message: 'Screen Height',
        default: 768,
        store:   true
      }, {
        type:    'input',
        name:    'screenWidth',
        message: 'Screen Width',
        default: 1024,
        store:   true
      }];

      this.prompt(
        prompts,
        function(answers) {
          this.userConfig = {};

          this.userConfig.applicationName = answers.applicationName;
          this.userConfig.version = answers.version;
          this.userConfig.authors = _.map(answers.authors.split(','), function(author) { return author.trim() });
          this.userConfig.screenHeight = answers.screenHeight;
          this.userConfig.screenWidth = answers.screenWidth;

          done();
        }.bind(this)
      );
    }
  },

  writing: {
    gitignore: function() {
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      )
    },

    rootDocument: function() {
      this.fs.copyTpl(
        this.templatePath('src/index.html'),
        this.destinationPath('src/index.html'),
        { applicationName: this.userConfig.applicationName }
      );
    },

    mainJs: function() {
      this.fs.copyTpl(
        this.templatePath('src/main.js'),
        this.destinationPath('src/main.js')
      )
    },

    manifest: function() {
      this.fs.copyTpl(
        this.templatePath('src/manifest.json'),
        this.destinationPath('src/manifest.json'),
        {
          applicationName: this.userConfig.applicationName,
          version: this.userConfig.version,
          authors: _.map(this.userConfig.authors, function(author){ return '"' + author + '"'; }).join(', '),
          screenHeight: this.userConfig.screenHeight,
          screenWidth: this.userConfig.screenWidth
        }
      );
    },

    gulp: function() {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );

      this.fs.copyTpl(
        this.templatePath('eslint.config.json'),
        this.destinationPath('eslint.config.json')
      );
    },

    package: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
    }
  }
});
