let express = require("express")();
let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

// 规划mysql链接
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "user"
})

// 登陆
sql.connect();
express.get("/denglu", (request, response) => {
        let username = request.query.username;
        let password = request.query.password;

        sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`, (error, data) => {
            if (error) {
                console.log(error);
                response.send("error")
            } else {
                if (!data.length) {
                    response.end("error")
                } else {
                    response.end("success")
                }
            }
        })

    })
// 注册接口
express.get("/addUser",(request,response)=>{
	let username = request.query.username;
	let password = request.query.password;
	sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`,(error)=>{
		if(error){
			console.log(error);
			response.send("error")
		}
		else{
			response.send("success")
		}
	})

})
// 详情页
// let id = 0;
// express.get("/click",function(request,response){
// 	id = request.query.id;
// 	express.get("/getxiangqing",function(request,response){
// 		sql.query(`SELECT * FROM getxiangqingmore WHERE id=${id}`,function(error,data){
// 			if(error){
// 				console.log(error)
// 				response.send("error")
// 				return;
// 			}
// 			response.send(JSON.stringify(data));
// 		})
// 	})
// })

// //购物车第一页
// express.get("/getnum",function(request,response){
//   let title = request.query.title;
//   let price = request.query.price;
//   let num = request.query.num;
//   let id = request.query.id;
//   sql.query(`insert into yemianbiao (title,price,num,shopId) values ("${title}",${price},${num},${id})`,function(error,data){
//       if(error){
//           console.log(error);
//           response.end("error");
//       }
//       else{
//           response.send(JSON.stringify(data))
//       }
//   })
  
// })

// express.get("/clickdata",function(request,response){
// 	id = request.query.id;
// 	express.get("/getdata",function(request,response){
// 	    sql.query(`select * from yemianbiao where shopId=${id}`,function(error,data){
// 	        if(error){
// 	            console.log(error);
// 	            response.end("error");
				
// 	        }
// 	        else{
// 	            response.send(JSON.stringify(data))
// 	        }
// 	    })
// 	  })
// })

// server.get("/editdata",function(request,response){
// 	let name = request.query.name;
// 	let place = request.query.place;
// 	let placemore = request.query.placemore;
// 	let tel = request.query.tel;
// 	let id = request.query.id;
//   sql.query(`insert into dingdanmore (name,squire,smallsquire,tel,shopId) values (${name},${place},${placemore},${tel},${id})`,function(error,data){
//       if(error){
//           console.log(error);
//           response.end("error");
//       }
//       else{
//           response.send(JSON.stringify(data))
//       }
//   })
  
// })

// 监听在哪一个8080端口上
express.listen(port)
console.log("server is running at " + port)