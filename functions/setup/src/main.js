import setupSchool from "./school/create_school.js";
import createUser from "./users/create_users.js"

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {

  // You can log messages to the console
  log('Request Recieved!');
  // const obj = JSON.parse(req.body.toString());

  // The `req` object contains the request data
  if (req.method === 'POST') {
    if (req.body.type == 'user') {
      /*
        {
          "type": "user",
          "email": "johannesking003@gmail.com",       @optional -> wenn leer dann wird standart erzeugt (username@school.i)
          "name": "Johannes Kling"                    @optional -> wenn email angegeben wird username nicht benoetigt
          "username" : "johannes"
          "password" : "12345678",                   
          "role": "u",				                        // member(m), admin(a), student(s)
          "schoolShorthand": "rbs",
        }
      */
      log('Starting to create User:')
      log(req.body.name)
      try {
        let user = await createUser({ email: req.body.email, name: req.body.name, username: req.body.username, schoolShorthand: req.body.schoolShorthand, password: req.body.password, role: req.body.role, name: req.body.name, log: log })
        log(`Created User '${req.body.username}' with role'${req.body.role}', name'${req.body.name}', name'${req.body.username}', school '${req.body.schoolShorthand}' `)
        return res.json(user)
      } catch (error) {
        return res.json({
          status: 400,
          error: error.toString(),
        })
      }
    } else if (req.body.type == 'school') {
      /*
        {
          "type": "school",
          "schoolShorthand": "rbs",
          "admin": {
            "email": "johannesking003@gmail.com",       
            "name": "Johannes Kling",           
            "password" : "12345678",    
          }
                         
        }
      */
      log('Starting to create School:')
      try {
        let data = await setupSchool({ schoolShorthand: req.body.schoolShorthand, schoolName: req.body.schoolName, admin: req.body.admin, log: log })
        log(`Created school '${req.body.schoolShorthand}', and user '${req.body.admin.name}'.`)

        return res.json(data)
      } catch (error) {
        return res.json({
          status: 400,
          error: error.toString(),
        })
      }
    } else {
      return res.json({
        status: 404,
        error: "Error, no type for message found.",
      })
    }

    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.send('Hello, World!');
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
