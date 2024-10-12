
// function highAndLow(numbers) {
//   let numArray = numbers.split(" ").map(Number);
//   let highest = Math.max(...numArray);
//   let lowest = Math.min(...numArray);
//   return highest + " " + lowest;
// }

// console.log(highAndLow("1 2 3 4 5"));   // Output: "5 1"
// console.log(highAndLow("1 2 -3 4 5"));  // Output: "5 -3"
// console.log(highAndLow("1 9 3 4 -5"));  // Output: "9 -5"


function digitalRoot(n) {
    while (n >= 10) {
        n = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return n;
}

console.log(digitalRoot(16));     // Output: 7
console.log(digitalRoot(942));    // Output: 6
console.log(digitalRoot(132189)); // Output: 6
console.log(digitalRoot(493193)); // Output: 2


// function greet(name) {
//     return `Hello, ${name} how are you doing today?`;
// }

// let name = "paul"

// console.log(greet(name)); 

function bmi(weight, height) {
    let weight = num;
    let height = num;
    let bmi = weight / height ** 2;
    
    if (bmi <= 18.5) return "Underweight";
    if (bmi <= 25.0) return "Normal";
    if (bmi <= 30.0) return "Overweight";
    if (bmi > 30) return "Obese";
    
    return bmi;
}