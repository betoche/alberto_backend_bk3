import * as $ from 'jquery';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'spec/data-helper';
import { DataHelper as SharedDataHelper } from 'app/shared/spec/data-helper';

import { OrdersService } from 'app/services/orders/orders.service';
import { ExportCSVService } from 'app/shared/services/export-csv/export-csv.service';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

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

  it('shows empty list', () => {
    expect($('.empty-row').length).toEqual(1);
  });

  // ##########################

  describe('#show', () => {
    beforeEach(() => {
      stubRequestFetchList();
      createComponent();
    });

    it('displays orders in the request list', () => {
      expect($('datatable-row-wrapper').length).toEqual(1);
      expect($('datatable-row-wrapper:first-child').text()).toContain('70089');
      expect($('datatable-row-wrapper:first-child').text()).toContain('15/05/2020 02:50 am.');
      expect($('datatable-row-wrapper:first-child').text()).toContain('3');
      expect($('datatable-row-wrapper:first-child').text()).toContain('₡ 3.714');
      expect($('datatable-row-wrapper:first-child').text()).toContain('SEE');
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
          declarations: [OrdersComponent],
          route_params: { type: 'requests' }
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetchList() {
    let service = TestBed.get(OrdersService);
    spyOn(service, 'fetchList').and.callFake(() => {
      return of(DataHelper.listOfOrders());
    });
  }

  function setCurrentUser() {
    localStorage.setItem('current_user', JSON.stringify(
      Object.assign(SharedDataHelper.userData['data']['attributes'], {role: 'drugstore_location'})
    ));
  }
});
