import pytest
from fixtures import create_user, user_client, create_friend, create_user2, create_memory, create_post
from rest_framework.test import APIClient
from rest_framework import status
import constants
from users.models import CustomUser



@pytest.mark.django_db
class TestUser:
    def test_get_user_me(self, user_client):
        expected_fields = {
            'id',
            'email',
            'username',
            'photo',
            'is_friend',
            'first_name',
            'last_name'
        }

        response = user_client.get('/api/users/me/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data.get('id') == constants.TEST_USER_ID
        assert response.data.get('username') == constants.TEST_USERNAME
        assert response.data.get('email') == constants.TEST_EMAIL
        assert set(response.data.keys()) == expected_fields
    
    def test_create_user(self):
        expected_fields = {
            'id',
            'email',
            'username',
            'photo',
            'first_name',
            'last_name'
        }

        response = APIClient().post(
            '/api/users/',
            data=constants.create_test_user_data,
            format='json'
        )
        user = CustomUser.objects.filter(
            username=constants.create_test_user_data.get('username')
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data.get('id') == constants.TEST_USER_ID
        assert response.data.get('username') == constants.TEST_USERNAME
        assert response.data.get('email') == constants.TEST_EMAIL
        assert user.exists()
        assert set(response.data.keys()) == expected_fields
    
    def test_login(self, create_user):
        expected_fields = {
            'auth_token'
        }

        response = APIClient().post(
            '/api/auth/token/login/',
            data={"username": constants.TEST_USERNAME, "password": constants.TEST_PASSWORD},
            format='json'
        )

        assert response.status_code == status.HTTP_200_OK
        assert set(response.data.keys()) == expected_fields

    def test_logout(self, user_client):
        response = user_client.post('/api/auth/token/logout/')

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_get_users_list(self, user_client):
        expected_fields = {
            'id',
            'email',
            'username',
            'photo',
            'is_friend',
            'first_name',
            'last_name'
        }

        response = user_client.get('/api/users/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data[0].get('id') == constants.TEST_USER_ID
        assert response.data[0].get('username') == constants.TEST_USERNAME
        assert response.data[0].get('email') == constants.TEST_EMAIL
        assert set(response.data[0].keys()) == expected_fields
    
    def test_update_user_me(self, user_client):
        expected_fields = {
            'id',
            'email',
            'username',
            'photo',
            'is_friend',
            'first_name',
            'last_name'
        }

        response = user_client.patch(
            '/api/users/me/',
            data=constants.update_user,
            format='json'
        )

        assert response.status_code == status.HTTP_200_OK
        assert response.data.get('id') == constants.TEST_USER_ID
        assert response.data.get('username') == constants.TEST_USERNAME
        assert response.data.get('email') == constants.TEST_EMAIL
        assert response.data.get('first_name') == constants.TEST_FIRST_NAME
        assert response.data.get('last_name') == constants.TEST_LAST_NAME
        assert set(response.data.keys()) == expected_fields

@pytest.mark.django_db
class TestFriends:
    def test_get_friendsip_requests(self, create_friend, user_client):
        expected_fields = {
            'id', 'from_user', 'to_user', 'status'
        }

        response = user_client.get('/api/friendship-requests/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data[0].get('from_user') == constants.TEST_USERNAME2
        assert response.data[0].get('to_user') == constants.TEST_USERNAME
        assert response.data[0].get('status') == 'sent'
        assert set(response.data[0].keys()) == expected_fields
    

    def test_create_friendsip_requests(self, user_client, create_user2):
        expected_fields = {
            'id', 'from_user', 'to_user', 'status'
        }

        response = user_client.post(f'/api/users/{constants.TEST_USER_ID2}/friend/')
        print(response.data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data.get('from_user') == constants.TEST_USERNAME
        assert response.data.get('to_user') == constants.TEST_USERNAME2
        assert response.data.get('status') == 'sent'
        assert set(response.data.keys()) == expected_fields
    
    def test_accept_friendship_requset(self, create_friend, user_client):
        expected_fields = {
            'id',
            'email',
            'username',
            'photo',
            'is_friend',
            'first_name',
            'last_name'
        }
        response = user_client.post(f'/api/friendship-requests/1/accept/')
        get_friend = user_client.get(f'/api/friends/')

        assert response.status_code == status.HTTP_200_OK
        assert get_friend.status_code == status.HTTP_200_OK
        assert get_friend.data[0].get('id') == constants.TEST_USER_ID2
        assert get_friend.data[0].get('username') == constants.TEST_USERNAME2
        assert get_friend.data[0].get('email') == constants.TEST_EMAIL2
        assert get_friend.data[0].get('is_friend') == 'Вы друзья'
        assert set(get_friend.data[0].keys()) == expected_fields


    def test_reject_friendship_requset(self, create_friend, user_client):
        response = user_client.post(f'/api/friendship-requests/1/reject/')
        get_friend = user_client.get(f'/api/friends/')

        assert get_friend.status_code == status.HTTP_200_OK
        assert get_friend.data == []
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestMemories:
    def test_get_memories(self, create_memory, user_client):
        expected_fields = {
            "id",
            "name",
            "date",
            "coordinates",
            "participants",
            "place_name"
        }
        response = user_client.get(f'/api/memory/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data[0].get('name') == constants.TEST_MEMORY_NAME
        assert response.data[0].get('coordinates') == constants.TEST_MEMORY_COORDINATES
        assert response.data[0].get('place_name') == constants.TEST_MEMORY_PLACE_NAME
        assert response.data[0].get('date') == constants.TEST_MEMORY_DATE
        assert response.status_code == status.HTTP_200_OK
        assert set(response.data[0].keys()) == expected_fields

    def test_get_memory(self, create_memory, user_client):
        expected_fields = {
            'id', 'name', 'date', 'coordinates', 'description', 'creator', 'participants', 'posts', 'place_name'
        }
        response = user_client.get(f'/api/memory/1/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data.get('name') == constants.TEST_MEMORY_NAME
        assert response.data.get('coordinates') == constants.TEST_MEMORY_COORDINATES
        assert response.data.get('place_name') == constants.TEST_MEMORY_PLACE_NAME
        assert response.data.get('date') == constants.TEST_MEMORY_DATE
        assert response.data.get('creator').get("id") == constants.TEST_USER_ID
        assert set(response.data.keys()) == expected_fields
    
    def test_create_memory(self, user_client):
        expected_fields = {
            'id', 'name', 'date', 'coordinates', 'description', 'participants', 'place_name'
        }
        response = user_client.post(
            '/api/memory/',
            data=constants.create_test_memory,
            format='json'
            )
        print(response.data.keys())

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data.get('name') == constants.TEST_MEMORY_NAME
        assert response.data.get('coordinates') == constants.TEST_MEMORY_COORDINATES
        assert response.data.get('place_name') == constants.TEST_MEMORY_PLACE_NAME
        assert response.data.get('date') == constants.TEST_MEMORY_DATE
        assert set(response.data.keys()) == expected_fields

    def test_update_memory(self, create_memory, user_client):
        expected_fields = {
            'id', 'name', 'date', 'coordinates', 'description', 'participants', 'place_name'
        }
        response = user_client.patch(
            '/api/memory/1/',
            data=constants.update_test_memory,
            format='json'
            )
        print(response.data.keys())

        assert response.status_code == status.HTTP_200_OK
        assert response.data.get('name') == constants.TEST_MEMORY_NAME
        assert response.data.get('coordinates') == constants.TEST_MEMORY_COORDINATES
        assert response.data.get('place_name') == constants.TEST_MEMORY_PLACE_NAME
        assert response.data.get('date') == constants.TEST_MEMORY_DATE
        assert set(response.data.keys()) == expected_fields

    def test_delete_memory(self, create_memory, user_client):
        response = user_client.delete('/api/memory/1/')

        assert response.status_code == status.HTTP_204_NO_CONTENT
    
    def test_get_memories_for_map(self, create_memory, user_client):
        expected_fields = {
            "id",
            "coordinates",
            "place_name"
        }
        response = user_client.get(f'/api/memory/cart/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data[0].get('coordinates') == constants.TEST_MEMORY_COORDINATES
        assert response.data[0].get('place_name') == constants.TEST_MEMORY_PLACE_NAME
        assert set(response.data[0].keys()) == expected_fields

@pytest.mark.django_db
class TestPost:
    def test_create_post(self, create_user, user_client, create_memory):
        expected_fields = {
            "memory",
            "description",
            "image"
        }
        response = user_client.post(
            '/api/post/',
            data={"memory": create_memory.id, "creator_id": create_user.id, "description": constants.TEST_POST_DESCRIPTION},
            format='json'
            )

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data.get('memory') == create_memory.id
        assert response.data.get('description') == constants.TEST_POST_DESCRIPTION
        assert set(response.data.keys()) == expected_fields

    def test_update_post(self, user_client, create_post):
        expected_fields = {
            "memory",
            "description",
            "image"
        }
        response = user_client.patch(
            '/api/post/1/',
            data={"description": constants.TEST_POST_DESCRIPTION},
            format='json'
            )

        assert response.status_code == status.HTTP_200_OK
        assert response.data.get('memory') == 1
        assert response.data.get('description') == constants.TEST_POST_DESCRIPTION
        assert response.data.get('image') == None
        assert set(response.data.keys()) == expected_fields

    def test_delete_post(self, user_client, create_post):
        response = user_client.delete('/api/post/1/')

        assert response.status_code == status.HTTP_204_NO_CONTENT
