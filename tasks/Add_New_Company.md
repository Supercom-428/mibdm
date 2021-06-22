# Add New Company
We need the ability to add, update and delete company records.

Some work was already started on this and then hidden.

Have a look at frontend/src/routes/company.js

We have the abiltiy to list in a grid, but no forms for adding, updating or deleting has been done.

Delete button should prompt that they would like to proceed.

I would suggest we use the master view and have the company field link to that company's edit screen, rather than restore this grid, as the client has been very clear that they don't want lots of different grids, they want one master view for as many things as possible.
