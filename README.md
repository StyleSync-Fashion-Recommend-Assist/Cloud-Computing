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