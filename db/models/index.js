import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  'crusoe_database',
  'crusoedev',
  'devPassword',
  {
    dialect: 'postgres',
  },
)

const models = {
  Game: sequelize.import('./game'),
  User: sequelize.import('./user')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
