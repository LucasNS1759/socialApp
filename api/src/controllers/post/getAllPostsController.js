const { Post, Profile, User,Comment } = require("../../db.js");
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
                  attributes: ["name","surName", "profilePicture", "id"]
                }
              ]
            },
            {
              model: Comment,
              where: { parentId: null }, // Solo los comentarios raíz
              include: [
                {
                  model: User,
                  attributes: ["id"],
                  include: [
                    {
                      model: Profile,
                      attributes: ["name","surName", "profilePicture", "id"]
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
                          attributes: ["name","surName", "profilePicture", "id"]
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
          posts,
          totalPosts,
          totalPages,
          currentPage: page,
        }
      } catch (error) {
      throw new AppError(error)
      }
    };



module.exports = getAllPostsController