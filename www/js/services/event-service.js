angular.module('app.event-service', ['starter','app.utils-service','app.registration-service','app.login-service','ngCordova'])
.service('EventService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaDevice,
    $ionicScrollDelegate,
    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService,
    MainService,
    RegistrationService
    ) {
		
      this.getFirstEvent = function(token,callback){
        var postData = {
                  "sessfb": token
        };
        this.getEvents(postData,callback);
      }

      this.getEvents = function(postData,callback){
        
        $http.get(AdressService.geteventsfb,{params: postData})
        .then(function(resp) {
            callback(resp);
              
        });

      }


      this.validateTokenFetchEvents = function(resp){
          if(resp.data == null || resp.data.error){
            return false;    
          }
          return true;
              
      }

      this.isEndList = function(){
        var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
        var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

        if (currentTop >= maxTop)
          return true;
        return false;
      }
  });
