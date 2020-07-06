import * as $ from 'jquery';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'spec/data-helper';
import { DataHelper as SharedDataHelper } from 'app/shared/spec/data-helper';

import { OrdersService } from 'app/services/orders/orders.service';
import { ExportCSVService } from 'app/shared/services/export-csv/export-csv.service';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async(() => {
    setCurrentUser()
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#show', () => {
    beforeEach(() => {
      stubRequestFetch();
      createComponent();
    });

    it('shows detail of an order', () => {
      expect($('.order-number').text()).toContain('ORDER 70089')
      expect($('.order-status').text()).toContain('READY_TO_BE_TAKEN')
      expect($('.order-request-date').text()).toContain('15/05/2020 02:50 am.')
      expect($('datatable-row-wrapper:first-child').text()).toContain('70089')
      expect($('datatable-row-wrapper:first-child').text()).toContain('José Eduardo')
      expect($('datatable-row-wrapper:first-child').text()).toContain('3')
      expect($('datatable-row-wrapper:first-child').text()).toContain('₡ 1.238')
      expect($('datatable-row-wrapper:first-child').text()).toContain('₡ 3.714')
      expect($('datatable-row-wrapper:first-child').text()).toContain('₡ 483')
      expect($('datatable-row-wrapper:first-child').text()).toContain('₡ 4.197')
    });
  });

  // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [OrderDetailComponent]
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetch() {
    let service = TestBed.get(OrdersService);
    spyOn(service, 'fetch').and.callFake(() => {
      return of(DataHelper.order());
    });
  }

  function setCurrentUser() {
    localStorage.setItem('current_user', JSON.stringify(
      Object.assign(SharedDataHelper.userData['data']['attributes'], {role: 'drugstore_location'})
    ));
  }
});
