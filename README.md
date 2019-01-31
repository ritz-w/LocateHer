## LocateHer
LocateHer is a social networking platform that helps women connect to mentors in their area, as well as professional opportunities and events. Users sign up as mentors or mentees, can view other active users in their geolocated area, and offer to be a mentor or request to be mentored. 

## Background
The idea for this app was developed as a part of the [Women Founders Hack](https://womenfoundershack.foundersofthefuture.co/) 2018, organised by Founders of the Future. It was a 48 hour hackathon to tackle gender diversity in tech. With over 200 participants from diverse backgrounds, we formed groups to propose business ideas to be judged by a panel. 

The team which I joined initially described their idea as an "Uber for mentors" - in the sense of being able to geolocate a casual networking opportunity. I was interested to try implementing geolocation and Google Maps API toward building this app. As technical lead of the team, over 48 hours, I was able to build a functioning demo of the platform that included an events page, a blog, and the ability to view other users positioned on a dynamically updating map. Other features have been left visible but not interactive, as this is primarily a demo.

It was interesting to develop this project as a part of a team which also focused on marketing, business development, and business strategy. I was in charge of designing and bringing the product to life, but the attention to detail in planning around the product and envisioning its potential was very eye-opening to be a part of. 


## Tech/Frameworks Used

<b>Languages</b>
- Ruby
- Javascript

<b>Web Frameworks</b>
- [Ruby on Rails](https://rubyonrails.org/)
- [React](https://reactjs.org/)
- [Redux](https://facebook.github.io/react-360/)

<b>UI Library</b>
- [Semantic UI React](https://react.semantic-ui.com/)

<b>Components</b>
- [React Geocode](https://github.com/bokuweb/re-resizable)

## Features
- User can create account as a mentor or mentee and log in, using JWT Auth and JSON web tokens
- User can access their dashboard to view other users on the map (whether mentors or mentees), and in a list form 
- User can view other users' information and decide whether to send them a custom request to mentor them or to become a mentee
- User can accept or reject mentorship requests
- User can view the 'Stories' page to see latest blog posts (currently dummy content)
- User can view the 'Events' page to see local networking events

## API Reference

<b>Geolocation API</b>
- [Google Maps API](https://cloud.google.com/maps-platform/?hl=zh-tw)


## How to use?
Recommended usage of the app:
1) Create an account by selecting whether to sign up as a mentor or mentee on the front page. Enter your career details and  click 'Sign Up'.
2) On your dashboard, explore other users' profiles. You can filter other users by whether they are mentors or mentees. 
3) Request to become a mentor by filling out the form in the user's profile. 
5) Explore the 'Stories' and 'Events' page, which cannot be clicked as they are filled with dummy content.

## Contribute

I would welcome any suggestions or contributions to this project ! When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with me [ritz.wu@outlook.com] before making a change.

## Credits
Co-created with Carla Cilli, Damian Zabielski, Isobel Macfarland, Katya Merkalenko, and Ava Isak

## Contact
If there is any issue with this app please email [ritz.wu@outlook.com].

## License
This project is licensed under the MIT License - © [Ritz Wu](http://www.ritsu.net/) 
