module.exports = function(sequelize, DataTypes){
    var Feed = sequelize.define("Feed", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    }); 
    
return Feed;
};
