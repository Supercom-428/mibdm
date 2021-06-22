# Admin Actions Log
We want a history of actions triggered by an admin user so we have an audit trail if someone has done something wrong.

This should save something to the database table whenever someone visits a page, makes a post request, anything, and contain some basic details that lets us know what they've been doing.  It should not include any sensitive information, but should refer to record IDs if something has been CRUD'd.

Based on the above criteria, we are writing the following data;

- userId - this is the logged in user's ID
- timestamp - this is the time the event occurred, so NOW() in MySQL
- description - something that describes what has happened in this event, keep it short, but make sure it's descriptive enough to at a glance know what happened, such as "Bank Statement Import - Processed Document", or "Bank Statement Import - Matched Entrant", or "Bank Statement Import - Unmatched Entrant", or "Bank Statement Import - Entered Into Draws" etc.
- pageUrl - the page the user was on at the time
- requestType - GET, POST, etc.
- data - this will be anuthing useful in terms of data submitted, so could be a document ID, or an entrant ID, an entry ID, a weekly draw ID, etc, and as many of these as possible, but nothing sensitive, so no names, email addresses etc.

The code should be as minimal as possible where the logging happens, I don't want 100 lines of code each time we log something, it'll clutter up too much.  Create an abstracted function to do this if needed and keep it nice and clean.
