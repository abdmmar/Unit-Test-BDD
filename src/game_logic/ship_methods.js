function checkForShip(player, coordinate) {
  let shipPresent, ship;

  for (let i = 0; i < player.ships.length; i++) {
    ship = player.ships[i];

    shipPresent = ship.locations.filter(function (actulCoordinate) {
      return (
        actulCoordinate[0] === coordinate[0] &&
        actulCoordinate[1] === coordinate[1]
      );
    })[0];

    if (shipPresent) {
      return ship;
    }
  }

  return false;
}

function damageShip(ship, coordinate) {
  ship.damage.push(coordinate);
}

function fireShip(player, coordinate) {
  const ship = checkForShip(player, coordinate);

  if (ship) {
    damageShip(ship, coordinate);
  }
}

module.exports = {
  checkForShip,
  damageShip,
  fireShip,
};
