const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Note = sequelize.define("Note", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = Note;