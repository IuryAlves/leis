"use strict";angular.module("lawsApp",["ngAnimate","ngCookies","ngSanitize","ngResource","ui.router","ngMaterial","markdown"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,a){e.rule(function(t,e){var a=e.path(),i="/"===a[a.length-1];if(i){var l=a.substr(0,a.length-1);return l}}),t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("politicianList",{url:"/politicos",templateUrl:"app/politician/list/politician_list.html",controller:"PoliticianListController"}).state("politicianDetails",{url:"/politicos/:itemId",templateUrl:"app/politician/details/politician_details.html",controller:"PoliticianDetailsController"}).state("lawList",{url:"/leis",templateUrl:"app/laws/list/laws_list.html",controller:"LawListController"}).state("lawDetails",{url:"/leis/:itemId",templateUrl:"app/laws/details/law_details.html",controller:"LawDetailsController"}),e.otherwise("/")}]),angular.module("lawsApp").controller("PoliticianListController",["$scope","$http",function(t,e){e.get("data/vereadores.json").success(function(e){t.politicians=e,t.politicianOrder="name"})}]),angular.module("lawsApp").controller("PoliticianDetailsController",["$scope","$http","$stateParams",function(t,e,a){e.get("data/vereadores.json").success(function(e){t.politicians=e,t.whichItem=a.itemId,t.prevItem=a.itemId>0?Number(a.itemId)-1:t.politicians.length-1,t.nextItem=a.itemId<t.politicians.length-1?Number(a.itemId)+1:0})}]),angular.module("lawsApp").controller("LawListController",["$scope","$http",function(t,e){e.get("data/laws.json").success(function(e){t.laws=e,t.lawOrder="name"})}]),angular.module("lawsApp").controller("LawDetailsController",["$scope","$http","$stateParams",function(t,e,a){e.get("data/laws.json").success(function(e){t.laws=e,t.law=e[a.itemId],t.prevItem=a.itemId>0?Number(a.itemId)-1:t.laws.length-1,t.nextItem=a.itemId<t.laws.length-1?Number(a.itemId)+1:0})}]).filter("markdown",["$sce",function(t){var e=new Showdown.converter;return function(a){var i=e.makeHtml(a||"");return t.trustAsHtml(i)}}]),angular.module("lawsApp").controller("NavbarCtrl",["$scope",function(t){t.date=new Date}]),angular.module("lawsApp").controller("MainCtrl",["$scope",function(t){}]),angular.module("lawsApp").run(["$templateCache",function(t){t.put("app/main/main.html",'<div><md-content><header ng-include="\'app/components/navbar/navbar.html\'"></header><section class="jumbotron"><h1>SJC Leis</h1><p class="lead">Fique por dentro de todas as leis feitas na história da cidade.</p></section><footer><md-toolbar layout="row" layout-align="center center"><p>With ♥ from <a href="https://github.com/transparenciasjc">@TranparênciaSJC</a></p></md-toolbar></footer></md-content></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center" ng-controller="NavbarCtrl"><md-button href="#/">SJC Leis</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#/leis" class="md-raised">Leis</md-button><md-button href="#/politicos" class="md-raised">Politicos</md-button></section></md-toolbar>'),t.put("app/laws/details/law_details.html",'<div><md-content><header ng-include="\'app/components/navbar/navbar.html\'"></header><section><div ng-model="laws"><a href="#/leis/{{prevItem}}">&lt;</a> <a href="#/leis/{{nextItem}}">&gt;</a><h1>{{ law.author }}</h1><div><h3>{{ law.name }}</h3><h3>{{ law.date.plain }}</h3><div>{{ law.description }}</div><br><br><div id="lawCompleteBody" ng-bind-html="law.completeBody | markdown"></div></div></div><a href="#/leis">&laquo; Voltar para leis</a></section><footer><md-toolbar layout="row" layout-align="center center"><p>With ♥ from <a href="https://github.com/transparenciasjc">@TranparênciaSJC</a></p></md-toolbar></footer></md-content></div>'),t.put("app/laws/list/laws_list.html",'<div><md-content><header ng-include="\'app/components/navbar/navbar.html\'"></header><section><div><h1>Listagem de leis</h1></div><div class="slide-animate" ng-include="" src="\'views/base/facebook.html\'"></div><div><label>Pesquisa:</label> <input ng-model="query" placeholder="Procure por leis" autofocus=""></div><br><div class="row"><div class="col-6 col-sm-6 col-lg-4" ng-repeat="item in laws | filter: query | orderBy: lawOrder:direction" style="height: 300px;"><a class="thumbnail" href="#/leis/{{laws.indexOf(item)}}"><div class="caption"><h3 style="text-transform:capitalize;">{{ item.lawId }}</h3><p>{{ item.description }}</p><p><strong>{{ item.author }}</strong></p><p><strong>{{ item.date.plain }}</strong></p></div></a></div></div></section><footer><md-toolbar layout="row" layout-align="center center"><p>With ♥ from <a href="https://github.com/transparenciasjc">@TranparênciaSJC</a></p></md-toolbar></footer></md-content></div>'),t.put("app/politician/details/politician_details.html",'<div><md-content><header ng-include="\'app/components/navbar/navbar.html\'"></header><section><div ng-model="politicians"><a href="#/details/{{prevItem}}"><span class="glyphicon glyphicon-chevron-left"></span></a> <a href="#/details/{{nextItem}}"><span class="glyphicon glyphicon-chevron-right"></span></a><h1>{{politicians[whichItem].NOME_URNA_CANDIDATO}}</h1><div><h3>{{politicians[whichItem].NOME_PARTIDO}}</h3><img ng-src="{{politicians[whichItem].FOTO}}" alt="Photo of {{politicians[whichItem].name}}"><div>{{politicians[whichItem].DESCRICAO_GRAU_INSTRUCAO}}</div></div><div ng-include="" src="\'views/base/timeline.html\'"></div></div><a href="#/politicos">&laquo; Voltar</a></section><footer><md-toolbar layout="row" layout-align="center center"><p>With ♥ from <a href="https://github.com/transparenciasjc">@TranparênciaSJC</a></p></md-toolbar></footer></md-content></div>'),t.put("app/politician/list/politician_list.html",'<div><md-content><header ng-include="\'app/components/navbar/navbar.html\'"></header><section><div><h1>Politician Directory</h1></div><div class="slide-animate" ng-include="" src="\'views/base/facebook.html\'"></div><label>Pesquise:</label> <input ng-model="query" placeholder="Procure pelos vereadores" autofocus=""><div ng-repeat="item in politicians | filter: query | orderBy: politicianOrder:direction"><a href="#/politicos/{{politicians.indexOf(item)}}"><img ng-src="{{ item.FOTO }}" class="md-card-image" alt="Photo of {{item.name}}"> {{ item.NOME_URNA_CANDIDATO.toLowerCase() }}<br>{{ item.NOME_PARTIDO }}</a></div></section><footer><md-toolbar layout="row" layout-align="center center"><p>With ♥ from <a href="https://github.com/transparenciasjc">@TranparênciaSJC</a></p></md-toolbar></footer></md-content></div>')}]);