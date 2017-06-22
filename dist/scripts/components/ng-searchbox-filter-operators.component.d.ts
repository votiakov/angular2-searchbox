import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgSearchboxAddedFilter } from './ng-searchbox-added-filter.component';
import { FilteringService } from '../services/filtering.service';
import { ModifiedSearch, Search } from '../definitions/search';
import { NgSearchboxComponent } from '../components/ng-searchbox.component';
import { BehaviorSubject } from 'rxjs/Rx';
export declare class NgSearchboxFilterOperators implements AfterViewInit {
    private ngAddedFilter;
    private window;
    private changeDetectorRef;
    private element;
    filter: ModifiedSearch.ModifiedFilter;
    searchbox: NgSearchboxComponent;
    operators: Search.Operator[];
    operatorsSubject: BehaviorSubject<Search.Operator[]>;
    selectedOperator: Search.Operator;
    Filtering: FilteringService;
    showOperators: boolean;
    hasOperator: boolean;
    private proxiedFunction;
    constructor(ngAddedFilter: NgSearchboxAddedFilter, window: Window, changeDetectorRef: ChangeDetectorRef, element: ElementRef);
    toggleOperators(show?: boolean): void;
    private windowClicked(event);
    takeOperator(operator: Search.Operator): void;
    getDefaultOperator(): NgSearchboxFilterOperators;
    addOperatorToFilter(): NgSearchboxFilterOperators;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
