# Payroll & Direct Debit Imports


## Payroll Import
We store a payroll_reference in the draw_entrant table.  The import needs to read from the draw_entrant table to find a matching reference.  However, the reference field is not unique, as it is possible for multiple entrants working at different companies to have the same reference.  Therefore, we need to create a new field in the company table that we can store the name of the company that we have in the report file.  This will allow us to search the company table for the ID of the company, and use that for searching in the draw_entrant table.

Any unmatched entries in the report will need to present the matching interface, which will give the user the ability to start typing an existing entrant's name, select the one to match to and click "match".  When clicked, this should add them to the list of matched entries in the user interface, and also update the draw_entrant record for that entrant to store the payroll_reference.

If after you have matched, re-running the import shows the previously unmatched entry as matched, this is working.

## Direct Debit Imports
This will largely work in a very similar way to the bank statement import, using the reconciliation table for matching.

## Entering into a draw
Both of these reports, as happens with the bank statement import, need to enter the entrants into the draws that they have paid to enter, based on the amount they have paid.

If it's £2, it's the next draw after they have paid, but this will likely end up being a manually done thing anyway, so they will come out as already entered into the draw.

If it's £8.67, then it's a full month we enter them in.

If it's £8, then it's a full month we enter them in, but we will be getting 13 payments a year of this for these people, so we need to ensure that if we have procesed a report on the 1st March, and then again on 29th March as an example, both of those imports would be paying for entry to April's draws.  We still log the payment though.

All payments should be a multiple of £8 or £8.67 as that is the price for 1 ticket to be entered into a month's draws.  Some people have multiple tickets, so could be paying more.

