'use strict';

angular.module('myApp', ['reCAPTCHA'])

.config(function(reCAPTCHAProvider){

    //set Google API Public Key
    //Local
    reCAPTCHAProvider.setPublicKey('6LdUu_cSAAAAAJT-SnxZm_EL_NwazPuCwgfb70Wo');

    // optional: gets passed into the Recaptcha.create call
    reCAPTCHAProvider.setOptions({
        theme: 'blackglass'
    });
})

.controller('RecaptchaCtrl', function ($scope) {

        $scope.message = '';

        $scope.email = {};
        $scope.email.to = 'superman@justiceleague.com';
    });