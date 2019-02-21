import express from 'express'
import jwt from 'jsonwebtoken'
import models from '../../db/models/index.js'

export const router = express.Router()

router.post('/authorize', (req, res) => {
  const token = req.body.token || req.header['access-token'];
  jwt.verify(token, 'devSecret', (error, decoded) => {
      if (error) {
        console.error('JWT verification error', error)
        return res.status(403).send(error)
      } else {
        models.Game.findOne({ where: { gameId: decoded.gameConfig.gameId } }).then(game => {
          if(game && game.progress != 'FINISHED') {
            res.json({ token: token,
              user: decoded.user,
              gameConfig: { gameId: game.gameId }
            })
          } else {
            res.status(400).json('The game has already ended')
          }
        })
      }
    })
  }
)
