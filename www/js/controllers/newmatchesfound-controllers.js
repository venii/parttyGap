angular.module('newmatchesfound.controllers', ['starter','cards-animation-matches.controllers'])

.controller('NewMatchesFoundCtrl', function (SendMatchesToWS,$ionicViewService,$templateRequest, $sce, $compile,$rootScope,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate,SendMatchesToWS) {
  		$ionicViewService.nextViewOptions({
          disableBack: true
        });
        
        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");

    
        heightClient = angular.element(document.querySelector('#newmatchesfoundView'))[0].offsetHeight;
        angular.element(document.querySelector('#newmatchesfoundView')).css("min-height", (heightClient+40)+"px");


            

        console.log($rootScope.newMatchFoundData);
        $scope.eventinfoJSON = $rootScope.eventData;

        $scope.msgmatch = $rootScope.newMatchFoundData.errMsg;
        $scope.nameMe = $localStorage.usuarioData.ent_first_name;
        $scope.nameInvited = $rootScope.newMatchFoundData.uName;
    	 

        $scope.urlInvited = $rootScope.newMatchFoundData.pPic;
        $scope.urlMe = $localStorage.usuarioData.urlProfilepic;

    
    	  $scope.returnToEvents = function(){
            $ionicViewService.nextViewOptions({
              disableBack: true
            });
            $state.go('app.events');
        }

        $rootScope.newMatchFoundData = null;
  }).controller('NewMatchesFoundReceiveCtrl', function (SendMatchesToWS,$ionicViewService,$templateRequest, $sce, $compile,$rootScope,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate,SendMatchesToWS) {
        $ionicViewService.nextViewOptions({
          disableBack: true
        });
        


       
        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
         console.log($rootScope.newMatchFoundData);
        


        $scope.msgmatch = $rootScope.newMatchFoundData.errMsg;
        $scope.nameMe = $localStorage.usuarioData.ent_first_name;
        $scope.nameInvited = $rootScope.newMatchFoundData.uName;
         

        $scope.urlInvited = $rootScope.newMatchFoundData.pPic;
        $scope.urlMe = $localStorage.usuarioData.urlProfilepic;

        
         $scope.returnToEvents = function(){
            $ionicViewService.nextViewOptions({
              disableBack: true
            });
            $state.go('app.events');
        }

        $rootScope.newMatchFoundData = null;
  });