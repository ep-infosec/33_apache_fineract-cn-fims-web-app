/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {NgControl} from '@angular/forms';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validate-onblur]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)',
    '(keyup)': 'onKeyup($event)',
    '(change)': 'onChange($event)',
    '(ngModelChange)': 'onNgModelChange($event)'
  }
})
export class ValidateOnBlurDirective {

  private validators: any;

  private asyncValidators: any;

  private wasChanged: any;

  constructor(public formControl: NgControl) {}

  onFocus($event) {
    this.wasChanged = false;
    this.validators = this.formControl.control.validator;
    this.asyncValidators = this.formControl.control.asyncValidator;
    this.formControl.control.clearAsyncValidators();
    this.formControl.control.clearValidators();
  }

  onKeyup($event) {
    this.wasChanged = true;
  }

  onChange($event) {
    this.wasChanged = true;
  }

  onNgModelChange($event) {
    this.wasChanged = true;
  }

  onBlur($event) {
    this.formControl.control.setAsyncValidators(this.asyncValidators);
    this.formControl.control.setValidators(this.validators);
    if (this.wasChanged) {
      this.formControl.control.updateValueAndValidity();
    }
  }
}
