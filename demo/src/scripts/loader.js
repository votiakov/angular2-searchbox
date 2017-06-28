'use strict';

(function (system) {

  let sys = {

    'configuration': {

      'map': {

        'app': 'scripts',

        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',

        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',

        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',

        // '@angular/platform-browser': 'npm:@angular/platform-browser',

        // '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',

        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',

        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',

        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',

        'lodash': 'npm:lodash',

        'angular2-searchbox': 'npm:angular2-searchbox',

        'rxjs': 'npm:rxjs',

        'json': 'npm:systemjs-plugin-json/json.js',

        'primeng': 'npm:primeng',

        'angular-pipes': 'npm:angular-pipes',

        '@angular/material': 'npm:@angular/material/bundles/material.umd.min.js',

        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',

        // '@angular/animations': 'npm:@angular/animations/bundles/animations-browser.umd.min.js',

        '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
        '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',

        '~primeng': 'npm:primeng'

      },

      'meta': {

        '/config/*.json': {

          'loader': 'json'

        },

        '/package.json': {

          'loader': 'json'

        }

      },

      'paths': {

        'npm:': '../../node_modules/'

      },

      'packages': {

        'app': {

          'main': 'app',

          'defaultExtension': 'js'

        },

        'npm:angular2-searchbox': {

          'defaultExtension': 'js',

          'main': './index'

        },

        'rxjs': {

          'defaultExtension': 'js'

        },

        'lodash': {

          'main': './index',

          'defaultExtension': 'js'

        },

        'angular2-in-memory-web-api': {

          'main': './index',

          'defaultExtension': 'js'

        },

        'primeng': {
          'defaultExtension': 'js'
        },

        'angular-pipes': {
          'defaultExtension': 'js'
        }

        // '@angular/platform-browser': {
        //   'defaultExtension': 'js'
        // }

      }

    },

    config: function () {

      system
        .config(
          this.configuration
        );

      return this;

    },

    import: function (name) {

      system
        .import(name)
        .catch(function (err) {

          return console
            .error(err);

        });

      return this;

    }

  };

  if (sys && system) {

    sys
      .config()
      .import('app');

  }

})(window.System || {});