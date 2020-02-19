nsaApp
    .service('RestService', ['$http','BASEPATH', 'APP',
    function ($http, BASEPATH, APP) {
        var _allusers = function () {
            return $http.get(BASEPATH + 'users/all?application=' + APP);
        };
        var _totalusers = function () {
            return $http.get(BASEPATH + 'users/total');
        };
        var _allgroups = function () {
            return $http.get(BASEPATH + 'groups/all?application=' + APP);
        };
        var _allroles = function () {
            return $http.get(BASEPATH + 'roles/all?application=' + APP);
        };
        var _allunits = function () {
            return $http.get(BASEPATH + 'organizationunit/all?application=' + APP);
        };
        var _allapps = function () {
            return $http.get(BASEPATH + 'application/all');
        };
        var _createuser = function (myparams) {
            var params ={
                "user": myparams
            };
            return $http.post(BASEPATH + 'users/new/', params);
        };
        var _createuserapp = function (myparams) {
            var params ={
                "application": APP,
                "user": myparams
            };
            return $http.post(BASEPATH + 'users/application/new/', params);
        };
        var _userdetails = function (username) {
            return $http.get(BASEPATH + 'users/details/?application=' + APP + '&username=' + username);
        };
        var _userprofile = function (username, appsearch) {
            return $http.get(BASEPATH + 'users/profile/?application=' + appsearch + '&username=' + username);
        };
        var _updateuser = function (myparams) {
            var params ={
                "user": myparams
            };
            return $http.post(BASEPATH + 'users/update/', params);
        };
        var _updateuserapp = function (myparams) {
            var params ={
                "application": APP,
                "user": myparams
            };
            return $http.post(BASEPATH + 'users/application/update/', params);
        };
        var _enableuser = function(username){
            return $http.get(BASEPATH + 'users/application/enable/?application=' + APP + '&username=' + username);
        };
        var _creategroup = function (myparams) {
            var params ={
                "application": APP,
                "group": myparams
            };
            return $http.post(BASEPATH + 'groups/new/', params);
        };
        var _createunit = function (myparams) {
            var params ={
                "application": APP,
                "organizationUnit": myparams
            };
            return $http.post(BASEPATH + 'organizationunit/new/', params);
        };
        var _createapp = function (myparams) {
            var params ={
                "application": myparams
            };
            return $http.post(BASEPATH + 'application/new/', params);
        };
        var _updategroup = function (myparams) {
            var params ={
                "application": APP,
                "group": myparams
            };
            return $http.post(BASEPATH + 'groups/update/', params);
        };
        var _updateapp = function (myparams) {
            var params ={
                "application": myparams
            };
            return $http.post(BASEPATH + 'application/update/', params);
        };
        var _updateunit = function (myparams) {
            var params ={
                "application": APP,
                "organizationUnit": myparams
            };
            return $http.post(BASEPATH + 'organizationunit/update/', params);
        };
        var _unsetgroupuser = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "users": myparams
            };
            return $http.post(BASEPATH + 'groups/users/unset', params);
        };
        var _setgroupuser = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "users": myparams
            };
            return $http.post(BASEPATH + 'groups/users/set', params);
        };
        var _setappuser = function (name, myparams) {
            var params ={
                "application": name,
                "users": myparams
            };
            return $http.post(BASEPATH + 'application/users/set', params);
        };
        var _unsetappuser = function (name, myparams) {
            var params ={
                "application": name,
                "users": myparams
            };
            return $http.post(BASEPATH + 'application/users/unset', params);
        };
        var _unsetunituser = function (id, myparams) {
            var params ={
                "application": APP,
                "name": id,
                "users": myparams
            };
            return $http.post(BASEPATH + 'organizationunit/users/unset', params);
        };
        var _setunituser = function (id, myparams) {
            var params ={
                "application": APP,
                "name": id,
                "users": myparams
            };
            return $http.post(BASEPATH + 'organizationunit/users/set', params);
        };
        var _replacegroupusers = function (name, myparams) {
            return $http.post(BASEPATH + 'groups/users/replace?application=' + APP + '&name=' + name, myparams);
        };
        var _groupmembers = function (group) {
            return $http.get(BASEPATH + 'groups/members/?application=' + APP + '&name=' + group);
        };
        var _groupdetails = function (group) {
            return $http.get(BASEPATH + 'groups/details/?application=' + APP + '&name=' + group);
        };
        var _unitdetails = function (unit) {
            return $http.get(BASEPATH + 'organizationunit/details/?application=' + APP + '&id=' + unit);
        };
        var _roledetails = function (role) {
            return $http.get(BASEPATH + 'roles/details/?application=' + APP + '&name=' + role);
        };
        var _appdetails = function (name) {
            return $http.get(BASEPATH + 'application/details?name=' + name);
        };
        var _rolemembers = function (role) {
            return $http.get(BASEPATH + 'roles/members/?application=' + APP + '&name=' + role);
        };
        var _unsetroleuser = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "roles": myparams
            };
            return $http.post(BASEPATH + 'users/roles/unset', params);
        };
        var _setroleuser = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "roles": myparams
            };
            return $http.post(BASEPATH + 'users/roles/set', params);
        };
        var _setusersrole = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "users": myparams
            };
            return $http.post(BASEPATH + 'roles/users/set', params);
        };
        var _unsetusersrole = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "users": myparams
            };
            return $http.post(BASEPATH + 'roles/users/unset', params);
        };
        var _unsetrolegroup = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "roles": myparams
            };
            return $http.post(BASEPATH + 'groups/roles/unset', params);
        };
        var _setrolegroup = function (name, myparams) {
            var params ={
                "application": APP,
                "name": name,
                "roles": myparams
            };
            return $http.post(BASEPATH + 'groups/roles/set', params);
        };
        var _dropdowngroups = function () {
            return $http.get(BASEPATH + 'groups/dropdown/?application=' + APP);
        };
        var _dropdownunits = function () {
            return $http.get(BASEPATH + 'organizationunit/dropdown/?application=' + APP);
        };
        var _createrole = function (myparams) {
            var params ={
                "application": APP,
                "role": myparams
            };
            return $http.post(BASEPATH + 'roles/new/', params);
        };
        var _updaterole = function (myparams) {
            var params ={
                "application": APP,
                "role": myparams
            };
            return $http.post(BASEPATH + 'roles/update/', params);
        };
        var _setdefault = function (appSend, type, element, username, code) {
            var params ={
                "application": appSend,
                "setUnsetDefault": code,
                "username": username
            };

            if(type === 'organizationalUnit'){
                params.organizationalUnit = element;
            } else if(type === 'role'){
                params.role = element;
            }
            return $http.post(BASEPATH + 'application/user/default/set', params);
        };
        return {
            allusers:_allusers,
            totalusers:_totalusers,
            allgroups:_allgroups,
            allroles:_allroles,
            allunits: _allunits,
            allapps: _allapps,
            createuser:_createuser,
            createuserapp:_createuserapp,
            updateuser:_updateuser,
            updateuserapp:_updateuserapp,
            enableuser: _enableuser,
            userdetails:_userdetails,
            creategroup: _creategroup,
            createunit: _createunit,
            createapp: _createapp,
            updategroup: _updategroup,
            updateapp:_updateapp,
            updateunit: _updateunit,
            unsetgroupuser: _unsetgroupuser,
            setgroupuser: _setgroupuser,
            setappuser: _setappuser,
            unsetappuser:_unsetappuser,
            unsetunituser: _unsetunituser,
            setunituser: _setunituser,
            replacegroupusers: _replacegroupusers,
            groupmembers: _groupmembers,
            groupdetails: _groupdetails,
            unitdetails: _unitdetails,
            roledetails: _roledetails,
            appdetails: _appdetails,
            rolemembers: _rolemembers,
            unsetroleuser: _unsetroleuser,
            setroleuser: _setroleuser,
            setusersrole: _setusersrole,
            unsetusersrole: _unsetusersrole,
            unsetrolegroup: _unsetrolegroup,
            setrolegroup: _setrolegroup,
            dropdowngroups: _dropdowngroups,
            dropdownunits: _dropdownunits,
            createrole: _createrole,
            updaterole: _updaterole,
            userprofile: _userprofile,
            setdefault: _setdefault
        };
    }
]);
