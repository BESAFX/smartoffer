app.service('ModalProvider', ['$uibModal', '$log', function ($uibModal, $log) {

    /**************************************************************
     *                                                            *
     * Branch Model                                               *
     *                                                            *
     *************************************************************/
    this.openBranchCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/branch/branchCreateUpdate.html',
            controller: 'branchCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'فرع جديد';
                },
                action: function () {
                    return 'create';
                },
                branch: function () {
                    return {};
                }
            }
        });
    };

    this.openBranchUpdateModel = function (branch) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/branch/branchCreateUpdate.html',
            controller: 'branchCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'تعديل بيانات فرع';
                },
                action: function () {
                    return 'update';
                },
                branch: function () {
                    return branch;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * MasterCategory Model                                       *
     *                                                            *
     *************************************************************/
    this.openMasterCategoryCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/masterCategory/masterCategoryCreateUpdate.html',
            controller: 'masterCategoryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تصنيف جديد';
                },
                action: function () {
                    return 'create';
                },
                masterCategory: function () {
                    return {};
                }
            }
        });
    };

    this.openMasterCategoryUpdateModel = function (masterCategory) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/masterCategory/masterCategoryCreateUpdate.html',
            controller: 'masterCategoryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تعديل بيانات التصنيف';
                },
                action: function () {
                    return 'update';
                },
                masterCategory: function () {
                    return masterCategory;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Master Model                                               *
     *                                                            *
     *************************************************************/
    this.openMasterCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/master/masterCreateUpdate.html',
            controller: 'masterCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تخصص جديد';
                },
                action: function () {
                    return 'create';
                },
                master: function () {
                    return {};
                }
            }
        });
    };

    this.openMasterUpdateModel = function (master) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/master/masterCreateUpdate.html',
            controller: 'masterCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تعديل بيانات تخصص';
                },
                action: function () {
                    return 'update';
                },
                master: function () {
                    return master;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Offer Model                                                *
     *                                                            *
     *************************************************************/
    this.openOfferCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/offerCreateUpdate.html',
            controller: 'offerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'عرض جديد';
                },
                action: function () {
                    return 'create';
                },
                offer: function () {
                    return undefined;
                }
            }
        });
    };

    this.openOfferCopyModel = function (offer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/offerCreateUpdate.html',
            controller: 'offerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'نسخ العرض';
                },
                action: function () {
                    return 'create';
                },
                offer: function () {
                    var newOffer = jQuery.extend(true, {}, offer);
                    newOffer.id = undefined;
                    return newOffer;
                }
            }
        });
    };

    this.openOfferUpdateModel = function (offer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/offerCreateUpdate.html',
            controller: 'offerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'تعديل بيانات عرض';
                },
                action: function () {
                    return 'update';
                },
                offer: function () {
                    return offer;
                }
            }
        });
    };

    this.openOfferDetailsModel = function (offer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/offerDetails.html',
            controller: 'offerDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                offer: function () {
                    return offer;
                }
            }
        });
    };

    this.openCallCreateModel = function (offer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/callCreate.html',
            controller: 'callCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                offer: function () {
                    return offer;
                }
            }
        });
    };

    this.openOfferHeavyWorkModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/offerHeavyWork.html',
            controller: 'offerHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'دفعة من العروض';
                }
            }
        });
    };

    this.openOfferSendMessageModel = function (offers) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/offer/offerSendMessage.html',
            controller: "offerSendMessageCtrl",
            backdrop: 'static',
            keyboard: false,
            resolve: {
                offers: function () {
                    return offers;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Course Model                                               *
     *                                                            *
     *************************************************************/
    this.openCourseCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/course/courseCreateUpdate.html',
            controller: 'courseCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'دورة جديد';
                },
                action: function () {
                    return 'create';
                },
                course: function () {
                    return {};
                }
            }
        });
    };

    this.openCourseHeavyWorkModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/course/courseHeavyWork.html',
            controller: 'courseHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تسجيل دفعة من الدورات';
                }
            }
        });
    };

    this.openCourseUpdateModel = function (course) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/course/courseCreateUpdate.html',
            controller: 'courseCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تعديل بيانات دورة';
                },
                action: function () {
                    return 'update';
                },
                course: function () {
                    return course;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Account Model                                              *
     *                                                            *
     *************************************************************/
    this.openAccountCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountCreate.html',
            controller: 'accountCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });
    };

    this.openAccountUpdateModel = function (account) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountUpdate.html',
            controller: 'accountUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                account: function () {
                    return account;
                }
            }
        });
    };

    this.openAccountUpdatePriceModel = function (account) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountUpdatePrice.html',
            controller: 'accountUpdatePriceCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                account: ['AccountService', function (AccountService) {
                    return AccountService.findOne(account.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openAccountDetailsModel = function (account) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountDetails.html',
            controller: 'accountDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                account: ['AccountService', function (AccountService) {
                    return AccountService.findOne(account.id).then(function (data) {
                        return data;
                    });
                }],
                attachTypes: ['AttachTypeService', function (AttachTypeService) {
                    return AttachTypeService.findAll().then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openAccountPaymentModel = function (account) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountPayment.html',
            controller: 'accountPaymentCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                account: ['AccountService', function (AccountService) {
                    return AccountService.findOne(account.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openAccountConditionCreateModel = function (account) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountConditionCreate.html',
            controller: 'accountConditionCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                account: ['AccountService', function (AccountService) {
                    return AccountService.findOne(account.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openAccountNoteCreateModel = function (account) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountNoteCreate.html',
            controller: 'accountNoteCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                account: ['AccountService', function (AccountService) {
                    return AccountService.findOne(account.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openAccountAttachCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountAttachCreate.html',
            controller: 'accountAttachCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                attachTypes: ['AttachTypeService', function (AttachTypeService) {
                    return AttachTypeService.findAll().then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openAccountHeavyWorkModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/accountHeavyWork.html',
            controller: 'accountHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تسجيل دفعة من الطلاب';
                }
            }
        });
    };

    this.openSendMessageModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/account/sendMessage.html',
            controller: "sendMessageCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Payment Model                                              *
     *                                                            *
     *************************************************************/
    this.openPaymentCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/payment/paymentCreate.html',
            controller: 'paymentCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'سند قبض جديد';
                }
            }
        });
    };

    this.openPaymentUpdateModel = function (payment) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/payment/paymentUpdate.html',
            controller: 'paymentUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                payment: function () {
                    return payment;
                }
            }
        });
    };

    this.openPaymentHeavyWorkModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/payment/paymentHeavyWork.html',
            controller: 'paymentHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'إنشاء دفعة من سندات القبض';
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * PaymentOut Model                                           *
     *                                                            *
     *************************************************************/
    this.openPaymentOutCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/paymentOut/paymentOutCreate.html',
            controller: 'paymentOutCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'سند صرف جديد';
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * BillBuyType Model                                          *
     *                                                            *
     *************************************************************/
    this.openBillBuyTypeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuyType/billBuyTypeCreateUpdate.html',
            controller: 'billBuyTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'حساب فواتير شراء جديد';
                },
                action: function () {
                    return 'create';
                },
                billBuyType: function () {
                    return {};
                }
            }
        });
    };

    this.openBillBuyTypeUpdateModel = function (billBuyType) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuyType/billBuyTypeCreateUpdate.html',
            controller: 'billBuyTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تعديل بيانات حساب فواتير شراء';
                },
                action: function () {
                    return 'update';
                },
                billBuyType: function () {
                    return billBuyType;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * BillBuy Model                                              *
     *                                                            *
     *************************************************************/
    this.openBillBuyCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/billBuyCreateUpdate.html',
            controller: 'billBuyCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'فاتورة شراء جديدة';
                },
                action: function () {
                    return 'create';
                },
                billBuy: function () {
                    return {};
                }
            }
        });
    };

    this.openBillBuyUpdateModel = function (billBuy) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/billBuyCreateUpdate.html',
            controller: 'billBuyCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تعديل بيانات فاتورة شراء';
                },
                action: function () {
                    return 'update';
                },
                billBuy: function () {
                    return billBuy;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Bank Model                                                 *
     *                                                            *
     *************************************************************/
    this.openBankCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/bank/bankCreateUpdate.html',
            controller: 'bankCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'حساب بنكي جديد';
                },
                action: function () {
                    return 'create';
                },
                bank: function () {
                    return {};
                }
            }
        });
    };

    this.openBankUpdateModel = function (bank) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/bank/bankCreateUpdate.html',
            controller: 'bankCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'تعديل بيانات حساب بنكي';
                },
                action: function () {
                    return 'update';
                },
                bank: function () {
                    return bank;
                }
            }
        });
    };

    this.openDepositCreateModel = function (bank) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/bank/depositCreate.html',
            controller: 'depositCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'إيداع جديد';
                },
                bank: function () {
                    return bank;
                }
            }
        });
    };

    this.openWithdrawCreateModel = function (bank) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/bank/withdrawCreate.html',
            controller: 'withdrawCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return 'سحب جديد';
                },
                bank: function () {
                    return bank;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Team Model                                                 *
     *                                                            *
     *************************************************************/
    this.openTeamCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'مجموعة جديدة';
                },
                action: function () {
                    return 'create';
                },
                team: function () {
                    return undefined;
                }
            }
        });
    };

    this.openTeamUpdateModel = function (team) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'تعديل بيانات مجموعة';
                },
                action: function () {
                    return 'update';
                },
                team: function () {
                    return team;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Person Model                                               *
     *                                                            *
     *************************************************************/
    this.openPersonCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/person/personCreateUpdate.html',
            controller: 'personCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'مستخدم جديد';
                },
                action: function () {
                    return 'create';
                },
                person: function () {
                    return {};
                }
            }
        });
    };

    this.openPersonUpdateModel = function (person) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/person/personCreateUpdate.html',
            controller: 'personCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return 'تعديل بيانات مستخدم';
                },
                action: function () {
                    return 'update';
                },
                person: function () {
                    return person;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Confirm Model                                              *
     *                                                            *
     *************************************************************/
    this.openConfirmModel = function (title, icon, message) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/modal/confirmModal.html',
            controller: 'confirmModalCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return title;
                },
                icon: function () {
                    return icon;
                },
                message: function () {
                    return message;
                }
            }
        });
    };

}]);

app.service('ReportModelProvider', ['$uibModal', function ($uibModal) {

    /**************************************************************
     *                                                            *
     * Offer                                                      *
     *                                                            *
     *************************************************************/
    this.openReportOfferByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/offer/offerByBranch.html",
            controller: "offerByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportOfferByMasterModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/offer/offerByMaster.html",
            controller: "offerByMasterCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportOfferByMasterCategoryModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/offer/offerByMasterCategory.html",
            controller: "offerByMasterCategoryCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportOfferByPersonModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/offer/offerByPerson.html",
            controller: "offerByPersonCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportOfferByIdModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/offer/offerById.html",
            controller: "offerByIdCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Call                                                       *
     *                                                            *
     *************************************************************/
    this.openReportCallByPersonModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/call/callByPerson.html",
            controller: "callByPersonCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Account                                                    *
     *                                                            *
     *************************************************************/
    this.openReportPrintContractModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/printContract.html",
            controller: "printContractCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportAccountByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountByBranch.html",
            controller: "accountByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportAccountByMasterModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountByMaster.html",
            controller: "accountByMasterCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportAccountByMasterCategoryModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountByMasterCategory.html",
            controller: "accountByMasterCategoryCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportAccountByCourseModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountByCourse.html",
            controller: "accountByCourseCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportAccountStatementModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountStatement.html",
            controller: "accountStatementCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportAccountDebtByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountDebtByBranch.html",
            controller: "accountDebtByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportAccountDebtByMasterModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountDebtByMaster.html",
            controller: "accountDebtByMasterCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportAccountDebtByCourseModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/account/accountDebtByCourse.html",
            controller: "accountDebtByCourseCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Payment                                                    *
     *                                                            *
     *************************************************************/
    this.openReportPaymentByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/payment/paymentByBranch.html",
            controller: "paymentByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportPaymentByMasterModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/payment/paymentByMaster.html",
            controller: "paymentByMasterCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportPaymentByMasterCategoryModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/payment/paymentByMasterCategory.html",
            controller: "paymentByMasterCategoryCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportPaymentByCourseModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/payment/paymentByCourse.html",
            controller: "paymentByCourseCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportPaymentByAccountInModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/payment/paymentByAccountIn.html",
            controller: "paymentByAccountInCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportIncomeAnalysisByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/payment/incomeAnalysisByBranch.html",
            controller: "incomeAnalysisByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Payment Out                                                *
     *                                                            *
     *************************************************************/
    this.openReportPaymentOutByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/paymentOut/paymentOutByBranch.html",
            controller: "paymentOutByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportPaymentOutByPersonModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/paymentOut/paymentOutByPerson.html",
            controller: "paymentOutByPersonCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * BillBuy                                                    *
     *                                                            *
     *************************************************************/
    this.openReportBillBuyByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/billBuy/billBuyByBranch.html",
            controller: "billBuyByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Bank                                                       *
     *                                                            *
     *************************************************************/
    this.openReportDepositByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/deposit/depositByBranch.html",
            controller: "depositByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportDepositByBankModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/deposit/depositByBank.html",
            controller: "depositByBankCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportWithdrawByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/withdraw/withdrawByBranch.html",
            controller: "withdrawByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportWithdrawByBankModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/withdraw/withdrawByBank.html",
            controller: "withdrawByBankCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Chart                                                      *
     *                                                            *
     *************************************************************/
    this.openReportChartOffersCountAverageByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/chart/offersCountAverageByBranch.html",
            controller: "offersCountAverageByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportChartOffersCountAverageByMasterModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/chart/offersCountAverageByMaster.html",
            controller: "offersCountAverageByMasterCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportChartOffersPriceAverageByBranchModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/chart/offersPriceAverageByBranch.html",
            controller: "offersPriceAverageByBranchCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };
    this.openReportChartOffersPriceAverageByMasterModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/chart/offersPriceAverageByMaster.html",
            controller: "offersPriceAverageByMasterCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

}]);

app.service('NotificationProvider', ['$http', function ($http) {

    this.notifyOne = function (code, title, message, type, receiver) {
        $http.post("/notifyOne?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
            + '&'
            + 'receiver=' + receiver);
    };
    this.notifyAll = function (code, title, message, type) {
        $http.post("/notifyAll?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };
    this.notifyOthers = function (code, title, message, type) {
        $http.post("/notifyOthers?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };

}]);

