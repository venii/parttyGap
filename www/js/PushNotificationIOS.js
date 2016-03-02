function onNotificationAPN (event) {
    console.log(event);
    
    if(event.nt == 2){
            //alert(event.alert);


               setTimeout(function(){
                    scopeExternal =  angular.element(document.body).scope();
                    injectorExternal = angular.element(document.body).injector();
                    injectorLocalStorage = injectorExternal.get("$localStorage");

                    
                    //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                    ChatMessageService = injectorExternal.get("ChatMessageService");

                    console.log("service chatmsgse");
                    console.log(ChatMessageService);

                    ionicViewLegacy = injectorExternal.get("$ionicViewService");
                    ionicViewLegacy.nextViewOptions({
                        disableBack: true
                      });
                   

                    ChatMessageService.addMSGtoList(event.alert,injectorLocalStorage.usuarioData.ent_fbid,injectorLocalStorage.usuarioData.ent_first_name, event.sFid,event.sname,0);
                    //ChatMessageService.addMSGtoList($rootScope.chatUsrData.lastMSG,0);
                    ChatMessageService.loadLegacyChat(event.sFid,event.sname,null,event.alert);
                    

                    //stage = injectorExternal.get("$stage");
                    //state.go('app.chat',{idfb : e.payload.sfid});
                    //injectorState.go("app.newmatchesfound");
                    //alert("BACKGROUND: "+ e.payload.sname);
                    scopeExternal.$apply();
                    //alert("BACKGROUND: "+ e.payload.sname);
                },2000);

    }else if(event.nt == 0){
            //teste
           // alert("NT 0");
            scopeExternal =  angular.element(document.body).scope();
            injectorExternal = angular.element(document.body).injector();
            
            injectorExternalGET = injectorExternal.get("$location");
            injectorLocalStorage = injectorExternal.get("$localStorage");
            

            ionicViewLegacy = injectorExternal.get("$ionicViewService");
            ionicViewLegacy.nextViewOptions({
                disableBack: true
              });
           //injectorState = injectorExternal.get("$state");
            
            injectorROOTSCOPE = injectorExternal.get("$rootScope");
            
            dataReceive = {};

            


            console.log(injectorLocalStorage);

            dataReceive.sFid = event.sFid;
            dataReceive.uName = event.sname;
            dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
            dataReceive.errMsg = event.alert;
            dataReceive.pPic = null;
            dataReceive.urlProfilepic = null;
            
           
            injectorROOTSCOPE.newMatchFoundData = dataReceive;

            setTimeout(function(){
                navigator.notification.alert(event.alert);

                //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                injectorExternalGET.path("/app/newmatchesfound_receive");
                //injectorState.go("app.newmatchesfound");
                scopeExternal.$apply();
            },5000);
            
    }else if(event.nt == 3){
            //MATCH FOUND
                
            scopeExternal =  angular.element(document.body).scope();
            injectorExternal = angular.element(document.body).injector();
            
            injectorExternalGET = injectorExternal.get("$location");
            injectorLocalStorage = injectorExternal.get("$localStorage");
            

            ionicViewLegacy = injectorExternal.get("$ionicViewService");
            ionicViewLegacy.nextViewOptions({
                disableBack: true
              });
           //injectorState = injectorExternal.get("$state");
            
            injectorROOTSCOPE = injectorExternal.get("$rootScope");
            
            dataReceive = {};

            


            console.log(injectorLocalStorage);

            dataReceive.sFid = event.sFid;
            dataReceive.uName = event.sname;
            dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
            dataReceive.errMsg = event.alert;
            dataReceive.pPic = null;
            dataReceive.urlProfilepic = null;
            
           
            injectorROOTSCOPE.newMatchFoundData = dataReceive;

            setTimeout(function(){
                navigator.notification.alert(event.alert);

                //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                injectorExternalGET.path("/app/newmatchesfound_receive");
                //injectorState.go("app.newmatchesfound");
                scopeExternal.$apply();
            },5000);
                
            
    }
    //}


    /*
    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }*/
}


function tokenHandler (result) {    
    $scope = angular.element(document.body).scope();
    $injector = angular.element(document.body).injector();
    
    MainService = $injector.get("MainService");
    MainService.saveDeviceToken(result);
    
    $state = $injector.get("$state");
    $state.go("app.registration");
}