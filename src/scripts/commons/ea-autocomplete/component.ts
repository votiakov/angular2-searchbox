import { ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, OnInit, EventEmitter, Renderer2, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ObjectUtils } from 'primeng/components/utils/ObjectUtils';
// import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, FormsModule  } from '@angular/forms';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { StripTagsPipe } from 'angular-pipes/src/string/strip-tags.pipe';
import * as _ from 'lodash';

@Component({
	selector: 'ea-autoComplete',
	// templateUrl: 'template.html',
	template: `
		<span
		  [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}"
		  [ngStyle]="style"
		  [class]="styleClass"
		>
		  <div *ngIf="!multiple">
		    <input
		      #in
		      [attr.type]="type"
		      [attr.id]="inputId"
		      [ngStyle]="inputStyle"
		      [class]="inputStyleClass"
		      autocomplete="off"
		      [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all'"
		      (click)="onInputClick($event)"
		      [value]="(value ? (field ? getValue(value, field) : value) : null) | stripTags"
		      (input)="onInput($event)"
		      (keydown)="onKeydown($event)"
		      (focus)="onInputFocus($event)"
		      (blur)="onInputBlur($event)"
		      [placeholder]="placeholder || ''"
		      [attr.size]="size"
		      [attr.maxlength]="maxlength"
		      [attr.tabindex]="tabindex"
		      [readonly]="readonly"
		      [disabled]="disabled"
		      [ngClass]="{'ui-autocomplete-input':true,'ui-autocomplete-dd-input':dropdown}"
		      [required]="required"
		    >
		    <md-icon (click)="clearSelection()" class="clear-selection-icon" *ngIf="!!value" [ngClass]="{'disabled': disabled}">clear</md-icon>
		    <md-icon class="dropdown-icon" [ngClass]="{'disabled': disabled}">keyboard_arrow_down</md-icon>
		  </div>

		  <div *ngIf="multiple">
		    <ul
		      *ngIf="multiple"
		      #multiContainer
		      class="ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all"
		      [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':focus}" (click)="multiIn.focus()"
		    >
		      <li #token *ngFor="let val of value" [ngClass]="{'ui-autocomplete-token': true, 'ui-state-highlight': !notSelectableFn(val), 'ui-autocomplete-not-selectable': notSelectableFn(val)}">
		        <md-icon class="ui-autocomplete-token-icon" (click)="removeItem(token)" *ngIf="!disabled">clear</md-icon>
		        <span *ngIf="!selectedItemTemplate" class="ui-autocomplete-token-label">{{val ? (field ? getValue(val, field) : val) : null | stripTags}}</span>
		        <ng-template *ngIf="selectedItemTemplate" [pTemplateWrapper]="selectedItemTemplate" [item]="val"></ng-template>
		      </li>
		      <li class="ui-autocomplete-input-token">
		          <input
		            #multiIn
		            [attr.type]="type"
		            [attr.id]="inputId"
		            [disabled]="disabled"
		            [placeholder]="placeholder || ''"
		            [attr.tabindex]="tabindex"
		            (input)="onInput($event)"
		            (click)="onInputClick($event)"
		            (keydown)="onKeydown($event)"
		            (focus)="onInputFocus($event)"
		            (blur)="onInputBlur($event)"
		            autocomplete="off"
		          >
		      </li>
		    </ul>
		  </div>

		<!--   <button
		    type="button"
		    pButton
		    icon=" "
		    class="ui-autocomplete-dropdown"
		    [disabled]="disabled"
		    (click)="handleDropdownClick($event)"
		    *ngIf="dropdown"
		  >
		    <md-icon>keyboard_arrow_down</md-icon>
		  </button> -->

		  <div
		    #panel
		    class="ui-autocomplete-panel ui-widget-content ui-shadow"
		    [style.display]="panelVisible ? 'block' : 'none'"
		    [style.width]="appendTo ? 'auto' : '100%'"
		    [style.max-height]="scrollHeight"
		  >
		    <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-helper-reset" *ngIf="panelVisible">
		      <li
		        *ngFor="let option of suggestions; let idx = index"
		        [ngClass]="{'ui-autocomplete-list-item':true,'ui-state-highlight':(highlightOption==option && !notSelectableFn(option)),'ui-autocomplete-not-selectable': notSelectableFn(option)}"
		        (mouseenter)="highlightOption=option"
		        (mouseleave)="highlightOption=null"
		        (click)="selectItem(option, $event)"
		      >
		        <span *ngIf="!itemTemplate" [innerHtml]="(field ? option[field] : option) | safeHtml"></span>
		        <ng-template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="option" [index]="idx"></ng-template>
		      </li>
		      <li *ngIf="noResults && emptyMessage" class="ui-autocomplete-list-item ui-corner-all">{{emptyMessage}}</li>
		    </ul>
		  </div>
		</span>
	`,
	host: {
			'[class.ui-inputwrapper-filled]': 'filled',
			'[class.ui-inputwrapper-focus]': 'focus'
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => EaAutoComplete),
			multi: true
		},
		DomHandler,
		ObjectUtils
	]
})

export class EaAutoComplete extends AutoComplete {
	@Input() public floatPlaceholder;
	@Input() public key;
	@Input() public required;
	@Input() public notSelectable;
	@Input() public multi;
	@Input() public _selectedItems: any[] = [];

	private suggestionsMemo: any[];

	constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, objectUtils: ObjectUtils, cd: ChangeDetectorRef, private stripTags: StripTagsPipe) {
		super(el, domHandler, renderer, objectUtils, cd);
		this.key = null;
		this.minLength = 0;
		this.required = false;
	}

	public notSelectableFn = (item) => {
		if (this.notSelectable != null) {
			const getType = {};
			if (getType.toString.call(this.notSelectable) === '[object Function]') {
				return this.notSelectable(item);
			} else {
				return !!this.notSelectable;
			}
		} else {
			return false;
		}
	}

	public get selectedItems() {
		if (this.multiple) {
			if (this.value.length === this._selectedItems.length) {
				return this._selectedItems;
			} else {
				_.each (this.value, (val) => {
					if (this.key) {
						if (_.findIndex(this._selectedItems, (i) => i[this.key] === val) < 0) {
							const item = _.find(this.suggestions, (s) => s[this.key] === val);
							if (item) {
								this._selectedItems.push(item);
							}
						}
					} else {
						if (_.findIndex(this._selectedItems, (i) => i === val) < 0) {
							const item = _.find(this.suggestions, (s) => s === val);
							if (item) {
								this._selectedItems.push(item);
							}
						}
					}
				});
			}
		} else {
			if (this.key) {
				if (!this._selectedItems || !this._selectedItems.length || this._selectedItems[0] && this._selectedItems[0][this.key] !== this.value) {
					const item = _.find(this.suggestions, (s) => s[this.key] === this.value);
					if (item) {
						this._selectedItems = [item];
					}
				}
			} else {
				if (!this._selectedItems || this._selectedItems[0] !== this.value) {
					const item = _.find(this.suggestions, (s) => s === this.value);
					if (item) {
						this._selectedItems = [item];
					}
				}
			}
		}
		return (this._selectedItems || []);
	}

	public set selectedItems(newItems) {
		this._selectedItems = newItems;
	}

	public onInput(event) {
		const thisMemo = this;
		const value = event.target.value;
		if (this.value && !this.multiple) {
			this.onModelChange(undefined);
			this.value = undefined;
			this.selectedItems = [];
		}
		if (value.length >= this.minLength) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(() => {
				thisMemo.search(event, (this.inputEL || this.multiInputEL).nativeElement.value);
			}, this.delay);
		} else {
			if ((this.completeMethod.observers || []).length > 0)  {
				this.suggestions = null;
			}
		}
		this.updateFilledState();
	}

	public shouldFloatMultiPlaceholder() {
		if (!this.focus && this.value && this.value.length > 0 && this.floatPlaceholder !== 'never') {
			return 'always';
		} else {
			return this.floatPlaceholder;
		}
	}

	public selectItem(option, event?: Event) {
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
				} else {
					this.value = this.value.concat([option]);
				}
				this.onModelChange(this.value);
			}
		} else {
			this.selectedItems = [option];
			this.inputEL.nativeElement.value = this.stripTags.transform(this.field ? (option || {})[this.field] : option);
			if (this.key) {
				this.value = option[this.key];
			} else {
				this.value = option;
			}
			this.onModelChange(this.value);
		}
		this.onSelect.emit(option);
		// if (this.multiple) {
		// 	this.focusInput();
		// }
	}

	public isSelected(val) {
		let selected = false;
		if (this.value && this.value.length && this.multiple) {
			for (const i of this.value) {
				if (this.key) {
					if (i === val[this.key]) {
						selected = true;
						break;
					}
				} else {
					if (this.objectUtils.equals(i, val, this.dataKey)) {
						selected = true;
						break;
					}
				}
			}
		}
		return selected;
	}

	public writeValue(value) {
		this.value = value;
		this.filled = this.value && this.value !== '';
	}

	public removeItem(item) {
		if (!this.disabled) {
			const itemIndex = this.domHandler.index(item);
			const removedValue = this.value[itemIndex];
			this.value = this.value.filter((val, i) => i !== itemIndex );
			this.onUnselect.emit(removedValue);
			let index = -1;
			if (this.key) {
				index = _.findIndex(this.selectedItems, (i) => i[this.key] == removedValue);
			} else {
				index = _.findIndex(this.selectedItems, (i) => i == removedValue);
			}
			if (index >= 0) {
				this.selectedItems.splice(index, 1);
			}
			this.onModelChange(this.value);
			if (this.multiInputEL) {
				setTimeout(() => {
					this.multiInputEL.nativeElement.blur();
				}, 0);
			}
		}
	}

	public onInputBlur(event) {
		if (!this.value) {
			event.target.value = '';
		}
		this.focus = false;
		this.onModelTouched();
		this.onBlur.emit(event);
	}

	public onInputFocus(event) {
		this.focus = true;
		this.search(event, event && event.target && event.target.value ? event.target.value : '');
		this.onFocus.emit(event);
	}

	public search(event, searchTerm = null) {
		// allow empty string but not undefined or null
		if (searchTerm === undefined || searchTerm === null) {
			return;
		}
		if ((this.completeMethod.observers || []).length > 0) {
			this.completeMethod.emit({ originalEvent: event, query: searchTerm });
		} else {
			setTimeout(() => {
				if (!this.suggestionsMemo) {
					this.suggestionsMemo = [...this.suggestions];
				} else {
					if (searchTerm.length === 0) {
						this.suggestions = this.suggestionsMemo;
						return;
					}
				}
				if (this.field) {
					this.suggestions = _.filter(this.suggestions, (s) => (s[this.field] || '').toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
				} else {
					this.suggestions = _.filter(this.suggestions, (s) => (s || '').toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
				}
			}, 10);
		}
	}

	public getValue(value, field) {
		if (this.key) {
			const obj = _.find(this.selectedItems || [], (item) => item[this.key] === value);
			return (obj || {})[field];
		} else {
			return this.objectUtils.resolveFieldData(value, field) || value;
		}
	}

	public align() {
		if (this.appendTo) {
			this.absolutePositionLeft(this.panelEL.nativeElement, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
		} else {
			this.domHandler.relativePosition(this.panelEL.nativeElement, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
		}
	}

	public clearSelection() {
		if (!this.disabled) {
			this.onModelChange(undefined);
			this.value = undefined;
			this.selectedItems = [];
		}
	}

	private absolutePositionLeft(element, target) {
		const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.domHandler.getHiddenElementDimensions(element);
		const elementOuterHeight = elementDimensions.height;
		const elementOuterWidth = elementDimensions.width;
		const targetOuterHeight = target.offsetHeight;
		const targetOuterWidth = target.offsetWidth;
		const targetOffset = target.getBoundingClientRect();
		const windowScrollTop = this.domHandler.getWindowScrollTop();
		const windowScrollLeft = this.domHandler.getWindowScrollLeft();
		const viewport = this.domHandler.getViewport();
		let top;
		let left;
		if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
			top = targetOffset.top + windowScrollTop - elementOuterHeight;
			if (top < 0) {
				top = 0 + windowScrollTop;
			}
		} else {
			top = targetOuterHeight + targetOffset.top + windowScrollTop;
		}
		left = targetOffset.left + windowScrollLeft;
		element.style.top = top + 'px';
		element.style.left = left + 'px';
	}
}
