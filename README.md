# Basic Instruction

1. open the index.html file in a modern browser
2. check bottom for test results from jasmine
3. click top left 3 line icon to open a menu of feeds
4. click feed to load
5. click rss entry to load that article's page

# Changes made based on course instructions.  (All changes made to jasmine/spec/feedreaders.js)

1. Wrote a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
2. Wrote a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
3. Wrote a new test suite named "The menu".
4. Wrote a test that ensures the menu element is hidden by default.
5. Wrote a test that ensures the menu changes visibility when the menu icon is clicked.
6. Wrote a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
7. Wrote a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.

# Additional tests added beyond course instruction.

1. Wrote a test that ensures the escape key hides the menu when pressed while menu is open.  This currently fails as there is no event handler for the keydown event it is testing.  It is intended as a future enhancement.
2. Wrote a test that ensure the menu hides when a feed link is pressed on the menu.
3. Wrote a test that ensures the feed links list and the feed definitions object have matching names and ids for all items.