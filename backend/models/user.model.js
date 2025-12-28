import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// user table
// id: integer, primaryKey, autoincrement
// email: varchar(255), unique, notNull 
// password_hash = varchar(255), notNull 
// created_at: timestamped, underscored
// updated_at: timestamped, underscored

const User = sequelize.define('User',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password_hash: {type: DataTypes.STRING, allowNull: false}
    },
    { // defines how timestamps (created_at) and (updated_at) will be saved ass
  timestamps: true,
  underscored: true,
    }
);

export default User;