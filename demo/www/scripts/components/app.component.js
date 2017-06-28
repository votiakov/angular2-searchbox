'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.operators = [
            {
                name: "CUSTOM NOT",
                selected: false
            },
            {
                name: "CUSTOM AND",
                selected: true
            }, {
                name: "CUSTOM OR",
                selected: false
            }
        ];
        this.selectors = [
            {
                name: "CUSTOM CONTAINS",
                key: "contains"
            },
            {
                name: "CUSTOM NOT CONTAINS",
                key: "does_not_contain"
            },
            {
                name: "CUSTOM EQUALS",
                key: "equals"
            },
            {
                name: "CUSTOM NOT EQUALS",
                key: "not_equals"
            },
            {
                name: "CUSTOM STARTS WITH",
                key: "starts_with"
            },
            {
                name: "CUSTOM ENDS WITH",
                key: "ends_with"
            },
            {
                name: "CUSTOM SIMILARITY",
                key: "similarity"
            },
        ];
        this.tybFilters = [
            {
                'name': 'cpi',
                'displayName': 'CPI',
                'root': 'Product',
                'validation': 'length=3',
                'excluded': true
            }, {
                'name': 'vendor_desc',
                'displayName': 'Vendor Description',
                'root': 'Product',
                'validation': 'between=3,6 numeric'
            }, {
                'name': 'vendor_abbr',
                'displayName': 'Vendor Abbreviation',
                'root': 'Product',
                'multi': true
            }, {
                'name': 'vendor_sku',
                'displayName': 'Vendor SKU',
                'multi': true,
                'root': 'Product',
                'middleware': [function (val) {
                        return val + ' test';
                    }, function (val) {
                        return val + ' test 2';
                    }]
            }, {
                'name': 'color',
                'displayName': 'Vendor Color',
                'suggestedValues': [
                    { label: 'Yellow', value: "some-id-uuid-123-123" },
                    { label: 'Red', value: "some-id-uuid-123-123" },
                    { label: 'Black', value: "some-id-uuid-123-123" },
                    { label: 'Green', value: "some-id-uuid-123-123" }
                ],
                'restrictedSuggestedValues': true,
                'root': 'Product'
            }, {
                'name': 'gender',
                'displayName': 'Vendor Gender',
                'suggestedValues': 'GENDER',
                'suggestedDataPoint': 'data',
                'reloadOnCreate': true,
                'restrictedSuggestedValues': true,
                'multi': true,
                'root': 'Product'
            }, {
                'name': 'product_type',
                'displayName': 'Product Type',
                'root': 'Product'
            }, {
                'name': 'upc',
                'displayName': 'UPC',
                'child': 'Size'
            }
        ];
        this.tybConfig = {
            'delay': 1000,
            'placeholders': [
                'Enter your query here...',
                'Products will be searched via this query',
                'You can enter any search term you\'d like'
            ],
            'placeholderInterval': 3000,
            'placeholderSpeedOutInterval': 15,
            'placeholderSpeedInInterval': 100
        };
    }
    AppComponent.prototype.register = function (api) {
        var _this = this;
        console.log(api);
        api
            .on('onQueryAdded', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('added', args);
        })
            .on('onEraser', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('eraser', args);
        })
            .on('onQueryRemoved', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('removed', args);
        })
            .on('onFilterChanged', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('filter', args);
        })
            .on('onChange', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('change...', args);
        });
        console.log(this.tybFilters, this.tybFilters.length);
        setTimeout(function () {
            console.log(_this.tybFilters, _this.tybFilters.length);
        }, 1000);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        'selector': 'app',
        'templateUrl': 'views/components/app.html',
        'styleUrls': []
    })
], AppComponent);
exports.AppComponent = AppComponent;
