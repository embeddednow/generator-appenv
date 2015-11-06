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
      }, {
        type:    'list',
        name:    'scaffold',
        message: 'Scaffold application with',
        default: 'nothing',
        choices: ['nothing', 'React and Bootstrap']
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
          this.userConfig.scaffold = answers.scaffold;

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
        this.destinationPath('gulpfile.js'),
        {
          scaffold: this.userConfig.scaffold
        }
      );

      this.fs.copyTpl(
        this.templatePath('eslint.config.json'),
        this.destinationPath('eslint.config.json')
      );
    },

    package: function() {
      var packages = [
        { name: 'browserify', version: '^11.1.0' },
        { name: 'gulp', version: '^3.9.0' },
        { name: 'gulp-concat', version: '^2.6.0' },
        { name: 'gulp-eslint', version: '^1.0.0' },
        { name: 'gulp-sass', version: '^2.0.4' },
        { name: 'vinyl-source-stream', version: '^1.1.0' }
      ];

      if(this.userConfig.scaffold.indexOf('React') > -1) {
        packages.push({ name: 'react', version: '^0.14.2' });
        packages.push({ name: 'react-dom', version: '^0.14.2' });
        packages.push({ name: 'react-router', version: '^0.13.5' });
        packages.push({ name: 'reactify', version: '^1.1.1' });
      }

      if(this.userConfig.scaffold.indexOf('Bootstrap') > -1) {
        packages.push({ name: 'jquery', version: '^2.1.4' });
        packages.push({ name: 'bootstrap', version: '^3.3.5' });
        packages.push({ name: 'react-bootstrap', version: '^0.27.3' });
      }

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          packages: packages
        }
      );
    },

    base_scaffold: function() {
      if(this.userConfig.scaffold !== 'nothing') return;

      var src_root = 'src/scaffold/base';

      // copy the root files
      this.fs.copyTpl(
        this.templatePath(src_root + '/js/main.js'),
        this.destinationPath('/src/js/main.js'));

      this.fs.copyTpl(
        this.templatePath(src_root + '/index.html'),
        this.destinationPath('src/index.html'),
        { applicationName: this.userConfig.applicationName });
    },

    react_scaffold: function() {
      if(this.userConfig.scaffold !== 'React and Bootstrap') return;

      var src_root = 'src/scaffold/react';

      //copy components
      this.fs.copyTpl(
        this.templatePath(src_root + '/js/components/App.react.js'),
        this.destinationPath('src/js/components/App.react.js'));

      this.fs.copyTpl(
        this.templatePath(src_root + '/js/components/Dashboard.react.js'),
        this.destinationPath('src/js/components/Dashboard.react.js'));

      this.fs.copyTpl(
        this.templatePath(src_root + '/js/components/Footer.react.js'),
        this.destinationPath('src/js/components/Footer.react.js'),
        {
          applicationName: this.userConfig.applicationName
        });

      this.fs.copyTpl(
        this.templatePath(src_root + '/js/components/Header.react.js'),
        this.destinationPath('src/js/components/Header.react.js'),
        { applicationName: this.userConfig.applicationName });

      this.fs.copyTpl(
        this.templatePath(src_root + '/js/components/Login.react.js'),
        this.destinationPath('src/js/components/Login.react.js'));

      // copy scss
      this.fs.copy(
        this.templatePath(src_root + '/css/style.scss'),
        this.destinationPath('src/css/style.scss')  
      )

      // copy the root files
      this.fs.copyTpl(
        this.templatePath(src_root + '/js/main.react.js'),
        this.destinationPath('src/js/main.react.js'));

      this.fs.copyTpl(
        this.templatePath(src_root + '/js/routes.react.js'),
        this.destinationPath('src/js/routes.react.js'));

      this.fs.copyTpl(
        this.templatePath(src_root + '/index.html'),
        this.destinationPath('src/index.html'),
        { applicationName: this.userConfig.applicationName });
    }
  }
});
