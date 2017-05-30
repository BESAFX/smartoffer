app.controller("courseCtrl", ['CourseService', 'MasterService', 'BranchService', 'ModalProvider', '$rootScope', '$scope', '$log', '$timeout', '$state',
    function (CourseService, MasterService, BranchService, ModalProvider, $rootScope, $scope, $log, $timeout, $state) {

        $scope.selected = {};

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.courses, function (course) {
                    if (object.id == course.id) {
                        $scope.selected = course;
                        return course.isSelected = true;
                    } else {
                        return course.isSelected = false;
                    }
                });
            }
        };

        $scope.fetchTableData = function () {
            CourseService.fetchTableData().then(function (data) {
                $scope.courses = data;
                $scope.setSelected(data[0]);
            });
        };

        $scope.delete = function (course) {
            if (course) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الدورة فعلاً؟", "error", "fa-ban", function () {
                    CourseService.remove(course.id).then(function () {

                    });
                });
                return;
            }
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الدورة فعلاً؟", "error", "fa-ban", function () {
                CourseService.remove($scope.selected.id).then(function () {

                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu"> انشاء دورة جديد <span class="fa fa-plus-square-o fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openCourseCreateModel();
                }
            },
            {
                html: '<div class="drop-menu"> تعديل بيانات الدورة <span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openCourseUpdateModel($itemScope.course);
                }
            },
            {
                html: '<div class="drop-menu"> حذف الدورة <span class="fa fa-minus-square-o fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.course);
                }
            }
        ];


        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 1500);

    }]);
