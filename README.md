# Designing an Application for Glacier National Park's Backcountry Hiking Community

## Details
Backcountry App team from the A20 Glacier National Park IQP. 
Our report can be found [here](https://backcountry2020.wpi.edu/resources/BC_FinalReport_1016.pdf)

Run the server with:
node server/server.js >> stdout.txt >> stderr.txt &

## Project Abstract

Planning a backcountry hiking trip in Glacier National Park requires extensive research
and information from numerous sources, which can be challenging for many visitors. Our team
worked with members of the Glacier National Park staff to develop a web application to assist
hikers with the backpacking planning process. We analyzed interviews, online surveys, and
existing hiking apps to determine design and features. The resulting web application contains a
step-by-step planning guide with permitting and safety information, as well as an interactive map
with trail specifics including trail elevation profiles and important campground information. We
recommend that the Glacier staff continue the development of this application into a mobile
platform and improves the current trail reporting system on their website.

## Developers' Guide

Our developers' guide is a resource for future developers and discusses our code, server,
and ArcGIS maps. Our website code can be found on our GitHub repository. It is open source
under the Apache 2.0 license, so our work can be used freely by any project using that Apache
2.0 license. A future developer could clone or fork the repository to continue working with our
resources. Our project can be run by creating a web server with our “www/” folder as the file
directory. The project uses a Node JS server which can be run in the terminal from the “server/”
folder using the command “node server/server.js”. To use the server, the database must be
initialized. This can be done by using the source file “init.sql”. For our project, we were
provisioned a WPI server and subdomain which has allowed us to run our web application on
backcountry2020.wpi.edu. We were able to access this server via SSH and pull our updates from
GitHub into the live server. We developed our project using VSCode, including its Live Server
plugin to run a demo server. Furthermore, we used Git and ran the Node server through the
Ubuntu terminal.

Our development process relied upon weekly planning meetings under the Scrum
methodology. We would create a backlog of tasks to accomplish such as creating content,
updating the interactive map, changing the layout and formatting, etc. We updated our progress
in our daily meetings throughout the week. At the end of the week, we would demonstrate the
progress to our team and often to our advisors to receive feedback. Another key piece of
development was receiving feedback from friends external to the project who could review
content, formatting, and ease of use. We used the Model View Controller design pattern to best
separate the logic of the page. In our case: the model was the MySQL database and ArcGIS
layers, the view was the HTML/CSS, and the controller was the JavaScript on both the client and
server.

Our code could be grouped into three major sections: the basic web page content, the
interactive map, and the database server. Aside from the interactive map, the web pages were
created using HTML and CSS. There was a minimal amount of JavaScript used to store and
update the landing page checklist. The ArcGIS interactive map was built using the template
provided by Esri. There is HTML/CSS to provide formatting, but the main functionality was
made using JavaScript code loaded through the Dojo loader. Lastly, the RESTful database server
was made using Node JS and Express JS. The functionality was created in JavaScript which
queried the MySQL database. Our data was stored as a User, based on an incrementing user ID
number, and a Trip, based on the embedded ArcGIS Polyline geometry. 
63

Finally, the interactive map was created using ArcGIS Online (AGOL). After receiving a
license from WPI, we started with the basic topographic basemap provided by AGOL. Glacier
National Park Geographer Richard Menicke provided trail and boundary layers, as well as data
on campgrounds and points of interest. Our team added data from the Glacier National Park
permitting map to the given campground information to create our final campground layer.
Additionally, we removed points of interest data that were irrelevant to backcountry hiking. The
campground and points of interest were uploaded to ArcGIS through the add layer by file option
in the map viewer. After completing the campground and points of interest layers, we created a
new polygon layer and added regions based on the Glacier National Park permitting map. Once
all our layers were finalized, we created a new web map and added the layers. We adjusted
visibility ranges, colors, symbols, and transparency to improve the map's appearance. The trail
and boundary layers are available through Richard Menicke’s profile. Finally, the hiking map,
campground layer, points of interest layer, and region layer are available through Devon
Poisson’s profile.

For further information, contact us at gr-Backcountry2020@wpi.edu