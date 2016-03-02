angular.module('app.profile-service', ['starter','app.utils-service','app.registration-service','app.login-service','ngCordova'])
.service('ProfileService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaDevice,

    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService,
    MainService,
    RegistrationService
    ) {
		

      var widthI = 300;
      var heightI = 150;

      this.openPhotoPicker = function(callback){
         if(UtilsService.isMob()){ 
          window.imagePicker.getPictures(
            function(results) {
                elementPlacer = document.querySelector("#imgPIC");
                elementPlacer.src = results[0];
                elementPlacer.onload = function(){
                  //console.log('onloadIMGCHANGE',results);
                  callback(results);  
                }
                
            },

            function (error) {
                console.log('Error: ' + error);
            },
            
            {
              maximumImagesCount: 1,
              width: 800,
              height: 800,
              quality: 50
            }
          );
        }else{
          this.openPhotoPickerWEB(callback);
          
        }
      }

      this.openPhotoPickerWEB = function(callback){
        element = document.querySelector("input[type=file]");
        element.click();

        
        element.onchange = function(){
          
          var fr = new FileReader();
          
          fr.onload = function () {
            elementPlacer = document.querySelector("#imgPIC");
            elementPlacer.src = fr.result;
            
            callback({convertBase64 : true});
               
          }

          fr.readAsDataURL(element.files[0]);
        }
      }

      this.getProfile = function(token,fbid,callback){
        
        var postData = {
              "sess_fb": token,
              "ent_user_fbid" : fbid
        };

        $http.get(AdressService.getprofile,{params: postData}).then(function(resp) {
          callback(resp.data.profilePic,resp.data.persDesc);
        });

      }

      // id => #imgPIC
      this.converImageBase64 = function(id,callback){
          try{
            var obj = document.querySelector('#'+id);
           
            var c = document.createElement("CANVAS");
            var ctx = c.getContext("2d");
                  
            c.width = widthI;
            c.height = heightI;
            
            ctx.drawImage(obj, 0, 0,widthI,heightI);
            base64 = c.toDataURL();
            console.log("base64",base64);
            callback(base64);
          
          }catch(err){
            console.log("converImageBase64: "+err);
          }
      }

      this.saveProfile = function(token,fbid,desc,callback){
          var postData = {
            "sess_fb": token,
            "ent_user_fbid" : fbid,
            "ent_pers_desc" : desc
          };

          $http.get(AdressService.editprofile,{params: postData}).then(function(resp) {
                
                callback(resp);
          });
      }

      this.getBase64ActualImage = function(){
        element = document.querySelector("#imgPIC");
        return element.src;
      }

      this.uploadPhoto = function (fbid,base64photo,callback){
          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          var formData = new FormData();

          formData.append("ent_user_fbid", fbid);
          formData.append("ent_image_flag", 1); 
          formData.append("ent_image_chunk", base64photo); 
          formData.append("ent_image_name", 'profile_photo_'+fbid+".png"); 

          var xhr = new XMLHttpRequest();
             
          xhr.open("POST",  AdressService.uploadchunk);  
          xhr.onload = function (e) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  callback(xhr);
                  
                } else {
                  callback(xhr);
                }
              }
          };
          xhr.onerror = function (e) {
              console.error(xhr.statusText);
          };


          xhr.send(formData);

      }
    
  });
