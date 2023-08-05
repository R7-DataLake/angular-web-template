import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CvriskService {

  constructor () { }
  /**
   * 
   * @param age อายุ
   * @param sex 1 = ชาย, 0 = หญิง
   * @param smoke 1 = สูบ, 0 = ไม่สูบ
   * @param dm 1 = เบาหวาน, 0 = ไม่เป็นเบาหวาน
   * @param sbp ความดันบน
   * @param wc รอบเอว
   */
  calculateScore(age: any, smoke: any, dm: any, sbp: any, sex: any, wc: any, height: any) {

    wc = wc * 2.5 // รอบเอวหน่วยเป็น cm

    var whr = wc / height;
    var full_score = 0;
    var compare_score = 0;
    var predicted_risk = 0;
    var compare_risk = 0;
    var compare_whr = 0.52667;
    var compare_wc = 79;
    var compare_sbp = 120;
    var compare_hdl = 44;
    var sur_root = 0.964588;

    if (sex == 0) { compare_hdl = 49 };
    if (sex == 1 && age > 60) { compare_sbp = 132 };
    if (sex == 0 && age <= 60) { compare_sbp = 115 };
    if (sex == 0 && age > 60) { compare_sbp = 130 };
    if (sex == 1) {
      compare_whr = 0.58125;
      compare_wc = 93;
    };

    if (age > 1 && sbp > 50) {
      if (whr > 0) {
        full_score = (0.079 * age) + (0.128 * sex) + (0.019350987 * sbp) + (0.58454 * dm) + (3.512566 * whr) + (0.459 * smoke);
        predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 7.712325)));
        compare_score = (0.079 * age) + (0.128 * sex) + (0.019350987 * compare_sbp) + (3.512566 * compare_whr);
        compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 7.712325)));
      } else if (wc > 0) {
        full_score = (0.08372 * age) + (0.05988 * sex) + (0.02034 * sbp) + (0.59953 * dm) + (0.01283 * wc) + (0.459 * smoke);
        predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 7.31047)));
        compare_score = (0.08372 * age) + (0.05988 * sex) + (0.02034 * compare_sbp) + (0.01283 * compare_wc);
        compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 7.31047)));
      }
    }

    var risk = new Array(full_score, predicted_risk, compare_score, compare_risk);
    return risk;
  }
}
