/*
    RWPayoutSelector module
    Provides a panel that allows the experimenter to select arbitrary fields.
    A period selector is built in!
*/
Redwood.directive("rwPayoutSelector", ["Admin", function(ra) {
    return {
        scope: {
            showPeriods: '=showPeriods',
            fields: '=fields'
        },
        link: function($scope, element, attrs) {
            ra.on_load(function() {
                $scope.periods = [1];
                $scope.selectedPeriod = 1;
                $scope.fieldSelections = {};
            })

            ra.on_set_period(function(user_id, period) {
                $scope.periods = [];
                for (var i = 1; i <= ra.periods[user_id]; i++) {
                    $scope.periods.push(i);
                }
                if (!$scope.selectedPeriod) {
                    $scope.selectedPeriod = 1;
                }
            })

            $scope.selectField = function(key) {
                ra.subjects.forEach(function(subject) {
                    ra.sendAsSubject(key, $scope.fieldSelections[key], subject.user_id);
                });
            }

            $scope.selectPeriod = function() {
                ra.subjects.forEach(function(subject) {
                    ra.sendAsSubject("payout_select_period", $scope.selectedPeriod, subject.user_id);
                });
            }

        },
        templateUrl: "/static/ExperimentComponents/html/payoutSelector.html"
    };
}]);

