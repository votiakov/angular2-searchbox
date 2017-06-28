'use strict';

import {
  Component,
  ComponentFactoryResolver,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  NgSearchboxAutoSuggestionsTemplate
} from '../ng.templates';

import {
  NgSearchboxAutoSuggestionsStyle
} from '../ng.styles';

import {
  NgSearchboxComponent
} from './ng-searchbox.component';

import {
  NgSearchboxAddedFilter
} from './ng-searchbox-added-filter.component';

import {
  SELECTORS,
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  FilteringService
} from '../services/filtering.service';

@Component({

  'selector': 'ng-searchbox-auto-suggestions',

  'template': NgSearchboxAutoSuggestionsTemplate,

  'entryComponents': [
    NgSearchboxAddedFilter
  ],

  'styles': NgSearchboxAutoSuggestionsStyle

})

export class NgSearchboxAutoSuggestions {

  @ViewChild('ngSearchboxAddedFilters', { 'read': ViewContainerRef })

    public ngSearchboxAddedFiltersViewContainer: ViewContainerRef;

  @ViewChild('ngSearchboxAddedFilters')

    public ngSearchboxAddedFilters: NgSearchboxAutoSuggestions;

  @Input('observer') observer: EventEmitter<Search.BindingEventChange> = null;
  @Input('filter') filter: ModifiedSearch.ModifiedFilter = null;
  @Input('searchbox') searchbox: NgSearchboxComponent = null;
  @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();

  public Filtering: FilteringService = null;

  constructor (
    public componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectionRef: ChangeDetectorRef
  ) {

    return this;

  }

  public takeSuggestion(value) {
    // console.log(event, value);
    // event.preventDefault();
    // event.stopImmediatePropagation();

    this.valueChange.emit(value);
  }


}