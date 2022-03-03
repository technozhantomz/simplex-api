'# Simplex backend API

Full backend api to integrate simplex crypto api powered by nanobox

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Setup `.env` file with following variable
```
WALLET_ID=0x5b50320C7EB253e282418C8F040788B51040d46D
QUOTE_EP=https://sandbox.test-simplexcc.com/wallet/merchant/v2/quote
ORDER_EP=https://sandbox.test-simplexcc.com/wallet/merchant/v2/payments/partner/data
PAYMENT_EP=https://sandbox.test-simplexcc.com/payments/new
SIMPLEX_APIKEY=6LdhOagdAAAAAFL2rvkXOdJe5uAMnTWu456789
RECAPTCHA_SITE_KEY=6LdhOagdAAAAAFL2rvkXOdJe5uAMnTWucYlRFJLj
RECAPTCHA_SECRET_KEY=6LdhOagdAAAAAPmatki0FRSVYc91kQGOSltFMPfe
API_HOST=http://127.0.0.1:8080

API_KEY=5b50320C7EB253e282418C8F040788B51040d46D
API_KEY_HEADER=apikey
IOS_REFERER=test
ANDROID_REFERER=test
```

## Local
### Installing
Start by installing the dependencies by running ```npm install``` in each of the api and frontend directories.

### Running
To start the two components locally run ```npm start``` in the api directory first followed by ```npm start``` in the frontend directories.



## Running the tests
```
ls
```

## Full Dockerized Deployment

## Pre-Deployment
Before deploying you need to use the .env file from 'Prerequisites' and depending on whether you follow method 1 or method 2 a nginx.conf file.
In either case you will need to replace the server name values to reflect your particular setup.  (I've denoted the items that need to be changed below as apiSubDomain.myDomain.com and frontendSubDomain.myDomain.com). 

**Method 1:**
Before deploying you need to create an .env and a nginx.conf file to place in the location where you will execute the deploy script.

**Method 2:**
Create a fork of the repository and update the /deploy/nginx.conf file and push those changes to your fork

Replacing apiSubDomain.myDomain.com and frontendSubDomain.myDomain.com with your urls. 

##### nginx.conf
```
events {}


http {
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=one:8m max_size=3000m inactive=600m;

gzip_comp_level 6;
gzip_vary on;
gzip_min_length  1000;
gzip_proxied any;
gzip_types text/plain text/css application/json application/x-javascript application/xml application/xml+rss text/javascript;
gzip_buffers 16 8k;

server {
    listen 80 default_server;
    listen [::]:80 default_server;
    return 200;
}
    server {
        listen 80;
        listen [::]:80;
        server_name booker.commodity.llc;
        location / {
            proxy_pass http://api:8080;
            proxy_set_header Host            $host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
    }
        server {
            listen 80;
            listen [::]:80;
            server_name gateway.commodity.llc;
            location / {
                proxy_pass http://frontend:8080;
                proxy_set_header Host            $host;
                proxy_set_header X-Forwarded-For $remote_addr;
            }
        }
}
```
## Deployment
To deploy move the .env, nginx.conf (if using method 1), and the setup.sh file located in /simplex-api/deploy to the location where you want to place your deployment.  Open a terminal in that directory and run ```bash ./setup.sh```  This will set up the environment including checking for and (if needed) installing docker and docker-compose.

Running the script with no arguments 
- checks for and installs docker and docker-compose
- checks for the presence of an .env file 
- clones the latest version of the repository
- builds the docker containers for the api and frontend
- starts the docker containers 



## External APIs



post requests:


### Quote 

- POST /quote\
    returns a quote for the provided input\
    parameter object:
    ```javascript
    {
    digital_currency: "",
    fiat_currency: '',
    requested_currency: "",
    requested_amount "" 'must be a number'
    }
    ```
    - from currency
    - to currency
    - from amount

### Order

- POST /quote\
    returns a quote for the provided input\
    parameter object:
    ```javascript
    {
        account_details: {
          app_end_user_id: ""
        },
        transaction_details: {
          payment_details: {
            fiat_total_amount: {
              currency: "",
              amount: ""
            },
            requested_digital_amount: {
              currency: "",
              amount: ""
            },
            destination_wallet: {
              currency: "",
              address: ""
            }
          }
        }
      }
    ```
    Supplied in quote response:
    - app_end_user_id
    - fiat_total_amount.currency
    - fiat_total_amount.amount
    - requested_digital_amount.currency
    - requested_digital_amount.amount
    
    Additional in the order request:
    - destination_wallet.currency
    - destination_wallet.address

### Status 
- GET /status/:user_id\
    gets the latest status for the particular user_id
   - response:
    ```javascript

  {
      user_id: <string>,
      status: <string>,
      fiat_total_amount: {
          currency: <string>,
          amount: <string>
          },
      requested_digital_amount: {
          currency: <string>,
          amount: <string>
          }
    }
    ```

    - The user_id supplied to the status endpoint the same user_id used to generate the order.
    - The status is updated when an event containing the user_id appears.
    - Note: The user_id is created on a per order basis, so no correlation exists between various orders.


#### Debuging

Logging Namespaces:

validation:bypass

request:
routes-order
routes-quote

response:
routes-order
routes-quote

calls:
getOrder
getQuote

## Built With

* [ExpressJS](https://expressjs.com/) - The web framework
* [Mocha](https://mochajs.org/) - The testing framework
* [docker](https://www.docker.com) - Container Platform

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

# SPK Network Claim Drop Website

## Installation Notes

### 1. Prerequisites

Install the build dependencies on Linux:
```
apt-get update
apt-get install build-essential nasm
```

In addition, the following hardware/software will be required to run the website:

* x86_64 architecture
* Ubuntu 20.04 (preferred) or Ubuntu 18.04
* MongoDB v4.4.x
* Nginx or equivalent (reverse proxy & SSL cert)
* Node.js (v16.13.x) & npm
* [pm2 (latest)](https://pm2.keymetrics.io/)

### 2. Environment Variables

The sample env file `.env.example` can be taken as reference for `.env.local` should be created. Each variables description is mentioned below:

#### Constants

These environment variables will not change.

* `APP_FOR_AUTH` - Since we're only using Hivesigner for authentication, we should use `hive.blog` here so we don't need to configure our own app on the Hive chain.
* `SECRET_COOKIE_PASSWORD` - The password which will be used to encrypt the cookie data. Must be **at least 32 characters** long. Use this [password generator](https://1password.com/password-generator).
* `COOKIE_NAME` - The name to give the cookie. Could be pretty much anything. See the `.env.example` file in the repo.
* `DB_SERVICE_ACCOUNT_USER` - The username of the MongoDB service account being used to make api calls. Needs to have read and write (but not Admin) privileges in the DB.
* `DB_SERVICE_ACCOUNT_PASS` - The password for the service account. Must be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding).
* `DB_HOST` - The host of the database. Most likely `127.0.0.1` for production to keep all communications on the server.
* `DB_PORT` - The port that the database has been configured to use. Should be set to a non-standard port. (**not 27017**)
* `MONGODB_DB` - Default is `snapshotdb`.
* `MONGODB_URI_LOCAL` - The uri connection string to connect to a mongodb instance built using the above variables.
* `SESSION_SALT` - A random string which can also be generated with the password generator listed above. Helps obfuscate session data used to re-auth users during a claim.
* `KEY_SALT` - Another random string which can also be generated with the password generator listed above. Helps obfuscate key data used to re-auth users during a claim.
* `LARYNX_ASSET_ID` - The asset ID for the LARYNX token (`1.3.xx`).
* `LARYNX_ASSET_ISSUER_ID` - The Peerplays account ID (`1.2.xxxx`) which is the issuer of the LARYNX token.
* `LARYNX_ASSET_ISSUER_PRIVATE_ACTIVE_KEY` - The Private Active Key for the Peerplays account which will issue the LARYNX tokens.

#### Defaults

These environment variables act as default values for the website settings. These can be changed within the app from the **admin page**.

* `ADMIN_ACCOUNTS` - An array of strings of Hive account names which will allow the listed users to access and use the admin page. These users must be logged in to the app and will be verified for every admin action they take.
* `BLACKLISTED_ACCOUNTS` - An array of strings (or an empty array) of Hive account names which will be excluded from the claim drop. Default is `[]`.
* `SPECIAL_ACCOUNTS` - An array of strings (or an empty array) of Hive account names which will be excluded from the claim drop. Default is `["hiveio","hive-dao"]`.
* `API_ENDPOINT_FETCH_CLAIM_BALANCES` - The API endpoint to interact with the backend.
* `API_ENDPOINT_PEERPLAYS_NODE` - URL to a Peerplays API Node. Can be changed in the admin settings. Default is `ws://96.46.48.98:18090`.
* `API_ENDPOINT_PEERPLAYS_FAUCET` - URL to the Peerplays Faucet for account creation. Default is `https://faucet.peerplays.download/api/v1/accounts`.
* `KEY_PREFIX` - The prefix of the Peerplays Keys. Default is `PPY`. Can change this to `TEST` to run on a testnet.
* `SNAPSHOT_DATETIME` - The datetime, like `"2022-01-06T23:59:59.999-08:00"`, for the snapshot
* `ICD_JAN_START_DATETIME` - The datetime for the initial claim drop (ICD) start.
* `ICD_JAN_END_DATETIME` - The datetime for the initial claim drop end.
* `MCD_FEB_START_DATETIME` - The datetime for the first monthly claim drop (MCD) start.
* `MCD_FEB_END_DATETIME` - The datetime for the first monthly claim drop end.
* and so on...

> Note the use of double-quotes, like `"hiveio"`, in the admin, blacklist, and special accounts arrays!


### 3. Deployment
#### 3.1 Using the docker compose

Clone this repo
```
git clone https://gitlab.com/PBSA/integrations/spk-network/spk-network-claimdrop-website.git -b develop
```

Change to the directory
```
cd spk-network-claimdrop-website
```

Copy the .env.example file
```
cp .env.example .env.local
```

Edit the any environment verables that need to be updated

Run the docker compose
```
docker-compose --env-file .env.local up -d
```

#### 3.2 Manual Installation

#### 3.2.1 - Mongo DB manual Install

A MongoDB database is required for the website to function. Version `4.4.10` was used in the development of the website. To obtain the most recent version of this software, you must include MongoDB’s dedicated package repository to your APT sources. Then, you’ll be able to install `mongodb-org`, a meta-package that always points to the latest version of MongoDB. To start, import the public GPG key for the latest stable version of MongoDB by running the following command:

```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

This command will return `OK` if the key was successfully added to the system GPG key file. Run the following command (for Ubuntu 20.04), which creates a file in the `sources.list.d` directory named `mongodb-org-4.4.list`. The only content in this file is a single line reading `deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse`:

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```
For Ubuntu 18.04 use the below command
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

This single line tells APT everything it needs to know about what the source is and where to find it:

  * `deb`: This means that the source entry references a regular Debian architecture. In other cases, this part of the line might read `deb-src`, which means the source entry represents a Debian distribution’s source code.
  * `[ arch=amd64,arm64 ]`: This specifies which architectures the APT data should be downloaded to. In this case, it specifies the `amd64` and `arm64` architectures.
  * `https://repo.mongodb.org/apt/ubuntu`: This is a URI representing the location where the APT data can be found. In this case, the URI points to the HTTPS address where the official MongoDB repository is located.
  * `focal/mongodb-org/4.4`: Ubuntu repositories can contain several different releases. This specifies that you only want version `4.4` of the `mongodb-org` package available for the `focal` release of Ubuntu (“Focal Fossa” being the code name of Ubuntu 20.04).
  * `multiverse`: This part points APT to one of the four main Ubuntu repositories. In this case, it’s pointing to the `multiverse` repository.

After running this command, update your server’s local package index so APT knows where to find the mongodb-org package:

```
sudo apt update
```

Following that, you can install MongoDB:

```
sudo apt install mongodb-org
```

When prompted, press `Y` and then `ENTER` to confirm that you want to install the package.

#### 3.2.2 - Start the Service

Run the following systemctl command to start the MongoDB service:

```
sudo systemctl start mongod.service
```

Check the service with:

```
sudo systemctl status mongod
```

If all is well, enable the MongoDB service to start up at boot:

```
sudo systemctl enable mongod
```

note that the database is running on port `27017` on `127.0.0.1`. This is MongoDB’s default port number and **will need to be changed**.

#### 3.2.3 - Add an Admin and Service Account

To add an administrative user, you must first connect to the Mongo shell. Because authentication is disabled you can do so with the `mongo` command, without any other options:

```
mongo
```

You must first connect to the admin database. This is where information about users, like their usernames, passwords, and roles, are stored:

```
> use admin
```

MongoDB comes installed with a number of JavaScript-based shell methods you can use to manage your database. One of these, the db.createUser method, is used to create new users on the database on which the method is run:

```
> db.createUser(
```

As with objects in JSON, documents in MongoDB begin and end with curly braces. To begin adding a user, enter an opening curly brace:

> **Note**: Mongo won’t register the db.createUser method as complete until you enter a closing parenthesis. Until you do, the prompt will change from a greater than sign (`>`) to an ellipsis (`...`).

```
... {
```

Next, enter a `user:` field, with your desired username as the value in double quotes followed by a comma. The following example specifies the username AdminHiltos, but you can enter whatever username you like:

```
... user: "AdminHiltos",
```

Next, enter a pwd field with the passwordPrompt() method as its value. When you execute the db.createUser method, the passwordPrompt() method will provide a prompt for you to enter your password. This is more secure than the alternative, which is to type out your password in cleartext as you did for your username.

> **Note**: The passwordPrompt() method is only compatible with MongoDB versions `4.2` and newer. If you’re using an older version of MongoDB, then you will have to write out your password in cleartext, similarly to how you wrote out your username: `pwd: "password",`

Be sure to follow this field with a comma as well:

```
pwd: passwordPrompt(),
```

Then enter the roles you want your administrative user to have. Because you’re creating an administrative user, at a minimum you should grant them the `userAdminAnyDatabase` role over the `admin` database. This will allow the administrative user to create and modify new users and roles. Because the administrative user has this role in the `admin` database, this will also grant it superuser access to the entire cluster.

In addition, grant the administrative user the `readWriteAnyDatabase` role. This grants the administrative user the ability to read and modify data on any database in the cluster except for the `config` and `local` databases, which are mostly for internal use:

```
roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
```

Following that, enter a closing brace to signify the end of the document:

```
... }
```

Then enter a closing parenthesis to close and execute the db.createUser method:

```
... )
```

All together, here’s what your `db.createUser` method should look like:

```
> db.createUser(
... {
... user: "AdminHiltos",
... pwd: passwordPrompt(),
... roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
... }
... )
```

If each line’s syntax is correct, the method will execute properly and you’ll be prompted to enter a password. Enter a strong password of your choosing. Then, you’ll receive a confirmation that the user was added.

Using the same method as above, add a service account to use for the website configuration. That should look like this:

```
> db.createUser(
... {
... user: "ServiceAccount",
... pwd: passwordPrompt(),
... roles: [ "readWriteAnyDatabase" ]
... }
... )
```

Once again, you'll be prompted to enter a password for this account. At this point, your users will be allowed to enter credentials. However, they will not be required to do so until you enable authentication and restart the MongoDB daemon. But before we enable authentication, we must add the database and collections, then set up a replica set.

#### 3.2.4 - Create the Initial Database and Collections

To create the database we need to use the following command:

```
> use snapshotdb
>db.createCollection("editCustomer")
 db.createCollection("editDiscount")
{ "ok" : 1 }
> db.createCollection("editProduct")
{ "ok" : 1 }
> db.createCollection("editUser")
{ "ok" : 1 }
> db.createCollection("editVariant")
{ "ok" : 1 }
> db.createCollection("newCustomer")
{ "ok" : 1 }
> db.createCollection("newDiscount")
{ "ok" : 1 }
> db.createCollection("newProduct")
{ "ok" : 1 }
> db.createCollection("newRedemption")
{ "ok" : 1 }
> db.createCollection("newUser")
{ "ok" : 1 }
> db.createCollection("newVariant")
{ "ok" : 1 }
> db.createCollection("saveCustomer")
```

Since `snapshotdb` doesn't exist, MongoDB will create it and switch to it. Now we'll add the collections with:

```
> db.createCollection("accounts")
> db.createCollection("adminsettings")
> db.createCollection("claims")
> db.createCollection("logs")
```

Exit the mongo program with `exit`.

#### 3.2.5 - Create a Replica Set

First we'll edit the MongoDB config file to enable replica sets and change the default port too. Open the `/etc/mongod.conf` file for editing. You can use an editor like `nano` or `vim`:

```
sudo nano /etc/mongod.conf
# or... sudo vim /etc/mongod.conf
```

Find the `network interfaces` section and **replace the port number** with an unused port other than the default (`27017`). In this example, I use `22119`:

```
...
# network interfaces
net:
  port: 22119
  bindIp: 127.0.0.1
...
```

Next, find the line that reads `#replication:` towards the bottom of the file. Uncomment this line by removing the pound sign (`#`). Then add a `replSetName` directive below this line followed by a name which MongoDB will use to identify the replica set:

```
replication:
  replSetName: "rs0"
```

Note that there are two spaces before the `replSetName` directive and that the name is wrapped in quotation marks (`"`), both of which are necessary for this configuration to be read properly. Save and close the file. Then, restart the mongod service by issuing the following command:

```
sudo systemctl restart mongod
```

With that, you’ve enabled replication for the MongoDB instance. Now we can start the replica set. We'll open `mongo` again:

```
mongo --port 22119
```

And enter the following commands one at a time:

```
> rs.initiate()
```

First you will notice the prompt changes to `rs0:OTHER>` or `rs0:SECONDARY>` which is ok. If you run another command like `rs.help()` you will see the prompt change to `rs0:PRIMARY>`. This concludes the replica set setup. Next we'll need to configure the authentication settings. Exit the mongo program with `exit`.

#### 3.2.6 - Authentication Config

We'll edit the MongoDB config file again like before:

```
sudo nano /etc/mongod.conf
# or... sudo vim /etc/mongod.conf
```

Scroll down to find the commented-out `security` section and uncomment it by removing the pound sign (`#`):

```
...
security:

...
```

Then add the `authorization` parameter and set it to `enabled`. When you’re done, the lines should look like this:

```
security:
  authorization: enabled
```

Note that the `security:` line has no spaces at the beginning, while the `authorization:` line is indented with two spaces. After adding these lines, save and close the file. Then restart the daemon to put these new changes into effect:

```
sudo systemctl restart mongod
```

Now the database is setup and good to go for the website install.

#### 3.2.7 Website Manual deployment
Clone this repo
```
git clone https://gitlab.com/PBSA/integrations/spk-network/spk-network-claimdrop-website.git -b develop
```

Change to the directory
```
cd spk-network-claimdrop-website
```

Install npm 
```
apt-get install npm
```

Building the application
```
npm install
npm run build
```

Running the application
```
npm run pm2
```


