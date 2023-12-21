# Style Sync Backend API
Api yang digunakan merupakan endpoint dari Cloud Run: https://stylesync-run-t4yhz77ada-de.a.run.app

## Routes: 
* User
    * Register User:
        
        Path: 

        ```
        /api/register
        ```

        Method: **POST**
        
        Body: 

        ```json
        {
        "name": "Testing",
        "email": "test@gmail.com",
        "password": "test 123"
        }
        ```

        Response: 
        * Failed:
            ```json
            {
            "status": "Error Accured",
            "message": "User Already Exists"
            }
            ```

        * Success: 
            ```json
            {
            "status": "Success",
            "message": "User berhasil Register"
            }
            ```
    * Login User:
        
        Path: 

        ```
        /api/login
        ```

        Method: **POST**
        
        Body: 

        ```json
        {
        "name": "Testing",
        "email": "test@gmail.com",
        }
        ```

        Response: 
        * Failed:
            ```json
            {
            "status": "Error Accured",
            "message": "Invalid password"
            }
            ```

        * Success: 
            ```json
            {
            "message": "User berhasil Login",
            "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjRhZjk0MTYtZmRiMi00NmFlLTg5NmItMGY1MDgwOGE3NzdiIiwiaWF0IjoxNzAzMDc3MjY1LCJleHAiOjE3MDMxNjM2NjV9.aiHXp-ay3krv2owlVkQj0foelT4Xji0Q8NmRZN5s3uI"
            }
            ```