import { COUNTRIES } from 'app/shared/master-data/countries.master-data'
import * as _ from 'lodash';

export class MasterDataCountry{
  public name: string;
  public provinces: any = [];

  public static all(){
    let data = [];
    _.each(COUNTRIES, (country, code) => {
      let provinces = [];
      _.each(country.provinces, (province, province_id) => {
        provinces.push( { id: province_id, name: province.name } );
      });

      data.push( { name: country.name, code: code, provinces: provinces } );
    });

    return data;
  }

  public static dataForTreeView(checkedData = []){
    let data = [];
    let index = 1;

    _.each(COUNTRIES, (country, country_code) => {
      let country_index = index;
      data.push({
        id: index, name: country.name,
        code: country_code, hasChild: true
      });
      index += 1;

      _.each(country.provinces, (province, province_code) => {
        let province_index = index;
        data.push({
          id: index, pid: country_index,
          name: province.name,
          code: province_code,
          hasChild: true
        });
        index += 1;

        _.each(province.cantons, (canton, canton_code) => {
          let canton_index = index;
          data.push({
            id: index, pid: province_index,
            name: canton.name,
            canton_code: canton_code,
            hasChild: true
          });
          index += 1;

          _.each(canton.districts, (district, district_code) => {
            let isChecked = _.find(
              checkedData, {
                country_code: country_code,
                province_code: province_code,
                canton_code: canton_code,
                district_code: district_code
              }
            );

            data.push({
              id: index,
              pid: canton_index,
              name: district.name,
              district_code: district_code,
              canton_code: canton_code,
              province_code: province_code,
              country_code: country_code,
              isChecked: !!isChecked,
              type: 'district'
            });
            index += 1;
          });
        });
      });
    });

    return data;
  }
}
