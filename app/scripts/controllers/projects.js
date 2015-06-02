'use strict';

/**
 * @ngdoc function
 * @name giantSteps2App.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the giantSteps2App
 */
angular.module('giantSteps2App').controller('ProjectsCtrl', [
	'$scope',
	'$sce',
	'contentFarm',
	'markdownService',
	function ($scope, $sce, contentFarm, markdownService) {

		$scope.projects = {};
		$scope.objActive = true;
		$scope.workActive = false;
		$scope.consortActive = false;
		$scope.current = '';

		$scope.loading = true;

		contentFarm.textIndex().then(function(response){
			// ------------------------------------------------
			// Convert markdown for about text
			//
			$scope.projects = response[0];
			console.log($scope.projects);


			markdownService.convert($scope.projects.fields.consortium).then(function (response){
				$scope.projects.fields.consortium = response;

				markdownService.convert($scope.projects.fields.projectObjectives).then(function (response){
					$scope.projects.fields.projectObjectives = response;

					markdownService.convert($scope.projects.fields.workPlan).then(function (response){
						$scope.projects.fields.workPlan = response;
						$scope.loading = false;

						$scope.current = $scope.projects.fields.projectObjectives;
					});

				});
			});
			
		});

		$scope.trust = function(text){
			return $sce.trustAsHtml(text);
		};

		



		$scope.switch = function(topic){
			
			$scope.objActive = false;
			$scope.workActive = false;
			$scope.consortActive = false;





			if (topic === 'objectives'){
				$scope.objActive = true;
				$scope.current = $scope.projects.fields.projectObjectives;
			}
			else if (topic === 'workplan'){
				$scope.workActive = true;
				$scope.current = $scope.projects.fields.workPlan;
			}

			else if (topic === 'consortium'){
				$scope.consortActive = true;
				$scope.current = 'consortium';
				$scope.current = $scope.projects.fields.consortium;
			}
		};

	}
]);
