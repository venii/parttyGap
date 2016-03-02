angular.module('app.registration-service', ['starter','app.utils-service','app.registration-service','app.login-service','ngCordova'])
.service('RegistrationService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaDevice,

    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService,
    MainService
    ) {
		
    	this.getFBSessJSON = function(callback){
          var  deviceType = MainService.getDeviceType();
          var postData = {
            "devicetypeapp" : deviceType,
            "sess_fb": LoginService.getToken()
          };

        
          $http.get(AdressService.getfbidbysess,{params: postData}).then(function(resp) {
            callback(resp);
          });
      
      }

      this.verifyFBSessJSON = function(resp,callback){
          if(resp.data.error || !resp.data.usuario){
            alert("Autentique com o Facebook novamente.");
            
            LoginService.loggout(callback);
          }
      }

      this.updateDeviceDetailsJSON = function(resp,deviceType){
        var postData = {
            
                "ent_fbid": resp.data.usuario.id,
                "ent_device_type" : deviceType
        };

        $http.get($localStorage.updatedevicedetails ,{params: postData});
          
      }

      this.loginParttyJSON = function(callback,callback_error){
                var postData = this.getUserData();
                $http.get($localStorage.restaddress+'login',{params: postData}).then(function(resp) {
                    $localStorage.usuarioData.age = resp.data.age;
                    callback(resp);
                  },function(err) {
                    console.error('ERR', err);
                    callback_error(err);
                });

      }

      this.isNewUser = function(resp,callback){
        if(resp.data.newuser){
          callback();
          /*var modalInstance = $modal.open({
                  animation: $scope.animationsEnabled,
                   templateUrl: 'templates/modal/main.html',
                   controller: 'ModalDobCtrl',
                   scope: $scope,
                   windowClass: "app-modal-window",
                   backdrop : 'static'
           });*/    
        }
      }

      this.saveUserData = function(resp){
          
          var profilePic = null;
          
          try{
            profilePic = resp.data.usuario.picture.data.url;
          }catch(err){
            console.log('saveUserData: '+err);
          }

          try{
            var postData = {
                  "ent_first_name"  : resp.data.usuario.name,
                  "ent_sex"         : (resp.data.usuario.gender == "male" ? 1 : 2),
                  "ent_device_type" : MainService.getDeviceType(),
                  "ent_push_token"  : MainService.getDeviceToken(),
                  "ent_auth_type"   : 1,
                  "ent_fbid"        : resp.data.usuario.id,
                  "urlProfilepic"   : profilePic
            };

            $localStorage.usuarioData = postData;
          }catch(err){
            console.log('saveUserData(2): '+err);
          }
      }

      this.getUserData = function(){
        return $localStorage.usuarioData;
      }

      this.getUserFbID = function(){
        return $localStorage.usuarioData.ent_fbid;
      }

      this.getUserFbName = function(){
        return $localStorage.usuarioData.ent_first_name;
      }

      this.changeCoverMenuPhoto = function(url){
        try{
          angular.element(document.querySelector('#profilecontentmenu')).html("<img src='"+url+"' style='border-radius: 40px / 20px ;width:64px;height:64px' width='64' heigth='64' />");
        }catch(err){
          console.log("changeCoverMenuPhoto: "+err);
        }

      }
  });
