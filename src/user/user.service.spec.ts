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
  });

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
});
