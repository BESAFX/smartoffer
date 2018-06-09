app.controller('accountAttachCreateCtrl', [
    'BranchService',
    'AccountService',
    'AccountAttachService',
    'ModalProvider',
    '$rootScope',
    '$scope',
    '$timeout',
    '$log',
    '$uibModalInstance',
    'attachTypes',
    function (
        BranchService,
        AccountService,
        AccountAttachService,
        ModalProvider,
        $rootScope,
        $scope,
        $timeout,
        $log,
        $uibModalInstance,
        attachTypes
    ) {

        $scope.buffer = {};

        $scope.buffer.searchBy = 'fullName';

        $scope.accounts = [];

        $scope.attachTypes = attachTypes;

        $scope.files = [];

        $scope.searchAccount = function ($select, $event) {

            // no event means first load!
            if (!$event) {
                $scope.accounts = [];
            } else {
                $event.stopPropagation();
                $event.preventDefault();
            }

            var search = [];

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

            if($scope.buffer.branch){
                search.push('branchIds=');
                var branchIds = [];
                branchIds.push($scope.buffer.branch.id);
                search.push(branchIds);
                search.push('&');
            }

            search.push('searchType=');
            search.push('and');
            search.push('&');

            return AccountService.filterWithAttaches(search.join("")).then(function (data) {
                return $scope.accounts = data.content;
            });

        };

        $scope.refreshAttaches = function () {
            AccountAttachService.findByAccount($scope.buffer.account).then(function (data) {
                $scope.buffer.account.accountAttaches = data;
            });
        };

        $scope.setAccountAttachType = function (accountAttach) {
            AccountAttachService.setType(accountAttach, accountAttach.attachType);
        };
        
        $scope.deleteAttach = function (accountAttach) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المستند فعلاً؟", "error", "fa-ban", function () {
                AccountAttachService.remove(accountAttach).then(function (data) {
                    if (data) {
                        var index = $scope.buffer.account.accountAttaches.indexOf(accountAttach);
                        $scope.buffer.account.accountAttaches.splice(index, 1);
                    } else {
                        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المستند نهائياً؟", "error", "fa-ban", function () {
                            AccountAttachService.removeWhatever(accountAttach);
                        });
                    }
                });
            });
        };
        
        $scope.selectFiles = function () {
            document.getElementById('uploader').click();
        };

        //////////////////////////Scan Manager///////////////////////////////////
        $scope.scanToJpg = function() {
            scanner.scan(displayImagesOnPage,
                {
                    "output_settings" :
                        [
                            {
                                "type": "return-base64",
                                "format": "jpg"
                            }
                        ]
                }
            );
        };

        function displayImagesOnPage(successful, mesg, response) {
            var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
            for(var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
                var scannedImage = scannedImages[i];
                var blob = dataURItoBlob(scannedImage.src);
                var file = new File([blob], Math.floor((Math.random() * 50000) + 1) + '.jpg');
                $scope.files.push(file);
            }
            $scope.uploadFiles();
        }

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }
        //////////////////////////Scan Manager///////////////////////////////////

        $scope.uploadFiles = function () {
            if ($scope.files.length > 0) {
                AccountAttachService.upload($scope.buffer.account, $scope.files).then(function (data) {
                    return Array.prototype.push.apply($scope.buffer.account.accountAttaches, data);
                });
            }else{
                ModalProvider.openConfirmModel('العقود', 'attach_file', 'فضلاً اختر على الأقل ملف واحد للتحميل');
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            BranchService.fetchBranchCombo().then(function (data) {
                $scope.branches = data;
                $scope.buffer.branch = data[0];
            });
            window.componentHandler.upgradeAllRegistered();
        }, 600);

    }]);