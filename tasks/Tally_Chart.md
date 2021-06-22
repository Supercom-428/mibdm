# Tally Chart

We need a page that reports on the following data.

Under the "Master Sheet" column, we want "Direct Debit", "Standing Order", and each company that pays via Payroll, with their name prefixed by "Payroll - ".

Deleted entries is anything where the draw_entries status is "2".  Everything else should be easy enough to calculate.

We determine "paid" by the draw_entries being in status "1" that match the category under "Master Sheet" all being entered into the draws for that month.

We should have a column for each month of the year, and for now you can fix this to 2021.  I will work on how we display multiple years another time.



|     Master Sheet      | Count | Monthly Income | January | February |  March  |   etc.  |
| --------------------- | ----- | -------------- | ------- | -------- | ------- | ------- |
|     Direct Debit      |  233  |    XXXX.XX     |   paid  |  pending | pending | pending |
|    Standing Order     |  642  |    XXXX.XX     |   paid  |  pending | pending | pending |
|  Payroll - Company 1  |  424  |    XXXX.XX     |   paid  |  pending | pending | pending |
|  Payroll - Company 2  |   14  |    XXXX.XX     |   paid  |  pending | pending | pending |
|  Payroll - Company 3  |   10  |    XXXX.XX     |   paid  |  pending | pending | pending |
|  Payroll - Company 4  |   18  |    XXXX.XX     |   paid  |  pending | pending | pending |
|       **TOTAL**       | 1341  |   XXXXX.XX     |                                        |
| **Deleted Entries**   |  497  |                                                         |


|        Summary       |     Totals    |
| -------------------- | ------------- |
|  Monthly income x 12 |  £ XXX,XXX.XX |
|  Annual Prize Money  |  £ 104,000.00 |
|  Rolling deficit PA  |  XXX - £104k  |
|  Rolling deficit PM  |    PA / 12    |
|  Rolling deficit PW  |    PA / 52    |
