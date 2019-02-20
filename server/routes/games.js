import express from 'express'
import jwt from 'jsonwebtoken'
import models from '../../db/models/index.js'

export const router = express.Router()

router.post('/createGame', (req, res) => {
  createNewGame(req.body.username).then(game => {
    const user = {
      username: game.users[0].username,
      userId: game.users[0].userId
    }
    const token = jwt.sign(user, 'devSecret')
    res.json({
      token: token,
      user: user
    })
  })
})

const createNewGame = (username) => {
  return new Promise((resolve, reject) => {
    const game = models.Game.create({
     users: [{ username: username }]
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

router.post('joinGame', (req, res) => {
  joinGame(req.body.gameId, req.body.username).then(user => {
    const token = jwt.sign(user, 'devSecret')
    res.json({
      token: token,
      user: user
    })
  })
})

const joinGame = (gameId, username) => {
  return new Promise((resolve, reject) => {
    models.Game.findOne({ where: { gameId: gameId } }).then(game => {
      if(game) {
        //TODO: change to MAX_PLAYER and GAME_PROGRESS constants
        if(game.length < 4 || game.progress != "NOT_STARTED") {
          const user = models.User.create({
            username: username
          })
          if(user) {
            game.addUser(user)
            resolve(user)
          } else {
            reject(Error("Error creating user"))
          }
        } else {
          reject(Error("Game full or already started"))
        }
      } else {
        reject(Error("Could not find game"))
      }
    })
  })
}
