# Record of notes

## 11/05

After doing some research on mood tracking I have decided to rate mood on a simple scale of Negative (1) to Positive (5) and Low energy (1) to High energy (5). This I think is a good balance of complexity, simplicity and ease of use. These axes are based off of this image:
https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAAa-AAAAJDY2MGE3YTFkLTUyYTktNDU4OS1hN2Y0LTdhNTQxNzQxMTRjZA.jpg
Which has a reasonable representation of a variety of moods but I think from personal experience being asked to give your mood a word descriptor can get confusing.

I will compare moods to possible influences. I still think that setting your own variables would make for a more customisable and rich experience. 'Hours of sleep', 'cups of coffee' or 'Meditation time' would be interesting and valid variables. Customisable variables should have either integer or boolean values, for example (period: yes).

I'm going to attempt to use d3.js to plot my graphs and the pearson correlation coefficient to look at data. I would really like a way of generating data without having to send a http request to database and reloading page.

I want to keep things as simple as possible. I think the home page should just have a list of dates and labels with a filter capacity. Maybe a graph on the front page depending on how nice I can get them. I'm going to design everything around the minimum viable product so if it's beyond my ability or I don't have time to create everything I want to the final product isn't affected.

## 13/05

I've decided to work on base HTML, CSS and database today. I want to use a framework at least at first, so I had to choose between Bootstrap or Skeleton. I love Skeleton for it's simplicity but I think my site will need a little bit more complexity. I'm very confident with styling and although it would be fun to build some of the navigation and more complicated elements myself I want to focus on my Javascript, so I went with Bootstrap.

Managed to finalise (for now at least) my database structure and variables, more notes on this process can be found at 'database-tables'. This means I can now write first code! Going to make migrations and some initial seed data.

Ran migrations and created seeds, decided to drop labels for now but hopefully will get the chance to add them back in. Asides from that it all went relatively smoothly!

After a bit of experimentation I've decided to go with Skeleton over Bootstrap, I prefer the styling and I think Bootstrap is actually going to be overly complicated I want to keep my styling super simplistic (-:

## 14/05

Big milestone, got a stacked graph up on the home page! Took me hours, I had to revisit sending HTTP Requests, had to look over other d3 code and try make sense of it so my copy-pastes would work. A few road blocks I ran into were first of all for about half an hour my httpRequest.responseText was returning undefined for no obvious reason then it started working out of nowhere. Also some of the code I was working off was for an outdated version of d3 which was super hard to diagnose and I spent ages trying to figure out. Looking forward to doing more graphs and hopefully I'll learn enough that I properly understand the code I just used hahahaha. My next goal is to make the SVG element responsive and code the 'add entry' page.

Finished coding the 'add entry' page, everything except for the 'create' button. I used input=range which I didn't even know existed and it's so good to style! I challenged myself to make this page perfect, so I made the 'add variable' button add the variable to database, then re render the page with the new variable including and the data that had been filled out before the post request still there! That was super satisfying it makes the page look dynamic and it's very user-friendly. I got to the end and I have a ridiculous amount of code and no refactoring or testing so that's my next goal!

## 16/05

My biggest weakness is definitely testing. I get so excited about the coding things I don't want to take time out to test. I'm going to spend the whole day on Thursday writing tests I think! I created a zoomable/pannable line graph for the 'view Data' page which took a lot of time and frustration. It can take any amount of variables so I'm going to have variables as buttons either underneath or on the top that can re render the graph. I still have a lot of work to get this page looking and working usefully but this is a massive milestone!

## 24/05

Haven't had much progress recently, had to pause while we studied APIs. Converted most of the code to react (except for the Add Entry page) and I want to write tests for everything I've got so I can start out purely test driven from here. Finishing in time will be stressful but I'm confident I can get it done, just going to have to put in a lot of work this week. A feature I really want to add in is definitely infinite scrolling. That would be amazing on the home and filter pages and make the whole experience a lot smoother.

## 25/05

Have 5 passing tests now, and I've got validation and submit for variables working except I think I need to lift the state up from the variable row component to the main add Entry component so changes in the variable row can be reflected in the add Entry state. This is a venture into proper React State territory!

Ok lifted the state up which was both more and less confusing than I expected (that's confusing hahahaha). Things to remember is when updated props they are defined as 'newProps' otherwise you're just setting the state to the old ones over and over again! Also, keep things that the parent component doesnt need to know about always in the child.

## 26/05

Had a rough day today and just wanted something nice and fun to take my mind off of it so I worked on my 'view data' graph which was still not quite finished. I added colour coded legends with an option to click to remove the line from the graph. This was nice and way simpler than I expected it to be. Really shows the power of d3 once you get used to the library. I don't want to but after I get the ability to hover over a legend andhighlight corresponding line I'm going to refactor and write tests.

Came across an interesting bug! For each variable in my submitted entry I needed to call the db.addVariable function. This is of course a promise and when I was looping it wouldn't work. I had to use Promise.all(promiseArr) where for each variable I pushed the promise function onto an array and called it afterwards. Promises have some super fascinating functionality.
Now time for refactoring (:

## 29/05

More on the graph:
It is interesting what a fine line there is between gorgeous and functional. I'm really falling for d3 and graph creation it's a nice blend of beautiful coding and immediate, useful result. I have two options now, I have created a 0.2 opacity area underneath my lines. I haven't assigned a curve function to my area so it's jagged and I think it looks like art. The lines would probably be more functional and easier to perceive but how often do you get to create sketchy zoomable hills! It makes me so happy to look at! I seriously have to refactor this code is disgusting that will be my task for tonight. Also I want less ticks on the axis, which shouldn't be too hard. I like how the area colour hits the bottom of the screen (-:

Ok first thing for refactoring is to just break the code up. Don't worry about passing heaps of arguments through or feeling like it's super hacky just force it all apart. This shows you the flow of your code, what variables are needed where, which ones tend to always be grouped up, how to structure and order the file. Make sure you do this very, very slowly. One function at a time, keep changes tiny. It's easy to make a mistake and bust everything so you don't want to be in too deep when it all goes wrong! I have a function with 9 arguments right now hehe. It won't stay that way forever but it's important to remember it won't all happen at once.
If it seems too hard or it's confusing you, stop! Move on, there's no rush and often functions will just fall into place after a bit more setup.
If you're staring at a bit of code and you think 'there has to be a simpler way to do this', there probably is. Google it straight away!
Don't give up
It'll all work out in the end, if you think you haven't made much progress look again you'll surprise yourself.

Data science isn't super easy to pick up. There are a few flaws with my graphing that I will have to address.
* All values default to 0 which is fine most of the time, but if you're getting to big numbers grouped together having a data point at 0 is going to send the rest of the data into a squished little pile.
* The data points are retrospective so the best date for the entry would be halfway between the date of creation and the last entry that was created. However I'm not going for complete accuracy and this will do for now (:
* I need a way to control the scale extent more, not sure what will happen when data set reaches big numbers. I need to be able to scale to a domain not a factor.
* Would love appropriate y scaling so the data doesn't get all squished together looking when zoomed out.
* I'm sure there's something else I'll type it here when I remember
