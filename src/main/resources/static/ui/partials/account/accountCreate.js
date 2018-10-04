app.controller('accountCreateCtrl', ['AccountService', 'BranchService', 'ModalProvider', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', '$uibModal',
    function (AccountService, BranchService, ModalProvider, $scope, $rootScope, $timeout, $log, $uibModalInstance, $uibModal) {

        $scope.buffer = {};
        $scope.account = {};
        $scope.branches = [];

        $timeout(function () {
            $scope.clear();
            BranchService.fetchBranchMasterCourse().then(function (data) {
                $scope.branches = data;
            });
        }, 800);

        $scope.clear = function () {
            $scope.account = {};
            $scope.account.coursePaymentType = 'نقدي';
            $scope.account.student = {};
            $scope.account.student.contact = {};
            $scope.account.coursePrice = 0;
            $scope.account.courseDiscountAmount = 0;
            $scope.account.courseProfitAmount = 0;
            $scope.account.courseCreditAmount = 0;
            if ($scope.form) {
                $scope.form.$setPristine();
            }
        };

        $scope.newPayment = function (account) {
            ModalProvider.openAccountPaymentModel(account).result.then(function (data) {
                AccountService.findOne(account.id).then(function (data) {
                    $scope.account = data;
                });
            });
        };

        $scope.submit = function () {
            AccountService.create($scope.account).then(function (data) {
                $scope.clear();
                $rootScope.showConfirmNotify("السندات", "هل تود تسديد دفعة من الرسوم ؟", "notification", "fa-info", function () {
                    $scope.newPayment(data);
                });
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 600);

    }]);