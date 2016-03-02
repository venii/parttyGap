angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function (
                $state,$stateParams,$scope,
                
                MatchService,SendMatchesToWS,LoginService,
                RegistrationService,MenuService,UtilsService) {
        
        MenuService.blockSideMenu(); 
      
        var cards = SendMatchesToWS.getCards();
        $scope.cards = cards;
        $scope.cardrest = cards.length-1;
        $scope.eventinfoJSON = $stateParams.dataEvent;

        $scope.clickLeft = function(){       
            index = $scope.cardrest;
            
            $scope.cards[index]['animateclass'] = 'moveleft';
            $scope.cards[index]['actionclick'] = 1;
            $scope.cards[index]['ent_fbid'] = RegistrationService.getUserFbID();
            $scope.cards[index]['ent_id_event'] = '';

            SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
                if($scope.cardrest < 0){
                    SendMatchesToWS.sendMatches($scope.cards,$scope.eventinfoJSON,function(resp){
                        //PROCESSA GO DEPOIS DE ENVIAR MATCHES

                        //ERROR CARREGA MAIS MATCHES
                        if(resp.error){
                            UtilsService.openDialogMsg('Procurando matches...');
                
                            SendMatchesToWS.loadMatches($scope.parent,function(resp){
                                UtilsService.closeDialogMsg();
                                    
                                if(resp.error){
                                    alert("Não há matches");
                                    $state.go('app.events');
                                }

                            });
                        }else{
                            //CARREGA MATCH
                        }
                            
                    });
                }
             });
            $scope.cardrest--;
        }

        $scope.clickRight = function(){    
            index = $scope.cardrest;
            
            $scope.cards[index]['animateclass'] = 'moveright';
            $scope.cards[index]['actionclick'] = 2;
            $scope.cards[index]['ent_fbid'] = RegistrationService.getUserFbID();
            $scope.cards[index]['ent_id_event'] = '';
              
            SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
               if($scope.cardrest < 0){
                  SendMatchesToWS.sendMatches($scope.cards,$scope.eventinfoJSON,function(resp){
                    //PROCESSA GO DEPOIS DE ENVIAR MATCHES
                    
                    //ERROR CARREGA MAIS MATCHES
                    if(resp.error){
                            UtilsService.openDialogMsg('Procurando matches...');
                
                            SendMatchesToWS.loadMatches($scope.parent,function(resp){
                                UtilsService.closeDialogMsg();
                                    
                                if(resp.error){
                                    alert("Não há matches");
                                    $state.go('app.events');
                                }

                            });
                    }else{
                        //CARREGA MATCH
                    }

                  });
               }    
            });
            $scope.cardrest--;
                  
        }

})