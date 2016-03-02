angular.module('app.login-service', ['app.utils-service','ngCordova'])
.service('LoginService',  function(
    $localStorage,$ionicViewService,$ionicSideMenuDelegate,
    $http,$rootScope,$cordovaOauth,

    
    /*
      Nosso servicos
    */
    UtilsService) {
            
           var FBappId ='574073299368611';

           var FBscope = 'email';
           
           this.doLogin = function(callback){
             this.doLoginFB(callback); 
           };


           this.registerFBmobile = function(callback){
            
            document.addEventListener("deviceready", function () {
              
              $cordovaOauth.facebook(FBappId, [FBscope]).then(callback,this.errorHandlerLogin);
              
            });
           
           }

           this.doLoginFB = function(callback){
              if(UtilsService.isMob()){
                //Callback se molda com a fu~ção diferente do condicional
                this.registerFBmobile(callback);
              }else{
                openFB.init({ appId  : FBappId });
                openFB.login(callback,{scope: FBscope});
                
              } 
           }

           this.errorHandlerLogin = function(error){
              console.log(error);
              alert("LOGINSERVICE: "+error);
           }

           this.saveFBAuthObj = function(response){
              $localStorage.authObj = response;

              //console.log(response.authResponse);

              if(typeof(response.authResponse) == "undefined")
                this.saveToken(response.access_token);
              else
                this.saveToken(response.authResponse.token);
           }
           
           this.saveToken = function(token){
              $localStorage.token = token;
              
           }

           this.getToken = function(){
              return $localStorage.token;
              
           }

           this.isAuthFb = function(){
              return this.getToken() == undefined ? false : true;
           }


           this.loggout = function(callback){
              $ionicSideMenuDelegate.canDragContent(false);

              delete $localStorage.token;
              delete $localStorage;

              callback();
           }

           this.showNoAuthError = function(){
              alert("É necessario autenticar antes de utilizar.");
           }

           this.checkUserByPass = function(){
              
              if(UtilsService.isMob()){
                if(this.isAuthFb() && UtilsService.getInternetState())
                  return true;
              
              }else{
                if(this.isAuthFb())
                  return true;
              }
              return false;
  
           }
  });
