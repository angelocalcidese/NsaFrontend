nsaApp
    .service('RestService', ['$http',
    function ($http) {
        var url = "http://localhost:8090/Nsa/";
         var app = "NSA";
        var _allusers = function () {
            return $http.get(url + 'users/all?application=' + app);
        };
        var _totalusers = function () {
            return $http.get(url + 'users/total');
        };
        var _allgroups = function () {
            return $http.get(url + 'groups/all?application=' + app);
        };
        var _allroles = function () {
            return $http.get(url + 'roles/all?application=' + app);
        };
        var _allunits = function () {
            return $http.get(url + 'organizationunit/all?application=' + app);
        };
        var _allapps = function () {
            return $http.get(url + 'application/all');
        };
        var _createuser = function (myparams) {
            var params ={
                "user": myparams
            };
            return $http.post(url + 'users/new/', params);
        };
        var _createuserapp = function (myparams) {
            var params ={
                "application": app,
                "user": myparams
            };
            return $http.post(url + 'users/application/new/', params);
        };
        var _userdetails = function (username) {
            return $http.get(url + 'users/details/?application=' + app + '&username=' + username);
        };
        var _userprofile = function (username, appsearch) {
            return $http.get(url + 'users/profile/?application=' + appsearch + '&username=' + username);
        };
        var _updateuser = function (myparams) {
            var params ={
                "user": myparams
            };
            return $http.post(url + 'users/update/', params);
        };
        var _updateuserapp = function (myparams) {
            var params ={
                "application": app,
                "user": myparams
            };
            return $http.post(url + 'users/application/update/', params);
        };
        var _enableuser = function(username){
            return $http.get(url + 'users/application/enable/?application=' + app + '&username=' + username);
        };
        var _creategroup = function (myparams) {
            var params ={
                "application": app,
                "group": myparams
            };
            return $http.post(url + 'groups/new/', params);
        };
        var _createunit = function (myparams) {
            var params ={
                "application": app,
                "organizationUnit": myparams
            };
            return $http.post(url + 'organizationunit/new/', params);
        };
        var _createapp = function (myparams) {
            var params ={
                "application": myparams
            };
            return $http.post(url + 'application/new/', params);
        };
        var _updategroup = function (myparams) {
            var params ={
                "application": app,
                "group": myparams
            };
            return $http.post(url + 'groups/update/', params);
        };
        var _updateapp = function (myparams) {
            var params ={
                "application": myparams
            };
            return $http.post(url + 'application/update/', params);
        };
        var _updateunit = function (myparams) {
            var params ={
                "application": app,
                "organizationUnit": myparams
            };
            return $http.post(url + 'organizationunit/update/', params);
        };
        var _unsetgroupuser = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "users": myparams
            };
            return $http.post(url + 'groups/users/unset', params);
        };
        var _setgroupuser = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "users": myparams
            };
            return $http.post(url + 'groups/users/set', params);
        };
        var _setappuser = function (name, myparams) {
            var params ={
                "application": name,
                "users": myparams
            };
            return $http.post(url + 'application/users/set', params);
        };
        var _unsetappuser = function (name, myparams) {
            var params ={
                "application": name,
                "users": myparams
            };
            return $http.post(url + 'application/users/unset', params);
        };
        var _unsetunituser = function (id, myparams) {
            var params ={
                "application": app,
                "name": id,
                "users": myparams
            };
            return $http.post(url + 'organizationunit/users/unset', params);
        };
        var _setunituser = function (id, myparams) {
            var params ={
                "application": app,
                "name": id,
                "users": myparams
            };
            return $http.post(url + 'organizationunit/users/set', params);
        };
        var _replacegroupusers = function (name, myparams) {
            return $http.post(url + 'groups/users/replace?application=' + app + '&name=' + name, myparams);
        };
        var _groupmembers = function (group) {
            return $http.get(url + 'groups/members/?application=' + app + '&name=' + group);
        };
        var _groupdetails = function (group) {
            return $http.get(url + 'groups/details/?application=' + app + '&name=' + group);
        };
        var _unitdetails = function (unit) {
            return $http.get(url + 'organizationunit/details/?application=' + app + '&id=' + unit);
        };
        var _roledetails = function (role) {
            return $http.get(url + 'roles/details/?application=' + app + '&name=' + role);
        };
        var _appdetails = function (name) {
            return $http.get(url + 'application/details?name=' + name);
        };
        var _rolemembers = function (role) {
            return $http.get(url + 'roles/members/?application=' + app + '&name=' + role);
        };
        var _unsetroleuser = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "roles": myparams
            };
            return $http.post(url + 'users/roles/unset', params);
        };
        var _setroleuser = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "roles": myparams
            };
            return $http.post(url + 'users/roles/set', params);
        };
        var _setusersrole = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "users": myparams
            };
            return $http.post(url + 'roles/users/set', params);
        };
        var _unsetusersrole = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "users": myparams
            };
            return $http.post(url + 'roles/users/unset', params);
        };
        var _unsetrolegroup = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "roles": myparams
            };
            return $http.post(url + 'groups/roles/unset', params);
        };
        var _setrolegroup = function (name, myparams) {
            var params ={
                "application": app,
                "name": name,
                "roles": myparams
            };
            return $http.post(url + 'groups/roles/set', params);
        };
        var _dropdowngroups = function () {
            return $http.get(url + 'groups/dropdown/?application=' + app);
        };
        var _dropdownunits = function () {
            return $http.get(url + 'organizationunit/dropdown/?application=' + app);
        };
        var _createrole = function (myparams) {
            var params ={
                "application": app,
                "role": myparams
            };
            return $http.post(url + 'roles/new/', params);
        };
        var _updaterole = function (myparams) {
            var params ={
                "application": app,
                "role": myparams
            };
            return $http.post(url + 'roles/update/', params);
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
            return $http.post(url + 'application/user/default/set', params);
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
