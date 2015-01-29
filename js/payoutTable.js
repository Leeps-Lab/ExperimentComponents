/*
    Takes a list of payout entries, field names, and a payout function, 
    and combines them into a nice table.
    
    Entries must conform to the following structure:
        type EntryType {
            period: Number,
            // any other fields
        }
    
    payoutFunction must have the following signature:
        function(entry: EntryType): Number

    If no payout function is provided, the default redwood function is used:
        show_up_fee + points * conversion_rate

    The table only shows the fields which are listed in the fields attributes.
    If no fields attribute is provided, then all the fields are shown.
    
    Fields should have the following format:
    type Field {
        key: String,
        name: String,
        isNumber: Boolean
    }
*/
Redwood.directive("rwPayoutTable", ["RedwoodSubject", function(rs) {
    return {
        templateUrl: "/static/ExperimentComponents/html/payoutTable.html",
        scope: {
            entries: "=",
            fields: "=?",
            payoutFunction: "=?"
        },
        link: function($scope, element, attrs) {
            if (!$scope.payoutFunction) {
                $scope.payoutFunction = function(entry) {
                    return 0;
                }
            }
            $scope.showUpFee = 0;
            $scope.totalEarnings = 0;
            $scope.tablePadding = Array($scope.fields.length - 1);

            rs.on("__set_show_up_fee__", function(data) {
                $scope.showUpFee = Number(data.show_up_fee);
            });

            $scope.recomputeTotalEarnings = function() {
                var total = $scope.entries.map($scope.payoutFunction).reduce(function(sum, next) {
                    return sum + next;
                }, 0);
                $scope.totalEarnings = $scope.showUpFee + total;
            }

            $scope.$watch("showUpFee", $scope.recomputeTotalEarnings);
            $scope.$watch("payoutFunction", $scope.recomputeTotalEarnings);
            $scope.$watch("entries", $scope.recomputeTotalEarnings, true);
        }
    }
}]);