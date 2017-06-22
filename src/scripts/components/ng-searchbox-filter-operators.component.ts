'use strict';

import * as _ from 'lodash';

import {
  Component,
  Input,
  Inject,
  ElementRef,
  forwardRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  NgSearchboxFilterOperatorsTemplate
} from '../ng.templates';

import {
  NgSearchboxFilterOperatorsStyle
} from '../ng.styles';

import {
  NgSearchboxAddedFilter
} from './ng-searchbox-added-filter.component';

import {
  FilteringService
} from '../services/filtering.service';

import {
  ModifiedSearch,
  Search,
  OPERATORS
} from '../definitions/search';

import {
  NgSearchboxComponent
} from '../components/ng-searchbox.component';

import { BehaviorSubject } from 'rxjs/Rx';

@Component({

  'selector': 'ng-searchbox-filter-operators',

  'template': NgSearchboxFilterOperatorsTemplate,

  'styles': NgSearchboxFilterOperatorsStyle

})

export class NgSearchboxFilterOperators implements AfterViewInit {

  @Input('filter') filter: ModifiedSearch.ModifiedFilter = null;
  @Input('searchbox') searchbox: NgSearchboxComponent = null;

  // public operators: Search.Operator[] = _.clone(OPERATORS);
  public operators: Search.Operator[] = _.clone(OPERATORS);
  public operatorsSubject: BehaviorSubject<Search.Operator[]> = new BehaviorSubject(this.operators);

  public selectedOperator: Search.Operator = null;

  public Filtering: FilteringService = null;

  public showOperators: boolean = false;

  public hasOperator: boolean = false;

  private proxiedFunction: EventListenerOrEventListenerObject;

  constructor (
    @Inject(forwardRef(() => NgSearchboxAddedFilter)) private ngAddedFilter: NgSearchboxAddedFilter,
    @Inject(Window) private window: Window,
    private changeDetectorRef: ChangeDetectorRef,
    private element: ElementRef
  ) {

    this.Filtering = this
      .ngAddedFilter
      .Filtering;

    if (this.Filtering.getFilterCount() > 1) {

      this.hasOperator = true;

    }

    return this;

  }

  public toggleOperators (show?: boolean): void {

    let self: NgSearchboxFilterOperators = this;

    if (typeof show === 'boolean') {

      self.showOperators = show;

    } else {

      self.showOperators = !self.showOperators;

    }

    if (self.showOperators) {

      setTimeout((): void => {

        self.proxiedFunction = (event: MouseEvent): void => {

          this
            .windowClicked
            .apply(self, [event])

        };

        self
          .window
          .addEventListener('click', self.proxiedFunction);

      }, 25);

    } else {

      self
        .window
        .removeEventListener('click', this.proxiedFunction);

    }

  }

  private windowClicked (event: MouseEvent): void {

    let target = <HTMLElement>event.target,

      element: HTMLElement = this
        .element
        .nativeElement;

    if (!element.contains(target)) {

      this
        .toggleOperators(false);

    }

  }

  public takeOperator (operator: Search.Operator): void {

    let self: NgSearchboxFilterOperators = this;

    _.each(self.operators, (op: Search.Operator): void => {

      op.selected = false;

    });

    self
      .filter
      .operator = operator;

    self
      .Filtering
      .addOperatorToFilter(
        operator,
        self.filter,
        true
      );

    self
      .ngAddedFilter
      .Event
      .onOperatorChanged(
        operator,
        self.filter
      );

    operator.selected = true;

    this
      .toggleOperators(false);

  }

  public getDefaultOperator (): NgSearchboxFilterOperators {

    let operatorByFilter = null,

      self: NgSearchboxFilterOperators = this;

    if (operatorByFilter === null) {

      if (!this.filter.operator) {

        const operators = self.operatorsSubject.getValue();

        _.each(operators, (operator: Search.Operator): void => {

          if (operator.selected) {

            self.selectedOperator = operator;

            return;

          }

        });

        if (!self.filter.operator

          && operators && operators.length) {

            let operator: Search.Operator = operators[0];

            operator.selected = true;

            self.selectedOperator = operator;

        }

      }

    }

    setTimeout((): void => {

      self
        .filter
        .operator = self.selectedOperator;

    }, 0);

    return this;

  }

  public addOperatorToFilter (): NgSearchboxFilterOperators {

    let self: NgSearchboxFilterOperators = this;

    if (!self
      .Filtering
      .hasOperatorAlready(self.filter)) {


        this
          .Filtering
          .addOperatorToFilter(
            self.selectedOperator,
            self.filter
          );

    }

    return this;

  }

  ngOnInit() {
    if (this.searchbox && this.searchbox.ngSearchBoxFilterOperators && this.searchbox.ngSearchBoxFilterOperators.length) {
      // this.operators = this.searchbox.ngSearchBoxFilterOperators;
      this.operatorsSubject.next(this.searchbox.ngSearchBoxFilterOperators);

    }
  }

  ngAfterViewInit () {
    if (this.hasOperator) {

      this
        .Filtering
        .setOperator(
          this.filter,
          this
        );

      this
        .getDefaultOperator()
        .addOperatorToFilter();


    }

  }

}