/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the RSS feed application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    
    /* This suite tests the RSS feeds definitions in the allFeeds variable */
    describe('RSS Feeds', function() {
        /*some shared variables for this suite */
        var i = 0,
            aFLen = allFeeds.length;

        /* This is a test that makes sure the allFeeds variable has
         * been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined urls', function() {
            for (i=0; i < aFLen; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            for (i=0; i < aFLen; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });        
    });


    /* This suite tests the visibility states of the menu */
    describe('The menu', function() {
        /* some shared variables for this suite */
        var menuIcon = $('.menu-icon-link'),
            theBody = $('body:first');  

        /* This is a test that ensures the menu element is
         * hidden by default.  It expects the .menu-hidden class
         */
        it('is hidden', function() {
            expect(theBody.hasClass('menu-hidden')).toBe(true);
        });


        /* This is a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * has two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('toggles visibility on click', function() {
            menuIcon.trigger('click');
            expect(theBody.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(theBody.hasClass('menu-hidden')).toBe(true);
        });  
    });



    /* This suite is for testing the RSS feed loading function loadFeed() */
    describe('New Feed Selection', function() {
        /* some shared variables for this suite */
        var feedContainer = $('.feed'),
            feedNum = 0,
            storedHtml = '';

        /*
         * This empties our feed container and loads a new feed before
         * each test.  It will load a new feed number each time so it
         * is important that if we add more specs than feeds we add a loop
         * based on length.  For now we only have 2 specs though.
         */
        beforeEach(function(done) {
            //wipe our current feeds before testing each load
            feedContainer.empty();
            //load our feed with a callback
            loadFeed(feedNum,function(){
                //add 1 to our feedNum for the next test
                feedNum++;
                //let jasmine know this is done running
                done();
            })
        });

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('completes its work and loads entries', function() {
            //store the html for feeds so it can be checked for changes later
            storedHtml = feedContainer.html();
            //make sure we have some entries loaded
            expect(feedContainer.find('.entry').length).toBeGreaterThan(0);
        });  

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes entry content with new feed definition', function() {
            //make sure we have some entries loaded
            expect(feedContainer.find('.entry').length).toBeGreaterThan(0);
            //make sure they are different than the previous feed load
            expect(feedContainer.html()).not.toBe(storedHtml);
        });          
    });
}());
