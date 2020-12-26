import { PartialType } from '@nestjs/mapped-types';
import { CreateShowDto } from './create-show.dto';
import { CreateOrganizationDto } from '../../organizations/dto';

export class UpdateShowDto extends PartialType(CreateShowDto) {}