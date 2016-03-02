angular.module('app.match-service', ['starter'])
.service('MatchService',function($localStorage, UtilsService,
    AdressService,
    LoginService,
    MainService,
    RegistrationService
   ) {
          
          this.hideTopMenu = function(){
          	menuAPP = angular.element(document.querySelector('#menuAPP'));
          	menuAPP.addClass('hidden');
        	
        	matchesView = angular.element(document.querySelector('#matchesView'));
        	matchesView.css("margin-top", "-40px");
          }

          this.showTopMenu = function(){
          	 menuAPP = angular.element(document.querySelector('#menuAPP'));
          	 menuAPP.removeClass('hidden');
         
          }

          this.resizeHeight = function(){
          	heightClient = angular.element(document.querySelector('#matchesView'))[0].offsetHeight;
        	angular.element(document.querySelector('#matchesView')).css("min-height", (heightClient+40)+"px");
          }

          this.resizeHeightMatchCards = function(){
            heightClient = angular.element(document.querySelector('#matchesView'))[0].offsetHeight;
            angular.element(document.querySelector('#matchesView')).css("min-height", (heightClient+40)+"px");
          }
})

.service('SendMatchesToWS',function(
		$sce,$compile,$localStorage,$ionicViewService,
		$http,$rootScope,$state,$ionicLoading,$templateRequest,

		RegistrationService,LoginService,AdressService,UtilsService
        ) {
            
            var cardList = [];
            //envia o action para poder gerar o match !
            this.sendInvite = function(jsonOBJ,callback) { 
                paramsToSend = {
                    "ent_invitee_fbid" : jsonOBJ.id,
                    "ent_user_action" : jsonOBJ.actionclick,
                    "ent_user_fbid" : jsonOBJ.ent_fbid,
                    "ent_id_event" : jsonOBJ.ent_id_event,
                    "ent_nome_fb" : jsonOBJ.name,
                };
                    
                $http.get(AdressService.inviteaction,{params: paramsToSend}).success(function(resp) {
                    callback(resp);
                });
                    
            };

            this.sendMatches = function(arrayMatches,eventData,callback) { 
                    console.log(arrayMatches);
                    console.log(eventData);
                    console.log(this.getCards());
                                        

                    var fbid = RegistrationService.getUserFbID();
                    var cardInfo = this.getCardsInfo();

                    paramsToSend = {
                        "idevent" : eventData.id,
                        "ent_invitee_fbid" : fbid,
                        "offset" : cardInfo.offset,
                        "after" : cardInfo.after,
                        "before" : cardInfo.before

                    };


                    $registerMatches = new Array();
                    angular.forEach(arrayMatches, function(value, key) {
                        if(value.id != fbid){
                            if(value.actionclick == 1)
                             paramsToSend["id_"+value.id] = 1;
                            if(value.actionclick == 2)
                             paramsToSend["id_"+value.id] = 0;
                        }
                    });

                    angularService = this;
                    $http.get($localStorage.registermatchespartty,{params: paramsToSend}).success(function(resp) {

                        var matchFound = false;
                        /*
                        angular.forEach($rootScope.invitedActionData, function(value, key) {
                            if(value.id != $localStorage.usuarioData.ent_fbid){
                                //alert("##"+value.errNum);
                                if(value.errNum == 55){
                                    matchFound = value;
                                    
                                }
                            }
                        });
                        delete $rootScope.invitedActionData;
                        
                        console.log('matchFound ',matchFound);

                        if(matchFound){
                                delete matchFound;
                                $rootScope.newMatchFoundData = matchFound;
                                $ionicViewService.nextViewOptions({
                                  disableBack: true
                                });
                                alert("Voce recebeu um match.");
                                $state.go("app.newmatchesfound");

                            
                        }else{
                            angularService.loadMatches($scope);
                        }
                        */
                        callback({error : true});
                    });                    
            };

            this.loadMatches = function($scope,callback){
            	
                self = this;

                var postData = {
                	"sessfb" : LoginService.getToken(),
                	"sess_fb": LoginService.getToken(),
                	"ent_user_fbid": RegistrationService.getUserFbID(),
                	"idevent" : $scope.eventinfoJSON.id
                };

                $http.get(AdressService.findmatchespartty,{params: postData}).then(function(resp) {
                        if(resp.data.data.length == 0){
                            return callback({error: true});
                        }

                        var element = angular.element(document.querySelector('#includeCards'));
                        var templateUrl = $sce.getTrustedResourceUrl('templates/matches/matches_cards.html');

                        self.cleanCards();
                        resp.data.data = self.removeMeFromCards(resp.data.data,RegistrationService.getUserFbID());                   
                        self.addArrayCards(resp);

                        $templateRequest(templateUrl).then(function(template) {
                            $compile(element.html(template).contents())($scope);
                            callback(resp);
                        
                        }, function(err) {
							callback(err);                                
                        });
                        
                });
            };

            this.removeMeFromCards = function(dados,fbid){
                var newArray = [];
                
                angular.forEach(dados, function(value, key) {
                    if(value.id != fbid)
                        newArray.push(value);
                });

                return newArray;


            }

            this.addArrayCards = function(data){
                cardList = data;
            };

            this.cleanCards = function(){
                cardList = [];
            };

            this.removeCards = function(index){
                cardList.splice(index, 1);
            };

            this.getCard = function(index){
                return cardList[index];
            };

            this.getCards = function(){
                return cardList.data.data;
            }

            this.getCardsInfo = function(){
                return cardList.data;
            }
            
    });