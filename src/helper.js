import Vue from 'vue'

/*********************************************
 * global methods for components Vue.js
 *********************************************/
Vue.prototype.baseUrl = window.baseUrl;
Vue.prototype.latlong = null; // = latitude, longitude

Vue.prototype.isEmpty = function (variable) {
    return (typeof(variable) != 'undefined' && variable != '' && variable != null) ? false : true;
};
Vue.prototype.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};
Vue.prototype.getErrorMessage = function (error) {
    let msgInit = 'Algo deu errado. Tente novamente!'
    let msg = msgInit;
    try {
        //console.log(error.config);
        if (error.response) {
            if ( !Vue.prototype.isEmpty(error.response.data.message) )
                msg = error.response.data.message;
            else if ( !Vue.prototype.isEmpty(error.response.data.error.message) )
                msg = error.response.data.error.message;

        } else if (error.request) {
            if ( !Vue.prototype.isEmpty(error.request.message) )
                msg = error.request.message;
            else if ( !Vue.prototype.isEmpty(error.request.error.message) )
                msg = error.request.error.message;

        } else if (error.message) {
            msg = error.message;
        }
    } catch (e) {}

    if ( Vue.prototype.isEmpty(msg) )
        msg = msgInit;

    return msg;
};
Vue.prototype.geoFindMe = function() {
    if (!navigator.geolocation){
        console.log("Geolocation is not supported by your browser");
        return null;
    }
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        Vue.prototype.latlong = latitude + ', ' + longitude;
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
};