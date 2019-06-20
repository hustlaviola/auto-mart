[![Build Status](https://travis-ci.org/hustlaviola/auto-mart.svg?branch=develop)](https://travis-ci.org/hustlaviola/auto-mart)
[![Coverage Status](https://coveralls.io/repos/github/hustlaviola/auto-mart/badge.svg?branch=develop)](https://coveralls.io/github/hustlaviola/auto-mart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/5d98bef9d9b3668dd7b2/maintainability)](https://codeclimate.com/github/hustlaviola/auto-mart/maintainability)

# Auto-Mart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers

### Features

* User can sign up
* User can sign in.
* User (seller) can post a car sale advertisement
* User (buyer) can make a purchase order
* User (buyer) can update the price of his/her purchase order
* User (seller) can mark his/her posted AD as sold
* User (seller) can update the price of his/her posted AD
* User can view a specific car
* User can view all unsold cars
* User can view all unsold cars within a price range
* Admin can delete a posted AD record
* Admin can view all posted ads whether sold or unsold
* User can view all unsold cars of a specific body type
* User can view all unsold cars of a specific make (manufacturer)
* User can view all used unsold cars
* User can view all new unsold cars
* User can ​flag/report​ a posted AD as fraudulent

### Prerequisites

* [Node JS](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [Git](https://git-scm.com/downloads)
* [Travis CI](http://travis-ci.org/)
* [Coveralls](http://coveralls.io/)
* [Code Climate](http://codeclimate.com/)
* ESLint
* Babel
* Mocha
* Chai
* NYC

### Installation

Install a stable version of [Node](https://nodejs.org/)
Install [Git](https://git-scm.com/downloads)

##### Clone the repo

    git clone https://github.com/hustlaviola/auto-mart.git

##### Switch to the directory

    cd auto-mart

##### Install Node Modules

    npm install

##### Run the project

    npm start

### Documentation

[API](http://automobilemart.herokuapp.com/api-docs/)

**Endpoint:** POST ```/api/v1/auth/signup```

Create a user account

Request body:

    {
      "email": String,
      "firstname": String,
      "lastname": String,
      "password": String,
      "address": String
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "token" : String,
        "id" : Integer,
        "firstname" : String,
        "lastname" : String,
        "email" : String,
      }
    }

**Endpoint:** POST ```/api/v1/auth/login```

Login a user

Request body:

    {
      "email": String,
      "password": String,
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "token" : String,
        "id" : Integer,
        "firstname" : String,
        "lastname" : String,
        "email" : String,
      }
    }

**Endpoint:** POST ```/api/v1/car```

Create car sale ad

Request body:

    {
      "state": String,
      "amount": Float,
      "manufacturer": String,
      "model": String,
      "bodyType": String
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "email" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      }
    }

**Endpoint:** POST ```/api/v1/order```

Create a purchase order

Request body:

    {
      "carId" : Integer,
      "amount": Float,
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "carId" : String,
        "createdOn" : DateTime,
        "status" : String,
        "price" : Float,
        "priceOffered" : Float,
      }
    }

**Endpoint:** PATCH ```api/v1/order/<:order-id>/price```

Update the price of a purchase order

A user can only update the price of his/her purchase order while the order's status still reads ​pending

Request body:

    {
      "amount": Float,
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "carId" : String,
        "status" : String,
        "oldPriceOffered" : Float,
        "newPriceOffered" : Float,
      }
    }

**Endpoint:** PATCH ```api/v1/car/<:car-id>/status```

Mark a posted car Ad as sold

Request body:

    {
      "status": String,
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "email" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      }
    }

**Endpoint:** PATCH ```api/v1/car/<:car-id>/price```

Update the price of a car

Request body:

    {
      "amount": Float,
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "email" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      }
    }

**Endpoint:** GET ```api/v1/car/<:car-id>```

View a specific car

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      }
    }

**Endpoint:** GET ```api/v1/car?status=available```

View all unsold cars

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** GET ```api/v1/car?status=available&min_price=​XXXValue​&max_price=​XXXValue```

User can view all unsold cars within a price range

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** DELETE ```api/v1/car/<:car-id>```

Delete a specific Ad

Response spec:

    {
      "status" : String,
      "message" : String,
    }

**Endpoint:** GET ```api/v1/car```

User can view all cars whether sold or unsold

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** GET ```api/v1/car?status=available&body_type=​bodyType```

User can view all unsold cars of a specific body-type

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** GET ```api/v1/car?status=available&manufacturer=xxx```

User can view all unsold cars of a specific manufacturer

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** GET ```api/v1/car?status=available&state=used```

User can view all used unsold cars

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** GET ```api/v1/car?status=available&state=new```

User can view all new unsold cars

Response spec:

    {
      "status" : String,
      "data" : [ {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      },
      {
        "id" : Integer,
        "owner" : String,
        "createdOn" : DateTime,
        "price" : Float,
        "manufacturer" : String,
        "model" : String,
        "bodyType" : String,
        "status" : String,
        "state" : String,
      } ]
    }

**Endpoint:** POST ```api/v1/flag```

User can flag/report​ a posted Ad as fraudulent

Request body:

    {
      "carId" : Integer,
      "reason": String,
      "description": String,
    }

Response spec:

    {
      "status" : String,
      "data" : {
        "id" : Integer,
        "createdOn" : DateTime,
        "carId" : Integer,
        "reason": String,
        "description": String,
      }
    }


##### Testing

    npm test

[gh-pages](https://hustlaviola.github.io/auto-mart/UI)

[Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2346157)
