import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Show } from './schemas/show.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateShowDto } from './dto/create-show.dto';
import { IShow } from './interfaces/show.interface';
import { UpdateShowDto } from './dto/update-show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectModel(Show.name) private readonly showModel : Model<Show>,
  ) {
  }

  public async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<Show[]> {
    const {limit, offset} = paginationQueryDto;

    return await this.showModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async findOne(showId: string): Promise<Show> {
    const show = await this.showModel
      .findById({_id: showId})
      .exec();

    if(!show) {
      throw new NotFoundException(`Customer #${showId} not found`);
    }
    return show;
  }

  public async create(
    createShowDto: CreateShowDto,
  ): Promise<IShow> {
    const newShow = await new this.showModel(createShowDto);
    return newShow.save();
  }

  public async update(
    showId: string,
    updateShowDto: UpdateShowDto,
  ): Promise<IShow> {
    const foundShow = await this.showModel.findByIdAndUpdate(
      {_id: showId},
      updateShowDto
    );

    if(!foundShow){
      throw new NotFoundException(`Show ${showId} not found`);
    }
    return foundShow;
  }

  public async remove(showId: string): Promise<any> {
    const deletedShow = await this.showModel.findByIdAndRemove(showId);

    return deletedShow;
  }
}
