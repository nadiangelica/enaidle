# Help Others

### Start 
1. To start, run `npm install` on the backend folder and again on the frontend folder.
  ```
  ; cd backend
  ; npm install
  ; cd frontend
  ; npm install
  ```
## To run the application 
2. Start by running the backend server `npm run dev`
  ```
  ; cd backend
  ; npm run dev
  ```
3. Then cd into the frontend folder and run `npm start`
  ```
  ; cd frontend
  ; npm start
  ```
## Testing
#### The Backend
**Note Environment variables (e.g. JWT secret) are set in the .env. file**

4. To start the server in test mode (so that it connects to the test DB)
  ```
  ; cd backend
  ; npm test
  ```

#### The Frontend - Cyprus Testing
5. Start the backend server, in another terminal start the frontend server and again in another terminal cd frontend and `npm run cypress`
  ```
  ; cd backend
  ; npm run dev
  ; cd frontend
  ; npm start
  ; cd frontend
  ; npm run cypress
  ```