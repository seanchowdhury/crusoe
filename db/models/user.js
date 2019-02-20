import crypto from 'crypto'

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })

  User.associate = models => {
    User.belongsTo(models.Game)
  }

  User.addHook('beforeValidate', (user, options) => {
    user.userId = crypto.randomBytes(20).toString('hex')
  })

  return User
}

export default user
