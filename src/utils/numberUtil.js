export function formatCount(count) {
  let result = "0";
  if (count) {
    if (count < 1000) {
      result = count;
    } else if (count < 10000) {
      result = "999+";
    } else if (count < 100000) {
      const yushu = count % 10000;
      let temp = count / 10000;
      if (yushu == 0) {
        result = temp + "万";
      } else {
        result = temp.toFixed(1) + "万";
      }
    } else {
      result = "10万+";
    }
  }
  return result;
}
