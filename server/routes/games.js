import express from 'express'
import jwt from 'jsonwebtoken'
import models from '../../db/models/index.js'

export const router = express.Router()

router.post('/createGame', (req, res) => {
  console.log("Creating New Game")
  createNewGame(req.body.username).then(game => {
    console.log("New Game Created with ID: " + game.gameId)
    const databaseUser = game.users[0]
    const user = {
      username: databaseUser.username,
      userId: databaseUser.userId,
      playerNumber: databaseUser.playerNumber
    }
    const gameConfig = {
      gameId: game.gameId
    }
    const token = jwt.sign({ user: user, gameConfig: gameConfig }, 'devSecret')
    res.json({
      token: token,
      gameConfig: gameConfig,
      user: user
    })
  })
})

const createNewGame = (username) => {
  return new Promise((resolve, reject) => {
    const game = models.Game.create({
     users: [{ username: username, playerNumber: 1 }]
    },{
     include: [models.User]
    })

    if(game) {
      resolve(game)
    } else {
      reject(Error("Error creating game"))
    }
  })
}

router.post('/joinGame', (req, res) => {
  joinGame(req.body.passcode, req.body.username).then(databaseUser => {
    const user = {
      username: databaseUser.username,
      userId: databaseUser.userId,
      playerNumber: databaseUser.playerNumber
    }
    const gameConfig = {
      gameId: req.body.passcode
    }
    const token = jwt.sign({ user: user, gameConfig: gameConfig }, 'devSecret')
    res.json({
      token: token,
      gameConfig: gameConfig,
      user: user
    })
  })
})

const joinGame = (gameId, username) => {
  return new Promise((resolve, reject) => {
    models.Game.findOne({ where: { gameId: gameId }, include: [{ model: models.User }] }).then(game => {
      if(game) {
        //TODO: change to MAX_PLAYER and GAME_PROGRESS constants
        if(game.users.length < 4 || game.progress != "NOT_STARTED") {
          models.User.create({
            username: username,
            playerNumber: game.users.length + 1
          }).then(user => {
            if(user) {
              game.addUser(user)
              resolve(user)
            } else {
              reject(Error("Error creating user"))
            }
          })
        } else {
          reject(Error("Game full or already started"))
        }
      } else {
        reject(Error("Could not find game"))
      }
    })
  })
}
