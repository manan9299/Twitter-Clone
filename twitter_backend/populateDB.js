const sqlConnection = require('./config/sqlConnection');

batchUsers = [];
for( let i =0; i< 10000;i++){
    let data = {
        username:"batchUser"+i,
        first_name:"user" + i,
        last_name:"userLast" + i,
        city: "City3",
        zip: "123123",
        description: " Some Desc",
        profile_image:"",
        email:"user"+i+"@gmail.com",
        password:"user"+i+"user"+i
    }
    user = [data.username, data.first_name, data.last_name, data.city, data.zip, data.description, data.profile_image, data.email, data.password];
    batchUsers.push(user);
    
}

var query = `INSERT INTO users (username,first_name, last_name, city,zip,description,profile_image, email, password) VALUES ?`;            
//sqlConnection.connect();
sqlConnection.query(query, [batchUsers], (err) => {
    if(err){
        console.log(err);
        sqlConnection.end();
    }
});
