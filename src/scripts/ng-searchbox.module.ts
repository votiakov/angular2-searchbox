'use strict';

import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  NgSearchboxComponent
} from './components/ng-searchbox.component';

import {
  NgSearchboxFilteringComponent
} from './components/ng-searchbox-filtering.component';

import {
  NgSearchboxAddedFiltersWrapper
} from './components/ng-searchbox-added-filters-wrapper.component';

import {
  NgSearchboxAddedFilter
} from './components/ng-searchbox-added-filter.component';

import {
  NgSearchboxFilterSelectors
} from './components/ng-searchbox-filter-selectors.component';

import {
  NgSearchboxFilterOperators
} from './components/ng-searchbox-filter-operators.component';

import {
  NgSearchboxAutoSuggestions
} from './components/ng-searchbox-auto-suggestions.component';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import {
  EaAutoComplete
} from './commons/ea-autocomplete/component';
import { StripTagsPipe } from 'angular-pipes/src/string/strip-tags.pipe';

import { SafeHtmlPipe } from './commons/safe-html-pipe';
import {
  MaterialModule
  // OverlayContainer,
  // FullscreenOverlayContainer,
  // MdSelectionModule, MdIconModule,
  // MdNativeDateModule, MdSliderModule,
  // MdRadioModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({

  'imports': [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    MaterialModule,
    BrowserAnimationsModule
    // OverlayContainer,
    // FullscreenOverlayContainer,
    // MdSelectionModule,
    // MdIconModule,
    // MdNativeDateModule,
    // MdSliderModule,
    // MdRadioModule
  ],

  'declarations': [
    NgSearchboxComponent,
    NgSearchboxFilteringComponent,
    NgSearchboxAddedFiltersWrapper,
    NgSearchboxAddedFilter,
    NgSearchboxFilterSelectors,
    NgSearchboxFilterOperators,
    NgSearchboxAutoSuggestions,
    EaAutoComplete,
    StripTagsPipe,
    SafeHtmlPipe,
  ],

  'providers': [
    StripTagsPipe,
    {

      'provide': Window,

      'useValue': window

    }, {

      'provide': Document,

      'useValue': document

    }
  ],

  'exports': [
    NgSearchboxComponent,
    StripTagsPipe
  ]

})

export class NgSearchboxModule {

}