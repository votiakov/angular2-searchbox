'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng_searchbox_component_1 = require("./components/ng-searchbox.component");
var ng_searchbox_filtering_component_1 = require("./components/ng-searchbox-filtering.component");
var ng_searchbox_added_filters_wrapper_component_1 = require("./components/ng-searchbox-added-filters-wrapper.component");
var ng_searchbox_added_filter_component_1 = require("./components/ng-searchbox-added-filter.component");
var ng_searchbox_filter_selectors_component_1 = require("./components/ng-searchbox-filter-selectors.component");
var ng_searchbox_filter_operators_component_1 = require("./components/ng-searchbox-filter-operators.component");
var ng_searchbox_auto_suggestions_component_1 = require("./components/ng-searchbox-auto-suggestions.component");
var autocomplete_1 = require("primeng/components/autocomplete/autocomplete");
var component_1 = require("./commons/ea-autocomplete/component");
var strip_tags_pipe_1 = require("angular-pipes/src/string/strip-tags.pipe");
var safe_html_pipe_1 = require("./commons/safe-html-pipe");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var NgSearchboxModule = (function () {
    function NgSearchboxModule() {
    }
    return NgSearchboxModule;
}());
NgSearchboxModule = __decorate([
    core_1.NgModule({
        'imports': [
            common_1.CommonModule,
            forms_1.FormsModule,
            autocomplete_1.AutoCompleteModule,
            material_1.MaterialModule,
            animations_1.BrowserAnimationsModule
            // OverlayContainer,
            // FullscreenOverlayContainer,
            // MdSelectionModule,
            // MdIconModule,
            // MdNativeDateModule,
            // MdSliderModule,
            // MdRadioModule
        ],
        'declarations': [
            ng_searchbox_component_1.NgSearchboxComponent,
            ng_searchbox_filtering_component_1.NgSearchboxFilteringComponent,
            ng_searchbox_added_filters_wrapper_component_1.NgSearchboxAddedFiltersWrapper,
            ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter,
            ng_searchbox_filter_selectors_component_1.NgSearchboxFilterSelectors,
            ng_searchbox_filter_operators_component_1.NgSearchboxFilterOperators,
            ng_searchbox_auto_suggestions_component_1.NgSearchboxAutoSuggestions,
            component_1.EaAutoComplete,
            strip_tags_pipe_1.StripTagsPipe,
            safe_html_pipe_1.SafeHtmlPipe,
        ],
        'providers': [
            strip_tags_pipe_1.StripTagsPipe,
            {
                'provide': Window,
                'useValue': window
            }, {
                'provide': Document,
                'useValue': document
            }
        ],
        'exports': [
            ng_searchbox_component_1.NgSearchboxComponent,
            strip_tags_pipe_1.StripTagsPipe
        ]
    })
], NgSearchboxModule);
exports.NgSearchboxModule = NgSearchboxModule;
