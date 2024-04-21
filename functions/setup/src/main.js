import createUser from "./users/create_users.js"

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {

  // You can log messages to the console
  log('Request Recieved!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    log(req.body)
    // if (req.bod)
      try {
    await createUser({ email: 'johannes.kling@outlook.de', name: 'testname', schoolShorthand: 'TESTTEST', password: 'test', role: 'm', log: log })
        log('hu')


      } catch (error) {
        return res.send('Hello, World!');
        res.json({
          status: 400,
          error: error.toString(),
          initialEmail: "johannes.kling@outlook.de",
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
