// require('dotenv').config();
// const {CONNECTION_STRING} = process.env;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
//   })

// module.exports = {
//     loadPage: (req, res) => {
//         res.status(200).sendFile(path.join(__dirname, '../public/home.html'))
//     }
// }