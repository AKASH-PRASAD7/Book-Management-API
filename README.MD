# This is a Book Record Management API build with node js & express

# Routes and EndPoints

# 1) /users

    POST: Create a new user
    GET: Get all list of users

# /users/{id}

    GET: Get a user by id
    PUT: Update a user by id
    DELETE: Delete a user by id (check if he/she still has an issued book) (is there any fine to be paid)

# /users/subscription-details/{id}

    GET: Get user subscription details

1.  Date of subscription
2.  Valid till
3.  Fine if any

# /books

    GET: Get all books
    POST: Create/Add a new book

# /books/{id}

    GET: Get a book by id
    PUT: Update a book by id

# /books/issued/by-user

    GET: Get all issued books

# /books/issued/withFine

GET: Get all issued books with fine

# Subscription Types

Basic (3 months)
Standard (6 months)
Premium (12 months)

    NOTE: dates will be in format mm/dd/yyyy

If the subscription date is 01/01/22
and Subscription type is Standard
then it will be valid till date will be 01/06/22

# Fines

If he has an issued book he did not return within
return date, then he gets a fine of $69

If he has an issued book and he misses the date of return, and his subscription also expires, then he will get a fine of $169
