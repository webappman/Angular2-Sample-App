"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.usersBaseUrl = '/api/users';
        this.ordersBaseUrl = '/api/orders';
    }
    DataService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.usersBaseUrl)
            .map(function (res) {
            var users = res.json();
            _this.calculateUsersOrderTotal(users);
            return users;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUsersPage = function (page, pageSize) {
        var _this = this;
        return this.http.get(this.usersBaseUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('X-InlineCount');
            var users = res.json();
            _this.calculateUsersOrderTotal(users);
            return {
                results: users,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUser = function (id) {
        var _this = this;
        return this.http.get(this.usersBaseUrl + '/' + id)
            .map(function (res) {
            var user = res.json();
            _this.calculateUsersOrderTotal([user]);
            return user;
        })
            .catch(this.handleError);
    };
    DataService.prototype.insertUser = function (user) {
        return this.http.post(this.usersBaseUrl, user)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.updateUser = function (user) {
        return this.http.put(this.usersBaseUrl + '/' + user.id, user)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.deleteUser = function (id) {
        return this.http.delete(this.usersBaseUrl + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    DataService.prototype.getStates = function () {
        return this.http.get('/api/states')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    //Not using now but leaving since they show how to create
    //and work with custom observables
    DataService.prototype.createObservable = function (data) {
        return Observable_1.Observable.create(function (observer) {
            observer.next(data);
            observer.complete();
        });
    };
    DataService.prototype.calculateUsersOrderTotal = function (users) {
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            if (user && user.orders) {
                var total = 0;
                for (var _a = 0, _b = user.orders; _a < _b.length; _a++) {
                    var order = _b[_a];
                    total += order.itemCost;
                }
                user.orderTotal = total;
            }
        }
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map