import generateGameId from './utils.js'

const game = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    gameId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    progress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Game.associate = models => {
    Game.hasMany(models.User)
  }

  Game.addHook('beforeValidate', (game, options) => {
    game.gameId = generateGameId()
    game.progress = "NOT_STARTED"
  })

  return Game
}

export default game
