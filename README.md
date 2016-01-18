# User Login authentication (User administration) Example

A new user registers and logs into the application and registerd user password saves as hash value.

## Technologies Used:
```

*) `Node.js`
*) `Express.js`
*) `Mongoose`
*) `Modulus (Online database)`
```

## Sample flow of control:
```
localhost:8080/
        --> welcome  -------> register new user ---------------------> authenticate route ---> save user
            |
            |
            |         |-----------> login successful
            |         |         |
            ------------->  login route       |--> home page
                      |
                      |----> error page on login page
```

## Example
```
>npm install

>nodemon server.js

url:

http://localhost:8080  - Login/Register page
```

## Documentation
```
1) `User Administration` module  - New User registered with the site by entering name, username and password. 
A new `hash code` will be generated to the password and saved it as password value into the modulus user document.

2) When a user logged into login screen by entering username and password, application gets the user document by searching with entered username and gets the generates `hashcode` for the entered password, and compares the generated password with retrieved user document password value. 

3) Application displays the Home page if password matches otherwise error message will be send back as json message.
```

## License
[MIT](http://showalicense.com/?year=2016&fullname=Chiranjeevi%20Bairaagoni%20(Jeevi)#license-mit) © Chiranjeevi Bairaagoni (Jeevi)