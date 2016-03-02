angular.module('app.main-service', ['starter','app.utils-service','app.login-service','ngCordova'])
.service('MainService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaOauth,$cordovaDevice,

    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService

    ) {
		
    	this.registerPushNotification = function(callback){
    		document.addEventListener("deviceready",callback);
        }





        this.registerPushNotificationOnMobile = function () {
            
            if ( UtilsService.isAndroid() ){
              
              window.plugins.pushNotification.register(
              		successHandler,
              		errorHandler,
              		{"senderID":"244606470402", 
              		"ecb":"onNotificationGCM"}
              );
            
            }else{
            	
              var model = $cordovaDevice.getModel();
	          if(model != "x86_64"){
                 
                 window.plugins.pushNotification.register(
                        tokenHandler,
                        errorHandler,
                        {
                            "badge":"true",
                            "sound":"true",
                            "alert":"true",
                            "ecb":"onNotificationAPN"
                 		}
                 );
	          }
            }
       }


    	this.getDeviceToken = function(){
		    return $localStorage.devicetoken;
	    }

	    this.saveDeviceToken = function(token){
	    	$localStorage.devicetoken = token;
	    }     
      
      this.getDeviceType = function(){
        var devicetypeapp = 3;

        if(typeof device !== "undefined"){
            
            if(UtilsService.isMob() ){
              if( UtilsService.isAndroid())
                  devicetypeapp = 2;
             
              else if(UtilsService.isIOS())
                  devicetypeapp = 1;
            }
        }
        return devicetypeapp;
      }


      

  });
