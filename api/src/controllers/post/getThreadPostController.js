const { Post, Profile, User, Comment } = require("../../db.js");
const AppError = require("../../utils/appError.js");

const getThreadPostController = async (id, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        // 📌 Función para incluir User y Profile en los comentarios y respuestas
        const userProfileInclude = {
            model: User,

            attributes: ["id"],
            include: [{ model: Profile, attributes: ["name", "profilePicture", "id", "gender"] }]
        };

        let totalPosts = 0;
        let posts = [];

        // 📌 Intentar buscar como un Post
        let thread = await Post.findOne({
            where: { id },
            include: [
                {
                    model: Comment,
                    as: "comments", // Alias para los comentarios del post
                    where: { parentId: null },
                    required: false,
                    limit,
                    offset,
                    include: [userProfileInclude] // Incluye User y Profile
                },
                {
                    model: User,
                    as: "user", // Alias para el usuario del post
                    attributes: ["id"],
                    include: [{ model: Profile, attributes: ["name", "profilePicture", "id", "gender"] }]
                }
            ]
        });

        if (thread) {
            totalPosts = await Comment.count({ where: { postId: id, parentId: null } });
            posts = [thread]; // Lo envolvemos en un array para mantener el formato
        } else {
            // 📌 Si no es un Post, buscar como Comentario
            thread = await Comment.findOne({
                where: { id },
                include: [
                    {
                        model: Comment,
                        as: "replies",
                        limit,
                        offset,
                        include:
                        {
                            model: User,
                            attributes: ["id"],
                            include: [
                                {
                                    model: Profile,
                                    attributes: [
                                        "name", "profilePicture", "id"
                                    ]
                                }
                            ]
                        }
                        
                    },
                    
                    { model: Comment, as: "parent", },
                    { model: Post, as: "post" },
                    userProfileInclude
                ]
            });

            if (!thread) throw new AppError("Thread no encontrado", 404);

            totalPosts = await Comment.count({ where: { parentId: id } });
            posts = [thread]; // También lo envolvemos en un array
        }

        const totalPages = Math.ceil(totalPosts / limit);

        return {
            totalPosts,
            totalPages,
            currentPage: parseInt(page),
            nextPage: parseInt(page) + 1 > totalPages ? null : parseInt(page) + 1,
            previousPage: parseInt(page) - 1 === 0 ? null : parseInt(page) - 1,
            posts
        };
    } catch (error) {
        throw new AppError(error.message || "Error en la consulta", 500);
    }
};

module.exports = getThreadPostController;





// const { Post, Profile, User, Comment } = require("../../db.js");
// const AppError = require("../../utils/appError.js");

// const getThreadPostController = async (id, page = 1, limit = 10) => {
//     try {
//         const offset = (page - 1) * limit;

//         // 📌 Incluir User y Profile en los comentarios y respuestas
//         const userProfileInclude = {
//             model: User,
//             attributes: ["id"],
//             include: [{ model: Profile, attributes: ["name", "profilePicture", "id", "gender"] }]
//         };

//         let totalPosts = 0;
//         let posts = [];

//         // 📌 Intentar buscar como un Post
//         let thread = await Post.findOne({
//             where: { id },
//             include: [
//                 {
//                     model: Comment,
//                     as: "comments", // Alias para los comentarios del post
//                     where: { parentId: null },
//                     required: false,
//                     limit,
//                     offset,
//                     include: [userProfileInclude] // Incluye User y Profile
//                 },
//                 {
//                     model: User,
//                     as: "user", // Alias para el usuario del post
//                     attributes: ["id"],
//                     include: [{ model: Profile, attributes: ["name", "profilePicture", "id", "gender"] }]
//                 }
//             ]
//         });

//         if (thread) {
//             totalPosts = await Comment.count({ where: { postId: id, parentId: null } });
//             posts = [thread]; // Lo envolvemos en un array para mantener el formato
//         } else {
//             // 📌 Si no es un Post, buscar como Comentario
//             thread = await Comment.findOne({
//                 where: { id },
//                 include: [
//                     { model: Comment, as: "parent" }, // Comentario padre
//                     { model: Post, as: "post" }, // Post original
//                     userProfileInclude
//                 ]
//             });

//             if (!thread) throw new AppError("Thread no encontrado", 404);

//             // 📌 Buscar respuestas del comentario principal (paginadas)
//             thread.dataValues.replies = await fetchReplies(thread.id, limit, offset, userProfileInclude);

//             totalPosts = await Comment.count({ where: { parentId: id } });
//             posts = [thread]; // También lo envolvemos en un array
//         }

//         const totalPages = Math.ceil(totalPosts / limit);

//         return {
//             totalPosts,
//             totalPages,
//             currentPage: parseInt(page),
//             nextPage: parseInt(page) + 1 > totalPages ? null : parseInt(page) + 1,
//             previousPage: parseInt(page) - 1 === 0 ? null : parseInt(page) - 1,
//             posts
//         };
//     } catch (error) {
//         throw new AppError(error.message || "Error en la consulta", 500);
//     }
// };

// // 📌 Función recursiva para obtener respuestas anidadas (paginadas)
// const fetchReplies = async (parentId, limit, offset, userProfileInclude) => {
//     const replies = await Comment.findAll({
//         where: { parentId },
//         limit,
//         offset,
//         include: [userProfileInclude]
//     });

//     // 📌 Para cada respuesta, buscar sus respuestas anidadas (paginadas)
//     for (let reply of replies) {
//         reply.dataValues.replies = await fetchReplies(reply.id, limit, offset, userProfileInclude);
//     }

//     return replies;
// };

// module.exports = getThreadPostController;
