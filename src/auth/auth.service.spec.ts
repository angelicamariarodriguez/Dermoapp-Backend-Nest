import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';
import { Req } from '@nestjs/common';


describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let repository: Repository<UserEntity>;
  let jwt: JwtService;
  let usersList: UserEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AuthService, UserService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
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
        roles: [faker.lorem.word()], 
        })
        usersList.push(user);
    }
  }

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('validateUser should return an user', async () => {
    const storedUser: UserEntity = usersList[0];
    const user: UserEntity = await authService.validateUser(storedUser.email, storedUser.password);
    expect(user).not.toBeNull();
    expect(user.email).toEqual(storedUser.email)
    expect(user.roles).toEqual(storedUser.roles[0])
  });

  it('validateUser should throw an exception for an invalid user name', async () => {
    const storedUser: UserEntity = usersList[0];
    await expect(() => authService.validateUser("aaaa@aaa.com", storedUser.password)).rejects.toHaveProperty("message", "The user with the given email was not found")
  });

  it('validateUser should throw an exception for an invalid password', async () => {
    const storedUser: UserEntity = usersList[0];
    const user: UserEntity = await authService.validateUser(storedUser.email, "password");
    expect(user).toBeNull();
  });

});
