'require strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: {
    applicationName: function() {
      var done = this.async();

      this.prompt({
          type:    'input',
          name:    'name',
          message: 'Application Name',
          default: this.appname
        },
        function(answers) {
          this.log(answers.name);
          done();
        }.bind(this)
      );
    },

    height: function() {
      var done = this.async();

      this.prompt({
          type:    'input',
          name:    'height',
          message: 'Screen Height',
          default: 768,
          store:   true
        },
        function(answers) {
          this.log(answers.height);
          done();
        }.bind(this)
                 );
    },

    width: function() {
      var done = this.async();

      this.prompt({
          type:    'input',
          name:    'width',
          message: 'Screen Width',
          default: 1024,
          store:   true
        },
        function(answers) {
          this.log(answers.width);
          done();
        }.bind(this)
      );
    }
  }
});
