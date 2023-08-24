
for (let i = 1; i <= 10; i += 1) {
  let devIDNumber = (i % 3) +1;
    console.log("statusNumber: ", devIDNumber);
}

for (let i = 1; i <= 10; i += 1) {
  let devIDNumber;
    devIDNumber = ((i + 3) %10) - 3; // a number between 1-3 these corruspond  
    console.log("statusNumber next version: ", devIDNumber);
}
