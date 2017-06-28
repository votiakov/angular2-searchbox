"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var domhandler_1 = require("primeng/components/dom/domhandler");
var ObjectUtils_1 = require("primeng/components/utils/ObjectUtils");
// import { AbstractControl, ControlValueAccessor } from '@angular/forms';
var forms_1 = require("@angular/forms");
var autocomplete_1 = require("primeng/components/autocomplete/autocomplete");
var strip_tags_pipe_1 = require("angular-pipes/src/string/strip-tags.pipe");
var _ = require("lodash");
var EaAutoComplete = EaAutoComplete_1 = (function (_super) {
    __extends(EaAutoComplete, _super);
    function EaAutoComplete(el, domHandler, renderer, objectUtils, cd, stripTags) {
        var _this = _super.call(this, el, domHandler, renderer, objectUtils, cd) || this;
        _this.stripTags = stripTags;
        _this._selectedItems = [];
        _this.notSelectableFn = function (item) {
            if (_this.notSelectable != null) {
                var getType = {};
                if (getType.toString.call(_this.notSelectable) === '[object Function]') {
                    return _this.notSelectable(item);
                }
                else {
                    return !!_this.notSelectable;
                }
            }
            else {
                return false;
            }
        };
        _this.key = null;
        _this.minLength = 0;
        _this.required = false;
        return _this;
    }
    Object.defineProperty(EaAutoComplete.prototype, "selectedItems", {
        get: function () {
            var _this = this;
            if (this.multiple) {
                if (this.value.length === this._selectedItems.length) {
                    return this._selectedItems;
                }
                else {
                    _.each(this.value, function (val) {
                        if (_this.key) {
                            if (_.findIndex(_this._selectedItems, function (i) { return i[_this.key] === val; }) < 0) {
                                var item = _.find(_this.suggestions, function (s) { return s[_this.key] === val; });
                                if (item) {
                                    _this._selectedItems.push(item);
                                }
                            }
                        }
                        else {
                            if (_.findIndex(_this._selectedItems, function (i) { return i === val; }) < 0) {
                                var item = _.find(_this.suggestions, function (s) { return s === val; });
                                if (item) {
                                    _this._selectedItems.push(item);
                                }
                            }
                        }
                    });
                }
            }
            else {
                if (this.key) {
                    if (!this._selectedItems || !this._selectedItems.length || this._selectedItems[0] && this._selectedItems[0][this.key] !== this.value) {
                        var item = _.find(this.suggestions, function (s) { return s[_this.key] === _this.value; });
                        if (item) {
                            this._selectedItems = [item];
                        }
                    }
                }
                else {
                    if (!this._selectedItems || this._selectedItems[0] !== this.value) {
                        var item = _.find(this.suggestions, function (s) { return s === _this.value; });
                        if (item) {
                            this._selectedItems = [item];
                        }
                    }
                }
            }
            return (this._selectedItems || []);
        },
        set: function (newItems) {
            this._selectedItems = newItems;
        },
        enumerable: true,
        configurable: true
    });
    EaAutoComplete.prototype.onInput = function (event) {
        var _this = this;
        var thisMemo = this;
        var value = event.target.value;
        if (this.value && !this.multiple) {
            this.onModelChange(undefined);
            this.value = undefined;
            this.selectedItems = [];
        }
        if (value.length >= this.minLength) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                thisMemo.search(event, (_this.inputEL || _this.multiInputEL).nativeElement.value);
            }, this.delay);
        }
        else {
            if ((this.completeMethod.observers || []).length > 0) {
                this.suggestions = null;
            }
        }
        this.updateFilledState();
    };
    EaAutoComplete.prototype.shouldFloatMultiPlaceholder = function () {
        if (!this.focus && this.value && this.value.length > 0 && this.floatPlaceholder !== 'never') {
            return 'always';
        }
        else {
            return this.floatPlaceholder;
        }
    };
    EaAutoComplete.prototype.selectItem = function (option, event) {
        if (this.notSelectableFn(option)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return null;
        }
        if (this.multiple) {
            this.multiInputEL.nativeElement.value = '';
            if (!(this.value instanceof Array)) {
                this.value = [];
            }
            this.selectedItems = this.selectedItems || [];
            if (!this.isSelected(option)) {
                this.selectedItems = this.selectedItems.concat([option]);
                if (this.key) {
                    this.value = this.value.concat([option[this.key]]);
                }
                else {
                    this.value = this.value.concat([option]);
                }
                this.onModelChange(this.value);
            }
        }
        else {
            this.selectedItems = [option];
            this.inputEL.nativeElement.value = this.stripTags.transform(this.field ? (option || {})[this.field] : option);
            if (this.key) {
                this.value = option[this.key];
            }
            else {
                this.value = option;
            }
            this.onModelChange(this.value);
        }
        this.onSelect.emit(option);
        // if (this.multiple) {
        // 	this.focusInput();
        // }
    };
    EaAutoComplete.prototype.isSelected = function (val) {
        var selected = false;
        if (this.value && this.value.length && this.multiple) {
            for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                var i = _a[_i];
                if (this.key) {
                    if (i === val[this.key]) {
                        selected = true;
                        break;
                    }
                }
                else {
                    if (this.objectUtils.equals(i, val, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        return selected;
    };
    EaAutoComplete.prototype.writeValue = function (value) {
        this.value = value;
        this.filled = this.value && this.value !== '';
    };
    EaAutoComplete.prototype.removeItem = function (item) {
        var _this = this;
        if (!this.disabled) {
            var itemIndex_1 = this.domHandler.index(item);
            var removedValue_1 = this.value[itemIndex_1];
            this.value = this.value.filter(function (val, i) { return i !== itemIndex_1; });
            this.onUnselect.emit(removedValue_1);
            var index = -1;
            if (this.key) {
                index = _.findIndex(this.selectedItems, function (i) { return i[_this.key] == removedValue_1; });
            }
            else {
                index = _.findIndex(this.selectedItems, function (i) { return i == removedValue_1; });
            }
            if (index >= 0) {
                this.selectedItems.splice(index, 1);
            }
            this.onModelChange(this.value);
            if (this.multiInputEL) {
                setTimeout(function () {
                    _this.multiInputEL.nativeElement.blur();
                }, 0);
            }
        }
    };
    EaAutoComplete.prototype.onInputBlur = function (event) {
        if (!this.value) {
            event.target.value = '';
        }
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    EaAutoComplete.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.search(event, event && event.target && event.target.value ? event.target.value : '');
        this.onFocus.emit(event);
    };
    EaAutoComplete.prototype.search = function (event, searchTerm) {
        var _this = this;
        if (searchTerm === void 0) { searchTerm = null; }
        // allow empty string but not undefined or null
        if (searchTerm === undefined || searchTerm === null) {
            return;
        }
        if ((this.completeMethod.observers || []).length > 0) {
            this.completeMethod.emit({ originalEvent: event, query: searchTerm });
        }
        else {
            setTimeout(function () {
                if (!_this.suggestionsMemo) {
                    _this.suggestionsMemo = _this.suggestions.slice();
                }
                else {
                    if (searchTerm.length === 0) {
                        _this.suggestions = _this.suggestionsMemo;
                        return;
                    }
                }
                if (_this.field) {
                    _this.suggestions = _.filter(_this.suggestions, function (s) { return (s[_this.field] || '').toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; });
                }
                else {
                    _this.suggestions = _.filter(_this.suggestions, function (s) { return (s || '').toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; });
                }
            }, 10);
        }
    };
    EaAutoComplete.prototype.getValue = function (value, field) {
        var _this = this;
        if (this.key) {
            var obj = _.find(this.selectedItems || [], function (item) { return item[_this.key] === value; });
            return (obj || {})[field];
        }
        else {
            return this.objectUtils.resolveFieldData(value, field) || value;
        }
    };
    EaAutoComplete.prototype.align = function () {
        if (this.appendTo) {
            this.absolutePositionLeft(this.panelEL.nativeElement, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
        }
        else {
            this.domHandler.relativePosition(this.panelEL.nativeElement, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
        }
    };
    EaAutoComplete.prototype.clearSelection = function () {
        if (!this.disabled) {
            this.onModelChange(undefined);
            this.value = undefined;
            this.selectedItems = [];
        }
    };
    EaAutoComplete.prototype.absolutePositionLeft = function (element, target) {
        var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.domHandler.getHiddenElementDimensions(element);
        var elementOuterHeight = elementDimensions.height;
        var elementOuterWidth = elementDimensions.width;
        var targetOuterHeight = target.offsetHeight;
        var targetOuterWidth = target.offsetWidth;
        var targetOffset = target.getBoundingClientRect();
        var windowScrollTop = this.domHandler.getWindowScrollTop();
        var windowScrollLeft = this.domHandler.getWindowScrollLeft();
        var viewport = this.domHandler.getViewport();
        var top;
        var left;
        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = 0 + windowScrollTop;
            }
        }
        else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }
        left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    };
    return EaAutoComplete;
}(autocomplete_1.AutoComplete));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EaAutoComplete.prototype, "floatPlaceholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EaAutoComplete.prototype, "key", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EaAutoComplete.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EaAutoComplete.prototype, "notSelectable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EaAutoComplete.prototype, "multi", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EaAutoComplete.prototype, "_selectedItems", void 0);
EaAutoComplete = EaAutoComplete_1 = __decorate([
    core_1.Component({
        selector: 'ea-autoComplete',
        // templateUrl: 'template.html',
        template: "\n\t\t<span\n\t\t  [ngClass]=\"{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}\"\n\t\t  [ngStyle]=\"style\"\n\t\t  [class]=\"styleClass\"\n\t\t>\n\t\t  <div *ngIf=\"!multiple\">\n\t\t    <input\n\t\t      #in\n\t\t      [attr.type]=\"type\"\n\t\t      [attr.id]=\"inputId\"\n\t\t      [ngStyle]=\"inputStyle\"\n\t\t      [class]=\"inputStyleClass\"\n\t\t      autocomplete=\"off\"\n\t\t      [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all'\"\n\t\t      (click)=\"onInputClick($event)\"\n\t\t      [value]=\"(value ? (field ? getValue(value, field) : value) : null) | stripTags\"\n\t\t      (input)=\"onInput($event)\"\n\t\t      (keydown)=\"onKeydown($event)\"\n\t\t      (focus)=\"onInputFocus($event)\"\n\t\t      (blur)=\"onInputBlur($event)\"\n\t\t      [placeholder]=\"placeholder || ''\"\n\t\t      [attr.size]=\"size\"\n\t\t      [attr.maxlength]=\"maxlength\"\n\t\t      [attr.tabindex]=\"tabindex\"\n\t\t      [readonly]=\"readonly\"\n\t\t      [disabled]=\"disabled\"\n\t\t      [ngClass]=\"{'ui-autocomplete-input':true,'ui-autocomplete-dd-input':dropdown}\"\n\t\t      [required]=\"required\"\n\t\t    >\n\t\t    <md-icon (click)=\"clearSelection()\" class=\"clear-selection-icon\" *ngIf=\"!!value\" [ngClass]=\"{'disabled': disabled}\">clear</md-icon>\n\t\t    <md-icon class=\"dropdown-icon\" [ngClass]=\"{'disabled': disabled}\">keyboard_arrow_down</md-icon>\n\t\t  </div>\n\n\t\t  <div *ngIf=\"multiple\">\n\t\t    <ul\n\t\t      *ngIf=\"multiple\"\n\t\t      #multiContainer\n\t\t      class=\"ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all\"\n\t\t      [ngClass]=\"{'ui-state-disabled':disabled,'ui-state-focus':focus}\" (click)=\"multiIn.focus()\"\n\t\t    >\n\t\t      <li #token *ngFor=\"let val of value\" [ngClass]=\"{'ui-autocomplete-token': true, 'ui-state-highlight': !notSelectableFn(val), 'ui-autocomplete-not-selectable': notSelectableFn(val)}\">\n\t\t        <md-icon class=\"ui-autocomplete-token-icon\" (click)=\"removeItem(token)\" *ngIf=\"!disabled\">clear</md-icon>\n\t\t        <span *ngIf=\"!selectedItemTemplate\" class=\"ui-autocomplete-token-label\">{{val ? (field ? getValue(val, field) : val) : null | stripTags}}</span>\n\t\t        <ng-template *ngIf=\"selectedItemTemplate\" [pTemplateWrapper]=\"selectedItemTemplate\" [item]=\"val\"></ng-template>\n\t\t      </li>\n\t\t      <li class=\"ui-autocomplete-input-token\">\n\t\t          <input\n\t\t            #multiIn\n\t\t            [attr.type]=\"type\"\n\t\t            [attr.id]=\"inputId\"\n\t\t            [disabled]=\"disabled\"\n\t\t            [placeholder]=\"placeholder || ''\"\n\t\t            [attr.tabindex]=\"tabindex\"\n\t\t            (input)=\"onInput($event)\"\n\t\t            (click)=\"onInputClick($event)\"\n\t\t            (keydown)=\"onKeydown($event)\"\n\t\t            (focus)=\"onInputFocus($event)\"\n\t\t            (blur)=\"onInputBlur($event)\"\n\t\t            autocomplete=\"off\"\n\t\t          >\n\t\t      </li>\n\t\t    </ul>\n\t\t  </div>\n\n\t\t<!--   <button\n\t\t    type=\"button\"\n\t\t    pButton\n\t\t    icon=\" \"\n\t\t    class=\"ui-autocomplete-dropdown\"\n\t\t    [disabled]=\"disabled\"\n\t\t    (click)=\"handleDropdownClick($event)\"\n\t\t    *ngIf=\"dropdown\"\n\t\t  >\n\t\t    <md-icon>keyboard_arrow_down</md-icon>\n\t\t  </button> -->\n\n\t\t  <div\n\t\t    #panel\n\t\t    class=\"ui-autocomplete-panel ui-widget-content ui-shadow\"\n\t\t    [style.display]=\"panelVisible ? 'block' : 'none'\"\n\t\t    [style.width]=\"appendTo ? 'auto' : '100%'\"\n\t\t    [style.max-height]=\"scrollHeight\"\n\t\t  >\n\t\t    <ul class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-helper-reset\" *ngIf=\"panelVisible\">\n\t\t      <li\n\t\t        *ngFor=\"let option of suggestions; let idx = index\"\n\t\t        [ngClass]=\"{'ui-autocomplete-list-item':true,'ui-state-highlight':(highlightOption==option && !notSelectableFn(option)),'ui-autocomplete-not-selectable': notSelectableFn(option)}\"\n\t\t        (mouseenter)=\"highlightOption=option\"\n\t\t        (mouseleave)=\"highlightOption=null\"\n\t\t        (click)=\"selectItem(option, $event)\"\n\t\t      >\n\t\t        <span *ngIf=\"!itemTemplate\" [innerHtml]=\"(field ? option[field] : option) | safeHtml\"></span>\n\t\t        <ng-template *ngIf=\"itemTemplate\" [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" [index]=\"idx\"></ng-template>\n\t\t      </li>\n\t\t      <li *ngIf=\"noResults && emptyMessage\" class=\"ui-autocomplete-list-item ui-corner-all\">{{emptyMessage}}</li>\n\t\t    </ul>\n\t\t  </div>\n\t\t</span>\n\t",
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focus'
        },
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return EaAutoComplete_1; }),
                multi: true
            },
            domhandler_1.DomHandler,
            ObjectUtils_1.ObjectUtils
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, ObjectUtils_1.ObjectUtils, core_1.ChangeDetectorRef, strip_tags_pipe_1.StripTagsPipe])
], EaAutoComplete);
exports.EaAutoComplete = EaAutoComplete;
var EaAutoComplete_1;
