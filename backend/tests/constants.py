TEST_USER_ID = 1
TEST_USERNAME = "testuser"
TEST_EMAIL = "test@test.ru"
TEST_USER_ID2 = 2
TEST_USERNAME2 = "testuser2"
TEST_EMAIL2 = "test2@test.ru"
TEST_PASSWORD = "password123#"
TEST_REPASSWORD = "password123#"
TEST_FIRST_NAME = "max"
TEST_LAST_NAME = "skalozubov"
TEST_MEMORY_NAME = "memory 1"
TEST_MEMORY_DATE = "2024-05-11"
TEST_MEMORY_COORDINATES = "test"
TEST_MEMORY_DESCRIPTION = "new string"
TEST_MEMORY_PLACE_NAME = "home"
TEST_POST_DESCRIPTION = "test post"
create_test_memory = {
    "name": TEST_MEMORY_NAME,
    "date": TEST_MEMORY_DATE,
    "coordinates": TEST_MEMORY_COORDINATES,
    "description": TEST_MEMORY_DESCRIPTION,
    "place_name": TEST_MEMORY_PLACE_NAME,
    "participants": []
}
update_test_memory = {
    "description": TEST_MEMORY_DESCRIPTION,
}
create_test_user_data = {
    "username": TEST_USERNAME,
    "email": TEST_EMAIL,
    "password": TEST_PASSWORD,
    "re_password": TEST_REPASSWORD
}
update_user = {
    "first_name": TEST_FIRST_NAME,
    "last_name": TEST_LAST_NAME
}