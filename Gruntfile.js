module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
//-----html hint -----------------------------------------------
    htmlhint: {
      options: {
        "tag-pair": true
      },
      all: {
        src: ['index.html','partials/*.html']
      }
    },
//-----javascript hint --------------------------------------------------
    jshint: {
      all: ['*.js','js/services/*.js','js/controllers/*.js','js/filters/*.js'],
	  options: {
		"esversion": 6
		}
    },
//-----file concatenation -----------------------------------------------    
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +  '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      all: {
        src: ['js/app.js','js/services/*.js','js/controllers/*.js', 'js/filters/*.js', 'intermediate/template.js'],
        dest: 'intermediate/concatenatedApp.js',
      }
    },
//-----uglify Javascript ------------------------------------------------
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      debug: {
        options: {
          sourceMap: true
        },
        files: {
          'output/js/<%= pkg.name %>.min.js': 'intermediate/concatenatedApp.js'
        }
      },
      deploy: {
        files: {
            'output/js/<%= pkg.name %>.min.js': 'intermediate/concatenatedApp.js'
        }
      }
    },
//-----uglify HTML ------------------------------------------------------
    htmlmin: {
      all: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'output/index.html': 'index.html',     // 'destination': 'source'
        }
      }
    },
//-----generating template cache ----------------------------------------
    ngtemplates: {
		app:	{
			src:      'partials/**.html',
			dest:     'intermediate/template.js',
			options:  {
				module: 'configurationApp',
				usemin: 'dist/vendors.js', // <~~ This came from the <!-- build:js --> block
				htmlmin: {
					collapseBooleanAttributes:      true,
					collapseWhitespace:             true,
					removeAttributeQuotes:          true,
					removeComments:                 true, // Only if you don't use comment directives! 
					removeEmptyAttributes:          true,
					removeRedundantAttributes:      true,
					removeScriptTypeAttributes:     true,
					removeStyleLinkTypeAttributes:  true
				}
			}
		}
	},
//-----uglify the CSS
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      all: {
        files: {
          'output/css/stylesheet.css': ['css/stylesheet.css']
        }
      }
    },
//-----delete the output and intermediate files--------------------------
    clean: {
      all: {
        src: ['output', 'intermediate']
      }
    },
//-----copy the libraries and their map files ---------------------------
    npmcopy: {
      options: {
      // Task-specific options go here 
      },
      debug: {
        files: {
        'output/js/angular.min.js':'angular/angular.min.js',
        'output/js/angular.min.js.map':'angular/angular.min.js.map',
        'output/js/angular-route.min.js': 'angular-route/angular-route.min.js',
        'output/js/angular-route.min.js.map': 'angular-route/angular-route.min.js.map',
        'output/js/angular-material.min.js':'angular-material/angular-material.min.js',
        'output/js/angular-animate.min.js':'angular-animate/angular-animate.min.js',
        'output/js/angular-aria.min.js':'angular-aria/angular-aria.min.js',
        'output/css/angular-material.min.css':'angular-material/angular-material.min.css',
        'output/css/app.css':'../css/app.css'
      }
      },
      deploy: {
        files: {
          'output/js/angular.min.js':'angular/angular.min.js',
          'output/js/angular-route.min.js': 'angular-route/angular-route.min.js',
          'output/js/angular-material.min.js':'angular-material/angular-material.min.js',
          'output/js/angular-animate.min.js':'angular-animate/angular-animate.min.js',
          'output/js/angular-aria.min.js':'angular-aria/angular-aria.min.js',
          'output/css/angular-material.min.css':'angular-material/angular-material.min.css',
          'output/css/app.css':'../css/app.css'
        }
      }  
    },
//-----copy the vector icons to the output directory ---------------------------------------
      copy: {
        debug: {
			expand: true,
			src: 'assets/*',
			dest: 'output',
        },
        deploy: {
			expand: true,
			src: 'assets/*',
			dest: 'output',
        }
      },
//-----alter the index.html, to enable livereload in debug mode ---------
    'string-replace': {
      inline: {
        files: {
          'output/index.html' : 'index.html'
        },
        options: {
          replacements: [{
            pattern: '<!--XXX Live reload placeholder XXX-->',
            replacement: '<script src="//localhost:35729/livereload.js"></script>'
          }]
        }
      }
    },
//-----startup the webserver, and proceed with further tasks -------------------------------
    run: {
    options: {
      wait: false
    },
    serverWin: {
      cmd: 'node',
      args: [
        'server.js'
      ]
    }
    },
//-----run the live reload server - it will watch the files and trigger the reload ---------
    watch: {
      options: {
        livereload: true,
      },
      all: {
        files: ['index.html','css/*', 'js/**','partials/*' ],
        tasks: ['buildDebug'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-angular-templates'); 
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-npmcopy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');
  
  // Default task(s).
  grunt.registerTask('buildDebug', ['htmlhint','jshint','ngtemplates','concat','uglify:debug','cssmin','copy' ,'string-replace','npmcopy:debug'] );
  grunt.registerTask('debug', ['buildDebug','run:serverWin','watch'] );
  grunt.registerTask('deploy', ['htmlhint','jshint','ngtemplates','concat','uglify:deploy','cssmin','copy','htmlmin','npmcopy:deploy'] );
  grunt.registerTask('default', ['deploy']);
  grunt.registerTask('cleanup', ['clean']);
};