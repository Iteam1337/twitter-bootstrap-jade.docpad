;(function (angular, LibChart, $) {
  "use strict";
  angular.module(
    "iteamse.module.about-view",
    []
  )
  .directive("aboutView", function () {
    if (typeof LibChart === "undefined" || typeof $ === "undefined") {
      return;
    }
    return {
      resrict: "A",
      replace: false,
      scope: false,
      link: function (scope, element) {
        var ctx, data, options,
            turnoverNumbers,
            employeeNumbers,
            businessareaNumbers;

        options = {
          scaleOverride: true,
          scaleSteps: 15,
          scaleStepWidth: 1,
          scaleStartValue: 0,
          animationSteps: 0
        };

        turnoverNumbers = $(element).find("canvas.turnoverNumbers")[0];
        employeeNumbers = $(element).find("canvas.employeeNumbers")[0];
        businessareaNumbers = $(element).find("canvas.businessareaNumbers")[0];

        /**
         * Chart of turnover growth
         */
        if (!!turnoverNumbers) {
          data = {
            labels: ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            datasets: [
              {
                fillColor: "rgba(155,189,9,0.5)",
                strokeColor: "rgba(151,187,85,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [0.12, 0.2, 0.53, 1.1, 2.7, 3.7, 3.7, 2.7, 3.2, 3.9, 4.2, 7, 7.5, 7.5, 8.5, 10, 9.3, 11.6]
              }
            ]
          };

          options.animationSteps = 160;
          ctx = turnoverNumbers.getContext("2d");
          new LibChart(ctx).Bar(data, options);
        }

        /**
         * Chart of employee growth
         */
        if (!!employeeNumbers) {
          data = {
            labels: ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            datasets: [
              {
                fillColor: "rgba(255,189,9,0.5)",
                strokeColor: "rgba(255,189,9,1)",
                pointColor: "rgba(255,189,9,1)",
                pointStrokeColor: "#fff",
                data: [0, 0, 1, 2, 3, 4, 3, 4, 4, 4, 6, 7, 7, 8, 9, 10, 11, 12]
              }
            ]
          };

          options.animationSteps = 200;
          ctx = employeeNumbers.getContext("2d");
          new LibChart(ctx).Line(data, options);
        }

        /**
         * Chart of work areas
         */
        if (!!businessareaNumbers) {
          data = [
            {
              value: 30,
              color: "#F38630"
            },
            {
              value: 70,
              color: "#E0E4CC"
            },
            {
              value: 50,
              color: "#69D2E7"
            }
          ];

          options.animationSteps = 200;
          ctx = businessareaNumbers.getContext("2d");
          new LibChart(ctx).Pie(data, options);
        }
      }
    };
  });
})(angular, Chart, $);