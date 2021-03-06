import { OnInit, OnChanges, AfterViewInit, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { EventHandling } from '../services/event-handling.service';
import { API } from '../services/api.service';
import { FilteringService } from '../services/filtering.service';
import { PlaceholdersService } from '../services/placeholders.service';
import { Search } from '../definitions/search';
import { NgSearchboxAddedFiltersWrapper } from './ng-searchbox-added-filters-wrapper.component';
import { MemoryService } from '../services/memory.service';
export declare class NgSearchboxComponent implements OnInit, OnChanges, AfterViewInit {
    element: ElementRef;
    private memory;
    private changeDetectorRef;
    utils: UtilsService;
    private window;
    ngSearchboxAddedFiltersWrapper: NgSearchboxAddedFiltersWrapper;
    searchParams: Search.Parameters;
    ngSearchBoxFiltering: Search.AvailableFilter[];
    ngSearchBoxConfig: any;
    ngSearchBoxAutoComplete: any;
    ngSearchBoxCacheFilter: boolean;
    ngSearchBoxEnableFilterOperators: boolean;
    ngSearchBoxFilterSelectors: any;
    ngSearchBoxFilterOperators: any;
    placeholder: string;
    onRegisterApi: EventEmitter<API>;
    onChange: EventEmitter<Search.BindingEventChange>;
    Placeholding: PlaceholdersService;
    Filtering: FilteringService;
    Event: EventHandling;
    Api: API;
    query: string;
    previousQuery: string;
    hasQuery: boolean;
    sid: string;
    timer: any;
    defaultParams: Search.Parameters;
    constructor(element: ElementRef, memory: MemoryService, changeDetectorRef: ChangeDetectorRef, utils: UtilsService, window: Window);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    emit(name: string, data?: any): NgSearchboxComponent;
    queryChange(val: string): void;
    onKeyDown(event: any): void;
    configure(): NgSearchboxComponent;
    register(): NgSearchboxComponent;
    eraseQuery(): void;
    handleSearch(): void;
    handleEraser(): void;
    handleGarbage(): void;
}
