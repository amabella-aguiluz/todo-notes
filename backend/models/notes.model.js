import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Notes = sequelize.define('Notes',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Untitled'},
    description: {type: DataTypes.STRING, allowNull:false}
    },
    { // defines how timestamps (created_at) and (updated_at) will be saved ass
  timestamps: true,
  underscored: true,
    }
);

// relationships
User.hasMany(Notes, { foreignKey: 'userId'});
Notes.belongsTo(User, {foreignKey: 'userId'});

export default Notes;