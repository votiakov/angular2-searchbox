'use strict';
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
var ng_templates_1 = require("../ng.templates");
var ng_styles_1 = require("../ng.styles");
var ng_searchbox_component_1 = require("./ng-searchbox.component");
var ng_searchbox_added_filter_component_1 = require("./ng-searchbox-added-filter.component");
var NgSearchboxAutoSuggestions = (function () {
    function NgSearchboxAutoSuggestions(componentFactoryResolver, changeDetectionRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectionRef = changeDetectionRef;
        this.observer = null;
        this.filter = null;
        this.searchbox = null;
        this.valueChange = new core_1.EventEmitter();
        this.Filtering = null;
        return this;
    }
    NgSearchboxAutoSuggestions.prototype.takeSuggestion = function (value) {
        // console.log(event, value);
        // event.preventDefault();
        // event.stopImmediatePropagation();
        this.valueChange.emit(value);
    };
    return NgSearchboxAutoSuggestions;
}());
__decorate([
    core_1.ViewChild('ngSearchboxAddedFilters', { 'read': core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], NgSearchboxAutoSuggestions.prototype, "ngSearchboxAddedFiltersViewContainer", void 0);
__decorate([
    core_1.ViewChild('ngSearchboxAddedFilters'),
    __metadata("design:type", NgSearchboxAutoSuggestions)
], NgSearchboxAutoSuggestions.prototype, "ngSearchboxAddedFilters", void 0);
__decorate([
    core_1.Input('observer'),
    __metadata("design:type", core_1.EventEmitter)
], NgSearchboxAutoSuggestions.prototype, "observer", void 0);
__decorate([
    core_1.Input('filter'),
    __metadata("design:type", Object)
], NgSearchboxAutoSuggestions.prototype, "filter", void 0);
__decorate([
    core_1.Input('searchbox'),
    __metadata("design:type", ng_searchbox_component_1.NgSearchboxComponent)
], NgSearchboxAutoSuggestions.prototype, "searchbox", void 0);
__decorate([
    core_1.Output('valueChange'),
    __metadata("design:type", core_1.EventEmitter)
], NgSearchboxAutoSuggestions.prototype, "valueChange", void 0);
NgSearchboxAutoSuggestions = __decorate([
    core_1.Component({
        'selector': 'ng-searchbox-auto-suggestions',
        'template': ng_templates_1.NgSearchboxAutoSuggestionsTemplate,
        'entryComponents': [
            ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter
        ],
        'styles': ng_styles_1.NgSearchboxAutoSuggestionsStyle
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef])
], NgSearchboxAutoSuggestions);
exports.NgSearchboxAutoSuggestions = NgSearchboxAutoSuggestions;
