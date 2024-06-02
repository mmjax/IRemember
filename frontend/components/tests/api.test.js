import { registerUser, CreateMemory, CreatePost, loginUser, MemoryListForMap, MemoryList, getMemory, getUserMe, ChengeMemory, ChengeUserMe } from '../repo';
import fetchMock from 'fetch-mock';
import { REACT_APP_API_URL } from '@env';

const API_URL = REACT_APP_API_URL;

describe('test api', () => {
  beforeEach(() => {
    fetchMock.restore();
  }); 
    test('Create User', async () => {
        mockResponse = {
            username: 'testUser',
            email: 'test@example.com',
            first_name: '',
            last_name: ''
        }
    
      const username = 'testUser';
      const email = 'test@example.com';
      const password = 'testPassword';
      const re_password = 'testPassword';

      fetchMock.post(`${API_URL}/api/users/`, {
        status: 201,
        body: mockResponse,
        });
    
      const response = await registerUser(username, email, password, re_password);
      expect(response.status).toEqual(201);
    });

    test('Login User', async () => {
        const username = 'mmjax';
        const password = '1234';
        
        const response = await loginUser(username, password);
        expect(response).toEqual(200);
      });
    
  
    test('Create Memory', async () => {
        const mockResponse = {
            name: 'Memory 1',
            date: '2024-08-08',
            coordinates: 'home',
            description: 'description',
            place_name: 'place_name',
            participants: []
          };
        const data = new FormData();
        data.append('name', 'Memory 1');
        data.append('date', '2024-08-08');
        data.append('coordinates', 'home');
        data.append('description', 'description');
        data.append('place_name', 'place_name');
        fetchMock.post(`${API_URL}/api/memory/`, {
            status: 201,
            body: mockResponse,
        });
    
        const response = await CreateMemory(data);
        expect(response.status).toEqual(201);
        expect(response.data.name).toEqual('Memory 1')
        expect(response.data.date).toEqual('2024-08-08')
        expect(response.data.coordinates).toEqual('home')
      });
    test('Create Post', async () => {
        const mockResponse = {
            "memory": 1,
            "description": "new post",
            "image": null
        };
        const data = new FormData();
        data.append("description", "new post");
        data.append("memory", 1);

        fetchMock.post(`${API_URL}/api/post/`, {
        status: 201,
        body: mockResponse,
        });

        const response = await CreatePost(data);
        expect(response.status).toEqual(201);
        expect(response.data).toEqual(mockResponse);
    });
    test('Get Memory List For Map', async () => {
        const mockResponse = 
            [
                {
                    "id": 1,
                    "coordinates": "55.741705937982104,37.590879700776945",
                    "place_name": "home"
                },
                {
                    "id": 2,
                    "coordinates": "55.755575075602394,37.6227298181106",
                    "place_name": "new place"
                },
            ];

        fetchMock.get(`${API_URL}/api/memory/cart/`, {
        status: 200,
        body: mockResponse,
        });

        const response = await MemoryListForMap();
        console.log(response)
        const data = await response.json();

        expect(response.status).toEqual(200)
        expect(data).toEqual(mockResponse);
    });
    test('Get Memory List', async () => {
        const mockResponse = 
            [
                
                {
                    "id": 1,
                    "name": "test1",
                    "coordinates": "55.741705937982104,37.590879700776945",
                    "date": "2024-05-10",
                    "participants": [],
                    "place_name": "home"
                },
                {
                    "id": 3,
                    "name": "test2",
                    "coordinates": "55.755575075602394,37.6227298181106",
                    "date": "2024-05-10",
                    "participants": [],
                    "place_name": "home1"
                },
            ];

        fetchMock.get(`${API_URL}/api/memory/`, {
        status: 200,
        body: mockResponse,
        });

        const response = await MemoryList();
        const data = await response.json();

        expect(response.status).toEqual(200)
        expect(data).toEqual(mockResponse);
    });
    test('Get User Me', async () => {
        const mockResponse = 
        {
            "id": 1,
            "email": "maxskgtr@gmail.com",
            "username": "mmjax",
            "photo": null,
            "is_friend": "Вы не друзья",
            "first_name": "",
            "last_name": ""
        };

        fetchMock.get(`${API_URL}/api/users/me/`, {
        status: 200,
        body: mockResponse,
        });

        const response = await getUserMe();

        expect(response.status).toEqual(200)
        expect(response.data).toEqual(mockResponse);
    });
    test('Get Memory', async () => {
        const memoryId = 1
        const mockResponse = 
        {
            "id": 1,
            "name": "Vcnbcv",
            "date": "2024-05-10",
            "coordinates": "55.741705937982104,37.590879700776945",
            "description": "Harriman",
            "creator": {
                "id": 1,
                "email": "maxskgtr@gmail.com",
                "username": "mmjax",
                "photo": null,
                "is_friend": "Вы не друзья",
                "first_name": "",
                "last_name": ""
            },
            "participants": [],
            "posts": [
                {
                    "description": "new",
                    "date": null,
                    "image": null,
                    "creator": {
                        "id": 1,
                        "email": "maxskgtr@gmail.com",
                        "username": "mmjax",
                        "photo": null,
                        "is_friend": "Вы не друзья",
                        "first_name": "",
                        "last_name": ""
                    }
                }
            ],
            "place_name": "Cancan"
        };

        fetchMock.get(`${API_URL}/api/memory/${memoryId}/`, {
        status: 200,
        body: mockResponse,
        });

        const response = await getMemory(memoryId);

        expect(response.status).toEqual(200)
        expect(response.data).toEqual(mockResponse);
    });
    test('Edit Memory', async () => {
        const memoryId = 1
        const mockResponse = 
        {
            "id": 1,
            "name": "Vcnbcv",
            "date": "2024-05-10",
            "coordinates": "55.741705937982104,37.590879700776945",
            "description": "new description",
            "participants": [],
            "place_name": "Cancan"
        };
        const data = new FormData();
        data.append('description', 'new description');

        fetchMock.patch(`${API_URL}/api/memory/${memoryId}/`, {
        status: 200,
        body: mockResponse,
        });

        const response = await ChengeMemory(data, memoryId);

        expect(response.status).toEqual(200)
        expect(response.data).toEqual(mockResponse);
    });
    test('Edit Profile', async () => {
        const mockResponse = 
        {
            "id": 1,
            "email": "maxskgtr@gmail.com",
            "username": "mmjax",
            "photo": null,
            "is_friend": "Вы не друзья",
            "first_name": "max",
            "last_name": ""
        };
        const data = new FormData();
        data.append('first_name', 'max');

        fetchMock.patch(`${API_URL}/api/users/me/`, {
        status: 200,
        body: mockResponse,
        });

        const response = await ChengeUserMe(data);

        expect(response.status).toEqual(200)
        expect(response.data).toEqual(mockResponse);
    });
});