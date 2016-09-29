'use strict';

import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  AfterViewInit,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';

import {
  NgSearchboxTemplate
} from '../ng.templates';

import {
  NgSearchboxStyle
} from '../ng.styles';

import {
  UtilsService
} from '../services/utils.service';

import {
  EventHandling
} from '../services/event-handling.service';

import {
  API
} from '../services/api.service';

import {
  FilteringService
} from '../services/filtering.service';

import {
  PlaceholdersService
} from '../services/placeholders.service';

import {
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  NgSearchboxAddedFiltersWrapper
} from './ng-searchbox-added-filters-wrapper.component';

import {
  MemoryService
} from '../services/memory.service';

@Component({

  'selector': 'ng-searchbox',

  'template': NgSearchboxTemplate,

  'styles': NgSearchboxStyle,

  'providers': [
    MemoryService,
    UtilsService
  ]

})

export class NgSearchboxComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('ngSearchboxAddedFiltersWrapper')

  public ngSearchboxAddedFiltersWrapper: NgSearchboxAddedFiltersWrapper;

  @Input('searchParams') searchParams: Search.Parameters = null;

  @Input('ngSearchBoxFiltering') public ngSearchBoxFiltering: Search.AvailableFilter[] = null;

  @Input('ngSearchBoxConfig') public ngSearchBoxConfig: any = null;

  @Input('ngSearchBoxAutoComplete') public ngSearchBoxAutoComplete: any = null;

  @Input('ngSearchBoxCacheFilter') public ngSearchBoxCacheFilter: boolean = false;

  @Input('ngSearchBoxEnableFilteringOperators') public ngSearchBoxEnableFilteringOperators: any = null;

  @Input('ngSearchBoxFilterSelectors') public ngSearchBoxFilterSelectors: any = null;

  @Input('ngSearchBoxFilterOperators') public ngSearchBoxFilterOperators: any = null;

  @Input('placeholder') public placeholder: string = '';

  @Output('onRegisterApi') onRegisterApi: EventEmitter<API> = new EventEmitter<API>();

  public onChange: EventEmitter<Search.BindingEventChange> = new EventEmitter<Search.BindingEventChange>();

  public Placeholding: PlaceholdersService = null;

  public Filtering: FilteringService = null;

  public Event: EventHandling = null;

  public Api: API = null;

  public query: string = <string>'';

  public previousQuery: string = <string>null;

  public hasQuery: boolean = <boolean>false;

  public sid: string = <string>'';

  public timer: any = null;

  public defaultParams: Search.Parameters = {

    'query': '',

    'filters': []

  };

  constructor (
    public element: ElementRef,
    private memory: MemoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private utils: UtilsService,
    private window: Window
  ) {

    console.log(this.memory);

    return this;

  }

  ngOnInit () {

    this.sid = this
      .utils
      .uuid();

    this
      .configure();

  }

  ngAfterViewInit () {

    let self: NgSearchboxComponent = <NgSearchboxComponent>this,

      addedFiltersWrapper: NgSearchboxAddedFiltersWrapper = this
        .ngSearchboxAddedFiltersWrapper;

    this.Api = new API();

    this.Event = new EventHandling(this.Api);

    this.Filtering = new FilteringService(
      this.Event,
      addedFiltersWrapper,
      this.utils
    );

    this.Placeholding = new PlaceholdersService(
      this
    );

    this
      .Filtering
      .getPublisher()
      .subscribe((filters: ModifiedSearch.ModifiedFilter[]): void => {

        if (self.timer) {

          self
            .window
            .clearTimeout(self.timer);

          self.timer = null;

        }

        self
          .searchParams
          .filters = filters;

        if (self.ngSearchBoxConfig && self.
          ngSearchBoxConfig
          .delay) {

            self.timer = self
              .window
              .setTimeout((): void => {

                self
                  .Event
                  .onChange(self.searchParams);

            }, self.ngSearchBoxConfig.delay);

        } else {

          self
            .Event
            .onChange(self.searchParams);

        }

      });

    let searchBoxInformationExchange: Search.SearchBoxInformationExchange = {

      'component': this

    };

    this
      .emit(

        Search.InformationChange,

        searchBoxInformationExchange

      );

    this
      .register();

    this
      .changeDetectorRef
      .detectChanges();

  }

  ngOnChanges () {

  }

  public emit (name: string, data?: any): NgSearchboxComponent  {

    this
      .onChange
      .emit({

        'name': name,

        'data': data

      });

    return this;

  }

  public queryChange (val: string): void {

    let self: NgSearchboxComponent = <NgSearchboxComponent>this;

    if (!val && !this.previousQuery && typeof val === 'string' &&

      typeof this.previousQuery === 'string') {

        return;

    }

    if (typeof val !== 'undefined') {

      self.hasQuery = (val && val.length) ? true : false;

      self
        .searchParams
        .query = val;

      if (self.timer) {

        self
          .window
          .clearTimeout(this.timer);

        self.timer = null;

      }

      if (self.ngSearchBoxConfig && self.
        ngSearchBoxConfig
        .delay) {

        self.timer = self
          .window
          .setTimeout((): void => {

            self
              .Event
              .onChange(self.searchParams)
              .onQueryAdded(val, this.previousQuery)
              .onQueryRemoved(val, this.previousQuery)

          }, self.ngSearchBoxConfig.delay);

      } else {

        self
          .Event
          .onChange(self.searchParams)
          .onQueryAdded(val, this.previousQuery)
          .onQueryRemoved(val, this.previousQuery)

      }

    }

  }

  public onKeyDown (event: any): void {

    this
      .previousQuery = event
        .target
      .value;

  }

  public configure (): NgSearchboxComponent {

    this
      .searchParams = this.defaultParams;

    return this;

  }

  public register (): NgSearchboxComponent {

    this
      .onRegisterApi
      .emit(this.Api);

    return this;

  }

  public eraseQuery (): void {

    this.previousQuery = null;

    this.query = '';

    this
      .queryChange(this.query);

  }

  public handleSearch (): void {

    this
      .Event
      .onChange(
        this
          .searchParams
      );

  }

  public handleEraser (): void {

    if (this
      .searchParams
      .query) {

        this
          .eraseQuery();

        this
          .Event
          .onEraser();


    }

  }

  public handleGarbage(): void {

    if (this
      .searchParams
      .query || this.Filtering.hasFilters) {

        this
          .eraseQuery();

        this
          .Filtering
          .removeAll();

        this
          .Event
          .onGarbage();

    }

  }

}