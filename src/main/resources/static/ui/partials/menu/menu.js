app.controller("menuCtrl", [
    'CompanyService',
    'BranchService',
    'MasterService',
    'MasterCategoryService',
    'OfferService',
    'CallService',
    'CourseService',
    'AccountService',
    'AccountAttachService',
    'AttachTypeService',
    'PaymentService',
    'PaymentOutService',
    'BillBuyTypeService',
    'BillBuyService',
    'BankService',
    'PersonService',
    'TeamService',
    'ModalProvider',
    '$scope',
    '$rootScope',
    '$state',
    '$uibModal',
    '$timeout',
    function (CompanyService,
              BranchService,
              MasterService,
              MasterCategoryService,
              OfferService,
              CallService,
              CourseService,
              AccountService,
              AccountAttachService,
              AttachTypeService,
              PaymentService,
              PaymentOutService,
              BillBuyTypeService,
              BillBuyService,
              BankService,
              PersonService,
              TeamService,
              ModalProvider,
              $scope,
              $rootScope,
              $state,
              $uibModal,
              $timeout) {

        $scope.$watch('toggleState', function (newValue, oldValue) {
            switch (newValue) {
                case 'menu': {
                    $scope.pageTitle = 'القائمة';
                    break;
                }
                case 'company': {
                    $scope.pageTitle = 'الشركة';
                    break;
                }
                case 'branch': {
                    $scope.pageTitle = 'الفروع';
                    break;
                }
                case 'masterCategory': {
                    $scope.pageTitle = 'التصنيفات';
                    break;
                }
                case 'master': {
                    $scope.pageTitle = 'التخصصات';
                    break;
                }
                case 'offer': {
                    $scope.pageTitle = 'العروض';
                    break;
                }
                case 'course': {
                    $scope.pageTitle = 'الدورات';
                    break;
                }
                case 'account': {
                    $scope.pageTitle = 'الطلاب';
                    break;
                }
                case 'paymentIn': {
                    $scope.pageTitle = 'سندات القبض';
                    break;
                }
                case 'paymentOut': {
                    $scope.pageTitle = 'سندات الصرف';
                    break;
                }
                case 'billBuyType': {
                    $scope.pageTitle = 'حسابات فواتير الشراء';
                    break;
                }
                case 'billBuy': {
                    $scope.pageTitle = 'فواتير الشراء';
                    break;
                }
                case 'bank': {
                    $scope.pageTitle = 'البنك';
                    break;
                }
                case 'team': {
                    $scope.pageTitle = 'الصلاحيات';
                    break;
                }
                case 'person': {
                    $scope.pageTitle = 'المستخدمين';
                    break;
                }
                case 'profile': {
                    $scope.pageTitle = 'الملف الشخصي';
                    break;
                }
                case 'help': {
                    $scope.pageTitle = 'المساعدة';
                    break;
                }
                case 'about': {
                    $scope.pageTitle = 'عن البرنامج';
                    break;
                }
                case 'report': {
                    $scope.pageTitle = 'التقارير';
                    break;
                }
            }
            $timeout(function () {
                window.componentHandler.upgradeAllRegistered();
            }, 500);
        }, true);
        $scope.toggleState = 'menu';
        $scope.openStateMenu = function () {
            $scope.toggleState = 'menu';
            $rootScope.refreshGUI();
        };
        $scope.openStateCompany = function () {
            $scope.toggleState = 'company';
            $rootScope.refreshGUI();
        };
        $scope.openStateBranch = function () {
            $scope.toggleState = 'branch';
            $rootScope.refreshGUI();
            $scope.fetchBranchTableData();
        };
        $scope.openStateMasterCategory = function () {
            $scope.toggleState = 'masterCategory';
            $rootScope.refreshGUI();
            $scope.readMasterCategories();
        };
        $scope.openStateMaster = function () {
            $scope.toggleState = 'master';
            $rootScope.refreshGUI();
        };
        $scope.openStateOffer = function () {
            $scope.toggleState = 'offer';
            $rootScope.refreshGUI();
        };
        $scope.openStateCourse = function () {
            $scope.toggleState = 'course';
            $rootScope.refreshGUI();
        };
        $scope.openStateAccount = function () {
            $scope.toggleState = 'account';
            $rootScope.refreshGUI();
        };
        $scope.openStatePaymentIn = function () {
            $scope.toggleState = 'paymentIn';
            $rootScope.refreshGUI();
        };
        $scope.openStatePaymentOut = function () {
            $scope.toggleState = 'paymentOut';
            $rootScope.refreshGUI();
        };
        $scope.openStateBillBuyType = function () {
            $scope.toggleState = 'billBuyType';
            $rootScope.refreshGUI();
        };
        $scope.openStateBillBuy = function () {
            $scope.toggleState = 'billBuy';
            $rootScope.refreshGUI();
        };
        $scope.openStateBank = function () {
            $scope.toggleState = 'bank';
            $rootScope.refreshGUI();
        };
        $scope.openStateTeam = function () {
            $scope.toggleState = 'team';
            $rootScope.refreshGUI();
        };
        $scope.openStatePerson = function () {
            $scope.toggleState = 'person';
            $rootScope.refreshGUI();
        };
        $scope.openStateProfile = function () {
            $scope.toggleState = 'profile';
            $rootScope.refreshGUI();
        };
        $scope.openStateHelp = function () {
            $scope.toggleState = 'help';
            $rootScope.refreshGUI();
        };
        $scope.openStateAbout = function () {
            $scope.toggleState = 'about';
            $rootScope.refreshGUI();
        };
        $scope.openStateReport = function () {
            $scope.toggleState = 'report';
            $rootScope.refreshGUI();
        };
        $scope.menuOptionsBody = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/admin.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>الإدارة</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CREATE']);
                },
                click: function ($itemScope, $event, value) {

                },
                children: [
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/company.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>بيانات الشركة</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_COMPANY_UPDATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateCompany();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/branch.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل الفروع</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BRANCH_CREATE', 'ROLE_BRANCH_UPDATE', 'ROLE_BRANCH_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateBranch();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>فرع جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BRANCH_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newBranch();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/person.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل المستخدمين</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_CREATE', 'ROLE_PERSON_UPDATE', 'ROLE_PERSON_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStatePerson();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>مستخدم جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newPerson();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/team.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل الصلاحيات</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE', 'ROLE_TEAM_UPDATE', 'ROLE_TEAM_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateTeam();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>صلاحيات جديدة</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newTeam();
                        }
                    }
                ]
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/register.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>التسجيل</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CREATE']);
                },
                click: function ($itemScope, $event, value) {

                },
                children: [
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/master.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل التخصصات</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_MASTER_CREATE', 'ROLE_MASTER_UPDATE', 'ROLE_MASTER_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateMaster();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>تخصص جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_MASTER_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newMaster();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/offer.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل العروض</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_OFFER_CREATE', 'ROLE_OFFER_UPDATE', 'ROLE_OFFER_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateOffer();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>عرض جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_OFFER_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newOffer();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/course.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل الدورات</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_COURSE_CREATE', 'ROLE_COURSE_UPDATE', 'ROLE_COURSE_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateCourse();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>دورة جديدة</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_COURSE_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newCourse();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/account.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سجل الطلاب</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CREATE', 'ROLE_ACCOUNT_UPDATE', 'ROLE_ACCOUNT_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateAccount();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>طالب جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newAccount();
                        }
                    }
                ]
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/calculate.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>المالية</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CREATE']);
                },
                click: function ($itemScope, $event, value) {

                },
                children: [
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/paymentIn.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سندات القبض</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_CREATE', 'ROLE_PAYMENT_UPDATE', 'ROLE_PAYMENT_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStatePaymentIn();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سند قبض جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newPayment();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/paymentOut.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سندات الصرف</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_OUT_CREATE', 'ROLE_PAYMENT_OUT_UPDATE', 'ROLE_PAYMENT_OUT_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStatePaymentOut();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>سند صرف جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_OUT_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newPaymentOut();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/billBuyType.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>حسابات الفواتير</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BILL_BUY_TYPE_CREATE', 'ROLE_BILL_BUY_TYPE_UPDATE', 'ROLE_BILL_BUY_TYPE_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateBillBuyType();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>حساب فاتورة جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BILL_BUY_TYPE_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newBillBuyType();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/billBuy.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>فواتير الشراء</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BILL_BUY_CREATE', 'ROLE_BILL_BUY_UPDATE', 'ROLE_BILL_BUY_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateBillBuy();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>فاتورة جديدة</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BILL_BUY_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newBillBuy();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/bank.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>حسابات البنوك</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE', 'ROLE_TEAM_UPDATE', 'ROLE_TEAM_DELETE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.openStateBank();
                        }
                    },
                    {
                        html: '<div class="drop-menu">' +
                        '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                        '<span>حساب بنك جديد</span>' +
                        '</div>',
                        enabled: function () {
                            return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE']);
                        },
                        click: function ($itemScope, $event, value) {
                            $scope.newBank();
                        }
                    }
                ]
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Company                                                                                                    *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.selectedCompany = {};
        $scope.submitCompany = function () {
            CompanyService.update($scope.selectedCompany).then(function (data) {
                $scope.selectedCompany = data;
            });
        };
        $scope.browseCompanyLogo = function () {
            document.getElementById('uploader-company').click();
        };
        $scope.uploadCompanyLogo = function (files) {
            CompanyService.uploadCompanyLogo(files[0]).then(function (data) {
                $scope.selectedCompany.logo = data;
                CompanyService.update($scope.selectedCompany).then(function (data) {
                    $scope.selectedCompany = data;
                });
            });
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Branch                                                                                                     *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.branchesDetails = [];
        $scope.fetchBranchTableData = function () {
            BranchService.fetchTableData().then(function (data) {
                $scope.branchesDetails = data;
            });
        };
        $scope.newBranch = function () {
            ModalProvider.openBranchCreateModel().result.then(function (data) {
                return $scope.branchesDetails.splice(0, 0, data);
            });
        };
        $scope.duplicate = function (branch) {
            BranchService.duplicate(branch).then(function (data) {
                return $scope.branchesDetails.splice(0, 0, data);
            });
        };
        $scope.deleteBranch = function (branch) {
            ModalProvider.openConfirmModel("حذف الفروع", "delete", "هل تود حذف الفرع فعلاً؟").result.then(function (value) {
                if (value) {
                    BranchService.remove(branch.id).then(function () {
                        var index = $scope.branchesDetails.indexOf(branch);
                        $scope.branchesDetails.splice(index, 1);
                    });
                }
            });
        };
        $scope.rowMenuBranch = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BRANCH_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newBranch();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BRANCH_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openBranchUpdateModel($itemScope.branch);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/copy.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>نسخ</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BRANCH_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.duplicate($itemScope.branch);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BRANCH_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteBranch($itemScope.branch);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Master Category                                                                                            *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.masterCategories = [];
        $scope.readMasterCategories = function () {
            MasterCategoryService.findAll().then(function (data) {
                $scope.masterCategories = data;
            });
        };
        $scope.newMasterCategory = function () {
            ModalProvider.openMasterCategoryCreateModel().result.then(function (data) {
                $scope.masterCategories.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deleteMasterCategory = function (masterCategory) {
            ModalProvider.openConfirmModel("حذف التصنيفات", "delete", "هل تود حذف التصنيف فعلاً؟").result.then(function (value) {
                if (value) {
                    MasterCategoryService.remove(masterCategory.id).then(function () {
                        var index = $scope.masterCategories.indexOf(masterCategory);
                        $scope.masterCategories.splice(index, 1);
                    });
                }
            })
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Master                                                                                                     *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramMaster = {};
        $scope.itemsMaster = [];
        $scope.itemsMaster.push({'id': 2, 'type': 'title', 'name': 'التخصصات'});
        $scope.newMaster = function () {
            ModalProvider.openMasterCreateModel().result.then(function (data) {
                $scope.masters.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deleteMaster = function (master) {
            ModalProvider.openConfirmModel("حذف التخصصات", "delete", "هل تود حذف التخصص فعلاً؟").result.then(function (value) {
                if (value) {
                    MasterService.remove(master.id).then(function () {
                        var index = $scope.masters.indexOf(master);
                        $scope.masters.splice(index, 1);
                    });
                }
            })
        };
        $scope.openFilterMaster = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/master/masterFilter.html',
                controller: 'masterFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى التخصصات';
                    }
                }
            });

            modalInstance.result.then(function (paramMaster) {
                $scope.paramMaster = paramMaster;
                $scope.searchMaster($scope.paramMaster);
            }, function () {
            });
        };
        $scope.searchMaster = function (paramMaster) {

            var search = [];

            if (paramMaster.name) {
                search.push('name=');
                search.push(paramMaster.name);
                search.push('&');
            }
            if (paramMaster.codeFrom) {
                search.push('codeFrom=');
                search.push(paramMaster.codeFrom);
                search.push('&');
            }
            if (paramMaster.codeTo) {
                search.push('codeTo=');
                search.push(paramMaster.codeTo);
                search.push('&');
            }
            if (paramMaster.branch) {
                search.push('branchId=');
                search.push(paramMaster.branch.id);
                search.push('&');
            }

            MasterService.filter(search.join("")).then(function (data) {
                $scope.masters = data;
                $scope.itemsMaster = [];
                $scope.itemsMaster.push({
                    'id': 2,
                    'type': 'title',
                    'name': 'التخصصات',
                    'style': 'font-weight:bold'
                });
                $scope.itemsMaster.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                $scope.itemsMaster.push({
                    'id': 4,
                    'type': 'title',
                    'name': ' [ ' + paramMaster.branch.code + ' ] ' + paramMaster.branch.name
                });
            });

        };
        $scope.rowMenuMaster = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openMasterCreateModel();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openMasterUpdateModel($itemScope.master);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteMaster($itemScope.master);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Offer                                                                                                      *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramOffer = {};
        $scope.offers = [];
        $scope.offers.checkAll = false;
        $scope.itemsOffer = [];
        $scope.itemsOffer.push({'id': 2, 'type': 'title', 'name': 'العروض'});

        $scope.pageOffer = {};
        $scope.pageOffer.sorts = [];
        $scope.pageOffer.page = 0;
        $scope.pageOffer.totalPages = 0;
        $scope.pageOffer.currentPage = $scope.pageOffer.page + 1;
        $scope.pageOffer.currentPageString = ($scope.pageOffer.page + 1) + ' / ' + $scope.pageOffer.totalPages;
        $scope.pageOffer.size = 5;
        $scope.pageOffer.first = true;
        $scope.pageOffer.last = true;

        $scope.filterOffer = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/offer/offerFilter.html',
                controller: 'offerFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى العروض';
                    }
                }
            });
            modalInstance.result.then(function (paramOffer) {
                $scope.paramOffer = paramOffer;
                $scope.searchOffer($scope.paramOffer);
            }, function () {
            });
        };
        $scope.searchOffer = function (paramOffer) {
            var search = [];

            search.push('size=');
            search.push($scope.pageOffer.size);
            search.push('&');

            search.push('page=');
            search.push($scope.pageOffer.page);
            search.push('&');

            angular.forEach($scope.pageOffer.sorts, function (sortBy) {
                search.push('sort=');
                search.push(sortBy.name + ',' + sortBy.direction);
                search.push('&');
            });

            if (paramOffer.codeFrom) {
                search.push('codeFrom=');
                search.push(paramOffer.codeFrom);
                search.push('&');
            }
            if (paramOffer.codeTo) {
                search.push('codeTo=');
                search.push(paramOffer.codeTo);
                search.push('&');
            }
            if (paramOffer.dateFrom) {
                search.push('dateFrom=');
                search.push(paramOffer.dateFrom.getTime());
                search.push('&');
            }
            if (paramOffer.dateTo) {
                search.push('dateTo=');
                search.push(paramOffer.dateTo.getTime());
                search.push('&');
            }
            if (paramOffer.customerName) {
                search.push('customerName=');
                search.push(paramOffer.customerName);
                search.push('&');
            }
            if (paramOffer.customerIdentityNumber) {
                search.push('customerIdentityNumber=');
                search.push(paramOffer.customerIdentityNumber);
                search.push('&');
            }
            if (paramOffer.customerMobile) {
                search.push('customerMobile=');
                search.push(paramOffer.customerMobile);
                search.push('&');
            }
            if (paramOffer.masterPriceFrom) {
                search.push('masterPriceFrom=');
                search.push(paramOffer.masterPriceFrom);
                search.push('&');
            }
            if (paramOffer.masterPriceTo) {
                search.push('masterPriceTo=');
                search.push(paramOffer.masterPriceTo);
                search.push('&');
            }
            if (paramOffer.branch) {
                search.push('branch=');
                search.push(paramOffer.branch.id);
                search.push('&');
            }
            if (paramOffer.master) {
                search.push('master=');
                search.push(paramOffer.master.id);
                search.push('&');
            }
            if (paramOffer.person) {
                search.push('personId=');
                search.push(paramOffer.person.id);
                search.push('&');
            }
            OfferService.filter(search.join("")).then(function (data) {
                $scope.offers = data.content;

                $scope.pageOffer.currentPage = $scope.pageOffer.page + 1;
                $scope.pageOffer.first = data.first;
                $scope.pageOffer.last = data.last;
                $scope.pageOffer.number = data.number;
                $scope.pageOffer.numberOfElements = data.numberOfElements;
                $scope.pageOffer.size = data.size;
                $scope.pageOffer.totalElements = data.totalElements;
                $scope.pageOffer.totalPages = data.totalPages;
                $scope.pageOffer.currentPageString = ($scope.pageOffer.page + 1) + ' / ' + $scope.pageOffer.totalPages;

                $scope.itemsOffer = [];
                $scope.itemsOffer.push({'id': 2, 'type': 'title', 'name': 'العروض', 'style': 'font-weight:bold'});
                $scope.itemsOffer.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                $scope.itemsOffer.push({
                    'id': 4,
                    'type': 'title',
                    'name': ' [ ' + paramOffer.branch.code + ' ] ' + paramOffer.branch.name
                });
                if (paramOffer.master) {
                    $scope.itemsOffer.push({'id': 5, 'type': 'title', 'name': 'تخصص', 'style': 'font-weight:bold'});
                    $scope.itemsOffer.push({
                        'id': 6,
                        'type': 'title',
                        'name': ' [ ' + paramOffer.master.code + ' ] ' + paramOffer.master.name
                    });
                }
                $timeout(function () {
                    window.componentHandler.upgradeAllRegistered();
                }, 300);
            });
        };
        $scope.selectNextOffersPage = function () {
            $scope.pageOffer.page++;
            $scope.searchOffer($scope.paramOffer);
        };
        $scope.selectPrevOffersPage = function () {
            $scope.pageOffer.page--;
            $scope.searchOffer($scope.paramOffer);
        };
        $scope.newOffer = function () {
            ModalProvider.openOfferCreateModel().result.then(function (data) {
                $scope.offers.splice(0, 0, data);
                ModalProvider.openConfirmModel("العروض", "print", "هل تود طباعة العرض ؟").result.then(function (value) {
                    if(value){
                        $scope.printOffer(data);
                    }
                })
            });
        };
        $scope.copyOffer = function (offer) {
            ModalProvider.openOfferCopyModel(offer).result.then(function (data) {
                $scope.offers.splice(0, 0, data);
                ModalProvider.openConfirmModel("العروض", "هل تود طباعة العرض ؟", "notification", "fa-info", function () {
                    $scope.printOffer(data);
                });
            });
        };
        $scope.printOffer = function (offer) {
            window.open('/report/OfferById/' + offer.id + '?exportType=PDF');
        };
        $scope.deleteOffer = function (offer) {
            ModalProvider.openConfirmModel("حذف العروض", "delete", "هل تود حذف العرض فعلاً؟").result.then(function (value) {
                if (value) {
                    OfferService.remove(offer.id).then(function () {
                        var index = $scope.offers.indexOf(offer);
                        $scope.offers.splice(index, 1);
                    });
                }
            })
        };
        $scope.callOffer = function (offer) {
            ModalProvider.openCallCreateModel(offer).result.then(function (call) {
                return offer.calls.push(call);
            }, function () {
            });
        };
        $scope.rowMenuOffer = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.newOffer();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/copy.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>نسخ...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.copyOffer($itemScope.offer);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openOfferUpdateModel($itemScope.offer);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteOffer($itemScope.offer);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/print.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>طباعة</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.printOffer($itemScope.offer);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/about.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>التفاصيل...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openOfferDetailsModel($itemScope.offer);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/call.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>نتيجة اتصال...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.callOffer($itemScope.offer);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/send.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>ارسال رسالة...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_SEND_SMS']);
                },
                click: function ($itemScope, $event, value) {
                    var selectedOffers = [];
                    angular.forEach($scope.offers, function (offer) {
                        if(offer.isSelected){
                            selectedOffers.push(offer);
                        }
                    });
                    if(selectedOffers.length > 0){
                        ModalProvider.openOfferSendMessageModel(selectedOffers);
                    }else{
                        $rootScope.showNotify('', 'فضلا قم باختيار عرض واحد على الأقل', 'error', '');
                    }
                }
            }
        ];
        $scope.checkAllOffers = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('#checkAllOffers input').is(":checked")) {
                    element.MaterialCheckbox.check();
                }
                else {
                    element.MaterialCheckbox.uncheck();
                }
            }
            angular.forEach($scope.offers, function (offer) {
                offer.isSelected = $scope.offers.checkAll;
            });
        };
        $scope.checkOffer = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('.check input:checked').length == $('.check input').length) {
                    document.querySelector('#checkAllOffers').MaterialCheckbox.check();
                } else {
                    document.querySelector('#checkAllOffers').MaterialCheckbox.uncheck();
                }
            }
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Course                                                                                                     *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramCourse = {};
        $scope.courses = [];
        $scope.itemsCourse = [];
        $scope.itemsCourse.push({'id': 2, 'type': 'title', 'name': 'الدورات'});
        $scope.newCourse = function () {
            ModalProvider.openCourseCreateModel().result.then(function (data) {
                $scope.courses.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deleteCourse = function (course) {
            ModalProvider.openConfirmModel("حذف الدورات", "delete", "هل تود حذف الدورة فعلاً؟").result.then(function (value) {
                if (value) {
                    CourseService.remove(course.id).then(function () {
                        var index = $scope.courses.indexOf(course);
                        $scope.courses.splice(index, 1);
                    });
                }
            })
        };
        $scope.deleteAccounts = function (course) {
            ModalProvider.openConfirmModel("حذف طلاب الدورات", "delete", "هل تود حذف طلاب الدورة فعلاً؟").result.then(function (value) {
                if (value) {
                    AccountService.removeByCourse(course.id).then(function () {
                    });
                }
            })
        };
        $scope.deletePayments = function (course) {
            ModalProvider.openConfirmModel("حذف ايرادات الدورات", "delete", "هل تود حذف جميع سندات طلاب الدورة فعلاً؟").result.then(function (value) {
                if (value) {
                    PaymentService.removeByCourse(course.id).then(function () {
                    });
                }
            })
        };
        $scope.openFilterCourse = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/course/courseFilter.html',
                controller: 'courseFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى الدورات';
                    }
                }
            });

            modalInstance.result.then(function (paramCourse) {
                $scope.paramCourse = paramCourse;
                $scope.searchCourse($scope.paramCourse);
            }, function () {
            });
        };
        $scope.searchCourse = function (paramCourse) {
            var search = [];
            if (paramCourse.instructor) {
                search.push('instructor=');
                search.push(paramCourse.instructor);
                search.push('&');
            }
            if (paramCourse.codeFrom) {
                search.push('codeFrom=');
                search.push(paramCourse.codeFrom);
                search.push('&');
            }
            if (paramCourse.codeTo) {
                search.push('codeTo=');
                search.push(paramCourse.codeTo);
                search.push('&');
            }
            if (paramCourse.branch) {
                search.push('branchId=');
                search.push(paramCourse.branch.id);
                search.push('&');
            }
            if (paramCourse.master) {
                search.push('masterId=');
                search.push(paramCourse.master.id);
                search.push('&');
            }

            CourseService.filter(search.join("")).then(function (data) {
                $scope.courses = data;
                $scope.itemsCourse = [];
                $scope.itemsCourse.push({'id': 2, 'type': 'title', 'name': 'الدورات', 'style': 'font-weight:bold'});
                $scope.itemsCourse.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                $scope.itemsCourse.push({
                    'id': 4,
                    'type': 'title',
                    'name': ' [ ' + paramCourse.branch.code + ' ] ' + paramCourse.branch.name
                });
            });
        };
        $scope.rowMenuCourse = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.newCourse();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openCourseUpdateModel($itemScope.course);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف الدورة</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.course);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف الطلاب</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteAccounts($itemScope.course);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف الايرادات</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deletePayments($itemScope.course);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Account                                                                                                    *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramAccount = {};
        $scope.accountToUploadAttaches = {};
        $scope.accounts = [];
        $scope.accounts.checkAll = false;
        $scope.itemsAccount = [];
        $scope.itemsAccount.push({'id': 2, 'type': 'title', 'name': 'تسجيل الطلاب'});

        $scope.pageAccount = {};
        $scope.pageAccount.sorts = [];
        $scope.pageAccount.page = 0;
        $scope.pageAccount.totalPages = 0;
        $scope.pageAccount.currentPage = $scope.pageAccount.page + 1;
        $scope.pageAccount.currentPageString = ($scope.pageAccount.page + 1) + ' / ' + $scope.pageAccount.totalPages;
        $scope.pageAccount.size = 5;
        $scope.pageAccount.first = true;
        $scope.pageAccount.last = true;

        $scope.openFilterAccount = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/account/accountFilter.html',
                controller: 'accountFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى التسجيل';
                    }
                }
            });

            modalInstance.result.then(function (paramAccount) {
                $scope.paramAccount = paramAccount;
                $scope.searchAccount($scope.paramAccount);
            }, function () {});
        };
        $scope.searchAccount = function () {
            var search = [];

            search.push('size=');
            search.push($scope.pageAccount.size);
            search.push('&');

            search.push('page=');
            search.push($scope.pageAccount.page);
            search.push('&');

            angular.forEach($scope.pageAccount.sorts, function (sortBy) {
                search.push('sort=');
                search.push(sortBy.name + ',' + sortBy.direction);
                search.push('&');
            });

            if ($scope.paramAccount.firstName) {
                search.push('firstName=');
                search.push($scope.paramAccount.firstName);
                search.push('&');
            }
            if ($scope.paramAccount.secondName) {
                search.push('secondName=');
                search.push($scope.paramAccount.secondName);
                search.push('&');
            }
            if ($scope.paramAccount.thirdName) {
                search.push('thirdName=');
                search.push($scope.paramAccount.thirdName);
                search.push('&');
            }
            if ($scope.paramAccount.forthName) {
                search.push('forthName=');
                search.push($scope.paramAccount.forthName);
                search.push('&');
            }
            if ($scope.paramAccount.fullName) {
                search.push('fullName=');
                search.push($scope.paramAccount.fullName);
                search.push('&');
            }
            if ($scope.paramAccount.dateFrom) {
                search.push('dateFrom=');
                search.push($scope.paramAccount.dateFrom.getTime());
                search.push('&');
            }
            if ($scope.paramAccount.dateTo) {
                search.push('dateTo=');
                search.push($scope.paramAccount.dateTo.getTime());
                search.push('&');
            }
            if ($scope.paramAccount.studentIdentityNumber) {
                search.push('studentIdentityNumber=');
                search.push($scope.paramAccount.studentIdentityNumber);
                search.push('&');
            }
            if ($scope.paramAccount.studentMobile) {
                search.push('studentMobile=');
                search.push($scope.paramAccount.studentMobile);
                search.push('&');
            }
            if ($scope.paramAccount.coursePriceFrom) {
                search.push('coursePriceFrom=');
                search.push($scope.paramAccount.coursePriceFrom);
                search.push('&');
            }
            if ($scope.paramAccount.coursePriceTo) {
                search.push('coursePriceTo=');
                search.push($scope.paramAccount.coursePriceTo);
                search.push('&');
            }
            if ($scope.paramAccount.branch) {
                search.push('branchIds=');
                var branchIds = [];
                branchIds.push($scope.paramAccount.branch.id);
                search.push(branchIds);
                search.push('&');
            }
            if ($scope.paramAccount.master) {
                search.push('masterIds=');
                var masterIds = [];
                masterIds.push($scope.paramAccount.master.id);
                search.push(masterIds);
                search.push('&');
            }
            if ($scope.paramAccount.course) {
                search.push('courseIds=');
                var courseIds = [];
                courseIds.push($scope.paramAccount.course.id);
                search.push(courseIds);
                search.push('&');
            }

            search.push('searchType=');
            search.push('and');
            search.push('&');

            AccountService.filterWithInfo(search.join("")).then(function (data) {
                $scope.accounts = data.content;

                $scope.pageAccount.currentPage = $scope.pageAccount.page + 1;
                $scope.pageAccount.first = data.first;
                $scope.pageAccount.last = data.last;
                $scope.pageAccount.number = data.number;
                $scope.pageAccount.numberOfElements = data.numberOfElements;
                $scope.pageAccount.size = data.size;
                $scope.pageAccount.totalElements = data.totalElements;
                $scope.pageAccount.totalPages = data.totalPages;
                $scope.pageAccount.currentPageString = ($scope.pageAccount.page + 1) + ' / ' + $scope.pageAccount.totalPages;

                $scope.itemsAccount = [];
                $scope.itemsAccount.push({'id': 2, 'type': 'title', 'name': 'تسجيل الطلاب', 'style': 'font-weight:bold'});
                $scope.itemsAccount.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                $scope.itemsAccount.push({'id': 4, 'type': 'title', 'name': ' [ ' + $scope.paramAccount.branch.code + ' ] ' + $scope.paramAccount.branch.name});
                if ($scope.paramAccount.master) {
                    $scope.itemsAccount.push({'id': 5, 'type': 'title', 'name': 'تخصص', 'style': 'font-weight:bold'});
                    $scope.itemsAccount.push({'id': 6, 'type': 'title', 'name': ' [ ' + $scope.paramAccount.master.code + ' ] ' + $scope.paramAccount.master.name});
                }
                if ($scope.paramAccount.course) {
                    $scope.itemsAccount.push({'id': 7, 'type': 'title', 'name': 'رقم الدورة', 'style': 'font-weight:bold'});
                    $scope.itemsAccount.push({'id': 8, 'type': 'title', 'name': ' [ ' + $scope.paramAccount.course.code + ' ] '});
                }
                $timeout(function () {
                    window.componentHandler.upgradeAllRegistered();
                }, 300);
            });

        };
        $scope.selectNextAccountsPage = function () {
            $scope.pageAccount.page++;
            $scope.searchAccount($scope.paramAccount);
        };
        $scope.selectPrevAccountsPage = function () {
            $scope.pageAccount.page--;
            $scope.searchAccount($scope.paramAccount);
        };
        $scope.newAccount = function () {
            ModalProvider.openAccountCreateModel().result.then(function (data) {
                $scope.accounts.splice(0, 0, data);
            }, function () {});
        };
        $scope.newAccountPayment = function (account) {
            ModalProvider.openAccountPaymentModel(account).result.then(function (data) {
                AccountService.findOne(account.id).then(function (data) {
                    var index = $scope.accounts.indexOf(account);
                    $scope.accounts[index] = data;
                });
            });
        };
        $scope.newAccountCondition = function (account) {
            ModalProvider.openAccountConditionCreateModel(account).result.then(function (data) {
                return account.accountConditions.push(data);
            });
        };
        $scope.newAccountNote = function (account) {
            ModalProvider.openAccountNoteCreateModel(account).result.then(function (data) {
                return account.accountNotes.push(data);
            });
        };
        $scope.printAccount = function (account) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/account/accountContract.html',
                controller: 'accountContractCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    account: function () {
                        return account;
                    }
                }
            });

            modalInstance.result.then(function (buffer) {

            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.deleteAccount = function (account) {
            ModalProvider.openConfirmModel("حذف الطلاب", "delete", "هل تود حذف التسجيل فعلاً؟").result.then(function (value) {
                if (value) {
                    AccountService.remove(account.id).then(function () {
                        var index = $scope.accounts.indexOf(account);
                        $scope.accounts.splice(index, 1);
                    });
                }
            })
        };
        $scope.refreshAccountAttaches = function (account) {
            AccountAttachService.findByAccount(account).then(function (data) {
                return account.accountAttaches = data;
            })
        };
        $scope.browseAccountAttaches = function (account) {
            $scope.accountToUploadAttaches = account;
            document.getElementById('uploader-account-attach').click();
        };
        $scope.uploadAccountAttaches = function (files) {
            AccountAttachService.upload($scope.accountToUploadAttaches, files).then(function (data) {
                return Array.prototype.push.apply($scope.accountToUploadAttaches.accountAttaches, data);
            });
        };
        $scope.setAccountAttachType = function (accountAttach) {
            AccountAttachService.setType(accountAttach, accountAttach.attachType);
        };
        $scope.rowMenuAccount = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تسجيل جديد</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newAccount();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل بيانات الطالب</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openAccountUpdateModel($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل رسوم الدورة</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openAccountUpdatePriceModel($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف تسجيل الطالب</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteAccount($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/paymentIn.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>دفعة مالية جديدة</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newAccountPayment($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/student-case.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تغيير حالة الطالب</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_CONDITION_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newAccountCondition($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/note.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>ملاحظة جديدة</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ACCOUNT_NOTE_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newAccountNote($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/about.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>التفاصيل</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openAccountDetailsModel($itemScope.account);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/report-one.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>طباعة عقد</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.printAccount($itemScope.account);
                }
            }
        ];
        $scope.checkAllAccounts = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('#checkAllAccounts input').is(":checked")) {
                    element.MaterialCheckbox.check();
                }
                else {
                    element.MaterialCheckbox.uncheck();
                }
            }
            angular.forEach($scope.accounts, function (account) {
                account.isSelected = $scope.accounts.checkAll;
            });
        };
        $scope.checkAccount = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('.check input:checked').length == $('.check input').length) {
                    document.querySelector('#checkAllAccounts').MaterialCheckbox.check();
                } else {
                    document.querySelector('#checkAllAccounts').MaterialCheckbox.uncheck();
                }
            }
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Payment In                                                                                                 *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramPaymentIn = {};
        $scope.payments = [];
        $scope.payments.checkAll = false;
        $scope.itemsPayment = [];
        $scope.itemsPayment.push({'id': 2, 'type': 'title', 'name': 'سندات القبض'});

        $scope.pagePayment = {};
        $scope.pagePayment.sorts = [];
        $scope.pagePayment.page = 0;
        $scope.pagePayment.totalPages = 0;
        $scope.pagePayment.currentPage = $scope.pagePayment.page + 1;
        $scope.pagePayment.currentPageString = ($scope.pagePayment.page + 1) + ' / ' + $scope.pagePayment.totalPages;
        $scope.pagePayment.size = 5;
        $scope.pagePayment.first = true;
        $scope.pagePayment.last = true;

        $scope.openFilterPayment = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/payment/paymentFilter.html',
                controller: 'paymentFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى سندات القبض';
                    }
                }
            });

            modalInstance.result.then(function (paramPaymentIn) {
                $scope.paramPaymentIn = paramPaymentIn;
                $scope.searchPayment($scope.paramPaymentIn);
            }, function () {});
        };
        $scope.searchPayment = function (paramPaymentIn) {

            var search = [];

            search.push('size=');
            search.push($scope.pagePayment.size);
            search.push('&');

            search.push('page=');
            search.push($scope.pagePayment.page);
            search.push('&');

            angular.forEach($scope.pagePayment.sorts, function (sortBy) {
                search.push('sort=');
                search.push(sortBy.name + ',' + sortBy.direction);
                search.push('&');
            });

            if (paramPaymentIn.paymentCodeFrom) {
                search.push('paymentCodeFrom=');
                search.push(paramPaymentIn.paymentCodeFrom);
                search.push('&');
            }
            if (paramPaymentIn.paymentCodeTo) {
                search.push('paymentCodeTo=');
                search.push(paramPaymentIn.paymentCodeTo);
                search.push('&');
            }
            if (paramPaymentIn.paymentDateFrom) {
                search.push('paymentDateFrom=');
                search.push(moment(paramPaymentIn.paymentDateFrom).valueOf());
                search.push('&');
            }
            if (paramPaymentIn.paymentDateTo) {
                search.push('paymentDateTo=');
                search.push(moment(paramPaymentIn.paymentDateTo).valueOf());
                search.push('&');
            }
            if (paramPaymentIn.amountFrom) {
                search.push('amountFrom=');
                search.push(paramPaymentIn.amountFrom);
                search.push('&');
            }
            if (paramPaymentIn.amountTo) {
                search.push('amountTo=');
                search.push(paramPaymentIn.amountTo);
                search.push('&');
            }
            if (paramPaymentIn.firstName) {
                search.push('firstName=');
                search.push(paramPaymentIn.firstName);
                search.push('&');
            }
            if (paramPaymentIn.secondName) {
                search.push('secondName=');
                search.push(paramPaymentIn.secondName);
                search.push('&');
            }
            if (paramPaymentIn.thirdName) {
                search.push('thirdName=');
                search.push(paramPaymentIn.thirdName);
                search.push('&');
            }
            if (paramPaymentIn.forthName) {
                search.push('forthName=');
                search.push(paramPaymentIn.forthName);
                search.push('&');
            }
            if (paramPaymentIn.dateFrom) {
                search.push('dateFrom=');
                search.push(moment(paramPaymentIn.dateFrom).valueOf());
                search.push('&');
            }
            if (paramPaymentIn.dateTo) {
                search.push('dateTo=');
                search.push(moment(paramPaymentIn.dateTo).valueOf());
                search.push('&');
            }
            if (paramPaymentIn.studentIdentityNumber) {
                search.push('studentIdentityNumber=');
                search.push(paramPaymentIn.studentIdentityNumber);
                search.push('&');
            }
            if (paramPaymentIn.studentMobile) {
                search.push('studentMobile=');
                search.push(paramPaymentIn.studentMobile);
                search.push('&');
            }
            if (paramPaymentIn.coursePriceFrom) {
                search.push('coursePriceFrom=');
                search.push(paramPaymentIn.coursePriceFrom);
                search.push('&');
            }
            if (paramPaymentIn.coursePriceTo) {
                search.push('coursePriceTo=');
                search.push(paramPaymentIn.coursePriceTo);
                search.push('&');
            }
            if (paramPaymentIn.branch) {
                search.push('branch=');
                search.push(paramPaymentIn.branch.id);
                search.push('&');
            }
            if (paramPaymentIn.master) {
                search.push('master=');
                search.push(paramPaymentIn.master.id);
                search.push('&');
            }
            if (paramPaymentIn.course) {
                search.push('course=');
                search.push(paramPaymentIn.course.id);
                search.push('&');
            }
            if (paramPaymentIn.type) {
                search.push('type=');
                search.push(paramPaymentIn.type);
                search.push('&');
            }
            PaymentService.filter(search.join("")).then(function (data) {
                $scope.payments = data.content;

                $scope.pagePayment.currentPage = $scope.pagePayment.page + 1;
                $scope.pagePayment.first = data.first;
                $scope.pagePayment.last = data.last;
                $scope.pagePayment.number = data.number;
                $scope.pagePayment.numberOfElements = data.numberOfElements;
                $scope.pagePayment.size = data.size;
                $scope.pagePayment.totalElements = data.totalElements;
                $scope.pagePayment.totalPages = data.totalPages;
                $scope.pagePayment.currentPageString = ($scope.pagePayment.page + 1) + ' / ' + $scope.pagePayment.totalPages;

                $scope.itemsPayment = [];
                $scope.itemsPayment.push({'id': 2, 'type': 'title', 'name': 'سندات القبض', 'style': 'font-weight:bold'});
                $scope.itemsPayment.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                $scope.itemsPayment.push({'id': 4, 'type': 'title', 'name': ' [ ' + paramPaymentIn.branch.code + ' ] ' + paramPaymentIn.branch.name});
                if (paramPaymentIn.master) {
                    $scope.itemsPayment.push({'id': 5, 'type': 'title', 'name': 'تخصص', 'style': 'font-weight:bold'});
                    $scope.itemsPayment.push({'id': 6, 'type': 'title', 'name': ' [ ' + paramPaymentIn.master.code + ' ] ' + paramPaymentIn.master.name});
                }
                if (paramPaymentIn.course) {
                    $scope.itemsPayment.push({'id': 7, 'type': 'title', 'name': 'رقم الدورة', 'style': 'font-weight:bold'});
                    $scope.itemsPayment.push({'id': 8, 'type': 'title', 'name': ' [ ' + paramPaymentIn.course.code + ' ] '});
                }
                $timeout(function () {
                    window.componentHandler.upgradeAllRegistered();
                }, 300);
            });
        };
        $scope.selectNextPaymentsPage = function () {
            $scope.pagePayment.page++;
            $scope.searchPayment($scope.paramPaymentIn);
        };
        $scope.selectPrevPaymentsPage = function () {
            $scope.pagePayment.page--;
            $scope.searchPayment($scope.paramPaymentIn);
        };
        $scope.newPayment = function () {
            ModalProvider.openPaymentCreateModel().result.then(function (data) {
                $scope.payments.splice(0, 0, data);
            });
        };
        $scope.deletePayment = function (payment) {
            ModalProvider.openConfirmModel("سندات القبض", 'trash', "هل تود حذف سند القبض فعلاً؟").result.then(function (value) {
                if (value) {
                    PaymentService.remove(payment.id).then(function () {
                        var index = $scope.payments.indexOf(payment);
                        $scope.payments.splice(index, 1);
                    });
                }
            })
        };
        $scope.printList = function () {
            var paymentIds = [];
            angular.forEach($scope.payments, function (payment) {
                if (payment.isSelected) {
                    paymentIds.push(payment.id);
                }
            });
            window.open('/report/PaymentsByList?' + "paymentIds=" + paymentIds + "&isSummery=" + false);
        };
        $scope.printListSummery = function () {
            var paymentIds = [];
            angular.forEach($scope.payments, function (payment) {
                if (payment.isSelected) {
                    paymentIds.push(payment.id);
                }
            });
            window.open('/report/PaymentsByList?' + "paymentIds=" + paymentIds + "&isSummery=" + true);
        };
        $scope.rowMenuPayment = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.newPayment();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openPaymentUpdateModel($itemScope.payment);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deletePayment($itemScope.payment);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/print.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>طباعة</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    window.open('report/CashReceipt/' + $itemScope.payment.id);
                }
            }
        ];
        $scope.checkAllPayments = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('#checkAllPayments input').is(":checked")) {
                    element.MaterialCheckbox.check();
                }
                else {
                    element.MaterialCheckbox.uncheck();
                }
            }
            angular.forEach($scope.payments, function (payment) {
                payment.isSelected = $scope.payments.checkAll;
            });
        };
        $scope.checkPayment = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('.check input:checked').length == $('.check input').length) {
                    document.querySelector('#checkAllPayments').MaterialCheckbox.check();
                } else {
                    document.querySelector('#checkAllPayments').MaterialCheckbox.uncheck();
                }
            }
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Payment Out                                                                                                *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramPaymentOut = {};
        $scope.paymentOuts = [];
        $scope.itemsPaymentOut = [];
        $scope.itemsPaymentOut.push({'id': 2, 'type': 'title', 'name': 'سندات الصرف'});
        $scope.newPaymentOut = function () {
            ModalProvider.openPaymentOutCreateModel().result.then(function (data) {
                $scope.paymentOuts.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deletePaymentOut = function (paymentOut) {
            ModalProvider.openConfirmModel("حذف سندات القبض", "delete", "هل تود حذف السند فعلاً؟").result.then(function (value) {
                if (value) {
                    PaymentOutService.remove(paymentOut.id).then(function () {
                        var index = $scope.paymentOuts.indexOf(paymentOut);
                        $scope.paymentOuts.splice(index, 1);
                    });
                }
            });
        };
        $scope.openFilterPaymentOut = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/paymentOut/paymentOutFilter.html',
                controller: 'paymentOutFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى سندات الصرف';
                    }
                }
            });

            modalInstance.result.then(function (paramPaymentOut) {
                $scope.paramPaymentOut = paramPaymentOut;
                $scope.searchPaymentOut($scope.paramPaymentOut);
            }, function () {
            });
        };
        $scope.searchPaymentOut = function (paramPaymentOut) {
            var search = [];
            if (paramPaymentOut.codeFrom) {
                search.push('codeFrom=');
                search.push(paramPaymentOut.codeFrom);
                search.push('&');
            }
            if (paramPaymentOut.codeTo) {
                search.push('codeTo=');
                search.push(paramPaymentOut.codeTo);
                search.push('&');
            }
            if (paramPaymentOut.dateFrom) {
                search.push('dateFrom=');
                search.push(moment(paramPaymentOut.dateFrom).valueOf());
                search.push('&');
            }
            if (paramPaymentOut.dateTo) {
                search.push('dateTo=');
                search.push(moment(paramPaymentOut.dateTo).valueOf());
                search.push('&');
            }
            if (paramPaymentOut.amountFrom) {
                search.push('amountFrom=');
                search.push(paramPaymentOut.amountFrom);
                search.push('&');
            }
            if (paramPaymentOut.amountTo) {
                search.push('amountTo=');
                search.push(paramPaymentOut.amountTo);
                search.push('&');
            }
            if (paramPaymentOut.branch) {
                search.push('branchId=');
                search.push(paramPaymentOut.branch.id);
                search.push('&');
            }

            PaymentOutService.filter(search.join("")).then(function (data) {
                $scope.paymentOuts = data;
                $scope.itemsPaymentOut = [];
                $scope.itemsPaymentOut.push({
                    'id': 1,
                    'type': 'link',
                    'name': 'البرامج',
                    'link': 'menu'
                });
                $scope.itemsPaymentOut.push({
                    'id': 2,
                    'type': 'title',
                    'name': 'السندات',
                    'style': 'font-weight:bold'
                });
                $scope.itemsPaymentOut.push({
                    'id': 3,
                    'type': 'title',
                    'name': 'فرع',
                    'style': 'font-weight:bold'
                });
                $scope.itemsPaymentOut.push({
                    'id': 4,
                    'type': 'title',
                    'name': ' [ ' + paramPaymentOut.branch.code + ' ] ' + paramPaymentOut.branch.name
                });
            });
        };
        $scope.rowMenuPaymentOut = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_OUT_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newPaymentOut();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PAYMENT_OUT_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deletePaymentOut($itemScope.paymentOut);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * BillBuyType                                                                                                *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.billBuyTypes = [];
        $scope.fetchBillBuyTypeTableData = function () {
            BillBuyTypeService.findAll().then(function (data) {
                $scope.billBuyTypes = data;
                $scope.setSelectedBillBuyType(data[0]);
            })
        };
        $scope.newBillBuyType = function () {
            ModalProvider.openBillBuyTypeCreateModel().result.then(function (data) {
                $scope.billBuyTypes.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deleteBillBuyType = function (billBuyType) {
            ModalProvider.openConfirmModel("حذف حسابات الفواتير", "delete", "هل تود حذف النوع فعلاً؟").result.then(function (value) {
                if (value) {
                    BillBuyTypeService.remove(billBuyType.id).then(function () {
                        var index = $scope.billBuyTypes.indexOf(billBuyType);
                        $scope.billBuyTypes.splice(index, 1);
                    });
                }
            });
        };
        $scope.rowMenuBillBuyType = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.newBillBuyType();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openBillBuyTypeUpdateModel($itemScope.billBuyType);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteBillBuyType($itemScope.billBuyType);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * BillBuy                                                                                                    *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.paramBillBuy = {};
        $scope.billBuys = [];
        $scope.billBuys.checkAll = false;
        $scope.itemsBillBuy = [];
        $scope.itemsBillBuy.push({'id': 2, 'type': 'title', 'name': 'فواتير الشراء'});

        $scope.pageBillBuy = {};
        $scope.pageBillBuy.sorts = [];
        $scope.pageBillBuy.page = 0;
        $scope.pageBillBuy.totalPages = 0;
        $scope.pageBillBuy.currentPage = $scope.pageBillBuy.page + 1;
        $scope.pageBillBuy.currentPageString = ($scope.pageBillBuy.page + 1) + ' / ' + $scope.pageBillBuy.totalPages;
        $scope.pageBillBuy.size = 5;
        $scope.pageBillBuy.first = true;
        $scope.pageBillBuy.last = true;

        $scope.openFilterBillBuy = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/billBuy/billBuyFilter.html',
                controller: 'billBuyFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى فواتير الشراء';
                    }
                }
            });

            modalInstance.result.then(function (paramBillBuy) {
                $scope.paramBillBuy = paramBillBuy;
                $scope.searchBillBuy($scope.paramBillBuy);
            }, function () {
            });
        };
        $scope.searchBillBuy = function (paramBillBuy) {
            var search = [];

            search.push('size=');
            search.push($scope.pageBillBuy.size);
            search.push('&');

            search.push('page=');
            search.push($scope.pageBillBuy.page);
            search.push('&');

            angular.forEach($scope.pageBillBuy.sorts, function (sortBy) {
                search.push('sort=');
                search.push(sortBy.name + ',' + sortBy.direction);
                search.push('&');
            });

            if (paramBillBuy.codeFrom) {
                search.push('codeFrom=');
                search.push(paramBillBuy.codeFrom);
                search.push('&');
            }
            if (paramBillBuy.codeTo) {
                search.push('codeTo=');
                search.push(paramBillBuy.codeTo);
                search.push('&');
            }
            if (paramBillBuy.dateFrom) {
                search.push('dateFrom=');
                search.push(paramBillBuy.dateFrom.getTime());
                search.push('&');
            }
            if (paramBillBuy.dateTo) {
                search.push('dateTo=');
                search.push(paramBillBuy.dateTo.getTime());
                search.push('&');
            }
            if (paramBillBuy.amountFrom) {
                search.push('amountFrom=');
                search.push(paramBillBuy.amountFrom);
                search.push('&');
            }
            if (paramBillBuy.amountTo) {
                search.push('amountTo=');
                search.push(paramBillBuy.amountTo);
                search.push('&');
            }
            if (paramBillBuy.branch) {
                search.push('branchId=');
                search.push(paramBillBuy.branch.id);
                search.push('&');
            }
            BillBuyService.filter(search.join("")).then(function (data) {
                $scope.billBuys = data.content;

                $scope.pageBillBuy.currentPage = $scope.pageBillBuy.page + 1;
                $scope.pageBillBuy.first = data.first;
                $scope.pageBillBuy.last = data.last;
                $scope.pageBillBuy.number = data.number;
                $scope.pageBillBuy.numberOfElements = data.numberOfElements;
                $scope.pageBillBuy.size = data.size;
                $scope.pageBillBuy.totalElements = data.totalElements;
                $scope.pageBillBuy.totalPages = data.totalPages;
                $scope.pageBillBuy.currentPageString = ($scope.pageBillBuy.page + 1) + ' / ' + $scope.pageBillBuy.totalPages;

                $scope.itemsBillBuy = [];
                $scope.itemsBillBuy.push({
                    'id': 2,
                    'type': 'title',
                    'name': 'فواتير الشراء',
                    'style': 'font-weight:bold'
                });
                $scope.itemsBillBuy.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                $scope.itemsBillBuy.push({
                    'id': 4,
                    'type': 'title',
                    'name': ' [ ' + paramBillBuy.branch.code + ' ] ' + paramBillBuy.branch.name
                });
                $timeout(function () {
                    window.componentHandler.upgradeAllRegistered();
                }, 300);
            });

        };
        $scope.selectNextBillBuysPage = function () {
            $scope.pageBillBuy.page++;
            $scope.searchBillBuy($scope.paramBillBuy);
        };
        $scope.selectPrevBillBuysPage = function () {
            $scope.pageBillBuy.page--;
            $scope.searchBillBuy($scope.paramBillBuy);
        };
        $scope.newBillBuy = function () {
            ModalProvider.openBillBuyCreateModel().result.then(function (data) {
                $scope.billBuys.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deleteBillBuy = function (billBuy) {
            ModalProvider.openConfirmModel("حذف فواتير الشراء", "delete", "هل تود حذف الفاتورة فعلاً؟").result.then(function (value) {
                if (value) {
                    BillBuyService.remove(billBuy.id).then(function () {
                        var index = $scope.billBuys.indexOf(billBuy);
                        $scope.billBuys.splice(index, 1);
                    });
                }
            });
        };
        $scope.rowMenuBillBuy = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.newBillBuy();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BILL_BUY_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openBillBuyUpdateModel($itemScope.billBuy);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteBillBuy($itemScope.billBuy);
                }
            }
        ];
        $scope.checkAllBillBuys = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('#checkAllBillBuys input').is(":checked")) {
                    element.MaterialCheckbox.check();
                }
                else {
                    element.MaterialCheckbox.uncheck();
                }
            }
            angular.forEach($scope.billBuys, function (billBuy) {
                billBuy.isSelected = $scope.billBuys.checkAll;
            });
        };
        $scope.checkBillBuy = function () {
            var elements = document.querySelectorAll('.check');
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if ($('.check input:checked').length == $('.check input').length) {
                    document.querySelector('#checkAllBillBuys').MaterialCheckbox.check();
                } else {
                    document.querySelector('#checkAllBillBuys').MaterialCheckbox.uncheck();
                }
            }
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Bank                                                                                                       *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.itemsBank = [];
        $scope.itemsBank.push({'id': 2, 'type': 'title', 'name': 'الحسابات البنكية'});
        $scope.banks = [];
        $scope.filterBank = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/ui/partials/bank/bankFilter.html',
                controller: 'bankFilterCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    title: function () {
                        return 'البحث فى الحسابات البنكية';
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
                if (buffer.name) {
                    search.push('name=');
                    search.push(buffer.name);
                    search.push('&');
                }
                if (buffer.branchName) {
                    search.push('branchName=');
                    search.push(buffer.branchName);
                    search.push('&');
                }
                if (buffer.stockFrom) {
                    search.push('stockFrom=');
                    search.push(buffer.stockFrom);
                    search.push('&');
                }
                if (buffer.stockTo) {
                    search.push('stockTo=');
                    search.push(buffer.stockTo);
                    search.push('&');
                }
                if (buffer.branch) {
                    search.push('branchId=');
                    search.push(buffer.branch.id);
                    search.push('&');
                }

                BankService.filter(search.join("")).then(function (data) {
                    $scope.banks = data;
                    $scope.itemsBank = [];
                    $scope.itemsBank.push({
                        'id': 2,
                        'type': 'title',
                        'name': 'الحسابات البنكية',
                        'style': 'font-weight:bold'
                    });
                    $scope.itemsBank.push({'id': 3, 'type': 'title', 'name': 'فرع', 'style': 'font-weight:bold'});
                    $scope.itemsBank.push({
                        'id': 4,
                        'type': 'title',
                        'name': ' [ ' + buffer.branch.code + ' ] ' + buffer.branch.name
                    });
                });

            }, function () {
            });
        };
        $scope.newBank = function () {
            ModalProvider.openBankCreateModel().result.then(function (data) {
                $scope.banks.splice(0, 0, data);
            }, function () {
            });
        };
        $scope.deleteBank = function (bank) {
            ModalProvider.openConfirmModel("حذف الحسابات البنكية", "delete", "هل تود حذف الفاتورة فعلاً؟").result.then(function (value) {
                if (value) {
                    BankService.remove(bank.id).then(function () {
                        var index = $scope.banks.indexOf(bank);
                        $scope.banks.splice(index, 1);
                    });
                }
            });
        };
        $scope.openDepositModel = function (bank) {
            ModalProvider.openDepositCreateModel(bank);
        };
        $scope.openWithdrawModel = function (bank) {
            ModalProvider.openWithdrawCreateModel(bank);
        };
        $scope.rowMenuBank = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BANK_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newBank();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BANK_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openBankUpdateModel($itemScope.bank);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/paymentOut.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>سحب...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_WITHDRAW_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.openWithdrawModel($itemScope.bank);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/paymentIn.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>إيداع...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_DEPOSIT_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.openDepositModel($itemScope.bank);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_BANK_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteBank($itemScope.bank);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Person                                                                                                     *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.fetchPersonTableData = function () {
            PersonService.findAll().then(function (data) {
                $scope.persons = data;
            });
        };
        $scope.newPerson = function () {
            ModalProvider.openPersonCreateModel().result.then(function (data) {
                return $scope.persons.splice(0, 0, data);
            });
        };
        $scope.deletePerson = function (person) {
            ModalProvider.openConfirmModel("حذف المستخدمين", "delete", "هل تود حذف المستخدم فعلاً؟").result.then(function (value) {
                if (value) {
                    PersonService.remove(person.id).then(function () {
                        var index = $scope.persons.indexOf(person);
                        $scope.persons.splice(index, 1);
                    });
                }
            });
        };
        $scope.rowMenuPerson = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newPerson();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openPersonUpdateModel($itemScope.person);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deletePerson($itemScope.person);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Team                                                                                                       *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.fetchTeamTableData = function () {
            TeamService.findAll().then(function (data) {
                $scope.teams = data;
            });
        };
        $scope.newTeam = function () {
            ModalProvider.openTeamCreateModel().result.then(function (data) {
                return $scope.teams.splice(0, 0, data);
            });
        };
        $scope.deleteTeam = function (team) {
            ModalProvider.openConfirmModel("حذف مجموعات الصلاحيات", "delete", "هل تود حذف المجموعة فعلاً؟").result.then(function (value) {
                if (value) {
                    TeamService.remove(team.id).then(function () {
                        var index = $scope.teams.indexOf(team);
                        $scope.teams.splice(index, 1);
                    });
                }
            });
        };
        $scope.rowMenuTeam = [
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/add.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>جديد...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newTeam();
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/edit.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>تعديل...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openTeamUpdateModel($itemScope.team);
                }
            },
            {
                html: '<div class="drop-menu">' +
                '<img src="/ui/img/' + $rootScope.iconSet + '/delete.' + $rootScope.iconSetType + '" width="24" height="24">' +
                '<span>حذف...</span>' +
                '</div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteTeam($itemScope.team);
                }
            }
        ];

        /**************************************************************************************************************
         *                                                                                                            *
         * Profile                                                                                                    *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.submitProfile = function () {
            PersonService.updateProfile($rootScope.me).then(function (data) {
                $rootScope.me = data;
            });
        };
        $scope.browseProfilePhoto = function () {
            document.getElementById('uploader-profile').click();
        };
        $scope.uploadProfilePhoto = function (files) {
            PersonService.uploadContactPhoto(files[0]).then(function (data) {
                $rootScope.me.logo = data;
                PersonService.update($rootScope.me).then(function (data) {
                    $rootScope.me = data;
                });
            });
        };

        /**************************************************************************************************************
         *                                                                                                            *
         * Print                                                                                                      *
         *                                                                                                            *
         **************************************************************************************************************/
        $scope.printToCart = function (printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWindow.document.open();
            popupWindow.document.write('' +
                '<html>' +
                '<head>' +
                '<link rel="stylesheet" type="text/css" href="/ui/app.css" />' +
                '<link rel="stylesheet" type="text/css" href="/ui/css/style.css" />' +
                '</head>' +
                '<body onload="window.print()">' + innerContents + '' +
                '</html>'
            );
            popupWindow.document.close();
        };

        $timeout(function () {
            CompanyService.get().then(function (data) {
                $scope.selectedCompany = data;
            });
            BranchService.fetchBranchMasterCourse().then(function (data) {
                $scope.branches = data;
            });
            PersonService.findAllCombo().then(function (data) {
                $scope.personsCombo = data;
            });
            AttachTypeService.findAll().then(function (data) {
                $scope.attachTypes = data;
            });
            window.componentHandler.upgradeAllRegistered();
        }, 800);

    }]);