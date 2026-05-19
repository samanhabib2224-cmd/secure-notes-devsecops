const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Note = require("./Note");

const User = sequelize.define("User", {
id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true,
},

name: {
    type: DataTypes.STRING,
    allowNull: false,
},

email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
},

password: {
    type: DataTypes.STRING,
    allowNull: false,
}

});

// one user can have many notes relation
User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

module.exports = User;