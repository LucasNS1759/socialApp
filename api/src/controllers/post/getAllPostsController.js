const { Post, Profile, User, Comment } = require("../../db.js");
const AppError = require("../../utils/appError.js");

const getAllPostsController = async (page, limit) => {

  try {
    const offset = (page - 1) * limit;

    // Usamos findAndCountAll en lugar de findAll + count
    const { count: totalPosts, rows: posts } = await Post.findAndCountAll({
      limit: parseInt(limit),  // Establecemos el límite de registros
      offset: parseInt(offset), // Establecemos el desplazamiento
      order: [['createdAt', 'DESC']], // Ordenamos los posts por fecha de creación, descendente
      include: [
        {
          model: User,
          attributes: ["id"],
          include: [
            {
              model: Profile,
              attributes: ["name", "profilePicture", "id","gender"]
            }
          ]
        },
        {
          model: Comment,
          where: { parentId: null }, // Solo los comentarios raíz
          required: false,// 👈 ESTO permite que devuelva posts aunque no haya comentarios
          include: [
            {
              model: User,
              attributes: ["id"],
              include: [
                {
                  model: Profile,
                  attributes: ["name", "surName", "profilePicture", "id"]
                }
              ]
            },
            {
              model: Comment,
              as: 'replies', // Incluir las respuestas
              include: [
                {
                  model: User,
                  attributes: ["id"],
                  include: [
                    {
                      model: Profile,
                      attributes: ["name", "surName", "profilePicture", "id"]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });


    const totalPages = Math.ceil(totalPosts / limit); // Calculamos cuántas páginas hay

    return {
      totalPosts,
      totalPages,
      currentPage: parseInt(page),
      nextPage: parseInt(page) + 1 > totalPages ? null : parseInt(page) + 1,
      previousPage: parseInt(page) - 1 === 0 ? null : parseInt(page) - 1,
      posts

    }
  } catch (error) {
    throw new AppError(error)
  }
};



module.exports = getAllPostsController