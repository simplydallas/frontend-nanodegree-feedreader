# Basic Instruction

1. open the index.html file in a modern browser
2. check bottom for test results from jasmine
3. click top left 3 line icon to open a menu of feeds
4. click feed to load
5. click rss entry to load that article's page

# Changes made based on course instructions.
##### All changes made were to the jasmine/spec/feedreaders.js file

* Wrote a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
* Wrote a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
* Wrote a new test suite named "The menu".
* Wrote a test that ensures the menu element is hidden by default.
* Wrote a test that ensures the menu changes visibility when the menu icon is clicked.
* Wrote a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
* Wrote a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.

# Additional tests added beyond course instruction.

* Wrote a test that ensures the escape key hides the menu when pressed while menu is open.  This currently fails as there is no event handler for the keydown event it is testing.  It is intended as a future enhancement.
* Wrote a test that ensure the menu hides when a feed link is pressed on the menu.
* Wrote a test that ensures the feed links list and the feed definitions object have matching names and ids for all items.