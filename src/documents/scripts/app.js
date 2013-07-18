(function() {

  "use strict";

  var app = angular.module('iteamse', []);

  app.config(function ($compileProvider) {
    $compileProvider
      .urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/); 
  });

  app.directive('makePretty', function () {
    return {
      link: function (scope, elm, attr) {
        $('pre code').each(function (i, e) {
          hljs.highlightBlock(e);
        });
      }
    };
  })
  .directive('makeAnchors', function () {
    return {
      link: function (scope, elm, attr) {
        $(':header').each(function () {
          $(this).append('<a id="' + $(this).text().replace(/ /g,'-') + '"></a>');
        });
      }
    };
  });

})();