const app = require("./src/app.js");
const {conection} = require("./src/db.js");


conection.sync({alter : true}).then(()=>{
 console.log("estoy conectado a ",conection.getDatabaseName());
 app.listen(3001,()=>{
    console.log("listening on port 3001");
   })
})
