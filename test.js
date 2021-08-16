Date.toDateString = () => {
  const date = new Date();
  let m = date.getMonth() + 1;
  if (m < 10) m = "0" + m;
  let d = date.getDate();
  if (d < 10) d = "0" + d;
  return `${date.getFullYear()}-${m}-${d}`;
};
Date.toDateTimeString = () => {
  const date = new Date();
  let h = date.getHours();
  if (h < 10) h = "0" + h;
  let m = date.getMinutes();
  if (m < 10) m = "0" + m;
  let s = date.getSeconds();
  if (s < 10) s = "0" + s;
  return `${Date.toDateString()} ${h}:${m}:${s}`;
};

console.log(Date.toDateTimeString());
