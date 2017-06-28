'use strict';

import * as _ from 'lodash';

import {
  Component,
  Input,
  Inject,
  forwardRef,
  AfterViewInit,
} from '@angular/core';

import {
  NgSearchboxAddedFilter
} from '../components/ng-searchbox-added-filter.component';

import {
  NgSearchboxFilterSelectorsTemplate
} from '../ng.templates';

import {
  NgSearchboxFilterSelectorsStyle
} from '../ng.styles';

import {
  SELECTORS,
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  NgSearchboxComponent
} from '../components/ng-searchbox.component';

@Component({

  'selector': 'ng-searchbox-filter-selectors',

  'template': NgSearchboxFilterSelectorsTemplate,

  'styles': NgSearchboxFilterSelectorsStyle

})

export class NgSearchboxFilterSelectors implements AfterViewInit {

  @Input('filter') filter: ModifiedSearch.ModifiedFilter = null;
  @Input('searchbox') searchbox: NgSearchboxComponent = null;

  public selectors: Search.Selector[] = _.clone(SELECTORS);

  constructor (
    @Inject(forwardRef(() => NgSearchboxAddedFilter)) private ngAddedFilter: NgSearchboxAddedFilter
  ) {

    return this;

  }

  public takeSelector (selector: Search.Selector): void {

    let self: NgSearchboxFilterSelectors = this;

    self
      .selectors
      .forEach((selector: Search.Selector): void => {

        selector.selected = false;

    });

    self
      .filter
      .selector = selector;

    selector.selected = true;

    if(self
      .filter
      .value) {

        this
          .ngAddedFilter
          .Filtering
          .update();

        this
          .ngAddedFilter
          .Event
          .onFilterSelectorChanged(
            selector,
            self.filter
          );

    }

    console.log(JSON.parse(JSON.stringify(self.filter)));
    if (!self.filter.value) {
      this
        .ngAddedFilter
        .setFocus();
    }


    self.filter.showSelectors = false;


  }

  public getDefaultSelector(): NgSearchboxFilterSelectors {

    let self: NgSearchboxFilterSelectors = this;

    setTimeout((): void => {

      if (!self
          .filter
          .selector) {

        self
          .selectors
          .forEach((selector: Search.Selector): void => {

            if (selector.selected) {

              self
                .filter
                .selector = selector;

            }

          });

        if (!self.filter.selector

          && self.selectors.length) {

          let selector: Search.Selector = self
            .selectors[0];

          selector.selected = true;

          self
            .filter
            .selector = selector;

        }

      } else {

        self
          .selectors
          .forEach((selector: Search.Selector): void => {

            selector.selected = (selector.key === self
              .filter
              .selector
              .key);

          });

      }

    }, 0);

    return this;

  }

  ngAfterViewInit () {
    if (this.searchbox && this.searchbox.ngSearchBoxFilterSelectors && this.searchbox.ngSearchBoxFilterSelectors.length) {
      this.selectors = this.searchbox.ngSearchBoxFilterSelectors;
    }

    this
      .getDefaultSelector();

  }

}