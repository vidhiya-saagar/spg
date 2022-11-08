# SPG App
This project is an admin tool designed to digitize Suraj Prakash into a central database. You can find the [spg.dev](https://spg.dev/) front-end repo [over here](https://github.com/dsomel21/shaheedi-spg) 

## Running Locally
As of right now, this repo is public however the the database is not. 

Make sure you have the following setup: 
* Node v12.18.3
* MySQL 5.7
* Knex JS


1. **Clone the repo**: `git clone git@github.com:dsomel21/spg.git`

2. **Install dependencies**: 

```
cd spg && yarn
cd client && yarn
```

3. **Create the Database** and create a `.env` file in the root directory of the repo and paste the following details: 

```
DATABASE_HOST="localhost"
DATABASE_USER="YOUR_MYSQL_USERNAME"
DATABASE_PASSWORD="YOUR_MYSQL_PASSWORD"
DEVELOPMENT_DATABASE="THE_DATABASE_YOU_JUST_CREATED"
```

4. **Run Migrations** and seeds:

```
knex migrate:latest
knex seed:run
```

**NOTE**: We may have to run this with `npx`.  

5. **Run Server**:

Run `yarn start` in the root directory and this will boot-up the API in `localhost:1469/`. Then run `yarn start` in `client/` directory to run the admin section. You can now run the app in `localhost:3000/`



## Tools
* **NodeJS/Express:** Building Rest API
* ~~**PostgreSQL**: For DB.~~
* **MySQL** For DB (support + documentation made me move) 
* **TypeScript**: Schema validations (in progress)
* **Knex**: Query builder! Not ORM.
* **React**: [Cuz why not](https://twitter.com/wesbos/status/598144948559605760)

## Project
> **ਉਨਿਸ ਸਤ ਪੂਰੇ ਭਏ ਸ੍ਰੀ ਸੰਤੋਖ ਮ੍ਰਿਗੇਸ । ਸ੍ਰੀ ਸੂਰਜ ਪਰਕਾਸ ਕਿਅ ਅਦਭੁਦ ਗ੍ਰੰਥ ਬਿਸੇਸ ।⁣**
>
> *In 1900 Bikrami (1843 CE) the Exalted Santokh Singh completed the magnificent and marvelous Suraj Prakash.*
>
> **ਜਾ ਸਮਾਨ ਕਉ ਗ੍ਰੰਥ ਨ ਆਨਾ । ਸਤਗੁਰੁ ਜਸ ਕਰ ਮਨਹੁ ਖਜਾਨਾ । ⁣**
>
> *There is no other [historical] text equal to the Suraj Prakash - recognize it as the treasure trove of praise of the True Guru.⁣*
>
> **ਰਚ ਜਹਾਜ ਜਗ ਸਿੰਘ ਤਰਾਏ । ਸ੍ਰੀ ਸੰਤੋਖ ਸਿੰਘ ਜਸ ਆਏ । ⁣**
>
> **The Exalted Santokh Singh acquired great praise; in this world he created this vessel to liberate all the Singhs.**

> *Baba Sumer Singh - 'Gurpad Prem Prakash' (1880), page 527.⁣ (Translation by [Manglacharan](https://www.manglacharan.com/))*

Kavi Santokh Singh Ji has contributed his life to poetically documenting the life of the Sikh Guru's. This project strives to create a central database for Kavi Ji's *Gurprataap Sooraj Granth* (also known as *Sooraj Prakash Granth*) using the admin tools in this application.

## Recommended Links: 
* [Suraj Podcast](https://www.surajpodcast.com/) - An amazing podcast in English that goes through chapters of *SPG* 
* [Rara Sahib (formerly on ik13.com)](https://rarasahib.com/online-library/) - Amazing service of publishing volumentric documents on *SPG*

* [shabados/Gurmukhi-Utils](https://github.com/shabados/gurmukhi-utils) - Very useful tool to for when dealing with transliteration/ASCII/unicode converting in the context of the Gurmukhi language. This has COMPLETE code coverage.
## Images:
