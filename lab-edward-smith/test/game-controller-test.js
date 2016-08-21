'use strict';

describe('game controller test', function() {
  beforeEach(()=> {
    angular.mock.module('gameApp');
    angular.mock.inject(($controller) => {
      this.gameCtrl = $controller('GameController');
    });
  });

  beforeEach(() => {
    this.gameCtrl.history = [];
    this.gameCtrl.player = {
      name: 'Chops',
      location: 'roomD',
      health: 100
    };
    this.gameCtrl.randomNumber = function() {
      return 6;
    };
  });

  it('should have a player', () => {
    expect(this.gameCtrl.player.name).toBe('Chops');
    expect(this.gameCtrl.player.location).toBe('roomD');
    expect(this.gameCtrl.player.health).toBe(100);
  });

  it('should move player to room B', () => {
    this.gameCtrl.moveDirection('north');
    expect(this.gameCtrl.player.location).toBe('roomB');
    expect(this.gameCtrl.history.length).toBe(1);
  });

  it('should attack the player', () => {
    this.gameCtrl.fight();
    expect(this.gameCtrl.monster.health).toBe(95);
  });

  it('should expect a monster', () => {
    this.gameCtrl.moveDirection('west');
    expect(this.gameCtrl.isMonster).toBe(true);
  });
});
