angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$stateParams,$state,
					EventService,LoginService,UtilsService) {
  
  var token = LoginService.getToken();
  EventService.getFirstEvent(token,function(resp){

      if(!EventService.validateTokenFetchEvents(resp)){
        $state.go('app.loggedout');
      }

	    $scope.items = resp.data.data;
      $scope.nextpag = resp.data.next;
      $scope.prevpag = resp.data.previous;
  
  });

  $scope.clickGridEvents = function(item,index){
  	if(item.name != undefined){
  		$state.go('app.matches',{ dataEvent : item});
 	  }
  };

  $scope.checkScroll = function () {
   		
   		if($scope.nextpag != null && EventService.isEndList()){
   			

        UtilsService.openDialogMsg('Carregando mais Eventos...');
          	
        if($scope.loadingscrollevents == undefined){
          var postData = {              
            "sessfb" : token,
            "next": $scope.nextpag
          };


          $scope.loadingscrollevents = true;
			    EventService.getEvents(postData,function(resp) {
  				  UtilsService.closeDialogMsg();
            

  			    if(EventService.validateTokenFetchEvents(resp)){
  			   			for ( dado in resp.data.data) {
  					      $scope.items.push(resp.data.data[dado]);
  					    }	

  			   			$scope.nextpag = resp.data.next;
  			   			$scope.prevpag = resp.data.previous;
  			   			$scope.loadingscrollevents = false;	
  			   			$scope.loadingscrollevents = undefined;
  			   	}
  			 
  			 });
			}
   	}
  };

}).controller('ControllerListEventsCtrl', function($scope) {
 	$scope.shouldShowDelete = false;
 	$scope.shouldShowReorder = false;
 	$scope.listCanSwipe = true
});