import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { FormControlsHelper } from 'app/shared/helpers/form_controls.helper';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

import { RewardModel } from 'app/shared/models/reward/reward.model';
import { RewardsService } from 'app/services/rewards/rewards.service';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public form: FormGroup;
  public messageOptions: any;
  public isValidating: boolean = true;
  public isDetailsShowing: boolean = false;
  public reward: RewardModel;
  public rewardStatus: string = '';
  public errorsMessages: string;

  constructor(
    private formBuilder: FormBuilder,
    private loader: AppLoaderService,
    public rewardsService: RewardsService) {
  }

  ngOnInit() {
    this.buildForm();
    this.messageOptions = {
      type: '',
      message: ''
    }
  }

  public buildForm() {
    this.form = this.formBuilder.group(
      { code: new FormControl('', Validators.required) }
    );
  }

  private resetForm() {
    this.isValidating = true;
    this.isDetailsShowing = false;
    this.reward = new RewardModel({});
    this.buildForm();
    this.form.controls['code'].setErrors(null);
  }

  public submit() {
    if(this.isValidating) {
      // submit and validate the reward code
      this.validateReward();
    } else {
      // redeem the reward code
      this.redeemReward();
    }
  }

  public cancel() {
    // reset the page data
    this.resetForm();
  }

  public clear() {
    this.resetForm();
  }

  private validateReward() {
    this.loader.open();

    this.rewardsService.validate(this.form.value.code).subscribe(
      (response) => {
        this.loader.close();
        if(response['status'] && response['status'] == 'invalid') {
          this.showFlashMessage('danger', 'INVALID_REWARD_CODE');
          this.form.controls['code'].setErrors({'incorrect': true});
        } else {
          this.reward = new RewardModel(response['data']['attributes']);
          this.handleRewardAfterValidation();
        }
      },
      (response) => {
        this.loader.close();
      }
    );
  }

  private redeemReward() {
    this.loader.open();

    this.rewardsService.redeem(this.reward.id).subscribe(
      (response) => {
        this.loader.close();
        let code = this.reward.code;

        this.reward = new RewardModel({});
        this.showFlashMessage('success', `Se ha aplicado el canje ${code} exitosamente.
            Puede ver el detalle en el <a class="router-link" style="font-weight: bold;text-decoration: underline;"
            href="/dashboard/rewards">historial de canjes</a>`);

        this.resetForm();
      },
      (response) => {
        this.showFlashMessage('danger', response.errors);
        this.loader.close();
      }
    );
  }

  private handleRewardAfterValidation() {
    this.rewardStatus = this.reward.reward_status;

    if(this.reward.reward_status == 'expired') {
      this.showFlashMessage('danger', 'EXPIRED_REWARD_CODE');
      this.form.controls['code'].setErrors({'incorrect': true});

      this.isDetailsShowing = true;
      this.isValidating = true;

      return false;
    }

    if(this.reward.reward_status == 'inactive') {
      this.isValidating = false;
      // disable code input
      this.form = this.formBuilder.group(
        { code: new FormControl({ value: this.reward.code, disabled: true},
                Validators.required) }
      );
    } else {
      this.showFlashMessage('danger', 'APPLIED_REWARD_CODE');
      this.form.controls['code'].setErrors({'incorrect': true});
      this.isValidating = true;
    }

    this.isDetailsShowing = true;
  }

  private showFlashMessage(type='', message='') {
    this.messageOptions = {
      type: type,
      message: message
    }
  }
}
