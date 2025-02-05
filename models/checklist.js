'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      checklist.belongsTo(models.users, {
        foreignKey: 'user_id'
      }),
      checklist.hasMany(models.itemChecklist, {
        foreignKey: 'checklist_id'
      })
    }
  }
  checklist.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'checklist',
  });
  return checklist;
};