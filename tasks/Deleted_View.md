# Deleted View

1. Move "status" from draw_entrant to draw_entries_table
2. All new entries should go down as status "0"
3. When a payment is received, move the status to "1"
4. We need to introduce the option to "delete" an entry, which does NOT delete them, and just changes the status to "2"
5. This should not affect any entries into draws already entered, nor should it effect their ability to make a payment in the future and do #3 in this list
6. We then want to create a view the same as "Master View", but ONLY includes entries with a status of "2", and call it "Deleted Numbers" in the menu


Please provide estimates for each item above.
