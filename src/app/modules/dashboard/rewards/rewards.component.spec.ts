import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import * as $ from 'jquery';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'spec/data-helper';

import { RewardsService } from 'app/services/rewards/rewards.service';
import { RewardsComponent } from './rewards.component';

import { DialogService } from 'app/shared/services/dialog.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

describe('RewardsComponent', () => {
  let component: RewardsComponent;
  let fixture: ComponentFixture<RewardsComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('shows empty list', fakeAsync(() => {
    expect($('.empty-row').length).toEqual(1);
  }));

  it('shows list of rewards', fakeAsync(() => {
    stubRequestFetchList();
    component.ngAfterContentInit();

    fixture.detectChanges();
    tick(3000);

    expect($('datatable-row-wrapper').length).toEqual(1);
    expect($('datatable-row-wrapper:first-child').text()).toContain('A12345678');
    expect($('datatable-row-wrapper:first-child').text()).toContain('Medicaiton 5');
  }));

  it('shows list of filter data', fakeAsync(() => {
    stubRequestFetchList();
    stubRequestFilterDataRequest();
    component.ngAfterContentInit();

    fixture.detectChanges();
    tick(3000);

    expect(component.pharmaceuticalCompaniesList.length).toEqual(2);
    expect(component.medicationsList.length).toEqual(3);
  }));

  // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [RewardsComponent],
          route_params: {  }
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(RewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetchList() {
    let service = TestBed.get(RewardsService);
    spyOn(service, 'fetchList').and.callFake(() => {
      return of(DataHelper.listOfRewards());
    });
  }

  function stubRequestFilterDataRequest() {
    let service = TestBed.get(RewardsService);
    spyOn(service, 'fetchFilterData').and.callFake(() => {
      return of(DataHelper.listOfFilterData());
    });
  }
});
