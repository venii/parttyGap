angular.module('main.controllers', ['starter'])
.controller('MainCtrl', function($scope,$state,
                              UtilsService,MainService,AdressService,
                              $ionicLoading,$ionicViewService,$localStorage) {


  

    $ionicLoading.show({
          template: 'Carregando servidor de mensagem ...'
    });

    if(UtilsService.isMob()){
      
       MainService.registerPushNotification(function(){
          $ionicLoading.hide();
          MainService.registerPushNotificationOnMobile(); 
       });          
      
    }else{
        MainService.saveDeviceToken('web');
        $ionicLoading.hide();
        $state.go('app.registration');
    }
    
    $scope.sess = MainService.getDeviceToken();

});