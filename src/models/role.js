// models/role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: 'role_id' });
    Role.hasMany(models.User_Project_Role, { foreignKey: 'role_id' });
  };

  return Role;
};
