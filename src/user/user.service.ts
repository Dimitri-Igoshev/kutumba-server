import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { getPhoneDigits } from 'src/common/helper/getPhoneDigits';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,) { }

  async create(data: CreateUserDto) {
    const isExist = await this.findByPhone(data.phone);

    if (isExist)
      throw new HttpException('User is already exists', HttpStatus.CONFLICT);

    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({ _id: id }, { ...data }, { new: true }).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findByPhone(phone: string) {
    return await this.userModel.findOne({ phone: getPhoneDigits(phone) }).exec();
  }
}
