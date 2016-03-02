angular.module('app.menu-service', ['starter','app.utils-service','app.login-service'])
.service('MenuService',function(
				$ionicSideMenuDelegate,
				$localStorage,
				
				UtilsService,
				LoginService
			) {
          

           this.toggleSideMenu = function(side,callback){
           		
           		if(LoginService.isAuthFb()){

           			if(UtilsService.isMob()){
                  self = this;
           				document.addEventListener("deviceready", function () {
		           			
		           	    if(UtilsService.getInternetState()){
						      	   self.performToggleSideMenu(side);
                       typeof(callback) != "undefined" ? callback() : null;
					      	  
                    }else{
					      		  UtilsService.showNoConnectionError();
					      	  
                    }

				      	 });
           			}else{
           				this.performToggleSideMenu(side);
           				typeof(callback) != "undefined" ? callback() : null;
           			}

           		}else{
           			LoginService.showNoAuthError();
           		}
           		

           }

           this.performToggleSideMenu = function(side){
           		if(side == 'left')
      					$ionicSideMenuDelegate.toggleLeft();

      				if(side == 'right')
      					$ionicSideMenuDelegate.toggleRight();						    
           }


           this.blockSideMenu = function(){
           		$ionicSideMenuDelegate.canDragContent(false);
           }

           this.unBlockSideMenu = function(){
           		$ionicSideMenuDelegate.canDragContent(true);
           }
  });
