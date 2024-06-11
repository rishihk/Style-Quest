import React from 'react';
import './About.css'

function About() {
    return (
        <div className="About">
            <h1>TEAM 16</h1>

            <h3>Hrishikesha Kyathsandra - rishihk@iastate.edu</h3>
            <p></p>
            <img src="./rishi.jpg" height="200" width="250" alt="Rishi"></img>
            <p></p>
            <h3>Kalem Schrock - kalems@iastate.edu</h3>
            <p></p>
            <img src="https://media.licdn.com/dms/image/D5603AQEW_KuGMzmPzQ/profile-displayphoto-shrink_200_200/0/1666242678387?e=1688601600&v=beta&t=fgGzJ2db35bxF7VcaKKVhN8-KSx2jvATV5EqVL_UtDk" alt="Kalem"></img>
            <p></p>
            <p><b>Course</b>: COMS 319</p >
            <p><b>Course Name</b>: Construction of User Interfaces</p>
            <p><b>Professor</b>: Dr. Abraham Aldaco</p>
            <p><b>About the project</b>: We have developed a MERN application. MERN is a web application developed using MongoDB, Express, React and Node.js. The application we have created supports the CRUD operations. We have implemented six views in this application. The first view displays all the products. In the second view, the client can search and get a product by Id. Our third view allows the client to add products to the database. The fourth view allows deletion of products by selection. The fifth fiew allows the client to update any field of a selected product. And the last view is the about page that covers the description of the app and its creators. The client can switch between any of the views.</p>
        </div >
    );
}

export default About;
