angular.module('fourPicsOneWord.controllers', []);

angular.module('fourPicsOneWord', ['ui.router', 'fourPicsOneWord.controllers'])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/index.html',
      controller: 'ApplicationController as appCtrl'
    })

    .state('app.home', {
      url: '/',
      views : {
        'main-app': {
          templateUrl: 'templates/home.html'
        }
      }
    });

});