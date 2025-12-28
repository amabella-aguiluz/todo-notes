import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

// note model
// id: integer, primarykey, autoincrement
// userid: integer, notNull
// title: varchar(255), notNull, default: 'untitled'
// description: string, notNull
// created_at: timestamped, underscored
// updated_at: timestamped, underscored

const Notes = sequelize.define('Notes',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Untitled'},
    description: {type: DataTypes.STRING, allowNull:false},
    },
    { // defines how timestamps (created_at) and (updated_at) will be saved as
  timestamps: true,
  underscored: true,
    }
);

// relationships
// user has many notes
// notes have only one user
User.hasMany(Notes, { foreignKey: 'userId'});
Notes.belongsTo(User, {foreignKey: 'userId'});

export default Notes;