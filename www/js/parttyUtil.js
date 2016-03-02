angular.module('parttyutils', [])

    .factory('parttyUtils', function ($rootScope, $q, $window, $http) {

            document.addEventListener("deviceready", function () {
                    runningInCordova = true;
            }, false);

            function init(params) {
            
            }

            function logPartty(obj){
                var ind = "";
                if (arguments.length > 1)
                {
                    ind = arguments[1];
                }

                if (typeof obj == "undefined" || obj == null)
                {
                    console.log("<null>");
                    return;
                }

                if (typeof obj != "object")
                {
                    console.log(obj);
                    return;
                }

                for (var key in obj)
                {
                    if (typeof obj[key] == "object")
                    {
                        console.log(ind + key + "={");
                        logPartty(obj[key], ind + "  ");
                        console.log(ind + "}");
                    }
                    else
                    {
                        console.log(ind + key + "=" + obj[key]);
                    }
                }
            }


            //retorno obrigatorio do factory

            return {
                init: init,
                logPartty: logPartty
            }
    
});