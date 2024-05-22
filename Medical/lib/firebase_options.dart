// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyBUdourdn0WlUEQgD31eP6wSgOifV-W79E',
    appId: '1:740679773380:android:2ff5df321648d6ac4ead91',
    messagingSenderId: '740679773380',
    projectId: 'dti-ii',
    authDomain: 'dti-ii.firebaseapp.com',
    storageBucket: 'dti-ii.appspot.com',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyBUdourdn0WlUEQgD31eP6wSgOifV-W79E',
    appId: '1:740679773380:android:2ff5df321648d6ac4ead91',
    messagingSenderId: '740679773380',
    projectId: 'dti-ii',
    // authDomain: 'dti-ii.firebaseapp.com',
    storageBucket: 'dti-ii.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBUdourdn0WlUEQgD31eP6wSgOifV-W79E',
    appId: '1:740679773380:android:2ff5df321648d6ac4ead91',
    messagingSenderId: '740679773380',
    projectId: 'dti-ii',
    // authDomain: 'dti-ii.firebaseapp.com',
    storageBucket: 'dti-ii.appspot.com',
    iosBundleId: 'com.example.medical',
  );
}