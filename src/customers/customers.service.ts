import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ICustomer } from './interfaces/customer.interface';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Organization } from '../organizations/schemas/organization.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(Organization.name) private readonly organizationModel: Model<Organization>,
  ) {
  }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Customer[]> {
    const { limit, offset } = paginationQuery;

    const test = await this.organizationModel.find().exec();
    console.log(test);

    return await this.customerModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('organization')
      .exec();
  }

  public async findOne(customerId: string): Promise<Customer> {
    const customer = await this.customerModel
                              .findById({ _id: customerId })
                              .populate('organization')
                              .exec();

    if(!customer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    return customer;
  }

  public async create (
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer> {
    const newCustomer = await new this.customerModel(createCustomerDto);

    return newCustomer.save();
  }

  public async update(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ICustomer> {
    const existingCustomer = await this.customerModel.findByIdAndUpdate(
      {_id: customerId},
      updateCustomerDto,
    );

    if(!existingCustomer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    return existingCustomer;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerId,
    );
    return deletedCustomer;
  }
}
