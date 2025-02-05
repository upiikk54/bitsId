'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itemChecklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      itemChecklist.belongsTo(models.checklist, {
        foreignKey: 'checklist_id'
      })
    }
  }
  itemChecklist.init({
    itemName: DataTypes.STRING,
    checklist_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'itemChecklist',
  });
  return itemChecklist;
};