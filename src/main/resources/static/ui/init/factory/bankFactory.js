app.factory("BankService", ['$http', '$log',
    function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/bank/findAll").then(function (response) {
                    return response.data;
                })
            },
            findOne: function (id) {
                return $http.get("/api/bank/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (bank) {
                return $http.post("/api/bank/create", bank).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/bank/delete/" + id);
            },
            update: function (bank) {
                return $http.put("/api/bank/update", bank).then(function (response) {
                    return response.data;
                });
            },
            filter: function (search) {
                return $http.get("/api/bank/filter?" + search).then(function (response) {
                    return response.data;
                });
            },
            fetchTableData: function () {
                return $http.get("/api/bank/fetchTableData").then(function (response) {
                    return response.data;
                });
            },
            fetchTableDataCombo: function () {
                return $http.get("/api/bank/fetchTableDataCombo").then(function (response) {
                    return response.data;
                });
            }
        };
    }
]);