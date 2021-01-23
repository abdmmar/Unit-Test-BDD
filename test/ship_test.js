const expect = require("chai").expect;

describe("checkForShip", function () {
  const checkForShip = require("../src/game_logic/ship_methods").checkForShip;
  let player;

  before(function () {
    player = {
      ships: [
        {
          locations: [
            [0, 0],
            [0, 1],
          ],
        },
        {
          locations: [
            [1, 0],
            [1, 1],
          ],
        },
        {
          locations: [
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
          ],
        },
      ],
    };
  });

  it("Should correctly report no ship at given coordinate", function (done) {
    expect(checkForShip(player, [9, 9])).to.be.false;
    done();
  });

  it("Should correctly report a ship located at given coordinate", function (done) {
    expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    done();
  });

  it("Should handle ship located at more than one coordinate", function (done) {
    expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
    expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    expect(checkForShip(player, [9, 9])).to.be.false;
    done();
  });

  it("Should handle checking multiple ships", function (done) {
    expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
    expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
    expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
    expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
    expect(checkForShip(player, [9, 9])).to.be.false;
    done();
  });
});

describe("damageShip", function () {
  const damageShip = require("../src/game_logic/ship_methods").damageShip;

  it("should register damage on a given ship at a given location", function () {
    const ship = {
      location: [[0, 0]],
      damage: [],
    };

    damageShip(ship, [0, 0]);

    expect(ship.damage).to.not.be.empty;
    expect(ship.damage[0]).to.deep.equal([0, 0]);
  });
});

describe("fire", function () {
  const fire = require("../src/game_logic/ship_methods").fireShip;
  let player;

  beforeEach(function () {
    player = {
      ships: [
        {
          locations: [[0, 0]],
          damage: [],
        },
      ],
    };
  });

  after(function () {
    console.log("Entire test suite completed");
  });

  afterEach(function () {
    console.log("One unit test completed");
  });

  it("should record damage on the given players ship at a give coordinate", function () {
    fire(player, [0, 0]);
    expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
  });

  it("should NOT record damage if there no ship at my coordinate", function () {
    fire(player, [9, 9]);
    expect(player.ships[0].damage).to.be.empty;
  });
});
