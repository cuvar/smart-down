export function findDeletion(
  oldString: string,
  newString: string
): { position: number; length: number } {
  const res = findDifference(oldString, newString);
  return res;
}

export function findInsertion(
  oldString: string,
  newString: string
): { position: number; text: string } {
  const res = findDifference(newString, oldString); // needs to be reversed

  if (res.position === -1) {
    return { position: res.position, text: "" };
  }

  const substr = newString.slice(res.position, res.position + res.length);
  return { position: res.position, text: substr };
}

function findDifference(
  long: string,
  short: string
): { position: number; length: number } {
  console.log(long);
  console.log(short);
  for (let i = 0; i < long.length; i++) {
    for (let j = i + 1; j <= long.length; j++) {
      const temp = long.slice(0, i) + long.slice(j);
      if (temp === short) {
        return { position: i, length: j - i };
      }
    }
  }
  return { position: -1, length: 0 };
}
