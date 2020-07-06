import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import * as $ from 'jquery';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'spec/data-helper';

import { RewardsService } from 'app/services/rewards/rewards.service';
import { RedemptionComponent } from './redemption.component';

import { DialogService } from 'app/shared/services/dialog.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid code', fakeAsync(() => {
    stubInvalidRequest();
    component.submit();

    fixture.detectChanges();
    tick(5000)

    expect(component.rewardStatus).toEqual('');
    expect(component.isValidating).toEqual(true);
    expect(component.isDetailsShowing).toEqual(false);
  }));

  it('should return active code and show apply form', fakeAsync(() => {
    stubValidateRequest();
    component.submit();

    fixture.detectChanges();
    tick(10000);

    expect(component.rewardStatus).toEqual('active');
    expect(component.isValidating).toEqual(true);
    expect(component.isDetailsShowing).toEqual(true);
    expect($('.reward-info').text()).toContain('jeff 1 nguyen');
    expect($('.reward-info').text()).toContain('Loyalty plan 2');
  }));

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [RedemptionComponent],
          route_params: {  }
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubValidateRequest() {
    let service = TestBed.get(RewardsService);
    spyOn(service, 'validate').and.callFake(() => {
      return of(DataHelper.reward());
    });
  }

  function stubInvalidRequest() {
    let service = TestBed.get(RewardsService);
    spyOn(service, 'validate').and.callFake(() => {
      return of({status: 'invalid'});
    });
  }
});
