'use strict';

angular.module('myApp', ['reCAPTCHA', 'ngResource'])

    .config(function (reCAPTCHAProvider) {

        //set Google API Public Key
        //Local
        reCAPTCHAProvider.setPublicKey('6LdUu_cSAAAAAJT-SnxZm_EL_NwazPuCwgfb70Wo');

        // optional: gets passed into the Recaptcha.create call
        reCAPTCHAProvider.setOptions({
            theme: 'blackglass'
        });
    })
    .factory('Recaptcha', function ($resource) {

        return $resource(
            '/email/send',
            {id: '@id'},
            {
                send: {
                    url: '/email/send',
                    method: 'POST'
                }
            }
        )
    })
    .controller('RecaptchaCtrl', ['$scope', 'Recaptcha', function ($scope, Recaptcha) {

        $scope.message = '';

        $scope.email = {};
        $scope.email.to = 'superman@justiceleague.com';
        $scope.submit = function(email){

            console.log('email: ', email)
            console.log('Recaptcha: ', Recaptcha)
            Recaptcha.send(email).$promise
                .then(function(resp){
                    console.log('SENT>>>', resp);
                });
        }


    }]);