## Many things to do:

* [X] Design an ERD (doesn't have to be perfect...)
* [X] With the ERD, begin prototyping in the backend by creating migrations
  * [X] Create the `chapters` entity
  * [X] Create the `chhand` entity
  * [X] Create the `chhand_type` entity
  * [X] Create the `line` (*tuk*) entity
  * [X] Create the `books` (*tuk*) entity
  * [ ] Relationshipify them in order to easily to CRUD
 

 * [ ] Create a client side where we can do CRUD
 * [X] Create a directory/repo to handle client side
 * [X] Setup basic client side project structure (src, helpers, config)
 * [X] Mockup some quick designs for admin client side
 * [X] Create an admin form that allows to add new:
  * [X] Visually see the chapter content (so far...) 
  * [X] Chhand Types
  * [X] New Chhands
  * [X] New lines into a pauri of chhands
* [X] Auto populating `transliteration` when pasting the unicode 
* [X] Auto populating `gurmukhi_script` when pasting the unicode 
* [ ] Preview of the `gurmukhi_script` (with correct fonts)

Version 0.0.7 Goals:
* [ ] Send data from form submissions to backend
* [ ] UI and navigation improvements 
* [ ] Adding better validations on client side
* [ ] Adding validations on backend with JSON { error } returns

## Perhaps this visualization will help:

### Adding Chhands - Quick Sketch
![Adding Chhands](https://i.imgur.com/hzuuxQo.png "Adding Chhands")

### Adding Pauris (Multi-line verse) - Quick Sketch
![Adding Verses](https://i.imgur.com/3CREpkI.png "Adding Verses")
