//notes.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Notes = sequelize.define('Notes',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Untitled'},
    description: {type: DataTypes.TEXT('long'), allowNull:false},
    }
);

// relationships
// user has many notes
// notes have only one user
User.hasMany(Notes, { foreignKey: 'userId'});
Notes.belongsTo(User, {foreignKey: 'userId'});

export default Notes;