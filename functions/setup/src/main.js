import createUser from "./users/create_users.js"

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {

  // You can log messages to the console
  log('Request Recieved!');


  // The `req` object contains the request data
  if (req.method === 'GET') {
    await createUser({ email: 'test@test.de', name: 'testname', password: 'test', role: 'm', log: log })
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
