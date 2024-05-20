module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Define association
    Comments.associate = (models) => {
        Comments.belongsTo(models.Posts, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return Comments;
};
