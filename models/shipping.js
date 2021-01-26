module.exports = function(sequelize, DataTypes){
    var Address = sequelize.define("Address", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          // The password cannot be null
          address_1: {
            type: DataTypes.STRING,
            allowNull: false
          },
          address_2: {
            type: DataTypes.STRING,
            allowNull: true
          },
          city_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          zipcode: {
            type: DataTypes.STRING,
            allowNull: false
          },
          phone_number: {
            type: DataTypes.STRING,
            allowNull: false
          }

    }); 
    
return Address;
};