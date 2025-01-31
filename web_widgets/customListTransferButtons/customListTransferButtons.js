(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customListTransferButtons', function() {
    return {
      controllerAs: 'ctrl',
      controller: function listTransferButtonsController($scope) {

    this.moveRight = function() {
        var selection = angular.copy($scope.properties.leftListSelection);
        delete selection.$$hashKey;
        var selectionIndex = this.getItemIndex($scope.properties.leftListValues, 'persistenceId', selection.persistenceId);
        
        console.log('Move right ('+ selectionIndex +'): '+ JSON.stringify(selection));
        
        $scope.properties.leftListValues.splice(selectionIndex, 1);
        $scope.properties.leftListSelection = null;
		$scope.properties.rightListValues.push(selection);
		
		if (angular.isArray($scope.properties.rightListIds))
			$scope.properties.rightListIds.push(selection.persistenceId);
    };
    
    this.moveLeft = function() {
        var selection = angular.copy($scope.properties.rightListSelection);
        delete selection.$$hashKey;
        var selectionIndex = this.getItemIndex($scope.properties.rightListValues, 'persistenceId', selection.persistenceId);
        
        console.log('Move left ('+ selectionIndex +'): '+ JSON.stringify(selection));
        
        $scope.properties.rightListValues.splice(selectionIndex, 1);
        $scope.properties.rightListSelection = null;
        $scope.properties.leftListValues.push(selection);
		
		if (angular.isArray($scope.properties.rightListIds))
			$scope.properties.rightListIds.splice(selectionIndex, 1);
    };
    
    this.canMoveRight = function() {
        return angular.isDefined($scope.properties.leftListSelection) && $scope.properties.leftListSelection !== null;
    };
    
    this.canMoveLeft = function() {
        return angular.isDefined($scope.properties.rightListSelection) && $scope.properties.rightListSelection !== null;
    };
    
    this.getItemIndex = function(list, key, value) {
        var index = null;
        for (var i=0; index === null && i<list.length; i++) {
            if (list[i][key] == value)
                index = i;
        }
        return index;
    };
},
      template: '<div class="row text-center" style="margin-top:60px;">\n    <a class="btn btn-primary" href="" ng-click="ctrl.moveRight()" ng-disabled="!ctrl.canMoveRight()">&gt;</a>\n</div>\n<div class="row text-center" style="margin-top:20px;">\n    <a class="btn btn-primary" href="" ng-click="ctrl.moveLeft()" ng-disabled="!ctrl.canMoveLeft()">&lt;</a>\n</div>'
    };
  });
