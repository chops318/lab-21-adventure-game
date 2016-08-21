'use strict';

const angular = require('angular');
const gameApp = angular.module('gameApp');

gameApp.controller('GameController', ['$log', GameController]);


function GameController($log) {
  this.player = {
    name: 'Chops',
    location: 'roomA',
    health: 100
  };

  this.monster = {
    name: 'Hydra',
    health: 100
  };

  this.isMonster = false;

  this.history = [{id: 0,  action: `${this.player.name} started the game`}];

  this.directions = ['north', 'south', 'east', 'west'];

  this.map = require('../lib/map.js');

  this.randomNumber = function() {
    return Math.round((Math.random() * 9) + 1);
  };

  this.fight = function() {
    if (this.randomNumber() > 4) {
      if (this.monster.health > 0) {
        this.monster.health -= 5;
        this.logHistory(`${this.monster.name} lost 5 heath!`);
        if (this.monster.health ===0) this.logHistory(`${this.monster.name} has died`);
        return;
      }
    }
    if (this.player.health > 0) {
      this.player.health -= 5;
      this.logHistory(`${this.player.name} lost 5 health`);
      if (this.player.health === 0) this.logHistory(`${this.player.name} has died`);
      return;
    }
  };

  this.moveDirection = function(direction) {
    if (this.map[this.player.location]) {
      let curLocation = this.map[this.player.location];
      $log.log('current ', curLocation);
      let nextRoom = curLocation[direction];
      $log.log('next ', nextRoom);
      if (nextRoom !== 'wall') {
        this.player.location = nextRoom;
        this.logHistory(`${this.player.name} entered ${nextRoom}`);
        if (this.randomNumber() > 4) {
          this.isMonster = true;
          return;
        }
        this.isMonster = false;
        return;
      }
      this.logHistory(`${this.player.name} hit a wall`);
    }
  };

  this.logHistory = function(action) {
    this.history.push({id: this.history.length, action: action});
  };
}
