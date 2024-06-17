function Balance({ balance }) {
  function rupify(amount) {
    let buffer = 3;
    let digitsTraversed = 0;
    const numArray = Math.floor(amount).toString().split("");
    const finalArray = [];
    for (let i = numArray.length - 1; i >= 0; i--) {
      digitsTraversed++;
      finalArray.push(numArray[i]);
      console.log(digitsTraversed);
      if (digitsTraversed == buffer) {
        if (i != 0) finalArray.push(",");
        buffer = 2;
        digitsTraversed = 0;
      }
    }
    return finalArray.reverse().join("");
  }

  return (
    <div>
      <h1 className="font-bold text-sm ">Your Balance Rs {rupify(balance)}</h1>
    </div>
  );
}

export default Balance;
