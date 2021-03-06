app.controller('paymentByMasterCategoryCtrl', ['BranchService' ,'MasterCategoryService', '$scope', '$rootScope', '$timeout', '$uibModalInstance',
    function (BranchService ,MasterCategoryService, $scope, $rootScope, $timeout, $uibModalInstance) {

        $scope.buffer = {};

        $scope.buffer.branchesList = [];

        $scope.buffer.masterCategoriesList = [];

        $scope.branches = [];

        $scope.masterCategories = [];

        $scope.buffer.sorts = [];

        $scope.addSortBy = function () {
            var sortBy = {};
            $scope.buffer.sorts.push(sortBy);
        };

        $scope.submit = function () {
            var param = [];
            //
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
            //
            if ($scope.buffer.codeFrom) {
                param.push('codeFrom=');
                param.push($scope.buffer.codeFrom);
                param.push('&');
            }
            if ($scope.buffer.codeTo) {
                param.push('codeTo=');
                param.push($scope.buffer.codeTo);
                param.push('&');
            }
            //
            var branchIds = [];
            angular.forEach($scope.buffer.branchesList, function (branch) {
                branchIds.push(branch.id);
            });
            if($scope.buffer.branchesList.length > 0){
                param.push('branchIds=');
                param.push(branchIds);
                param.push('&');
            }
            //
            var masterCategoryIds = [];
            angular.forEach($scope.buffer.masterCategoriesList, function (masterCategory) {
                masterCategoryIds.push(masterCategory.id);
            });
            if($scope.buffer.masterCategoriesList.length > 0){
                param.push('masterCategoryIds=');
                param.push(masterCategoryIds);
                param.push('&');
            }
            //
            param.push('exportType=');
            param.push($scope.buffer.exportType);
            param.push('&');
            //
            param.push('isSummery=');
            param.push($scope.buffer.isSummery);
            param.push('&');
            //
            param.push('title=');
            param.push($scope.buffer.title);
            param.push('&');
            //

            window.open('/report/PaymentByMasterCategories?' + param.join(""));
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            BranchService.fetchBranchCombo().then(function (data) {
                $scope.branches = data;
            });
            MasterCategoryService.findAllCombo().then(function (data) {
                $scope.masterCategories = data;
            });
            window.componentHandler.upgradeAllRegistered();
        }, 600);

    }]);