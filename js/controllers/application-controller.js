angular.module('fourPicsOneWord.controllers')

.controller('ApplicationController', function($state, $window, $scope, $http){

  var appCtrl = this;

  appCtrl.localStorage = $window.localStorage;
  appCtrl.answer = [];

  var stagesKeywords = ['nature', 'love', 'superhero', 'baby', 'apps', 'android', 'rivers', 'sky', 'games', 'painting'];

  String.prototype.shuffle = function () {
    var splitString = this.split(""),
        stringLength = splitString.length,
        stringObject = {};

    for(var i = 0; i < stringLength; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = splitString[i];
        splitString[i] = splitString[j];
        stringObject[i] = splitString[j];
        splitString[j] = tmp;
        stringObject[j] = tmp;
    }

    return stringObject;

  };


  var getTimes = function(num) {
    return new Array(num);   
  };

  var generateHints = function(searchKeyword){
    var possible = "abcdefghijklmnopqrstuvwxyz";
    var remaningItems = 10 - searchKeyword.length;

    for( var i=0; i < remaningItems; i++ ){
        searchKeyword += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    appCtrl.answerHints = searchKeyword.shuffle();
  };

  var fetchImages = function(keyword){
    $http.get('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=6a30fbb0f7def1137ed707a6d0f98f96&text="'+ keyword +'"&per_page=4&page=1&safe_search=1&extras=url_m&format=json&nojsoncallback=?')
    .success(function(imageData){
        appCtrl.images = imageData.photos.photo;
    });
  };

  var initQuiz = function(){
    var searchKeyword;
    var shuffledString;

    if($window.localStorage.stage){
       searchKeyword = stagesKeywords[JSON.parse($window.localStorage.stage) - 1];
       generateHints(searchKeyword);
       fetchImages(searchKeyword);
       appCtrl.answerLength = getTimes(searchKeyword.length);
    } else {
      $window.localStorage.stage = 1;
      searchKeyword = stagesKeywords[0];
      generateHints(searchKeyword);
      fetchImages(searchKeyword);
      appCtrl.answerLength = getTimes(searchKeyword.length);
    }
  };


  initQuiz();


  // appCtrl.getImageTimes = function(times){
  //   return new Array(times);
  // };
  
  // appCtrl.answers = [];
  // appCtrl.answerHints = generateWords();
  // var wordsIndex = appCtrl.answerHints.slice();
  
  // appCtrl.addAnswers = function(answer){
  //   var popItemIndex = appCtrl.answerHints.indexOf(answer);
  //   appCtrl.answerHints[popItemIndex] = '';
  //   if(appCtrl.answers.length){
  //     var pushItemIndex = appCtrl.answers.indexOf('');
  //     if(pushItemIndex === -1){
  //      appCtrl.answers.push(answer);
  //     } else {
  //       appCtrl.answers[pushItemIndex] = answer;
  //     }
  //   } else {
  //     appCtrl.answers.push(answer); 
  //   }
  // };

  // appCtrl.removeAnswers = function(answer){
  //   var popItemIndex  = appCtrl.answers.indexOf(answer);
  //   var pushItemIndex = wordsIndex.indexOf(answer);
  //   appCtrl.answers[popItemIndex] = '';
  //   appCtrl.answerHints[pushItemIndex] = answer;
  //   console.log(appCtrl.answerHints);
  // };

});