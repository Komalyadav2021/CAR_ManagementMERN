# Car Management Application 🚗

A **Car Management Application** that allows users to create, view, edit, and delete their car listings with up to 10 images per car. The application supports user authentication and provides global search functionality to search for cars based on title, description, or tags.

---

## Features ✨

1. **User Authentication**  
   - Users can sign up and log in to manage their cars securely.

2. **Add Cars**  
   - Users can add cars with the following details:
     - Up to 10 images of the car.
     - Title.
     - Description.
     - Tags (e.g., `car_type`, `company`, `dealer`, etc.).

3. **View Cars**  
   - Users can view a list of all the cars they have added.

4. **Global Search**  
   - Users can search through their cars using a keyword that matches the car's title, description, or tags.

5. **View Car Details**  
   - Clicking on a car displays its complete details, including images, title, description, and tags.

6. **Edit Cars**  
   - Users can update a car’s:
     - Title.
     - Description.
     - Tags.
     - Images.

7. **Delete Cars**  
   - Users can delete a car listing.

---

## Tech Stack 🛠️

### Frontend:
- **React.js**: For building the user interface.
- **CSS**: For styling the application.
- **Axios**: For making API requests.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building the RESTful API.
- **MongoDB**: For storing user and car data.
- **Mongoose**: For database modeling.
- **JWT**: For secure user authentication.

### Additional Tools:
- **Multer**: For handling image uploads.
- **Cloudinary/AWS S3**: For storing car images (optional).

---

## Installation and Setup 🚀

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Car-Management-App.git
   cd Car-Management-App

