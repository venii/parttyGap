angular.module('chat.controllers', ['starter'])

.controller('ChatCtrl', function($scope,ChatMessageService,$ionicScrollDelegate, $stateParams,$rootScope,OpenFB,$localStorage,$cordovaToast,$ionicLoading,$ionicViewService,$state,parttyUtils) {


   // heightClient = angular.element(document.querySelector('#chatView'))[0].offsetHeight;
    //angular.element(document.querySelector('#msnBox')).css("top", (heightClient-100)+"px");
    

    $scope.chatNameUsr = $rootScope.chatUsrData.name;
    

   
    //

    $rootScope.logset = new Array();

    //carrega dados
    
      
            
    

    setTimeout(function(){
      ChatMessageService.loadHistoryMSG($rootScope.chatUsrData.idfb,function(arrayProcessed){
 
          for(ap in arrayProcessed){
            
            $rootScope.$apply(function(){
             // alert("apply ME " + arrayProcessed[ap].side);
              $rootScope.logset.push({ "msg" : arrayProcessed[ap].msg , "data" : arrayProcessed[ap].data_msg, "side": arrayProcessed[ap].side});
              //revisa esta parte do code
              $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
              
            });
          }
          


         
      },1000);
    });



    //if($rootScope.chatUsrData.lastMSG != undefined){
    // ChatMessageService.addMSGtoList($rootScope.chatUsrData.lastMSG,0);
   // }

  	$scope.sendMessage = function(){
  		var scopo = this;
  		var msn = scopo.msnboxtext;

  		scopo.msnboxtext = "";

  		setTimeout(function(){
	  		ChatMessageService.sendMessageWS(scopo,msn,$rootScope.chatUsrData.idfb);
	  		
  		},100);


  	};
}).service('ChatMessageService',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest,$ionicSideMenuDelegate,$ionicScrollDelegate) {
           /*sqlite*/
           this.initDB = function(){
                try{
                  var db = window.sqlitePlugin.openDatabase({name: "dbapp_partty.db", createFromLocation: 1});

                  db.transaction(function(tx) {
                    //tx.executeSql('DROP TABLE IF EXISTS test_table');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS chatlog (id_chatlog INTEGER PRIMARY KEY NOT NULL, fbID_receiver BIGINT (30), fbID_sender BIGINT (30), me INTEGER(1), msg VARCHAR (255), data_msg TIMESTAMP);');

                    
                   
                  });
                  return db;
                }catch(err){
                    alert("err dbload "+err.code);
                    //alert("ERROR DB LOAD" );
                }
                return null;
           };
           /*sqlite*/
           this.insertMSG = function(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName,me){
              var db = this.initDB();

              if(db == null)
                return;
              db.transaction(function(tx) {
                  tx.executeSql("INSERT INTO chatlog (fbID_receiver, fbID_sender, msg , data_msg,me) VALUES (?,?,?,?,?);", [fbreceiverID, fbsenderID,msg,new Date().toLocaleString(),me], 
                        function(tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                        });   
              });
           };
           /*sqlite*/
           this.loadHistoryMSG = function(idfb,callback){
              var db = this.initDB();
              if(db == null)
                return;

              db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM chatlog WHERE (fbID_receiver = '"+idfb+"')  ;", [],function(tx, res) {

                    console.log("Consulta  chatlog " + res.rows.length + " -- should be 1");
                    var len = res.rows.length;
                    var arrayRetorno = new Array();
                    if(len > 0){
                      
                      console.log("Consulta chatlog msg start");
                      for (var i = 0; i < len; i++) {
                        console.log("Consulta chatlog msg" + res.rows.item(i).msg);
                        arrayRetorno.push({"msg" : res.rows.item(i).msg , "data" : res.rows.item(i).data_msg, "side": res.rows.item(i).me});
                      }
                      console.log("tamanho array logs "+arrayRetorno.length);
                    }
                    callback(arrayRetorno); //devolve um novo array
                      
                

                });
              });
              

              
           };
           /*sqlite*/
          this.getLastMsg = function(idfb,num,callback){
              var db = this.initDB();
              if(db == null)
                return;

              db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM chatlog WHERE (fbID_receiver = '"+idfb+"') ORDER BY id_chatlog DESC LIMIT "+num+" ;", [],function(tx, res) {

                    console.log("Consulta  chatlog " + res.rows.length + " -- should be 1");
                    var len = res.rows.length;
                    var arrayRetorno = new Array();
                    if(len > 0){
                      
                      console.log("Consulta last msg start");
                      for (var i = 0; i < len; i++) {
                        console.log("Consulta chatlog msg" + res.rows.item(i).msg);
                        arrayRetorno.push({"msg" : res.rows.item(i).msg , "data" : res.rows.item(i).data_msg, "side": res.rows.item(i).me});
                      }
                      console.log("tamanho array logs "+arrayRetorno.length);
                    }
                    callback(arrayRetorno); //devolve um novo array
                      
                

                });
              });
              

              
           };


            /*sqlite*/
           this.sendMessageWS = function($scope,msg,idtosend){
           		
           		var postData = {
                  "sessfb" : $localStorage.token,
                  "sess_fb": $localStorage.token,
                  "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                  "ent_user_recever_fbid": idtosend ,
                  "ent_message" : msg,
                  

                };
                var self = this;
                $http.get($localStorage.sendmessage,{params: postData}).then(function(resp) {
                	console.log(resp);
                  self.addMSGtoList(msg,$localStorage.usuarioData.ent_fbid,"",idtosend,"",1);
                });
           };
           //USAR QUANDO ESTIVER NO onNotificationGCM ou apns
           this.loadLegacyChat = function(idfbp,name,pic,lastmsg){
              delete $rootScope.chatUsrData;
              $rootScope.chatUsrData = {"idfb" : idfbp, "name" : name ,"pic" : pic, "lastMSG": lastmsg};


              $ionicViewService.nextViewOptions({
                  disableBack: true
                });
              $state.go('app.chat',{idfb : idfbp});
           };

           this.addMSGtoList = function(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName,me){
                if($rootScope.logset == undefined)
                  $rootScope.logset = new Array();


                this.insertMSG(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName,me);
                
                $rootScope.logset.push({"msg" : msg, "data" : new Date().toLocaleString(), "side": me});

                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
           }
           

      });
