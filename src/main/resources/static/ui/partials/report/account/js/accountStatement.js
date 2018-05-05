app.controller('accountStatementCtrl', ['BranchService' ,'AccountService', '$scope', '$rootScope', '$timeout', '$uibModalInstance',
    function (BranchService, AccountService, $scope, $rootScope, $timeout, $uibModalInstance) {

        $scope.buffer = {};

        $scope.buffer.sorts = [];

        $scope.addSortBy = function () {
            var sortBy = {};
            $scope.buffer.sorts.push(sortBy);
        };

        $scope.accounts = [];

        $scope.searchAccount = function ($select, $event) {

            // no event means first load!
            if (!$event) {
                $scope.page = 0;
                $scope.accounts = [];
            } else {
                $event.stopPropagation();
                $event.preventDefault();
                $scope.page++;
            }

            var search = [];

            search.push('size=');
            search.push(10);
            search.push('&');

            search.push('page=');
            search.push($scope.page);
            search.push('&');

            switch ($scope.buffer.searchBy){
                case "fullName":{
                    search.push('fullName=');
                    search.push($select.search);
                    search.push('&');
                    break;
                }
                case "studentIdentityNumber":
                    search.push('studentIdentityNumber=');
                    search.push($select.search);
                    search.push('&');
                    break;
                case "studentMobile":
                    search.push('studentMobile=');
                    search.push($select.search);
                    search.push('&');
                    break;
            }

            search.push('branchIds=');
            var branchIds = [];
            branchIds.push($scope.buffer.branch.id);
            search.push(branchIds);
            search.push('&');

            search.push('searchType=');
            search.push('and');
            search.push('&');

            return AccountService.filterWithInfo(search.join("")).then(function (data) {
                $scope.buffer.last = data.last;
                return $scope.accounts = $scope.accounts.concat(data.content);
            });

        };

        $scope.submit = function () {

            var param = [];

            if ($scope.buffer.startDate) {
                param.push('startDate=');
                param.push($scope.buffer.startDate.getTime());
                param.push('&');
            }
            if ($scope.buffer.endDate) {
                param.push('endDate=');
                param.push($scope.buffer.endDate.getTime());
                param.push('&');
            }

            var selectedAccountsIds = [];
            angular.forEach($scope.buffer.accountsList, function (account) {
                selectedAccountsIds.push(account.id);
            });
            if(selectedAccountsIds.length > 0){
                param.push('accountIds=');
                param.push(selectedAccountsIds);
                param.push('&');
            }

            param.push('exportType=');
            param.push($scope.buffer.exportType);
            param.push('&');

            param.push('isSummery=');
            param.push($scope.buffer.isSummery);
            param.push('&');

            param.push('title=');
            param.push($scope.buffer.title);
            param.push('&');

            angular.forEach($scope.buffer.sorts, function (sortBy) {
                param.push('sort=');
                param.push(sortBy.name + ',' + sortBy.direction);
                param.push('&');
            });

            window.open('/report/PaymentByAccountIn?' + param.join(""));
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            BranchService.fetchBranchCombo().then(function (data) {
                $scope.branches = data;
            });
            window.componentHandler.upgradeAllRegistered();
        }, 800);

    }]);