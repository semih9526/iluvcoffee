import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll = () => this.coffees;

  findOne = (id: string) => {
    const coffee = this.coffees.find((coffee) => coffee.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  };

  create = (createCoffeeDto: any) => {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  };

  update = (id: string, updateCoffeeDto: UpdateCoffeeDto) => {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const updatedCoffee = { ...existingCoffee, ...updateCoffeeDto };
      console.log(updatedCoffee);

      this.coffees[coffeeIndex] = updatedCoffee;
    }
  };

  remove = (id: string) => {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex !== -1) {
      return this.coffees.splice(coffeeIndex, 1);
    }
  };
}
