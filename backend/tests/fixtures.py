import pytest
from users.models import CustomUser, FriendshipRequest
from memories.models import Memory, Post
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
import constants

@pytest.fixture
def create_user():
    user = CustomUser.objects.create_user(
        username=constants.TEST_USERNAME,
        email=constants.TEST_EMAIL,
        password=constants.TEST_PASSWORD
    )
    user.id = constants.TEST_USER_ID
    user.save()
    yield user

@pytest.fixture
def create_user2():
    user = CustomUser.objects.create_user(
        username=constants.TEST_USERNAME2,
        email=constants.TEST_EMAIL2,
        password=constants.TEST_PASSWORD
    )
    user.id = constants.TEST_USER_ID2
    user.save()
    yield user


@pytest.fixture
def user_client(create_user):
    client = APIClient()
    user = create_user
    token, _ = Token.objects.get_or_create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    return client

@pytest.fixture
def create_friend(create_user, create_user2):
    request = FriendshipRequest.objects.create(
        from_user=create_user2,
        to_user=create_user,
    )
    yield request

@pytest.fixture
def create_memory(create_user):
    memory = Memory.objects.create(
        name=constants.TEST_MEMORY_NAME,
        date=constants.TEST_MEMORY_DATE,
        coordinates=constants.TEST_MEMORY_COORDINATES,
        description=constants.TEST_MEMORY_DESCRIPTION,
        place_name=constants.TEST_MEMORY_PLACE_NAME,
        creator_id = create_user.id
    )
    yield memory


@pytest.fixture
def create_post(create_user, create_memory):
    post = Post.objects.create(
        memory=create_memory,
        description=constants.TEST_POST_DESCRIPTION,
        creator_id = create_user.id
    )
    yield post