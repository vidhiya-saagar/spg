## Many things to do:

* [X] Design an ERD (doesn't have to be perfect...)
* [X] With the ERD, begin prototyping in the backend by creating migrations
  * [X] Create the `chapters` entity
  * [X] Create the `chhand` entity
  * [X] Create the `chhand_type` entity
  * [X] Create the `line` (*tuk*) entity
  * [X] Create the `books` (*tuk*) entity
  * [ ] Relationshipify them in order to easily to CRUD
 

 * [] Create a client side where we can do CRUD
 * [] Find an efficient way to CRUD
 * [] Create an admin form that allows to add new:
  * [] Chhand Types
  * [] New Chhands
  * [] New lines into a pauri of chhands
* [] Auto populating `transliteration` when pasting the unicode 
* [] Auto populating `gurmukhi_script` when pasting the unicode 
* [] Preview of the `gurmukhi_script` (with correct fonts)

## Perhaps this visualization will help:

### Adding Chhands - Quick Sketch
![Adding Chhands](https://i.imgur.com/hzuuxQo.png "Adding Chhands")

### Adding Pauris (Multi-line verse) - Quick Sketch
![Adding Verses](https://i.imgur.com/3CREpkI.png "Adding Verses")
