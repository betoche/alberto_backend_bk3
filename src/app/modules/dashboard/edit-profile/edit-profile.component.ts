const Many = require('extends-classes');
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { FormControlsHelper } from 'app/shared/helpers/form_controls.helper';
import { FormBaseComponent } from 'app/shared/components/form.base.component';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { PasswordConfirmationValidation } from 'app/shared/validators/password_confirmation.validator';
import { ProfileService } from 'app/shared/services/profile.service';
import { UserSession } from 'app/shared/services/user-session';
import { FormHelper } from 'app/shared/helpers/form.helper';
import * as _ from 'lodash';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent extends Many(ApplicationBaseComponent, FormBaseComponent) implements OnInit {
  public form: FormGroup;
  public governmentIdTypes: any = [];
  public type = 'Drugstore'

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    const password = new FormControl('');
    const passwordConfirmation = new FormControl('');

    // TODO: Temporary field, will add later when the feature has confirm
    const companyNameDisabledField = new FormControl({
      value: 'Pragmatic',
      disabled: true,
    });
    const companyRoleDisabledField = new FormControl({
      value: 'Experience Lead',
      disabled: true,
    });

    const name = new FormControl({
      value: this.currentUser.name,
      disabled: true,
    });

    const email = new FormControl({
      value: this.currentUser.email,
      disabled: true,
    });

    let companyFields = new FormGroup( FormHelper.drugstoreLocationFields({
      name: this.currentUser.company.name, code: this.currentUser.company.code,
      company_name: this.currentUser.company.drugstore_attributes.name,
      company_code: this.currentUser.company.drugstore_attributes.company_code,
      address_attributes: this.currentUser.company.address_attributes
    }) )

    this.form = new FormGroup(
      {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        name: name,
        role_in_company: companyRoleDisabledField,
        phone_country: new FormControl(this.currentUser.phone_number, [Validators.required]),
        phone_number: new FormControl(this.currentUser.phone_country || 'CR', [Validators.required]),
        secondary_phone_country: new FormControl(this.currentUser.secondary_phone_number),
        secondary_phone_number: new FormControl(this.currentUser.secondary_phone_country || 'CR'),
        company_attributes: companyFields
      },
      [PasswordConfirmationValidation]
    );
  }

  public submit() {
    if (this.form.valid) {
      if (this.form.value.password === '') {
        delete this.form.value.password;
        delete this.form.value.password_confirmation;
      }

      this.profileService.updateProfile({ profile: this.form.value }).subscribe(
        (response) => {
          UserSession.setCurrentUser(response['data']['attributes']);
          this.showUpdateMessageSuccessful();
        },
        (response) => {
          this.errorsMessages = response['error']['errors'];
        }
      );
    }
  }
}
