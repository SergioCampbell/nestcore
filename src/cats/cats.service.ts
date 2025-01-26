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
      console.log('🚩 Create process => Breed not found');
      throw new BadRequestException('Breed not found');
    }

    console.log('🔵 Create process => New cat created', createCatDto);
    return await this.catRepository.save({ ...createCatDto, breed });
  }

  async findAll() {
    console.log('🔰 search all process => All cats found');
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    console.log('🔰 search process => Cat found', id);
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: updateCatDto.breed,
    });

    if (!breed) {
      console.log('🚩 Update process => Breed not found');
      throw new BadRequestException('Breed not found');
    }

    console.log('🟣 Update process => Cat updated', id, updateCatDto);
    return await this.catRepository.update(id, { ...updateCatDto, breed });
  }

  async remove(id: number) {
    console.log('🔴 Delete process => Cat deleted', id);
    return await this.catRepository.softDelete(id); // se usa softDelete en lugar de delete para no borrar el registro
    // return await this.catRepository.softRemove(id) // se  le pasa la instancia del objeto a borrar
  }
}
