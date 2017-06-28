import { ComponentFactoryResolver, EventEmitter, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { NgSearchboxComponent } from './ng-searchbox.component';
import { Search, ModifiedSearch } from '../definitions/search';
import { FilteringService } from '../services/filtering.service';
export declare class NgSearchboxAutoSuggestions {
    componentFactoryResolver: ComponentFactoryResolver;
    private changeDetectionRef;
    ngSearchboxAddedFiltersViewContainer: ViewContainerRef;
    ngSearchboxAddedFilters: NgSearchboxAutoSuggestions;
    observer: EventEmitter<Search.BindingEventChange>;
    filter: ModifiedSearch.ModifiedFilter;
    searchbox: NgSearchboxComponent;
    valueChange: EventEmitter<any>;
    Filtering: FilteringService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, changeDetectionRef: ChangeDetectorRef);
    takeSuggestion(value: any): void;
}
