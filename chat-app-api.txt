<!-- Chat App Api  -->

->create new user
POST
{url}/user/create
{
"email":"maheabzishan.cs@gmail.com",
"name":"maheab hossain",
"password":"123456"
}

->login user
POST
{url}/user/login
{
"email":"maherabzishan.cs@gmail.com",
"password":"123456"
}

->get all user
GET
Authorization token required
{url}/user/

->see all user in the system
GET
Authorization token required
{url}/see-all

->send message request
POST
Authorization token required
{url}/request/send
{
id:"61a655d59d677c9b50f4379e"
}

-> accept message request
PUT
Authorization token required
{url}/accept/61a655d59d677c9b50f4379e
