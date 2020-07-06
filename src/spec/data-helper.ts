import { orderData_1 } from './test-data/orders-data';
import { rewardData, rewardFilterData } from './test-data/rewards-data';

export class DataHelper {
  public static order(){
    return {
      "data": orderData_1
    }
  }

  public static listOfOrders(){
    return {
      "data": [orderData_1]
    }
  }

  public static reward(){
    return {
      "data": rewardData
    }
  }

  public static listOfRewards(){
    return {
      "data": [rewardData]
    }
  }

  public static listOfFilterData(){
    return rewardFilterData
  }
}
