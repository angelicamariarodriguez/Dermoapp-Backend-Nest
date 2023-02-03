import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
    ){}
 
   async findOne(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({where: {email}} );
    if (!user)
      throw new BusinessLogicException("The user with the given email was not found", BusinessError.NOT_FOUND);

    return user;
   }

   async create(user: UserEntity): Promise<UserEntity> {
    const email = user.email;
    const findUser: UserEntity = await this.userRepository.findOne({where: {email}});
    if (findUser)
        throw new BusinessLogicException("The user with the given email already exists", BusinessError.BAD_REQUEST);
    return await this.userRepository.save(user);
}

}
