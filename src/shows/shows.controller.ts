import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Controller('api/shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {
  }

  @Get()
  public async getAllShow(
    @Res() res,
    @Query() paginationQueryDto,
  ) {
    const shows = await this.showsService.findAll(paginationQueryDto);

    return res.status(HttpStatus.OK).json(shows);
  }

  @Get('/:id')
  public async getShow(
    @Res() res,
    @Param('id') showId: string,
  ) {
    const show = await this.showsService.findOne(showId);

    return res.status(HttpStatus.OK).json(show);
  }

  @Post()
  public async addShow(
    @Res() res,
    @Body() createShowDto: CreateShowDto,
  ) {
    try {
      const show = await this.showsService.create(createShowDto);
      return res.status(HttpStatus.OK).json({
        message: 'Show is created successfully',
        show,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Show not created',
        status: 400
      });
    }
  }

  @Put('/:id')
  public async updateShow(
    @Res() res,
    @Param('id') showId: string,
    @Body() updateShowDto: UpdateShowDto,
  ) {
    try {
      const show = await this.showsService.update(
        showId,
        updateShowDto
      );

      return res.status(HttpStatus.OK).json({
        message: 'Show is updated successfully',
        show,
      })
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Show not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteShow(
    @Res() res,
    @Param('id') showId: string,
  ) {
    const show = await this.showsService.remove(showId);

    if(!show){
      throw new NotFoundException('Show does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'show has been deleted',
      show,
    });
  }
}
