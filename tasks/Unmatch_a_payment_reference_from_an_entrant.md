# Unmatch a payment reference from an entrant

Just like we can match a payment reference, we need the ability to unmatch one if it's been done by mistake or something has changed that requires this.

User interface wise, this should take the entry and put it under "unmatched" and give them the abiltiy to match to another user as it would if it was unmatched straight after the report was imported.  In the database, if it's a payroll report it should empty the payroll_reference for that user, if it's a direct debit or bank statement report it should delete the entry from the reconciliation table.
