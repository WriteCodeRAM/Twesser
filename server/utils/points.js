point_system = {
  0: 100,
  1: 90,
  2: 80,
  3: 70,
  4: 60,
  5: 50,
};

function getMultiplier(timer) {
  let multiplier;
  if (timer >= 16) {
    multiplier = 2;
  } else if (timer >= 10) {
    multiplier = 1.5;
  } else if (timer >= 6) {
    multiplier = 1.2;
  } else {
    multiplier = 1;
  }

  return multiplier;
}

module.exports = { point_system, getMultiplier };
