import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavors.entity';
import { Event } from 'src/events/entities/event.entity';
import coffeesConfig from './config/coffees.config';

/**
 * Value Based Provider
 */
// class MockCoffeeService {}

/**
 * Class Based Providers
 */
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

/**
 * Factory Providers
 */
@Injectable()
export class CoffeeBrandsFactory {
  create = () => ['Başkanlar', 'Kaptanlar'];
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffeesConfig)],
  controllers: [CoffeesController],
  providers: [{ provide: CoffeesService, useClass: CoffeesService }],
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeeService() }], // Value Based Provider
  // providers: [
  //   CoffeesService,
  //   // { provide: COFFEE_BRANDS, useValue: ['Başkanlar, Kaptanlar'] }, // Nonclass Based Provider
  //   // { provide: ConfigService, useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService }, // Class Based Provider
  //   { provide: COFFEE_BRANDS, useFactory: () => ['Başkanlar', 'Kaptanlar'], scope: Scope.TRANSIENT },
  // ],

  /**
   * Factory Providers
   */
  // providers: [
  //   CoffeesService,
  //   CoffeeBrandsFactory,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
  //     inject: [CoffeeBrandsFactory],
  //     scope: Scope.TRANSIENT,
  //   },
  // ],

  /**
   * Async Providers
   */
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: async (connection: Connection): Promise<string[]> => {
  //       const coffeeBrands = await Promise.resolve(['Başkanlar, Kaptanlar']);
  //       console.log('[!] Async factory');

  //       return coffeeBrands;
  //     },
  //     inject: [Connection],
  //   },
  // ],

  exports: [CoffeesService],
})
export class CoffeesModule {}
