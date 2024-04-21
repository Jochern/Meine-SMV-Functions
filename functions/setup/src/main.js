import createUser from "./users/create_users.js"

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {

  // You can log messages to the console
  log('Request Recieved!');
  const obj = JSON.parse(req.body.toString());

  log(obj.toString())
  // The `req` object contains the request data
  if (req.method === 'POST') {
    log(req.body.type)
    if (req.body.type == 'school') {
      try {
        await create
        await createUser({ email: req.body.email, name: req.body.name, schoolShorthand: req.body.schoolShorthand, password: req.body.password, role: req.body.role, log: log })
        log(`Created User '${req.body.username}' with role'${req.body.role}', name'${req.body.name}', school '${req.body.schoolShorthand}' `)

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
