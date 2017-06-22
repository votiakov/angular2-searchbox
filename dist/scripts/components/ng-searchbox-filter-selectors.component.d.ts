import { AfterViewInit } from '@angular/core';
import { NgSearchboxAddedFilter } from '../components/ng-searchbox-added-filter.component';
import { Search, ModifiedSearch } from '../definitions/search';
import { NgSearchboxComponent } from '../components/ng-searchbox.component';
export declare class NgSearchboxFilterSelectors implements AfterViewInit {
    private ngAddedFilter;
    filter: ModifiedSearch.ModifiedFilter;
    searchbox: NgSearchboxComponent;
    selectors: Search.Selector[];
    constructor(ngAddedFilter: NgSearchboxAddedFilter);
    takeSelector(selector: Search.Selector): void;
    getDefaultSelector(): NgSearchboxFilterSelectors;
    ngAfterViewInit(): void;
}
