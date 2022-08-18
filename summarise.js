export const summarise = (data, limit) => {
  const sum = Object.entries(data);
  if (sum.length < limit) {
    return data;
  }
  sum.sort((a, b) => b[1] - a[1]);
  const res = [];
  for (let i = 0; i < limit - 1; i++) {
    res[sum[i][0]] = sum[i][1];
  }
  let cnt = 0;
  for (let i = limit - 2; i < sum.length; i++) {
    cnt += parseFloat(sum[i][1]);
  }
  res["その他"] = cnt;
  return res;
};
