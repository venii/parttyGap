function onNotificationGCM(e) { 
    
    $scope = angular.element(document.body).scope();
    $injector = angular.element(document.body).injector();
                    

    switch(e.event){ 

        case 'registered':

            if (e.regid.length > 0){ 
                
                    
                    MainService = $injector.get("MainService");
                    MainService.saveDeviceToken(e.regid);
                    
                    $state = $injector.get("$state");
                    $state.go("app.registration");
                          
            } 
        break;  

        case 'message': 
       
           
           if (e.foreground){ 

                // When the app is running foreground. 
                //console.log(e.payload);
                
            if(e.payload.action == 2){
                //alert(e.payload.payload);
                
                scopeExternal =  angular.element(document.body).scope();
                injectorExternal = angular.element(document.body).injector();

                injectorLocalStorage = injectorExternal.get("$localStorage");

                ChatMessageService = injectorExternal.get("ChatMessageService");
                ChatMessageService.addMSGtoList(e.payload.payload,injectorLocalStorage.usuarioData.ent_fbid,injectorLocalStorage.usuarioData.ent_first_name, e.payload.sfid,e.payload.sname,0);
                scopeExternal.$apply();
                
            }else if(e.payload.action == 3){
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

                dataReceive.sFid = e.payload.sfid;
                dataReceive.uName = e.payload.sname;
                dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
                dataReceive.errMsg = e.payload.payload;
                dataReceive.pPic = null;
                dataReceive.urlProfilepic = null;
                
               
                injectorROOTSCOPE.newMatchFoundData = dataReceive;

                setTimeout(function(){
                    navigator.notification.alert(e.payload.payload);

                    //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                    injectorExternalGET.path("/app/newmatchesfound_receive");
                    //injectorState.go("app.newmatchesfound");
                    scopeExternal.$apply();
                },5000);
            }
        }else{
            
            if(e.payload.action == 2){
                 

                setTimeout(function(){
                    scopeExternal =  angular.element(document.body).scope();
                    injectorExternal = angular.element(document.body).injector();
                    injectorLocalStorage = injectorExternal.get("$localStorage");

                    
                    //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                    ChatMessageService = injectorExternal.get("ChatMessageService");

                    console.log("service chatmsgse");
                    console.log(ChatMessageService);

                    
                   

                    ChatMessageService.addMSGtoList(e.payload.payload,injectorLocalStorage.usuarioData.ent_fbid,injectorLocalStorage.usuarioData.ent_first_name, e.payload.sfid,e.payload.sname,0);
                    //ChatMessageService.addMSGtoList($rootScope.chatUsrData.lastMSG,0);
                    ChatMessageService.loadLegacyChat(e.payload.sfid,e.payload.sname,null,e.payload.payload);
                    

                    //stage = injectorExternal.get("$stage");
                    //state.go('app.chat',{idfb : e.payload.sfid});
                    //injectorState.go("app.newmatchesfound");
                    //alert("BACKGROUND: "+ e.payload.sname);
                    scopeExternal.$apply();
                    //alert("BACKGROUND: "+ e.payload.sname);
                },2000);

            }else if(e.payload.action == 3){
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

                dataReceive.sFid = e.payload.sfid;
                dataReceive.uName = e.payload.sname;
                dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
                dataReceive.errMsg = e.payload.payload;
                dataReceive.pPic = null;
                dataReceive.urlProfilepic = null;
                
               
                injectorROOTSCOPE.newMatchFoundData = dataReceive;

                setTimeout(function(){
                    navigator.notification.alert(e.payload.payload);

                    //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                    injectorExternalGET.path("/app/newmatchesfound_receive");
                    //injectorState.go("app.newmatchesfound");
                    scopeExternal.$apply();
                },5000);
            }
        }
        break;   

        case 'error': 
            alert('Error: ' + e.msg); 

        break;    

        default: 
            alert('An unknown event was received'); 
        break; 
    } 
}