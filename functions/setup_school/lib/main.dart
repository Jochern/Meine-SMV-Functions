import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:dart_appwrite/dart_appwrite.dart';

// This is your Appwrite function
// It's executed each time we get a request
Future<dynamic> main(final context) async {

  final client = Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(Platform.environment['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(Platform.environment['APPWRITE_API_KEY']);

  String functionData =
      Platform.environment['APPWRITE_FUNCTION_EVENT_DATA'].toString();
  Map<String, dynamic> payload = json.decode(functionData);

  context.log(payload.toString());
  // String UPDATED_AT_KEY = "updatedAt";
  // final collectionId = payload["\$collection"];
  // final documentId = payload["\$id"];
  // print('Collection ID: $collectionId, Document ID: $documentId');
  // final currentTimeStamp = DateTime.now().toString();
  // print('Current Time Stamp: $currentTimeStamp');
  // if (!payload.containsKey(UPDATED_AT_KEY)) {
  //   print("Collection doesn't contain \"updatedAt\" key!");
  //   return;
  // }

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

  // `res.json()` is a handy helper for sending JSON
  return context.res.json({
    'motto': 'Build like a team of hundreds_',
    'learn': 'https://appwrite.io/docs',
    'connect': 'https://appwrite.io/discord',
    'getInspired': 'https://builtwith.appwrite.io',
  });
}
