angular.module('fourPicsOneWord.controllers')

.controller('ApplicationController', function($state, $window, $scope, $http){

  var appCtrl = this;

  appCtrl.localStorage = $window.localStorage;
  appCtrl.answer = [];
  
  var answerIndex = {};

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


  var initAnswerIndex = function(indexLength){
    for(var i = 0; i < indexLength; i++){
      answerIndex[i] = '';
    }
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

  appCtrl.addAnswers = function(key, answer){
    var pushItemIndex = appCtrl.answer.indexOf('');

    if(pushItemIndex === -1){
     appCtrl.answer.push(answer);
     var answerKeyIndex = appCtrl.answer.length - 1;
     answerIndex[answerKeyIndex] = key;
    } else {
      appCtrl.answer[pushItemIndex] = answer;
      answerIndex[pushItemIndex] = key;
    }
    appCtrl.answerHints[key] = '';
  };

  appCtrl.removeAnswers = function(index, answer){
    var hintsKey = answerIndex[index];
    appCtrl.answerHints[hintsKey] = answer;
    appCtrl.answer[index] = '';
  };

  var initQuiz = function(){
    var searchKeyword;
    var shuffledString;

    if($window.localStorage.stage){
       searchKeyword = stagesKeywords[JSON.parse($window.localStorage.stage) - 1];
       generateHints(searchKeyword);
       fetchImages(searchKeyword);
       initAnswerIndex(searchKeyword.length);
       appCtrl.answerLength = getTimes(searchKeyword.length);
    } else {
      $window.localStorage.stage = 1;
      searchKeyword = stagesKeywords[0];
      generateHints(searchKeyword);
      fetchImages(searchKeyword);
      initAnswerIndex(searchKeyword.length);
      appCtrl.answerLength = getTimes(searchKeyword.length);
    }
  };


  initQuiz();

});