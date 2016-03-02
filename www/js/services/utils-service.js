angular.module('app.utils-service', ['starter'])
.service('UtilsService',function($localStorage,$ionicLoading) {
          
           this.isMob = function() { 
			     if( navigator.userAgent.match(/Android/i)
			     || navigator.userAgent.match(/webOS/i)
			     || navigator.userAgent.match(/iPhone/i)
			     || navigator.userAgent.match(/iPad/i)
			     || navigator.userAgent.match(/iPod/i)
			     || navigator.userAgent.match(/BlackBerry/i)
			     || navigator.userAgent.match(/Windows Phone/i)
			     ){
			        return true;
			      }
			     else {
			        return false;
			      }
		    }

		    this.isIOS = function(){
			     if ( navigator.userAgent.match(/iPhone/i)
			     || navigator.userAgent.match(/iPad/i)
			     || navigator.userAgent.match(/iPod/i)
			     || navigator.userAgent.match(/BlackBerry/i)
			     ){
			        return true;
			      }
			     else {
			        return false;
			      }
		    }

		    this.isAndroid = function(){
		    	 if( navigator.userAgent.match(/Android/i)
			    
			     ){
			        return true;
			      }
			     else {
			        return false;
			      }
		    }

		    this.setInternetState = function(state){
		    	$localStorage.internetState = navigator.onLine;
		    }

		    this.getInternetState = function(){
		    	//return (typeof $localStorage.internetState == "undefined" ? true : $localStorage.internetState );
		    	return navigator.onLine;
		    }

		    this.showNoConnectionError = function(){
		    	alert("É necessario ter conexao a internet para utilizar o sistema.");
		    }

		    this.openDialogMsg = function(msg){
		    	$ionicLoading.show({
		          template: msg
		      	});
		    }

		    this.closeDialogMsg = function(){
		    	$ionicLoading.hide();
		    }

  }).factory('AdressService', function() {
  			var httpserver = 'http://parttyappnoip.ddns.net';
			var restaddress = httpserver+'/partty/servercode/ws/process.php/';
			  
			var signup = restaddress + 'login';
			var getfbidbysess = restaddress + 'getfbidbysess';
			var updatedob = restaddress + 'updatedob';
			var geteventsfb = restaddress + 'geteventsfb';
			var getpreferences = restaddress + 'getPreferences';
			var updatepreferences = restaddress + 'updatePreferences';
			var findmatchespartty = restaddress + 'findMatchespartty';
			var inviteaction = restaddress + 'inviteAction';
			var registermatchespartty = restaddress + 'registerMatchespartty';
			var updatedevicedetails = restaddress + '_updateDeviceDetails';
			var getprofilematches = restaddress + 'getProfileMatches';
			var sendmessage = restaddress + 'sendMessage';
			var getprofile = restaddress + 'getProfile';
			var editprofile = restaddress + 'editProfile';
			var upload_user_image = restaddress + 'upload_user_image';
			var uploadchunk = restaddress + 'uploadChunk';
	
  			return { httpserver: httpserver,
  					 restaddress: restaddress,
  					 signup: signup,
  					 getfbidbysess: getfbidbysess,
  					 updatedob: updatedob,
  					 geteventsfb: geteventsfb,
  					 getpreferences: getpreferences,
  					 updatepreferences: updatepreferences,
  					 findmatchespartty: findmatchespartty,
  					 inviteaction: inviteaction,
  					 registermatchespartty: registermatchespartty,
  					 updatedevicedetails: updatedevicedetails,
  					 getprofilematches: getprofilematches,
  					 sendmessage: sendmessage,
  					 getprofile: getprofile,
  					 editprofile: editprofile,
  					 upload_user_image: upload_user_image,
  					 uploadchunk: uploadchunk
  					};
});
