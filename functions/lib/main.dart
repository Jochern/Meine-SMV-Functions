
// This is your Appwrite function
// It's executed each time we get a request
import 'dart:io';
import 'dart:js_interop';

import 'package:dart_appwrite/dart_appwrite.dart';

//user, adimin, owner		

Future<dynamic> main(final context) async {
// Why not try the Appwrite SDK?
  //
  final client = Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(Platform.environment['APPWRITE_FUNCTION_PROJECT_ID'])
     .setKey(Platform.environment['APPWRITE_API_KEY']);

  final account = Account(client);
  final user = Users(client);


  

  // account.updateName(name: name)
  user.create(userId: ID.unique(), email: )

  // You can log messages to the console
  context.log('Hello, Logs!');

  // If something goes wrong, log an error
  context.error('Hello, Errors!');

  // The `req` object contains the request data
  if (context.req.method == 'GET') {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return context.res.send('Hello, World!');
  }

  context.log(context.req.jsify());

  // `res.json()` is a handy helper for sending JSON
  return context.res.json({
    'motto': 'Build like a team of hundreds_',
    'learn': 'https://appwrite.io/docs',
    'connect': 'https://appwrite.io/discord',
    'getInspired': 'https://builtwith.appwrite.io',
  });
}
