function calculatePersonLocation(side, speed, prevPositions) {
  const newPositions = prevPositions.map(({ x, y }, i) => {
    const dx = Math.round(side / 2 - x); // Distance to center horizontally

    const dy = Math.round(side / 2 - y); // Distance to center vertically
    const distanceToCenter = Math.sqrt(dx ** 2 + dy ** 2); // Distance to center
    const directionX = dx / distanceToCenter; // Normalized direction towards center horizontally
    const directionY = dy / distanceToCenter; // Normalized direction towards center vertically

    let tempX = Math.round(x + directionX * speed); // temp x position based on speed
    let tempY = Math.round(y + directionY * speed); // temp y position based on speed

    // Correction when they overshoot the center

    let newX;
    let newY;

    switch (i) {
      case 0:
        newX = tempX < side / 2 ? tempX : side / 2;
        newY = tempY < side / 2 ? tempY : side / 2;
        break;
      case 1:
        newX = tempX > side / 2 ? tempX : side / 2;
        newY = tempY < side / 2 ? tempY : side / 2;
        break;
      case 2:
        newX = tempX > side / 2 ? tempX : side / 2;
        newY = tempY > side / 2 ? tempY : side / 2;
        break;
      case 3:
        newX = tempX < side / 2 ? tempX : side / 2;
        newY = tempY > side / 2 ? tempY : side / 2;
        break;
    }

    return { x: newX, y: newY };
  });

  //   console.log("HERE \n", newPositions);
  return newPositions;
}

module.exports = calculatePersonLocation;
