# Database tables and variables

* ERD-v3 contains finalised Entity Relationship Diagram

## What data do I want the user to be able to enter?
### User info (Probably will design for just one person)

* Name
* Username
* Email
* Country

### Journal related data

* Mood for the day
* Accompanying text to go more in depth if needed
* Labels to help organise days
* User inputted variables to correlate data with

## How to organise data
### 1
* A table of users
* Have a table of user_days where each row is a day, constant variables like mood, notes, array of labels and an array of user inputted variables?
* Is it possible to link an entire table to a user?
* Is it possible to have changing variables or should user inputted variables be an array?

### 2
* A table with each row being a day, the columns: id, date & time, entry:"", mood-energy:1-5, mood-emotion:1-5, labels:[], custom variables: []
* Should I have the two mood axes as separate values in the table or combine them in an array?
* Is there a better way of storing labels and custom variables rather than keeping them in arrays?????????? I could use another table but then the customisation creates problems with columns.

Table:
[ID] [DATE AND TIME] [ENTRY TEXT] [MOOD:[ENERGY, EMOTION]] [LABELS:[LABEL1, LABEL2 etc...]] [VARIABLES:{variable1: true, etc ...}]

## 3

* I'll have two separate tables, 1 - 1, one table for the ungraphed data: ID, Date, Entry text, Labels and one table for the graphable data which is mood and variables. Then it seems like it would be a good separation of concerns in regards to functions and querying tables.
* I've decided to drop separate users for now.

Entries:
[ID] [DATE AND TIME] [ENTRY TEXT] [LABELS]
Variables:
[ID] [MOOD:[ENERGY, EMOTION]] [VARIABLES:{variable1: true, etc...}] [ENTRY_ID]

* Refer to ERD v1 for the diagram corresponding to this

## 4

* I think the best way to display would be to create a 'Variables' table where each row is one custom variable instead of keeping them in an object. The individual entries could be linked to them using a 1-* relationship.
* The mood should either be duplicated or linked in another table but that might be overkill for a simple array.

Entries:
[ID] [DATE AND TIME] [ENTRY TEXT] [LABELS]
Variables:
[ID] [MOOD:[ENERGY, EMOTION]] [{VARIABLE1}] [ENTRY_ID]
[ID] [MOOD:[ENERGY, EMOTION]] [{VARIABLE2}] [ENTRY_ID]
etc...

## 5

* This means you can get mood vs time, variables vs time, variables vs mood without too much trouble.

Entries:
[ID] [DATE AND TIME] [ENTRY TEXT] [LABELS]
Variables:
[ID] [{VARIABLE1}] [ENTRY_ID] [MOOD_ID]
[ID] [{VARIABLE2}] [ENTRY_ID] [MOOD_ID]
etc...
Moods:
[ID] [MOOD:[ENERGY, EMOTION]] [ENTRY_ID]

* Refer to ERD v2 for the diagram corresponding to this

## 6

* Got input from dad on final version of data structure and I'm going to implement his suggestions. A lookup table for variables and mood with a join table for entry and variables that contains the variable value.
* Also non plural table names

Entry:
[ID] [TIMESTAMP] [ENTRY TEXT] [LABELS] [MOOD_ID]
Variable:
[ID] [VARIABLE NAME]
Entry-Variable join table:
[ENTRY_ID] [VARIABLE_ID] [VARIABLE VALUE]
Mood:
[ID] [ENERGY] [OUTLOOK]

* Refer to ERD v3 for finalised data structure and diagram

https://www.draw.io/#Lerd.xml
