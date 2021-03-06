app.controller("withdrawCtrl", ['WithdrawService', 'BranchService', 'ModalProvider', '$uibModal', '$rootScope', '$scope', '$window', '$timeout', '$log', '$state',
    function (WithdrawService, BranchService, ModalProvider, $uibModal, $rootScope, $scope, $window, $timeout, $log, $state) {

        //
        $scope.items = [];
        $scope.items.push({'id': 1, 'type': 'link', 'name': 'البرامج', 'link': 'menu'});
        $scope.items.push({'id': 2, 'type': 'title', 'name': 'السحبيات البنكية'});
        //

        $scope.buffer = {};

        $scope.selected = {};

        $scope.withdraws = [];

        $timeout(function () {
            BranchService.fetchBranchCombo().then(function (data) {
                $scope.branches = data;
                $scope.buffer.bankBranch = $scope.branches[0];
            });
        }, 2000);

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.withdraws, function (withdraw) {
                    if (object.id == withdraw.id) {
                        $scope.selected = withdraw;
                        return withdraw.isSelected = true;
                    } else {
                        return withdraw.isSelected = false;
                    }
                });
            }
        };

        $scope.newWithdraw = function () {
            ModalProvider.openWithdrawCreateModel().result.then(function (data) {
                $scope.withdraws.splice(0,0,data);
            }, function () {
                console.info('WithdrawCreateModel Closed.');
            });
        };

        $scope.filter = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/bank/withdrawFilter.html',
                controller: 'withdrawFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى السحبيات البنكية';
                    }
                }
            });

            modalInstance.result.then(function (buffer) {

                var search = [];
                if (buffer.code) {
                    search.push('code=');
                    search.push(buffer.code);
                    search.push('&');
                }
                if (buffer.amountFrom) {
                    search.push('amountFrom=');
                    search.push(buffer.amountFrom);
                    search.push('&');
                }
                if (buffer.amountTo) {
                    search.push('amountTo=');
                    search.push(buffer.amountTo);
                    search.push('&');
                }
                if (buffer.fromName) {
                    search.push('fromName=');
                    search.push(buffer.fromName);
                    search.push('&');
                }
                if (buffer.dateFrom) {
                    search.push('dateFrom=');
                    search.push(buffer.dateFrom.getTime());
                    search.push('&');
                }
                if (buffer.dateTo) {
                    search.push('dateTo=');
                    search.push(buffer.dateTo.getTime());
                    search.push('&');
                }

                if (buffer.bankCode) {
                    search.push('bankCode=');
                    search.push(buffer.bankCode);
                    search.push('&');
                }
                if (buffer.bankName) {
                    search.push('bankName=');
                    search.push(buffer.bankName);
                    search.push('&');
                }
                if (buffer.bankBranchName) {
                    search.push('bankBranchName=');
                    search.push(buffer.bankBranchName);
                    search.push('&');
                }
                if (buffer.bankStockFrom) {
                    search.push('bankStockFrom=');
                    search.push(buffer.bankStockFrom);
                    search.push('&');
                }
                if (buffer.bankStockTo) {
                    search.push('bankStockTo=');
                    search.push(buffer.bankStockTo);
                    search.push('&');
                }
                if (buffer.branch) {
                    search.push('branchId=');
                    search.push(buffer.branch.id);
                    search.push('&');
                }

                WithdrawService.filter(search.join("")).then(function (data) {
                    $scope.withdraws = data;
                    $scope.setSelected(data[0]);
                    $scope.items = [];
                    $scope.items.push({'id': 1, 'type': 'link', 'name': 'البرامج', 'link': 'menu'});
                    $scope.items.push({'id': 2, 'type': 'title', 'name': 'السحبيات البنكية', 'style': 'font-weight:bold'});
                    $scope.items.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                    $scope.items.push({
                        'id': 4,
                        'type': 'title',
                        'name': ' [ ' + buffer.branch.code + ' ] ' + buffer.branch.name
                    });
                });

            }, function () {
                console.info('WithdrawFilterModel Closed.');
            });
        };

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 600);


    }]);
