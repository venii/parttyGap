angular.module('app.chat-service', ['starter','app.utils-service','app.login-service'])
.service('FriendsService',function($sce,$compile,
                                    $localStorage,$ionicViewService,
                                    $http,$rootScope,$state,
                                    $ionicLoading,$templateRequest,
                                    $ionicSideMenuDelegate,ChatMessageService) {
           
            this.loadFriendList = function($scope){

              $ionicLoading.show({
                  template: 'Carregando contatos...'
              });
            
                setTimeout(function(){
                    var postData = {
                      "sessfb" : $localStorage.token,
                      "sess_fb": $localStorage.token,
                      "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                      
                     

                    };

                  
                    $http.get($localStorage.getprofilematches,{params: postData}).then(function(resp) {
                        console.log(resp);

                        var element = angular.element(document.querySelector('#friendlistload'));
                        


                        var templateUrl = $sce.getTrustedResourceUrl('templates/chat/friendlist.html');
                        
                        console.log(templateUrl);

                        $templateRequest(templateUrl).then(function(template) {
                            // template is the HTML template as a string
                           // console.log(template);
                            // Let's put it into an HTML element and parse any directives and expressions
                            // in the code. (Note: This is just an example, modifying the DOM from within
                            // a controller is considered bad style.)
                            if(resp.data.errNum == 50){
                              $scope.friendlist = resp.data.likes;
                             
                              angular.forEach($scope.friendlist, function(value, key) {
                                
                                console.log('friendlist: ' + value.fbId);
                                
                                ChatMessageService.getLastMsg(value.fbId,1,function(xhr){
                                  //alert(xhr[0].msg);
                                  console.log(xhr);
                                  $scope.$apply(function(){
                                    value.lastmsgloaded = xhr[0].msg;
                                  });
                                });

                              });

                            }

                            $compile(element.html(template).contents())($scope);

                        }, function(err) {
                            $ionicViewService.nextViewOptions({
                              disableBack: true
                            });
                            //alert("Não há matches.")
                           $ionicSideMenuDelegate.toggleRight();
                            
                            // An error has occurred
                        });

                        $ionicLoading.hide();
                    });
                    
                },100);
             
            };

      });