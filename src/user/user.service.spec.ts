import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UserEntity} from './user.entity'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Role } from './role.enum';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;
  let usersList: UserEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usersList = [];
    for(let i = 0; i < 5; i++){
        const user: UserEntity = await repository.save({
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [faker.lorem.word()] })
        usersList.push(user);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new user', async () => {
    const user: UserEntity = {
      id: "",
      email: faker.internet.email(),
      password: faker.internet.password(),
      roles: ['Patient']
    }
    const newUser: UserEntity = await service.create(user);
    expect(newUser).not.toBeNull();
    const storedUser: UserEntity = await repository.findOne({where: {email: newUser.email}})
    expect(storedUser).not.toBeNull();
    expect(storedUser.email).toEqual(newUser.email)
    expect(storedUser.password).toEqual(newUser.password)
    expect(storedUser.roles).toEqual(newUser.roles[0])
  });

  it('create should throw an exception for an email already registered', async () => {
    const user: UserEntity = {
      id: "",
      email: faker.internet.email(),
      password: faker.internet.password(),
      roles: ['Medic']
    }
    const newUser: UserEntity = await service.create(user);
    await expect(() => service.create(user)).rejects.toHaveProperty("message", "The user with the given email already exists")
    expect(newUser).not.toBeNull();
  });

  it('findOne should return an user by email', async () => {
    const storedUser: UserEntity = usersList[0];
    const user: UserEntity = await service.findOne(storedUser.email);
    expect(user).not.toBeNull();
    expect(user.email).toEqual(storedUser.email)
    expect(user.password).toEqual(storedUser.password)
    expect(user.roles).toEqual(storedUser.roles[0])
  });

  it('findOne should throw an exception for an invalid user', async () => {
    await expect(() => service.findOne("aaa@hotmail.com")).rejects.toHaveProperty("message", "The user with the given email was not found")
  });
});
