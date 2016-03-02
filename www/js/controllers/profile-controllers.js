angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope, $state,


      ProfileService,RegistrationService,
      LoginService) {
     
      $scope.nome = RegistrationService.getUserFbName();
      $scope.mydesc = {};
      
      $scope.changedphoto = false;


      $scope.processForm = function(){
          var token = LoginService.getToken();
          var fbid = RegistrationService.getUserFbID();
          var desc = $scope.mydesc;
          ProfileService.saveProfile(token,fbid,desc,function(){
            alert("Atualizado");
          });
      };
    
      $scope.changephoto = function(){
        ProfileService.openPhotoPicker(function(results){
            var fbid = RegistrationService.getUserFbID();
              
            //METODO WEB
            if(typeof(results.convertBase64) != "undefined"){
              var base64 = ProfileService.getBase64ActualImage();
              console.log('changefoto',base64);
              ProfileService.uploadPhoto(fbid,base64,function(xhr){
                  RegistrationService.changeCoverMenuPhoto(base64);
                  alert("Imagen Alterada");
              });
           
            //METODO PARA DISPOSITIVOS
            }else{
              ProfileService.converImageBase64("imgPIC",function(base64){
                
                ProfileService.uploadPhoto(fbid,base64,function(xhr){
                    RegistrationService.changeCoverMenuPhoto(base64);
                    alert("Imagen Alterada");
                });
              });
            }
            
        });
      };

      var fbid = RegistrationService.getUserFbID();
      var token = LoginService.getToken();
      

      ProfileService.getProfile(token,fbid,function(profilePic,persDesc){
        
         $scope.imgPIC = profilePic;
         $scope.mydesc.desc = JSON.parse(persDesc).desc;
      });
});