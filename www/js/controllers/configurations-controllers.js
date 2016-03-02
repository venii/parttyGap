angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$http,$ionicLoading) {
	
  
	//init padrao das var (sexo, usar usuarios do partty)
	$scope.userregistered = 0;
	$scope.gender = 1;

	$scope.updateCheckboxUserRegistrados = function(parrtyusers){
		setTimeout(function(){
			//alert("@"+ws);
			//console.log(homen +"@"+$scope.homen);parrtyusers
			$scope.userregistered = (parrtyusers === true ? 0: 1 );
			//alert("changed");
		},100);
	};

	$scope.updateRadioGender = function(gender){
		setTimeout(function(){
			//console.log(homen +"@"+$scope.homen);
			$scope.gender = gender;
			//alert("changed");
		},100);
	};



	$scope.updateCheckboxHomen = function(homen){
		setTimeout(function(){
			console.log(homen +"@"+$scope.homen);
			$scope.homen = (homen === true ? false : true);
			//alert("changed");
		},100);
	};

	$scope.updateCheckboxMulher = function(mulher){
		setTimeout(function(){
			console.log(mulher +"@"+$scope.mulher);
			$scope.mulher = (mulher === true ? false : true);
			//alert("changed");
		},100);
	};
    

   $scope.updatepreferences = function(){
  	 var procurandopor = '3';
  	//update dados de preferencia via ws

  	
	
	if($scope.homen === true && $scope.mulher === false){
			//homen
  			procurandopor = 1;
  	
  	}
  	
  	if($scope.homen === false && $scope.mulher === true){
  			//mulher
  			procurandopor = 2;
  	}
  	

  	
  		

  	var postData = {
                
	    "sess_fb": $localStorage.token,
	    "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
	    "ent_sex" : $scope.gender,
	    "iam" : $scope.gender,

	    "ent_pref_lower_age" : $scope.upperage,
	    "ent_pref_upper_age" : $scope.lowerage,
	    "ent_pref_sex" : procurandopor,
	    "ent_pref_radius" : 0,
		
		"user_filter_register"  : $scope.userregistered,  
	    "user_use_age" : 0
	    

	  };

	  console.log(postData);

	  $ionicLoading.show({
          template: 'Atualizando preferencias...'
      });

	  $http.get($localStorage.updatepreferences,{params: postData}).then(function(resp) {
			console.log(resp);
			$ionicLoading.hide();
	  });

  	  
  };

   




  var postData = {
                
    "sess_fb": $localStorage.token,
    "ent_user_fbid": $localStorage.usuarioData.ent_fbid 
  };
  
  $ionicLoading.show({
          template: 'Carregando preferencias...'
      });

  $http.get($localStorage.getpreferences,{params: postData}).then(function(resp) {
  		//carrega dados do ws
  		$scope.upperage = resp.data.prUAge;
  		$scope.lowerage = resp.data.prLAge;

  		if(resp.data.sex == '1')
  			$scope.iam = 'Homen';
  		else
  			$scope.iam = 'Mulher';


  		if(resp.data.prSex == '1'){
  			$scope.homen = true;
  			$scope.mulher = false;
  		}
  		
  		if(resp.data.prSex == '2'){
  			$scope.mulher = true;
  			$scope.homen = false;
  		}
  		
  		if(resp.data.prSex == '3'){
  			$scope.homen = true;
  			$scope.mulher = true;
  		}

  		if(resp.data.use_registered == '1'){
  			$scope.parrtyusers = true;
  		}else{
  			$scope.parrtyusers = false;
  		}


  		$ionicLoading.hide();

  });


 
});