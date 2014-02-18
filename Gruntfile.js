var path = require( 'path' );
var sys = require('sys');
var exec = require('child_process').exec;

module.exports = function ( grunt ) {
  grunt.initConfig({
    init: {},
    env: {
      dev: {
        src: 'env.json'
      }
    },
    express: {
      custom: {
        options: {
          port: 9098,
          watch: {
            interrupt: true,
            atBegin: true,
            event: [ 'added', 'changed' ]
          },
          serverreload: true,
          bases: 'public',
          server: path.resolve( 'app' )
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: [ '*.scss' ],
          dest: 'public/stylesheets',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    shell: {
      init_bourbon: {
        command: 'bundle install && cd sass && bourbon install'
      }
    },
    bookmarklet: {
      generate: {
        body: 'client.js',
        out: 'bookmarklet.js'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-express' );
  grunt.loadNpmTasks( 'grunt-shell' );
  grunt.loadNpmTasks( 'grunt-bookmarklet-thingy' );
  grunt.loadNpmTasks( 'grunt-env' );

  grunt.registerTask( 'default', [ 'express', 'express-keepalive' ] );

  grunt.registerTask( 'server', [ 'env:dev', 'express' ] );
};
