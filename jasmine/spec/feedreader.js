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


        /* try to ensure the menu is closed after each test */
        afterEach(function() {
            if(!theBody.hasClass('menu-hidden')) {
               menuIcon.trigger('click');
            }; 
        });

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
            //click the menu icon to show the menu
            menuIcon.trigger('click');
            //check if it is visible
            expect(theBody.hasClass('menu-hidden')).toBe(false);
            //click the icon again
            menuIcon.trigger('click');
            //check if it is hidden
            expect(theBody.hasClass('menu-hidden')).toBe(true);
        });

        /* This is an additional test that checks if the escape key hides 
         * the menu when pressed while menu is open
         */
        it('hides on escape keydown', function() {
            //show the menu
            menuIcon.trigger('click');
            //double check that it is now shown as an expectation
            expect(theBody.hasClass('menu-hidden')).toBe(false);

            //send an escape key key event to close the menu
            $( "body" ).trigger({
                type: 'keydown',
                which: 27 // Escape key
            });

            //check that it is now hidden as an expectation
            expect(theBody.hasClass('menu-hidden')).toBe(true);
        });        

        /* This is an additional test that ensures feed links on the menu
         * hide the menu when clicked.  It will first ensure that
         * the menu is shown after a click.
         */
        it('hides on feed link click', function() {
            //show the menu
            menuIcon.trigger('click');
            //double check that it is now shown as an expectation
            expect(theBody.hasClass('menu-hidden')).toBe(false);
            //click the first link in the feed list
            $('.feed-list li a:first').trigger('click');
            //check if the menu is hidden as expected
            expect(theBody.hasClass('menu-hidden')).toBe(true);
        });

        /* This is an additional test that ensures when each feed link 
         * on the menu is given an itterating data-id that matches it's feed
         * definition id
         */
        it('has matching names and ids for feed list items', function() {
            var aFLen = allFeeds.length,
                feedLinks = $('.feed-list li a'),
                i = 0;

            for (i=0; i < aFLen; i++){
                //check that names match
                expect(allFeeds[i].name).toBe(feedLinks.eq(i).text());
                //check that feed link data-id matches feed definition id
                expect(allFeeds[i].id).toBe(feedLinks.eq(i).data('id'));
            }
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
         * each test.  It will toggle between feeds 0 and 1 each time so it
         * is important that we always have at least 2 feeds defined
         */
        beforeEach(function(done) {
            //wipe our current feeds before testing each load
            feedContainer.empty();
            //load our feed with a callback
            loadFeed(feedNum,function(){
                //toggle between 1 and 0 on our feed numbers loaded
                feedNum = 1 - feedNum;
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
