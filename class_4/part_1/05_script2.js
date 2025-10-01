// function setTimeoutPromisified(ms) {
//     return new Promise (resolve => setTimeout(resolve,ms));
// }

// function callback() {
//     console.log("Hi");
// }
// function callback2() {
//     console.log("Hello");
// }
// function callback3() {
//     console.log("Hello there");
// }

// setTimeoutPromisified(1000).then(callback)
// setTimeoutPromisified(3000).then(callback2)
// setTimeoutPromisified(5000).then(callback3)
// (the upside code is wrong)



// setTimeout(function () {
//     console.log("hi");
//     setTimeout(function () {
//       console.log("hello");

//       setTimeout(function () {
//         console.log("hello there");
//       }, 5000);
//     }, 3000);
//   }, 1000);



// function step3Done() {
//     console.log("hello there");
//   }

//   function step2Done() {
//     console.log("hello");
//     setTimeout(step3Done, 5000);
//   }

//   function step1Done() {
//     console.log("hi");
//     setTimeout(step2Done, 3000);
//   }

//   setTimeout(step1Done, 1000);






function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//   setTimeoutPromisified(1000).then(function () {
//     console.log("hi");
//     setTimeoutPromisified(3000).then(function () {
//       console.log("hello");
//       setTimeoutPromisified(5000).then(function () {
//         console.log("hello there");
//       });
//     });
//   });




setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });
