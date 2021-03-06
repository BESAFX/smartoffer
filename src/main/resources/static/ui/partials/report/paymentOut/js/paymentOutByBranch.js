app.controller('paymentOutByBranchCtrl', ['BranchService', '$scope', '$rootScope', '$timeout', '$uibModalInstance',
    function (BranchService, $scope, $rootScope, $timeout, $uibModalInstance) {
        $timeout(function () {
            $scope.buffer = {};
            BranchService.fetchBranchCombo().then(function (data) {
                $scope.branches = data;
            });
        }, 1500);

        $scope.submit = function () {
            if ($scope.buffer.startDate && $scope.buffer.endDate) {
                window.open('/report/PaymentOutByBranch?'
                    + "branchId=" + $scope.buffer.branch.id + "&"
                    + "exportType=" + $scope.buffer.exportType + '&'
                    + "startDate=" + $scope.buffer.startDate.getTime() + "&"
                    + "endDate=" + $scope.buffer.endDate.getTime());
            } else {
                window.open('/report/PaymentOutByBranch?branchId=' + $scope.buffer.branch.id + '&exportType=' + $scope.buffer.exportType);
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);