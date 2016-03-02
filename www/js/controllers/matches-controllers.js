angular.module('matches.controllers', ['starter','cards-animation-matches.controllers'])

.controller('MatchesCtrl', function (
                        $scope,$state,$stateParams,
                        SendMatchesToWS,MatchService,UtilsService) {
  		
        MatchService.resizeHeight();    
        MatchService.hideTopMenu();
        $scope.eventinfoJSON = $stateParams.dataEvent;
        
    	$scope.backtoevents = function(){
    		$state.go("app.events");
    	};

    	$scope.info = function(){
    		
    	};
    	
    	$scope.matches = function(){
            UtilsService.openDialogMsg('Procurando matches...');
                
            SendMatchesToWS.loadMatches($scope,function(resp){
                UtilsService.closeDialogMsg();
                    
                if(resp.error){
                    alert("Não há matches");
                    $state.go('app.events');
                }

            });
    	};

        
  });