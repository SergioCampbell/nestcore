import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      console.log('Breed not found');
      throw new BadRequestException('Breed not found');
    }

    console.log('New cat created', createCatDto);
    return await this.catRepository.save({ ...createCatDto, breed });
  }

  async findAll() {
    console.log('All cats found');
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    console.log('Cat found', id);
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    console.log('Cat updated', id, updateCatDto);
    return 'This action adds a new cat';
    // return await this.catRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    return await this.catRepository.softDelete(id); // se usa softDelete en lugar de delete para no borrar el registro
    // return await this.catRepository.softRemove(id) // se  le pasa la instancia del objeto a borrar
  }
}
