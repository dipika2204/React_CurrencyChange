REACT CURRENCY CHANGE

Description:

Create a webapp that displays a currency feed and updates itself every 20 secs. It should also indicate if the currency has increased or decreased since the last update.
            
Data:

The data we are used is extracted from this site
http://webrates.truefx.com/rates/connect.html?f=csv
      The data feed’s format is like so:

•	Currency – pair Symbol

•	Milliseconds timestamp

•	Bid Big Figure

•	Bid points

•	Offer big figure

•	Offer points 

•	High figure

•	Low figure

•	Mid figure

We are interested in only 3 values 1. Currency pair Symbol 2. Offer Big Figure 3. Offer points
      
Technologies Used:
      •	React
      •	Node
      •	GitHub (to update the code)
      
To run the Project:
1.	Download the zip file, extract it.
2.	Open 2 command prompts

In the first Command prompt

    a.	npm install (this will install dependencies required by the project)
    
    b.	npm start (this will do all the connection required the create Bundle.js file and automatically start the project on the browser)
    
Don’t go to the browser we have to start the server to extract the data:

    a.	npm install fast-csv –-save. 
    
    b.      npm install request --save
    
    c.	node server.js (the serve will be working on port 3001)
    
3.	Now go to the browser and you will the data with the increase and decrease and no change icons and also updating after every 20 secs

Things required by the project:
1.	React-create-app:
This helps you, setup the project. Webpack is used if you want to see the configurations, bundle.js file type this in the cmd “npm run build” to see them.

2.	React-icons:
To show the icons of increase decrease no change

3.	Fast-csv:
To handle the csv file

4.	Request:
To send a request to extract data from files (online)

5.	Express:
This helps us to change the configurations of Headers, Cache (CORS)

6.	JSX and ES6:
This helps us with react code. 

