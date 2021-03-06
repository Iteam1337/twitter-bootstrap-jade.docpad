module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    outPath: './out/',

    clean :{
      out : ['<%= outPath%>']
    },
    // Concats the js files into a single include
    concat: {
      vendor: {
        dest: '<%= outPath %>content/scripts/<%= pkg.name %>.js',
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/Chart.js/Chart.js',
        ]
      },
      app: {
        dest: '<%= outPath %>content/scripts/app.js',
        src: ['src/scripts/*.js']
      }
    },

    stylus: {
      options: {
        banner: '/* <%= pkg.name %> */ \n'
      },
      compile: {
        files: {
          '<%= outPath %>content/styles/<%= pkg.name %>.css': [
            'src/**/*.css.styl'
          ]
        }
      }
    },

    copy: {
      main:{
        files: [{
          expand: true,
          cwd:'out/',
          src:['**/{*.png,*.jpg}'],
          dest: 'out/'
        }]
      }
    },

    // Minify vendor css
    cssmin: {
      vendor: {
        files: {
          '<%= outPath %>content/styles/vendor.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css'
          ]
        }
      }
    },
    shell: {
      docpad: {
        options: {
          stdout: true,
          failOnError: true,
        },
        command: './node_modules/.bin/docpad generate --env static'
      }
    },

    s3: {
      options: {
        key:    process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        access: 'public-read',
        region: 'eu-west-1',
        gzip: true,
        gzipExclude: ['.jpg', '.png', '.jpeg', '.JPG', '.PNG'],
        maxOperations: 20,
        headers: {
          'Cache-Control': 'public, max-age=' + 60 * 60 * 24 * 1 // 1 day
        }
      },
      production: {
        options: {
          bucket: 'www.iteam.se',
        },
        sync: [
          {
            src: 'out/**/*',
            dest: '/',
            rel: 'out',
            options: { verify: true }
          },
        ],
      },
      stage: {
        options: {
          bucket: 'stage.iteam.se'
        },
        sync: [
          {
            src: 'out/**/*',
            dest: '/',
            rel: 'out',
            options: { verify: true }
          },
        ],
      },
      test: {
        options: {
          bucket: 'test.iteam.se'
        },
        sync: [
          {
            src: 'out/**/*',
            dest: '/',
            rel: 'out',
            options: { verify: true }
          },
        ],
      },
    },

    manifest: {
      generate: {
        options: {
          //network: ['*', 'https://*'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          basePath: 'out',
        },
        src: [
          'content/scripts/iteamse.js',
          'content/scripts/vendor.js',
          'content/styles/*.css',
          'content/images/svg/*.svg',
          'content/fonts/*.*',
        ],
        dest: 'out/application.appcache'
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', [
    'concat',
    'stylus',
    'cssmin',
  ]);

  // Default task(s).
  grunt.registerTask('build', [
    'clean',
    'concat',
    'stylus',
    'cssmin'
  ]);

  grunt.registerTask('dist', [
    'clean',
    'shell:docpad',
    'concat',
    'copy',
    'stylus',
    'manifest'
  ]);

  grunt.registerTask('deploy:master', [
    'dist',
    's3:production'
  ]);

  grunt.registerTask('deploy:release', [
    'dist',
    's3:stage'
  ]);

  grunt.registerTask('deploy:develop', [
    'dist',
    's3:test'
  ]);

};